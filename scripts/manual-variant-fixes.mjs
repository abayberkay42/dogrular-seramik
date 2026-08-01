/**
 * Manuel variant image atamaları
 *
 * Otomatik eşleştirmenin başaramadığı durumlar için:
 *   - Farklı renk isimlendirmesi (Silense→Silence, Gri→Graphite, v.b.)
 *   - Kataloğun websitesinde olmayan boyutları → mevcut en yakın görsel
 *   - Özel koleksiyon isimleri (Ma, Blast, v.b.)
 *
 * Çalıştırma sırası: update-variant-images-v2.mjs → manual-variant-fixes.mjs
 */
import { readFileSync, writeFileSync } from 'fs'

const TS_FILE = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'

// ── Manuel eşleştirme tablosu ─────────────────────────────────────────────────
// Anahtar: 'seri-slug::boyut::renk'
// Değer: /images/varyant/... yolu
const OVERRIDES = {
  // ── Atmos ──────────────────────────────────────────────────────────────────
  // Map'te beyaz/bone/graphite/silver var; katalog Bej/Gri/Stone/Antrasit kullanıyor
  'atmos::60×120::Bej/Beige':          '/images/varyant/atmos-bone-60x120-mat-9mm.webp',
  'atmos::60×120::Gri/Grey':           '/images/varyant/atmos-graphite-60x120-mat-9mm.webp',
  'atmos::60×120::Stone':              '/images/varyant/atmos-bone-60x120-mat-9mm.webp',
  'atmos::60×120::Antrasit/Anthracite':'/images/varyant/atmos-graphite-60x120-mat-9mm.webp',
  // 60×130 boyutu map'te yok; 60×120 görselini kullan (renk gösterimi için yeterli)
  'atmos::60×130::Bej/Beige':          '/images/varyant/atmos-bone-60x120-mat-9mm.webp',

  // ── Best ───────────────────────────────────────────────────────────────────
  // Katalog: Silense=Silence(web), Whole=Whale(web), Ma=koleksiyon kodu
  'best::60×120::Silense Whole':       '/images/varyant/best-silence-whale-60x120-mat-9mm.webp',
  'best::60×120::Silense Pure':        '/images/varyant/best-silence-pure-60x120-mat-9mm.webp',
  'best::60×120::Silense Bone':        '/images/varyant/best-silence-bone-60x120-mat-9mm.webp',
  'best::60×120::Ivory':               '/images/varyant/best-silence-krem-60x120-mat-9mm.webp',
  'best::60×120::Tanned':              '/images/varyant/best-silence-tarmac-60x120-mat-9mm.webp',
  'best::60×120::Ma Ivory':            '/images/varyant/best-ceppo-krem-60x120-mat-9mm.webp',
  'best::60×120::Ma Tanned':           '/images/varyant/best-ceppo-tarmac-60x120-mat-9mm.webp',
  'best::60×120::Greige':              '/images/varyant/best-stone-krem-60x120-mat-9mm.webp',
  'best::60×120::Bone Cream':          '/images/varyant/best-ceppo-bone-60x120-mat-9mm.webp',

  // ── Sevilla ────────────────────────────────────────────────────────────────
  // Map'te graphite/bone/kahve/silver var; katalog Gri/Bej/Beyaz kullanıyor
  'sevilla::60×120::Gri/Grey':         '/images/varyant/sevilla-graphite-60x120-mat-9mm.webp',

  // ── Paradise ───────────────────────────────────────────────────────────────
  // 60×60 — "Amazon Max" ve "Amazon Silver" amazon-mavi'yi paylaşır (eşit skor, ikisi korunur)
  // "Middle Mexi/Turkuaz" ve "Turkuaz/Turquoise" fix-script tarafından kaldırılır (skor 0)
  'paradise::60×60::Amazon Max':         '/images/varyant/paradise-amazon-mavi-60x60-mat-9mm.webp',
  'paradise::60×60::Salmon Rose':        '/images/varyant/paradise-rose-onyx-60x60-mat-9mm.webp',
  'paradise::60×60::Amazon Silver':      '/images/varyant/paradise-amazon-mavi-60x60-mat-9mm.webp',
  // 60×120
  'paradise::60×120::Middle Mexi/Turkuaz':'/images/varyant/paradise-amazon-mavi-60x120-mat-9mm.webp',

  // ── Molde ──────────────────────────────────────────────────────────────────
  // 30×60/45×65/60×65 boyutları map'te yok; renk eşdeğeri için en yakın boyutu kullan
  'molde::30×60::Açık Gri/Light Grey':  '/images/varyant/molde-acik-gri-30x90-mat-9mm.webp',
  'molde::30×60::Koyu Gri/Dark Grey':   '/images/varyant/molde-koyu-gri-30x90-mat-9mm.webp',
  'molde::30×60::Antrasit/Anthracite':  '/images/varyant/molde-antrasit-60x60-mat-9mm.webp',
  'molde::45×65::Açık Gri/Light Grey':  '/images/varyant/molde-acik-gri-60x60-mat-9mm.webp',
  'molde::60×65::Açık Gri/Light Grey':  '/images/varyant/molde-acik-gri-60x60-mat-9mm.webp',

  // ── Cemento ────────────────────────────────────────────────────────────────
  // 45×60 boyutu map'te yok; 30×60 görsellerini kullan (renk gösterimi için)
  'cemento::45×60::Blast Beyaz/White':      '/images/varyant/cemento-rustik-beyaz-30x60-mat-75mm.webp',
  'cemento::45×60::Blast Koyugri/Dark Grey':'/images/varyant/cemento-rustik-koyu-gri-30x60-mat-75mm.webp',
  'cemento::45×60::Blast Greige':           '/images/varyant/cemento-rustik-gri-30x60-mat-75mm.webp',

  // ── Scintilla ──────────────────────────────────────────────────────────────
  // Pre-Cut boyutları (45×35) map'te yok; 45×45 görselini kullan
  'scintilla::45×35::Midnight Pre-Cut':'/images/varyant/scintilla-midnight-mavi-45x45-mat-85mm.webp',

  // ── Boston ─────────────────────────────────────────────────────────────────
  // 6×90 boyutu map'te yok (map'te 30×90 var); renk gösterimi için kullan
  // Not: "Gri/Grey" fix-script tarafından kaldırılır (Açık Gri ile çakışır)
  'boston::6×90::Açık Gri/Light Grey': '/images/varyant/boston-acik-gri-30x90-mat-9mm.webp',
  'boston::6×90::Antrasit/Anthracite': '/images/varyant/boston-antrasit-30x90-mat-9mm.webp',

  // ── Atlantis ───────────────────────────────────────────────────────────────
  // 60×80 boyutu map'te yok; 60×60 görselini kullan
  'atlantis::60×80::Gri/Grey':          '/images/varyant/atlantis-gri-60x60-full-lappato-9mm.webp',
  'atlantis::60×80::Kahve/Brown':       '/images/varyant/atlantis-kahve-60x60-full-lappato-9mm.webp',
  'atlantis::60×80::Antrasit/Anthracite':'/images/varyant/atlantis-antrasit-60x60-full-lappato-9mm.webp',

  // ── Cementino ──────────────────────────────────────────────────────────────
  // "Açık Gri" zaten eşleşti; "Gri/Grey" için graphite kullan (orta-koyu gri)
  'cementino::60×60::Gri/Grey':          '/images/varyant/cementino-graphite-60x60-mat-9mm.webp',
  // Antrasit için blast-graphite (60×120) → en koyu mevcut seçenek
  'cementino::60×60::Antrasit/Anthracite':'/images/varyant/cementino-blast-graphite-60x120-blast-9mm.webp',
  // İnci/Pearl → bone (krem/inci benzer tonlar)
  'cementino::60×60::İnci/Pearl':        '/images/varyant/cementino-bone-60x60-mat-9mm.webp',
  'cementino::60×120::İnci/Pearl':       '/images/varyant/cementino-bone-60x120-mat-9mm.webp',
  // 30×90 Blast Antrasit — fix-script Blast Koyu Gri ile çakışma tespit ettiğinden
  // bu satır kaldırıldı; fallback (seri ana görseli) kullanılır

  // ── Cerastone ──────────────────────────────────────────────────────────────
  // 60×60 "Gri/Grey" → gri 60×120 görselini kullan (60×60'ta plain gri yok)
  'cerastone::60×60::Gri/Grey':         '/images/varyant/cerastone-gri-60x120-mat-9mm.webp',
  // 60×60 "Light Grey" → bone (mevcut en açık seçenek)
  'cerastone::60×60::Light Grey':        '/images/varyant/cerastone-bone-60x60-mat-9mm.webp',
  // 60×120 "Taş/Stone" — fix-script Gri/Grey ile çakışma tespit ettiğinden fallback kullanılır

  // ── Marbella ───────────────────────────────────────────────────────────────
  // "Bej/Beige" → bone (mevcut en yakın krem ton)
  'marbella::60×120::Bej/Beige':         '/images/varyant/marbella-bone-60x120-mat-9mm.webp',
}

// ── TS dosyasını satır satır işle ────────────────────────────────────────────

function seriSlug(isim) {
  return isim.toLowerCase()
    .replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g')
    .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ü/g,'u')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

const src = readFileSync(TS_FILE, 'utf8')
const lines = src.split('\n')
const result = []

let currentSlug = null
let addedCount  = 0
let skippedCount = 0  // zaten image var

for (const line of lines) {
  // Seri isim satırı
  const sM = line.match(/^        isim: '([^']+)',/)
  if (sM) { currentSlug = seriSlug(sM[1]) }

  // Varyant satırı — sadece image alanı olmayanlar
  if (currentSlug && !line.includes('image:')) {
    const vm = line.match(/^(          \{ boyut: '([^']+)', renk: '([^']+)'(, sayfa: '[^']+')? \}),?$/)
    if (vm) {
      const [, , boyut, renk] = vm
      const key = `${currentSlug}::${boyut}::${renk}`
      const override = OVERRIDES[key]
      if (override) {
        const comma = line.trimEnd().endsWith(',') ? ',' : ''
        result.push(line.replace(/( \}),?$/, `, image: '${override}' }${comma}`))
        console.log(`✓ ${key} → ${override.split('/').pop()}`)
        addedCount++
        continue
      }
    }
  }

  result.push(line)
}

writeFileSync(TS_FILE, result.join('\n'), 'utf8')
console.log(`\nEklenen override: ${addedCount}`)
