/**
 * Etili Seramik katalog görsellerini serilere uygun WebP formatında kopyalar.
 * Kaynak: D:/Claude-skil/dogrular-seramik/Koleksiyon/Etili Seramik Katalog Mobil_251229_195011
 * Hedef:  public/images/koleksiyon/
 *
 * node scripts/import-katalog-images.mjs
 */
import sharp from 'sharp'
import { join } from 'path'
import { mkdir } from 'fs/promises'

const SRC  = 'D:/Claude-skil/dogrular-seramik/Koleksiyon/Etili Seramik Katalog Mobil_251229_195011'
const DEST = 'D:/Claude-skil/dogrular-seramik/public/images/koleksiyon'

// [kaynak_dosya, hedef_webp]
const COPIES = [

  // ─── AHŞAP (Wood) ─────────────────────────────────────────────────────────
  ['15.jpg',    'ahsap-mese-acik.webp'],     // Meşe, Forest, Woodline — açık meşe tahta
  ['45.jpg',    'ahsap-mese-koyu.webp'],     // Sedir, Beldevere — koyu ceviz tahta
  ['25.jpg',    'ahsap-parke-koyu.webp'],    // Mersin, Parke — koyu parke desen
  ['35.jpg',    'ahsap-herringbone.webp'],   // Teras — balıksırtı desen
  ['1433.png',  'ahsap-chevron-acik.webp'],  // Panwall — açık chevron desen
  ['1580.png',  'ahsap-parke-acik.webp'],    // Burgaz — açık parke desen
  ['1300.jpg',  'ahsap-plank-kahve.webp'],   // Lapland, Meşe 7.5mm — kahve tahta tahta

  // ─── TEKSTİL ─────────────────────────────────────────────────────────────
  ['50.jpg',    'tekstil-keten.webp'],       // Keten — keten kumaş doku (bej/gri)

  // ─── BEYAZ VE SİYAH ──────────────────────────────────────────────────────
  ['700.jpg',   'bvs-beyaz.webp'],           // Leton, Malibu, Maydos, Nepal — beyaz mermer
  ['1416.png',  'bvs-gri-acik.webp'],        // Fortis, Nil, Gordion, Kartal — açık gri mermer
  ['623.jpg',   'bvs-gri.webp'],             // Milet, Athena, Straton, Leodikya — gri mermer
  ['180.jpg',   'bvs-siyah.webp'],           // Napoli, Nevada, Nova — siyah mermer

  // ─── MERMER ───────────────────────────────────────────────────────────────
  ['200.png',   'mermer-beyaz.webp'],        // Plain, Serenity, Paonazzo, Calacatta — beyaz calacatta
  ['882.png',   'mermer-bej.webp'],          // Armada, Hazar, Royal, Marbella, Mezo, Mumbai — bej mermer
  ['1429.png',  'mermer-krem.webp'],         // Toros, Finike, Demre, Simena — krem/traverten
  ['1479.jpg',  'mermer-traverten.webp'],    // Travertine, Tinda — krem traverten
  ['951.jpg',   'mermer-kahve.webp'],        // Emperador, Himalaya, Sava — kahve/kırmızı damar
  ['1051.jpg',  'mermer-nero.webp'],         // Dover Wenge, Atlantis antrasit — siyah altın damar
  ['1101.png',  'mermer-mavi.webp'],         // Karya — mavi mermer
  ['1505.jpg',  'mermer-yesil.webp'],        // Gediz yeşil, Meridyen yeşil — yeşil mermer/oniks
  ['2097.jpg',  'mermer-warm.webp'],         // Olimpos, Sevilla, Alanya — ılık bej mermer
  ['1416.png',  'mermer-gri.webp'],          // Nox, Perge, Sardes, Eternal — gri mermer

  // ─── TAŞ ──────────────────────────────────────────────────────────────────
  ['836.png',   'tas-antrasit.webp'],        // StoneBlast antrasit, Troya, Agrea — koyu antrasit taş
  ['400.jpg',   'tas-gri.webp'],             // Milas, Atmos, Naya, Granit, Karalps — gri taş
  ['55.png',    'tas-bej.webp'],             // Gravel, Pebble, Sand, Petra bej — bej taş
  ['2.jpg',     'tas-oxide.webp'],           // Oxide turkuaz/teal — oksitli metalik yüzey
  ['1527.jpg',  'tas-panel.webp'],           // Patara, Boston, Sorgun — taş panel/ledger
  ['800.jpg',   'tas-terrazzo.webp'],        // Terazzo, Çakıl Taşı — terrazzo desen

  // ─── BETON ────────────────────────────────────────────────────────────────
  ['1380.jpg',  'beton-bej.webp'],           // Cementino açık, Kreastone, Town, Horizon bej
  ['1900.jpg',  'beton-gri.webp'],           // Cerastone, Horizon gri, Molde — gri beton
  ['1000.png',  'beton-koyu.webp'],          // Cerastone koyu, Tokio antrasit — koyu beton

  // ─── ONYX ─────────────────────────────────────────────────────────────────
  ['500.jpg',   'onyx-krem.webp'],           // Onix bej, Onice bej — krem/bej oniks
  ['1101.png',  'onyx-mavi.webp'],           // Onice gri (mavi tonlu) — mavi oniks
  ['1505.jpg',  'onyx-yesil.webp'],          // Paradise yeşil — zümrüt yeşil oniks
  ['1500.jpg',  'onyx-turkuaz.webp'],        // Florida turkuaz — turkuaz oniks
  ['200.png',   'onyx-beyaz.webp'],          // Onice Moon beyaz — beyaz oniks

  // ─── DEKOR ────────────────────────────────────────────────────────────────
  ['2373.jpg',  'dekor-mozaik-daire.webp'],  // Scintilla, Apollon — daire mozaik desen
  ['1329.jpg',  'dekor-yaprak.webp'],        // Darwin, Eagle, Mansa, Musana — yaprak/doğa desen
  ['2325.jpg',  'dekor-cicek-mavi.webp'],    // Brianna, Durham, Venice — mavi çiçek desen
  ['2479.jpg',  'dekor-mermer-mozaik.webp'], // Dove Verona, Chateau — mermer kare mozaik
  ['2031.jpg',  'dekor-karisik.webp'],       // Carlingford, Milan, Firenze, Ledbury, Milton — karışık desen
  ['811.png',   'dekor-lacivert.webp'],      // Bursa lacivert — lacivert mozaik karo
  ['2300.jpg',  'dekor-cicek-beyaz.webp'],   // Banyeres, Barcelona, Dorset — açık çiçek desen
  ['2325.jpg',  'dekor-siena.webp'],         // Siena, Verona, Washington, Kappadokya — soyut taş desen

  // ─── HAVUZ ────────────────────────────────────────────────────────────────
  ['1516.jpg',  'havuz-mavi.webp'],          // Salda, Ducapool — mavi havuz dalgası
  ['1500.jpg',  'havuz-turkuaz.webp'],       // Ocean — turkuaz havuz taşı

  // ─── DÜZ RENKLER ──────────────────────────────────────────────────────────
  ['2342.png',  'duz-gri.webp'],             // Pergamon gri, Style Flat gri, Kayrak gri — açık gri düz
  ['2340.png',  'duz-koyu.webp'],            // Style Flat antrasit, Kayrak siyah — koyu gri düz
  ['55.png',    'duz-bej.webp'],             // Pergamon bej, Saten, Alaska, Sahra — bej düz
]

await mkdir(DEST, { recursive: true })

let ok = 0
let fail = 0
for (const [src, dest] of COPIES) {
  try {
    await sharp(join(SRC, src)).webp({ quality: 85 }).toFile(join(DEST, dest))
    console.log(`✓ ${dest}`)
    ok++
  } catch (e) {
    console.error(`✗ ${dest}  ← ${src}: ${e.message}`)
    fail++
  }
}
console.log(`\n${ok} başarılı / ${fail} hata → ${DEST}`)
