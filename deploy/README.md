# Sunucuya Kurulum — Doğrular Seramik

VPS üzerinde Next.js 15 + pm2 + nginx ile yayın.
Kaynak: GitHub deposu. Sunucu kodu `git pull` ile günceller; dosya kopyalamak (scp) gerekmez.

---

## Sunucu gereksinimleri

| Gereksinim | Sürüm | Kontrol komutu |
|---|---|---|
| Node.js | 20 veya üzeri | `node -v` |
| npm | 10+ | `npm -v` |
| git | herhangi | `git --version` |
| pm2 | son sürüm | `pm2 -v` |
| nginx | herhangi | `nginx -v` |
| Boş disk | en az 3 GB | `df -h` |
| RAM | en az 2 GB (derleme için) | `free -h` |

Node 20+ şart — proje Next.js 15 kullanıyor.

---

## Adım 1 — Sunucuya bağlanın

```
ssh kullanici@SUNUCU_IP
```

Eksik araçları kurun (Ubuntu/Debian):

```
sudo apt update
sudo apt install -y git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

---

## Adım 2 — Kodu çekin

```
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone https://github.com/KULLANICI/dogrular-seramik.git
cd dogrular-seramik
```

Depo özel (private) ise git kullanıcı adı + **personal access token** ister.
Token: GitHub → Settings → Developer settings → Personal access tokens → Fine-grained →
sadece bu depoya `Contents: Read` yetkisi.

---

## Adım 3 — Gmail bilgilerini girin

Örnek İste formunun mail gönderebilmesi için gerekli. Bu dosya git'e **gitmez**.

```
nano /var/www/dogrular-seramik/.env.production
```

İçine yazılacak (değerleri kendi bilgilerinizle değiştirin):

```
GMAIL_USER=ornek@gmail.com
GMAIL_APP_PASSWORD=uygulamasifresi
```

Kaydedip izinleri kısıtlayın — şifre içeriyor:

```
chmod 600 /var/www/dogrular-seramik/.env.production
```

---

## Adım 4 — Kurun ve derleyin

```
cd /var/www/dogrular-seramik
npm ci
npm run build
```

`npm run build` 2-5 dakika sürer, 209 sayfa üretir.
Sunucunun RAM'i 2 GB'ın altındaysa derleme çökebilir — o durumda geçici takas alanı açın:

```
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
```

---

## Adım 5 — pm2 ile çalıştırın

```
sudo mkdir -p /var/log/pm2 && sudo chown -R $USER:$USER /var/log/pm2
cd /var/www/dogrular-seramik
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

`pm2 startup` size bir `sudo env ...` komutu yazdırır — onu kopyalayıp çalıştırın.
Sunucu yeniden başladığında site otomatik ayağa kalkar.

Çalıştığını doğrulayın:

```
pm2 status
curl -I http://127.0.0.1:3001
```

`HTTP/1.1 200 OK` görmelisiniz.

---

## Adım 6 — nginx

```
sudo cp /var/www/dogrular-seramik/deploy/nginx.conf /etc/nginx/sites-available/dogrularseramik
sudo ln -s /etc/nginx/sites-available/dogrularseramik /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` "syntax is ok" demeli. Hata verirse dosya yolunu kontrol edin.

---

## Adım 7 — DNS

Alan adını sunucuya yönlendirin. **MX kayıtlarına dokunmayın** — e-posta onlara bağlı.

| Tip | Ad | Değer |
|---|---|---|
| A | `@` | SUNUCU_IP |
| A | `www` | SUNUCU_IP |

Yayılmasını bekleyin (10 dk – 2 saat), sonra kontrol edin:

```
dig +short www.dogrularseramik.com
```

Sunucunun IP'sini döndürmeli.

---

## Adım 8 — SSL sertifikası

DNS yayıldıktan **sonra** çalıştırın, öncesinde başarısız olur:

```
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d dogrularseramik.com -d www.dogrularseramik.com
```

Certbot 443 bloğunu ve HTTP→HTTPS yönlendirmesini otomatik ekler.
Sertifika 90 günlük ve kendini yeniler; kontrol:

```
sudo certbot renew --dry-run
```

---

## Güncelleme (her kod değişikliğinde)

```
cd /var/www/dogrular-seramik
git pull
npm ci
npm run build
pm2 reload dogrular-seramik
```

`pm2 reload` siteyi kesintiye uğratmadan yeniden başlatır.

---

## Sorun giderme

| Belirti | Bakılacak yer |
|---|---|
| Site açılmıyor | `pm2 logs dogrular-seramik --lines 50` |
| 502 Bad Gateway | Node çalışmıyor → `pm2 status`, sonra `curl -I http://127.0.0.1:3001` |
| Görseller gelmiyor | nginx `root` yolu yanlış → `/var/www/dogrular-seramik/public` var mı? |
| Form mail atmıyor | `.env.production` var mı, `chmod 600` mu, pm2 yeniden başlatıldı mı? |
| Derleme çöküyor | RAM yetersiz → Adım 4'teki takas alanı |
| SSL alınamıyor | DNS henüz yayılmamış → `dig +short www.dogrularseramik.com` |
