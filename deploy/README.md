# Yayına Alma — Doğrular Seramik

Site **statik HTML** olarak üretilir ve Hostinger paylaşımlı hostinge yüklenir.
Sunucuda Node.js süreci çalışmaz; LiteSpeed dosyaları doğrudan servis eder.

**Sunucu bilgileri**

| | |
|---|---|
| SSH | `ssh -p 65002 u343309152@46.17.175.226` |
| Site klasörü | `~/domains/dogrularseramik.com/public_html` |
| Panel | https://hpanel.hostinger.com |

Formların mail gönderimi `form-gonder.php` ile yapılır — Node API rotası bu
modda çalışmayacağı için kaldırıldı. Dış servis veya üyelik gerekmez.

---

## Adım 1 — Derleyin (yerel bilgisayarda)

```
cd "D:/Claude-skil/dogrular-seramik"
npm run build
```

`out/` klasörü oluşur: 208 sayfa, ~286 MB.
İçinde `.htaccess` ve `form-gonder.php` de bulunur — ikisi de `public/`
klasöründen otomatik kopyalanır.

---

## Adım 2 — Tek paket hâline getirin

286 MB'ı dosya dosya yüklemek çok yavaş olur; tek arşiv olarak gönderin.

```
cd "D:/Claude-skil/dogrular-seramik/out"
tar -czf ../site.tar.gz .
```

---

## Adım 3 — Sunucuya yükleyin

```
cd "D:/Claude-skil/dogrular-seramik"
scp -P 65002 site.tar.gz u343309152@46.17.175.226:~/
```

Bağlantı hızınıza göre birkaç dakika sürer.

---

## Adım 4 — Sunucuda açın

```
ssh -p 65002 u343309152@46.17.175.226
```

Önce mevcut içeriği kontrol edin — yanlış klasörü boşaltmayalım:

```
ls -la ~/domains/dogrularseramik.com/public_html/
```

İçinde yalnızca Hostinger'ın varsayılan dosyaları (`default.php`,
`index.html` gibi) varsa temizleyip yeni siteyi açın:

```
cd ~/domains/dogrularseramik.com/public_html
rm -rf ./* ./.htaccess
tar -xzf ~/site.tar.gz -C .
rm ~/site.tar.gz
ls -la | head
```

`.htaccess`, `index.html`, `form-gonder.php`, `_next/`, `images/` görmelisiniz.

---

## Adım 5 — DNS'i Hostinger'a yönlendirin

⚠️ Alan adı şu an **Namecheap'i** (`162.0.235.154`) gösteriyor, Hostinger'ı değil.

⚠️ **MX ve TXT kayıtlarına dokunmayın** — `@dogrularseramik.com` e-postaları
Namecheap'te (`mx1-hosting.jellyfish.systems`). Silinirse gelen mailler kaybolur.

Namecheap panelinden veya cPanel → Zone Editor'den:

| Tip | Ad | Yeni değer |
|---|---|---|
| A | `@` | `46.17.175.226` |
| A | `www` | `46.17.175.226` |

Yayılmayı bekleyin (10 dk – 2 saat), sonra kontrol edin:

```
dig +short www.dogrularseramik.com
```

`46.17.175.226` dönmeli.

---

## Adım 6 — SSL

DNS yayıldıktan sonra hPanel → **Güvenlik** → **SSL** → alan adını seçip
**Kur**. Hostinger ücretsiz Let's Encrypt sertifikası verir, birkaç dakikada
aktifleşir.

`.htaccess` zaten HTTP→HTTPS ve www'suz→www yönlendirmesi yapıyor; sertifika
kurulmadan önce bu yönlendirme hataya yol açacağı için **SSL'i DNS'ten hemen
sonra kurun**.

---

## Adım 7 — E-posta gönderimini doğrulayın

Site açıldıktan sonra `/ornek-iste/` ve `/iletisim/` formlarını gerçek veriyle
deneyin. Mail `dogrularseramikk@gmail.com` adresine düşmeli.

Mail gelmiyor veya spam'e düşüyorsa SPF kaydı eksik olabilir. Alan adının TXT
kaydına Hostinger'ın sunucularını ekleyin:

```
v=spf1 include:_spf.mail.hostinger.com include:spf.privateemail.com ~all
```

(`spf.privateemail.com` Namecheap'in mail sunucusu — mevcut e-posta gönderimi
bozulmasın diye o da listede kalmalı.)

---

## Güncelleme (sonraki değişikliklerde)

Adım 1-4'ü tekrarlayın. Kısaca:

```
npm run build
cd out && tar -czf ../site.tar.gz . && cd ..
scp -P 65002 site.tar.gz u343309152@46.17.175.226:~/
ssh -p 65002 u343309152@46.17.175.226 "cd ~/domains/dogrularseramik.com/public_html && rm -rf ./* ./.htaccess && tar -xzf ~/site.tar.gz -C . && rm ~/site.tar.gz"
```

---

## Sorun giderme

| Belirti | Sebep / çözüm |
|---|---|
| Sayfalar 404 | `.htaccess` yüklenmemiş olabilir (gizli dosya) → `ls -la` ile kontrol edin |
| Sonsuz yönlendirme döngüsü | SSL henüz kurulmamış → hPanel'den SSL kurun |
| Görseller gelmiyor | Arşiv eksik açılmış → `du -sh public_html` ~286 MB olmalı |
| Form "Mail gönderilemedi" | PHP `mail()` kapalı olabilir → hPanel → PHP Yapılandırma |
| Form mailleri spam'e düşüyor | SPF kaydı eksik → Adım 7 |
| Alan adı hâlâ eski siteyi gösteriyor | DNS yayılmamış → `dig +short www.dogrularseramik.com` |

---

## Not: VPS'e geçilirse

`ecosystem.config.js` ve `deploy/nginx.conf` dosyaları bir VPS kurulumu için
hazırlanmıştı ve projede duruyor. VPS'e geçilirse `next.config.ts` içindeki
`output: 'export'` satırı kaldırılır, `form-gonder.php` yerine Node tabanlı
mail rotası geri getirilir. Şu anki paylaşımlı hosting için bu dosyalar
kullanılmıyor.
