/**
 * etiliseramik.com'dan her seriye ait orijinal görseli indirir ve WebP'ye dönüştürür.
 * node scripts/download-etili-images.mjs
 */
import sharp from 'sharp'
import https from 'https'
import { createWriteStream, mkdirSync } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream/promises'

const DEST = 'D:/Claude-skil/dogrular-seramik/public/images/koleksiyon'
const BASE = 'https://etiliseramik.com/media'
const S    = `${BASE}/seriler`

mkdirSync(DEST, { recursive: true })

// [url, hedef-isim.webp]
const DOWNLOADS = [
  // ── AHŞAP ────────────────────────────────────────────────────────────────
  [`${S}/mese_serisi-scaled-247x222.jpg`,       'mese.webp'],
  [`${S}/panwall_serisi-scaled-247x222.jpg`,    'panwall.webp'],
  [`${S}/sedir_serisi-scaled-247x222.jpg`,      'sedir.webp'],
  [`${BASE}/woodline_serisi-2-247x247.jpg`,     'woodline.webp'],
  [`${S}/burgaz_serisi-scaled-247x222.jpg`,     'burgaz.webp'],
  [`${BASE}/mersin_serisi-247x222.jpg`,         'mersin.webp'],
  [`${S}/parke_serisi-scaled-247x222.jpg`,      'parke.webp'],
  [`${S}/beldevere_serisi-scaled-247x222.jpg`,  'beldevere.webp'],
  [`${S}/forest_serisi-scaled-247x222.jpg`,     'forest.webp'],
  [`${S}/teras_serisi-scaled-247x222.jpg`,      'teras.webp'],
  [`${S}/lapland_serisi-scaled-247x222.jpg`,    'lapland.webp'],

  // ── TEKSTİL ──────────────────────────────────────────────────────────────
  [`${S}/keten_serisi-scaled-247x222.jpg`,      'keten.webp'],

  // ── BEYAZ VE SİYAH / MERMER paylaşımlı ─────────────────────────────────
  [`${S}/athena_serisi-scaled-247x222.jpg`,     'athena.webp'],
  [`${S}/ayazma_serisi-scaled-247x222.jpg`,     'ayazma.webp'],
  [`${BASE}/calacatta_serisi-247x222.jpg`,      'calacatta.webp'],
  [`${S}/marmo_serisi-scaled-247x222.jpg`,      'marmo.webp'],
  [`${S}/milet_serisi-scaled-247x222.jpg`,      'milet.webp'],
  [`${S}/nepal_serisi-scaled-247x222.jpg`,      'nepal.webp'],
  [`${S}/river_serisi-scaled-247x222.jpg`,      'river.webp'],
  [`${S}/napoli_serisi-scaled-247x222.jpg`,     'napoli.webp'],
  [`${S}/nevada_serisi-scaled-247x222.jpg`,     'nevada.webp'],
  [`${S}/nil_serisi-scaled-247x222.jpg`,        'nil.webp'],
  [`${S}/straton_serisi-scaled-247x222.jpg`,    'straton.webp'],
  [`${S}/gordion_serisi-scaled-247x222.jpg`,    'gordion.webp'],
  [`${BASE}/kartal_serisi-247x222.jpg`,         'kartal.webp'],
  [`${S}/leodikya_serisi-scaled-247x222.jpg`,   'leodikya.webp'],
  [`${S}/leton_serisi-scaled-247x222.jpg`,      'leton.webp'],
  [`${S}/maydos_serisi-scaled-247x222.jpg`,     'maydos.webp'],
  [`${S}/fortis_serisi-scaled-247x222.jpg`,     'fortis.webp'],

  // ── MERMER ───────────────────────────────────────────────────────────────
  [`${BASE}/armada_serisi-scaled-247x222.jpg`,  'armada.webp'],
  [`${S}/gediz_serisi-scaled-247x222.jpg`,      'gediz.webp'],
  [`${S}/hatay_serisi-scaled-247x222.jpg`,      'hatay.webp'],
  [`${BASE}/zenith_serisi_n-247x222.jpg`,       'zenith.webp'],
  [`${S}/aspendos_serisi-scaled-247x222.jpg`,   'aspendos.webp'],
  [`${BASE}/riva_serisi-scaled-247x222.jpg`,    'riva.webp'],
  [`${BASE}/nox_serisi-247x222.jpg`,            'nox.webp'],
  [`${S}/perge_serisi-scaled-247x222.jpg`,      'perge.webp'],
  [`${BASE}/finike_serisi-scaled-247x222.jpg`,  'finike.webp'],
  [`${BASE}/plain_serisi-scaled-247x222.jpg`,   'plain.webp'],
  [`${BASE}/sava_serisi-scaled-247x222.jpg`,    'sava.webp'],
  [`${BASE}/sardes_serisi_n-247x222.jpg`,       'sardes.webp'],
  [`${S}/alanya_serisi-scaled-247x222.jpg`,     'alanya.webp'],
  [`${S}/atlantis_serisi-scaled-247x222.jpg`,   'atlantis.webp'],
  [`${S}/bolu_serisi-scaled-247x222.jpg`,       'bolu.webp'],
  [`${S}/dover_serisi-scaled-247x222.jpg`,      'dover.webp'],
  [`${S}/efes_serisi-scaled-247x222.jpg`,       'efes.webp'],
  [`${BASE}/dalaman_serisi-247x222.jpg`,        'dalaman.webp'],
  [`${S}/emperador_serisi-scaled-247x222.jpg`,  'emperador.webp'],
  [`${BASE}/Eternal-247x222.jpg`,              'eternal.webp'],
  [`${S}/himalaya_serisi-scaled-247x222.jpg`,   'himalaya.webp'],
  [`${S}/karya_serisi-scaled-247x222.jpg`,      'karya.webp'],
  [`${BASE}/marbella_serisi_n-247x222.jpg`,     'marbella.webp'],
  [`${S}/meridyen_serisi-scaled-247x222.jpg`,   'meridyen.webp'],
  [`${S}/mezo_serisi-scaled-247x222.jpg`,       'mezo.webp'],
  [`${S}/mira_serisi-scaled-247x222.jpg`,       'mira.webp'],
  [`${S}/mumbai_serisi-scaled-247x222.jpg`,     'mumbai.webp'],
  [`${BASE}/IMG_9575-247x247.jpg`,              'olimpos.webp'],
  [`${S}/serenity_serisi-scaled-247x222.jpg`,   'serenity.webp'],
  [`${S}/sevilla_serisi-scaled-247x222.jpg`,    'sevilla.webp'],
  [`${S}/paonazzo_serisi-scaled-247x222.jpg`,   'paonazzo.webp'],
  [`${BASE}/tinda_serisi_n-247x222.jpg`,        'tinda.webp'],
  [`${S}/toros_serisi-scaled-247x222.jpg`,      'toros.webp'],
  [`${S}/travertine_serisi-scaled-247x222.jpg`, 'travertine.webp'],
  [`${BASE}/vega_serisi-247x222.jpg`,           'vega.webp'],
  [`${S}/demre_serisi-scaled-247x222.jpg`,      'demre.webp'],
  [`${S}/simena_serisi-scaled-247x222.jpg`,     'simena.webp'],
  [`${S}/hazar_serisi-scaled-247x222.jpg`,      'hazar.webp'],
  [`${S}/royal_serisi-scaled-247x222.jpg`,      'royal.webp'],
  [`${BASE}/paros_serisi-247x222.jpg`,          'paros.webp'],
  [`${BASE}/rodos_serisi-247x222.jpg`,          'rodos.webp'],
  [`${S}/datca_serisi-scaled-247x222.jpg`,      'datca.webp'],
  [`${BASE}/spider_serisi-247x222.jpg`,         'spider.webp'],
  [`${BASE}/meram_serisi-247x222.jpg`,          'meram.webp'],
  [`${BASE}/sandmar_serisi-247x222.jpg`,        'sandmar.webp'],

  // ── TAŞ ──────────────────────────────────────────────────────────────────
  [`${S}/milas_serisi-scaled-247x222.jpg`,      'milas.webp'],
  [`${S}/cakil_tasi_serisi-scaled-247x222.jpg`, 'cakil-tasi.webp'],
  [`${S}/belgium_stone_serisi-scaled-247x222.jpg`, 'belgium-stone.webp'],
  [`${BASE}/granit_serisi-247x222.jpg`,         'granit.webp'],
  [`${BASE}/karalps_serisi-247x222.jpg`,        'karalps.webp'],
  [`${S}/patara_serisi-scaled-247x222.jpg`,     'patara.webp'],
  [`${S}/oxide_serisi-scaled-247x222.jpg`,      'oxide.webp'],
  [`${BASE}/stone_blast_serisi-247x222.jpg`,    'stone-blast.webp'],
  [`${S}/petra_serisi-scaled-247x222.jpg`,      'petra.webp'],
  [`${BASE}/troya_serisi-247x222.jpg`,          'troya.webp'],
  [`${S}/naya_serisi-scaled-247x222.jpg`,       'naya.webp'],
  [`${S}/boston_serisi-scaled-247x222.jpg`,     'boston.webp'],
  [`${BASE}/sorgun_serisi-247x222.jpg`,         'sorgun.webp'],
  [`${BASE}/gravel_serisi-scaled-247x222.jpg`,  'gravel.webp'],
  [`${BASE}/pebble_serisi-1-247x190.jpg`,       'pebble.webp'],
  [`${BASE}/sand_serisi-scaled-247x222.jpg`,    'sand.webp'],
  [`${BASE}/atmos_serisi-1-247x247.jpg`,        'atmos.webp'],
  [`${S}/agrea_serisi-scaled-247x222.jpg`,      'agrea.webp'],
  [`${BASE}/antares_serisi-1-247x247.jpg`,      'antares.webp'],
  [`${S}/best_serisi-scaled-247x222.jpg`,       'best.webp'],
  [`${S}/bluestone_serisi-scaled-247x222.jpg`,  'bluestone.webp'],
  [`${S}/terazzo_serisi-scaled-247x222.jpg`,    'terazzo.webp'],

  // ── BETON ────────────────────────────────────────────────────────────────
  [`${S}/cementino_serisi-scaled-247x222.jpg`,  'cementino.webp'],
  [`${BASE}/cerastone_serisi-247x222.jpg`,      'cerastone.webp'],
  [`${S}/horizon_serisi-scaled-247x222.jpg`,    'horizon.webp'],
  [`${BASE}/kreastone_serisi-247x222.jpg`,      'kreastone.webp'],
  [`${S}/molde_serisi-scaled-247x222.jpg`,      'molde.webp'],
  [`${S}/town_serisi-scaled-247x222.jpg`,       'town.webp'],
  [`${BASE}/heraklion_serisi-247x222.jpg`,      'heraklion.webp'],
  [`${S}/cemento_serisi-scaled-247x222.jpg`,    'cemento.webp'],
  [`${BASE}/tokio_serisi-247x222.jpg`,          'tokio.webp'],

  // ── ONYX ─────────────────────────────────────────────────────────────────
  [`${S}/onix_serisi-scaled-247x222.jpg`,       'onix.webp'],
  [`${BASE}/onice_serisi-247x222.jpg`,          'onice.webp'],
  [`${BASE}/onice_moon_serisi-247x222.jpg`,     'onice-moon.webp'],
  [`${BASE}/florida_serisi-scaled-247x222.jpg`, 'florida.webp'],
  [`${S}/paradise_serisi-scaled-247x222.jpg`,   'paradise.webp'],

  // ── HAVUZ ────────────────────────────────────────────────────────────────
  [`${BASE}/belize_serisi-247x190.jpg`,         'belize.webp'],

  // ── DEKOR ────────────────────────────────────────────────────────────────
  [`${S}/scintilla_serisi-scaled-247x222.jpg`,  'scintilla.webp'],
  [`${S}/siena_serisi-scaled-247x222.jpg`,      'siena.webp'],
  [`${S}/verona_serisi-scaled-247x222.jpg`,     'verona.webp'],
  [`${BASE}/washington_serisi-247x247.jpg`,     'washington.webp'],
  [`${S}/arya_serisi-scaled-247x222.jpg`,       'arya.webp'],
  [`${S}/apollon_charcoal_serisi-scaled-247x222.jpg`, 'apollon.webp'],
  [`${BASE}/banyeres_warm_pre_cut_45x45_mat_85mm-247x247.jpg`, 'banyeres.webp'],
  [`${BASE}/barcelona_classic_white_45x45_mat_85mm-247x247.jpg`, 'barcelona.webp'],
  [`${BASE}/brixton_serisi-247x222.jpg`,        'brixton.webp'],
  [`${S}/bursa_serisi-scaled-247x222.jpg`,      'bursa.webp'],
  [`${S}/brianna_serisi-scaled-247x222.jpg`,    'brianna.webp'],
  [`${S}/chateau_serisi-scaled-247x222.jpg`,    'chateau.webp'],
  [`${BASE}/carlingford_serisi-247x247.jpg`,    'carlingford.webp'],
  [`${BASE}/dove_verona_serisi-247x222.jpg`,    'dove-verona.webp'],
  [`${S}/dorset_serisi-scaled-247x222.jpg`,     'dorset.webp'],
  [`${BASE}/darwin_serisi-247x247.jpg`,         'darwin.webp'],
  [`${S}/durham_serisi-scaled-247x222.jpg`,     'durham.webp'],
  [`${BASE}/eagle_serisi-247x222.jpg`,          'eagle.webp'],
  [`${BASE}/firenze_serisi-247x222.jpg`,        'firenze.webp'],
  [`${S}/kapadokya_serisi-scaled-247x222.jpg`,  'kappadokya.webp'],
  [`${S}/ledbury_serisi-scaled-247x222.jpg`,    'ledbury.webp'],
  [`${BASE}/lisbone_serisi-247x222.jpg`,        'lisbone.webp'],
  [`${S}/milan_serisi-scaled-247x222.jpg`,      'milan.webp'],
  [`${S}/manisa_serisi-scaled-247x222.jpg`,     'mansa.webp'],
  [`${BASE}/milton_serisi-247x222.jpg`,         'milton.webp'],
  [`${S}/venice_serisi-scaled-247x222.jpg`,     'venice.webp'],
]

// WordPress boyut suffix'ini kaldır: -247x222, -247x247, -190x190 vb.
function hiResUrl(url) {
  return url.replace(/-\d+x\d+(?=\.jpg)/, '')
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        res.resume()
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', async () => {
        try {
          const buf = Buffer.concat(chunks)
          await sharp(buf)
            .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 90 })
            .toFile(dest)
          resolve()
        } catch(e) { reject(e) }
      })
      res.on('error', reject)
    }).on('error', reject)
  })
}

let ok = 0, fail = 0
for (const [rawUrl, name] of DOWNLOADS) {
  const url  = hiResUrl(rawUrl)
  const dest = join(DEST, name)
  try {
    await download(url, dest)
    console.log(`✓ ${name}`)
    ok++
  } catch (e) {
    // Orijinal bulunamazsa küçük thumbnail'a düş
    try {
      await download(rawUrl, dest)
      console.log(`✓ ${name}  (fallback thumbnail)`)
      ok++
    } catch (e2) {
      console.error(`✗ ${name}  ←  ${e.message}`)
      fail++
    }
  }
}
console.log(`\n${ok} başarılı / ${fail} hata`)
