<?php
/**
 * Doğrular Seramik — form gönderim uç noktası
 *
 * Site statik HTML olarak yayınlandığı için Node.js API rotası çalışmıyor.
 * Bu betik onun yerini alır: iki formun da verisini alır, doğrular ve
 * hosting'in kendi mail sunucusundan e-posta gönderir.
 *
 * Kullanan formlar:
 *   - components/forms/SampleRequestForm.tsx  (tip: "ornek")
 *   - components/forms/ContactForm.tsx        (tip: "iletisim")
 *
 * Dış servis, üyelik veya aylık gönderim limiti yok.
 */

declare(strict_types=1);

// ── Ayarlar ──────────────────────────────────────────────────────────
const ALICI          = 'dogrularseramikk@gmail.com';
const GONDEREN_ADRES = 'web@dogrularseramik.com';  // SPF uyumu için alan adı üzerinde olmalı
const GONDEREN_ISIM  = 'Doğrular Seramik Web';
const SITE_ADRESI    = 'https://www.dogrularseramik.com';

header('Content-Type: application/json; charset=utf-8');

// Yalnızca kendi sitemizden gelen istekleri kabul et.
header('Access-Control-Allow-Origin: ' . SITE_ADRESI);

function hata(string $mesaj, int $kod = 400)
{
    http_response_code($kod);
    echo json_encode(['error' => $mesaj], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    hata('Yalnızca POST kabul edilir.', 405);
}

// ── Girdiyi oku ──────────────────────────────────────────────────────
// Formlar JSON gönderiyor; klasik form gönderimi de desteklensin diye
// ikisini de kabul ediyoruz.
$ham = file_get_contents('php://input');
$veri = json_decode($ham ?: '', true);
if (!is_array($veri)) {
    $veri = $_POST;
}

function alan(array $veri, string $ad): string
{
    $d = $veri[$ad] ?? '';
    return is_string($d) ? trim($d) : '';
}

// ── Bot tuzağı ───────────────────────────────────────────────────────
// Formlarda gizli bir alan var; insan doldurmaz, bot doldurur.
// Botu uyarmamak için başarılı yanıt döneriz ama mail göndermeyiz.
if (alan($veri, 'website') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$tip = alan($veri, 'tip') !== '' ? alan($veri, 'tip') : 'ornek';

// ── Basit hız sınırı ─────────────────────────────────────────────────
// Aynı IP'den 60 saniye içinde ikinci gönderimi reddet.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'bilinmiyor';
$kilit = sys_get_temp_dir() . '/ds-form-' . md5($ip);
if (is_file($kilit) && (time() - filemtime($kilit)) < 60) {
    hata('Çok sık gönderim yaptınız. Lütfen bir dakika bekleyin.', 429);
}

// ── Doğrulama ────────────────────────────────────────────────────────
$ad    = alan($veri, 'name');
$eposta = alan($veri, 'email');

if ($ad === '' || $eposta === '') {
    hata('Zorunlu alanlar eksik.');
}
if (!filter_var($eposta, FILTER_VALIDATE_EMAIL)) {
    hata('Geçerli bir e-posta adresi girin.');
}
if (mb_strlen($ad) > 120 || mb_strlen($eposta) > 160) {
    hata('Gönderdiğiniz bilgiler fazla uzun.');
}

$MESLEKLER = [
    'mimar'     => 'Mimar',
    'ic-mimar'  => 'İç Mimar / Tasarımcı',
    'musteri'   => 'Bireysel Müşteri',
    'yuklenici' => 'Yüklenici / Müteahhit',
    'diger'     => 'Diğer',
];

$KONULAR = [
    'koleksiyon' => 'Koleksiyon bilgisi',
    'ornek'      => 'Örnek talebi',
    'teknik'     => 'Teknik bilgi',
    'diger'      => 'Diğer',
];

if ($tip === 'iletisim') {
    $konu    = alan($veri, 'subject');
    $mesaj   = alan($veri, 'message');
    if ($konu === '' || $mesaj === '') {
        hata('Zorunlu alanlar eksik.');
    }
    $baslik = 'İletişim Formu — ' . $ad;
    $ustBaslik = 'Yeni İletişim Mesajı';
    $satirlar = [
        'Ad Soyad'      => $ad,
        'E-posta'       => $eposta,
        'Şirket / Firma' => alan($veri, 'company'),
        'Konu'          => $KONULAR[$konu] ?? $konu,
        'Mesaj'         => $mesaj,
    ];
} else {
    $meslek     = alan($veri, 'role');
    $koleksiyon = alan($veri, 'collection');
    $adres      = alan($veri, 'address');
    if ($meslek === '' || $koleksiyon === '' || $adres === '') {
        hata('Zorunlu alanlar eksik.');
    }
    $baslik = 'Örnek Talebi — ' . $ad;
    $ustBaslik = 'Yeni Örnek Talebi';
    $satirlar = [
        'Ad Soyad'         => $ad,
        'E-posta'          => $eposta,
        'Telefon'          => alan($veri, 'phone'),
        'Meslek'           => $MESLEKLER[$meslek] ?? $meslek,
        'Koleksiyon'       => $koleksiyon,
        'Teslimat Adresi'  => $adres,
        'Notlar'           => alan($veri, 'notes'),
    ];
}

// ── E-posta gövdesi ──────────────────────────────────────────────────
// Tüm değerler htmlspecialchars ile kaçırılır — ziyaretçinin girdiği
// metin e-postanın HTML'ine karışamaz.
function guvenli(string $d): string
{
    return htmlspecialchars($d, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$govde = '';
$sonAnahtar = array_key_last(array_filter($satirlar, fn($d) => $d !== ''));

foreach ($satirlar as $etiket => $deger) {
    if ($deger === '') {
        continue;  // boş isteğe bağlı alanları gösterme
    }
    $kenar = $etiket === $sonAnahtar ? '' : 'border-bottom:1px solid #f0f0f0';
    $icerik = guvenli($deger);

    if ($etiket === 'E-posta') {
        $icerik = '<a href="mailto:' . guvenli($deger) . '" style="color:#2563eb;text-decoration:none">' . $icerik . '</a>';
    } elseif ($etiket === 'Telefon') {
        $icerik = '<a href="tel:' . guvenli($deger) . '" style="color:#2563eb;text-decoration:none">' . $icerik . '</a>';
    }

    $govde .= '
      <tr>
        <td style="padding:16px 0;' . $kenar . '">
          <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">' . guvenli($etiket) . '</p>
          <p style="margin:0;font-size:15px;color:#0a0a0a;white-space:pre-line">' . $icerik . '</p>
        </td>
      </tr>';
}

$html = '<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7">
        <tr>
          <td style="background:#0a0a0a;padding:28px 32px">
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:600;letter-spacing:-0.02em">Doğrular Seramik</p>
            <p style="margin:4px 0 0;color:#71717a;font-size:12px;letter-spacing:0.08em;text-transform:uppercase">' . guvenli($ustBaslik) . '</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="0" cellspacing="0">' . $govde . '</table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#fafafa;border-top:1px solid #f0f0f0">
            <p style="margin:0;font-size:11px;color:#a1a1aa">dogrularseramik.com — Web Formu</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>';

// ── Gönder ───────────────────────────────────────────────────────────
// Başlık enjeksiyonuna karşı satır sonlarını temizle.
$yanitAdresi = preg_replace('/[\r\n]+/', '', $eposta);
$konuSatiri  = preg_replace('/[\r\n]+/', ' ', $baslik);

$basliklar = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: =?UTF-8?B?' . base64_encode(GONDEREN_ISIM) . '?= <' . GONDEREN_ADRES . '>',
    'Reply-To: ' . $yanitAdresi,
    'X-Mailer: PHP/' . phpversion(),
]);

$konuKodlu = '=?UTF-8?B?' . base64_encode($konuSatiri) . '?=';

$gonderildi = mail(ALICI, $konuKodlu, $html, $basliklar, '-f' . GONDEREN_ADRES);

if (!$gonderildi) {
    error_log('[form-gonder] mail() basarisiz — tip: ' . $tip);
    hata('Mail gönderilemedi. Lütfen telefonla ulaşın.', 500);
}

touch($kilit);  // hız sınırı zamanlayıcısını başlat

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
