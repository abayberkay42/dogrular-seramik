# Sunucuya Kurulum — Doğrular Seramik

VPS üzerinde Next.js 15 + pm2 + nginx ile yayın.

Kod sunucuya **doğrudan `git push` ile** gider — GitHub veya başka bir aracı servis
gerekmez. Sunucuda çıplak (bare) bir git deposu tutulur; siz yerelden ona
gönderirsiniz, sunucu otomatik derleyip siteyi yeniler.

**Neden bu yöntem:** proje 268 MB. `scp` ile her seferinde tamamını yüklemek
gerekirdi; git yalnızca **değişen dosyaları** gönderir. İlk gönderim birkaç
dakika sürer, sonraki güncellemeler saniyeler içinde biter.

---

## Sunucu gereksinimleri

| Gereksinim | Sürüm | Kontrol komutu |
|---|---|---|
| Node.js | 20 veya üzeri | `node -v` |
| npm | 10+ | `npm -v` |
| git | herhangi | `git --version` |
| pm2 | son sürüm | `pm2 -v` |
| nginx | herhangi | `nginx -v` |
| Boş disk | en az 3 GB | `df -h /` |
| RAM | en az 2 GB (derleme için) | `free -h` |

Node 20+ şart — proje Next.js 15 kullanıyor.

Root ile bağlanıyorsanız aşağıdaki komutlardaki `sudo` kelimelerini silin.

---

## Adım 1 — Sunucuyu hazırlayın

```
ssh root@SUNUCU_IP
```

Eksik araçları kurun (Ubuntu/Debian):

```
apt update
apt install -y git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
```

Doğrulayın — hepsi sürüm numarası yazdırmalı:

```
node -v && npm -v && git --version && pm2 -v && nginx -v
```

---

## Adım 2 — Sunucuda çıplak depo oluşturun

Sitenin kodu `/var/www/dogrular-seramik` içinde çalışacak, git verisi ise
ayrı bir yerde (`/var/git`) durur.

```
mkdir -p /var/git /var/www/dogrular-seramik /var/log/pm2
cd /var/git
git init --bare dogrular-seramik.git
```

---

## Adım 3 — Gmail bilgilerini girin

Örnek İste formunun mail gönderebilmesi için gerekli.
Bu dosya git'e **gitmez**, sunucuda kalır ve güncellemelerde silinmez.

```
nano /var/www/dogrular-seramik/.env.production
```

İçine (değerleri kendi bilgilerinizle değiştirin):

```
GMAIL_USER=ornek@gmail.com
GMAIL_APP_PASSWORD=uygulamasifresi
```

Kaydedin, sonra izinleri kısıtlayın — şifre içeriyor:

```
chmod 600 /var/www/dogrular-seramik/.env.production
```

---

## Adım 4 — İlk gönderimi yapın (yerel bilgisayardan)

Kendi bilgisayarınızda, proje klasöründe:

```
git remote add sunucu ssh://root@SUNUCU_IP/var/git/dogrular-seramik.git
git push sunucu main
```

268 MB gittiği için ilk gönderim birkaç dakika sürer.
Bu aşamada sunucu henüz otomatik derleme yapmaz — kancayı Adım 5'te kuracağız.

---

## Adım 5 — Otomatik dağıtım kancasını kurun (sunucuda)

Artık kod sunucuda olduğu için kanca dosyası da orada:

```
cp /var/www/dogrular-seramik/deploy/post-receive /var/git/dogrular-seramik.git/hooks/post-receive
chmod +x /var/git/dogrular-seramik.git/hooks/post-receive
```

Kanca henüz çalışmadığı için ilk kurulumu elle yapın:

```
cd /var/www/dogrular-seramik
git --work-tree=/var/www/dogrular-seramik --git-dir=/var/git/dogrular-seramik.git checkout -f main
npm ci
npm run build
```

`npm run build` 2-5 dakika sürer, 209 sayfa üretir.

**RAM 2 GB'ın altındaysa** derleme çökebilir. Önce takas alanı açın:

```
fallocate -l 2G /swapfile && chmod 600 /swapfile
mkswap /swapfile && swapon /swapfile
```

---

## Adım 6 — pm2 ile çalıştırın

```
cd /var/www/dogrular-seramik
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

`pm2 startup` size bir komut yazdırır — onu kopyalayıp çalıştırın.
Sunucu yeniden başladığında site otomatik ayağa kalkar.

Doğrulayın:

```
pm2 status
curl -I http://127.0.0.1:3001
```

`HTTP/1.1 200 OK` görmelisiniz.

---

## Adım 7 — nginx

```
cp /var/www/dogrular-seramik/deploy/nginx.conf /etc/nginx/sites-available/dogrularseramik
ln -s /etc/nginx/sites-available/dogrularseramik /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

`nginx -t` "syntax is ok" demeli.

Güvenlik duvarı varsa portları açın:

```
ufw allow 80/tcp && ufw allow 443/tcp
```

---

## Adım 8 — DNS

Alan adını sunucuya yönlendirin.

⚠️ **MX ve TXT kayıtlarına dokunmayın** — `@dogrularseramik.com` e-postaları onlara bağlı,
silinirse gelen mailler kaybolur.

| Tip | Ad | Değer |
|---|---|---|
| A | `@` | SUNUCU_IP |
| A | `www` | SUNUCU_IP |

Bu değişiklik Namecheap alan adı panelinden veya cPanel → Zone Editor'den yapılır;
sunucuya root erişimi bunun için **yeterli değildir**.

Yayılmayı bekleyin (10 dk – 2 saat), sonra kontrol edin:

```
dig +short www.dogrularseramik.com
```

Sunucunun IP'sini döndürmeli.

---

## Adım 9 — SSL sertifikası

DNS yayıldıktan **sonra** çalıştırın, öncesinde başarısız olur:

```
apt install -y certbot python3-certbot-nginx
certbot --nginx -d dogrularseramik.com -d www.dogrularseramik.com
```

Certbot 443 bloğunu ve HTTP→HTTPS yönlendirmesini otomatik ekler.
Sertifika 90 günlük, kendini yeniler. Kontrol:

```
certbot renew --dry-run
```

---

## Güncelleme (kurulumdan sonra)

Yerel bilgisayarınızda tek komut yeter:

```
git push sunucu main
```

Kanca devreye girer, sunucu kendi kendine `npm ci` + `npm run build` +
`pm2 reload` yapar. `pm2 reload` siteyi kesintiye uğratmadan yeniler.

Çıktıyı canlı olarak terminalinizde görürsünüz — hata olursa orada belli olur.

---

## Sorun giderme

| Belirti | Bakılacak yer |
|---|---|
| Site açılmıyor | `pm2 logs dogrular-seramik --lines 50` |
| 502 Bad Gateway | Node çalışmıyor → `pm2 status`, sonra `curl -I http://127.0.0.1:3001` |
| Görseller gelmiyor | nginx `root` yolu → `/var/www/dogrular-seramik/public` var mı? |
| Form mail atmıyor | `.env.production` var mı, `chmod 600` mu, `pm2 reload` yapıldı mı? |
| Derleme çöküyor | RAM yetersiz → Adım 5'teki takas alanı |
| SSL alınamıyor | DNS henüz yayılmamış → `dig +short www.dogrularseramik.com` |
| `git push` reddedildi | Sunucudaki depo yolu yanlış → `git remote -v` ile kontrol edin |
| Kanca çalışmıyor | `chmod +x` unutulmuş olabilir → `ls -l /var/git/dogrular-seramik.git/hooks/post-receive` |
