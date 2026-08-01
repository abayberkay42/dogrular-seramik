/**
 * Katalog PNG'lerini public/images/koleksiyon/ klasörüne WebP olarak kopyalar.
 * node scripts/copy-katalog-images.mjs
 */
import sharp from 'sharp'
import { join } from 'path'
import { mkdir } from 'fs/promises'

const SRC  = 'D:/Claude-skil/dogrular-seramik/Koleksiyon'
const DEST = 'D:/Claude-skil/dogrular-seramik/public/images/koleksiyon'

// [kaynak_dosya, hedef_webp]
const COPIES = [
  // ─── Ahşap ────────────────────────────────────────────────────────────
  ['msedge_n2biBdtESX.png', 'ahsap-p1.webp'], // Meşe9mm, Panwall, Sedir, Woodline, Meşe7.5mm
  ['msedge_yf36MtK0B3.png', 'ahsap-p2.webp'], // Burgaz, Mersin, Parke, Beldevere, Forest, Teras, Lapland

  // ─── Beyaz ve Siyah ───────────────────────────────────────────────────
  ['msedge_5rQR2WNpbJ.png', 'bvs-p1.webp'],   // Assos, Athena, Ayazma, Calacatta, Marmo, Milet, Nepal, River, Nova
  ['msedge_7jx1AV0jHE.png', 'bvs-p2.webp'],   // Napoli, Nevada, Nil, Straton, Gordion, Kartal, Leodikya
  ['msedge_RYYJKBgScm.png', 'bvs-p3.webp'],   // Leton, Malibu, Maydos, Fortis

  // ─── Mermer ───────────────────────────────────────────────────────────
  ['msedge_8vhkBhz1Y1.png', 'mermer-p1.webp'], // Armada, Gediz, Hatay, Zenith
  ['msedge_BL2uej5ipB.png', 'mermer-p2.webp'], // Ayazma(mermer), Hazar, Royal
  ['msedge_pTrMp2tt4c.png', 'mermer-p3.webp'], // Aspendos, Riva, Fortis7mm, Nox, Perge, Finike, Plain, Sava, Sardes
  ['msedge_q1LraeJXZv.png', 'mermer-p4.webp'], // Alanya, Atlantis, Bolu, Dover, Efes, Dalaman, Emperador, Eternal
  ['msedge_rb97hTrnEj.png', 'mermer-p5.webp'], // Himalaya, Karya, Marbella, Meridyen, Mezo, Mira, Mumbai, Olimpos, Serenity, Sevilla, Paonazzo
  ['msedge_SV3x4uMU75.png', 'mermer-p6.webp'], // Tinda9mm, Toros, Travertine, Vega
  ['msedge_vKAecQuLal.png', 'mermer-p7.webp'], // Spider, Meram, Sandmar
  ['msedge_vqygQdPfYB.png', 'mermer-p8.webp'], // Demre, Simena, Finike, Ayazma(detail)
  ['msedge_Ccq2uH68HS.png', 'mermer-p9.webp'], // Paros, Rodos, Datça (+ havuz)

  // ─── Taş ──────────────────────────────────────────────────────────────
  ['msedge_6joZAltJoJ.png', 'tas-p1.webp'],   // Milas, ÇakılTaşı, BelgiumStone, Granit, Karalps, Patara, Oxide, StoneBlast, Petra, Troya, Naya, Boston, Sorgun
  ['msedge_nrSy5C0bsU.png', 'tas-p2.webp'],   // Gravel, Pebble, Sand, Atmos, Agrea, Antares
  ['msedge_aU1xu1XS7n.png', 'tas-p3.webp'],   // Best(taş), Bluestone, Terazzo

  // ─── Beton ────────────────────────────────────────────────────────────
  ['msedge_z3UEbk7hTo.png', 'beton-p1.webp'],  // Best(beton), Cementino (detaylı)
  ['msedge_d4V4S7cGdq.png', 'beton-p2.webp'],  // Kreastone, Town, Heraklion, Cemento
  ['msedge_Ko1KZmSiEC.png', 'beton-p3.webp'],  // Cerastone, Horizon, Molde, Tokio

  // ─── Onyx ─────────────────────────────────────────────────────────────
  ['msedge_DUCrhMud7f.png', 'onyx-p1.webp'],   // Onix, Onice, OniceMoon, Florida, Paradise

  // ─── Dekor ────────────────────────────────────────────────────────────
  ['msedge_E1JhPQB4yV.png', 'dekor-p1.webp'],  // Scintilla, CementinoMilan, Siena, Verona, Washington, Düden, Arya, İzmir, Armada
  ['msedge_nXnqQUEhVa.png', 'dekor-p2.webp'],  // Athena, Boston, Molde, Hatay, StyleFlat, Zenith
  ['msedge_RYYJKBgScm.png', 'dekor-p3.webp'],  // Apollon, Banyeres, Barcelona, Brixton, Bursa, Brianna, Chateau, Carlingford, DoveVerona, Dorset
  ['msedge_eIzFrXq3WU.png', 'dekor-p4.webp'],  // Darwin, Durham, Eagle, Firenze, Kappadokya, Ledbury, Lisbone, Milan, Mansa, Merona, Milton, Musana, Venice
  ['msedge_mycFJclsEP.png', 'dekor-p5.webp'],  // Keten(dekor), Best, Antares, Carrara, Terazzo, Paradise

  // ─── Havuz ────────────────────────────────────────────────────────────
  ['msedge_Ccq2uH68HS.png', 'havuz-p1.webp'],  // Ocean, Salda, Ducapool, Belize

  // ─── Düz Renkler ──────────────────────────────────────────────────────
  ['msedge_Yf2sGxWzNg.png', 'duz-p1.webp'],    // Pergamon, Saten, Alaska, Pyramid, StyleFlat, Kayrak, Sahra

  // ─── Tekstil ──────────────────────────────────────────────────────────
  ['msedge_tUYknAYFHC.png', 'tekstil-p1.webp'], // Keten
]

await mkdir(DEST, { recursive: true })

let ok = 0
for (const [src, dest] of COPIES) {
  try {
    await sharp(join(SRC, src)).webp({ quality: 82 }).toFile(join(DEST, dest))
    console.log(`✓ ${dest}`)
    ok++
  } catch (e) {
    console.error(`✗ ${dest}: ${e.message}`)
  }
}
console.log(`\n${ok}/${COPIES.length} dosya dönüştürüldü → ${DEST}`)
