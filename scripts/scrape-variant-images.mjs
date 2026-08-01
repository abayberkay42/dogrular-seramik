/**
 * etiliseramik.com/series/{slug}/ sayfasından her serinin varyant görsellerini çeker ve indirir.
 * Çıktı: public/images/varyant/{seri}-{renk}-{boyut}.webp
 * + scripts/variant-map.json (seri slug → varyant görsel haritası)
 */
import sharp from 'sharp'
import https from 'https'
import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DEST   = 'D:/Claude-skil/dogrular-seramik/public/images/varyant'
const BASE   = 'https://etiliseramik.com'
const MAP_OUT = 'D:/Claude-skil/dogrular-seramik/scripts/variant-map.json'

mkdirSync(DEST, { recursive: true })

// Seri slug listesi (webp dosya adı = etiliseramik.com series slug)
const SERILER = [
  // Mermer
  'armada','gediz','hatay','zenith','aspendos','riva','nox','perge','finike','plain',
  'sava','sardes','alanya','atlantis','bolu','dover','efes','dalaman','emperador',
  'eternal','himalaya','karya','marbella','meridyen','mezo','mira','mumbai','olimpos',
  'serenity','sevilla','paonazzo','tinda','toros','travertine','vega','demre','simena',
  'hazar','royal','paros','rodos','datca','spider','meram','sandmar',
  // Beyaz ve Siyah
  'athena','ayazma','calacatta','marmo','milet','nepal','river','napoli','nevada','nil',
  'straton','gordion','kartal','leodikya','leton','maydos','fortis',
  // Taş
  'milas','cakil-tasi','belgium-stone','granit','karalps','patara','oxide','stone-blast',
  'petra','troya','naya','boston','sorgun','gravel','pebble','sand','atmos','agrea',
  'antares','best','bluestone','terazzo',
  // Beton
  'cementino','cerastone','horizon','kreastone','molde','town','heraklion','cemento','tokio',
  // Onyx
  'onix','onice','onice-moon','florida','paradise',
  // Dekor
  'scintilla','siena','verona','washington','arya','apollon','banyeres','barcelona',
  'brixton','bursa','brianna','chateau','carlingford','dove-verona','dorset','darwin',
  'durham','eagle','firenze','kappadokya','ledbury','lisbone','milan','mansa','milton',
  'venice','duden','izmir','styleflat',
  // Ahşap
  'mese','panwall','sedir','woodline','burgaz','mersin','parke','beldevere','forest',
  'teras','lapland',
  // Tekstil
  'keten',
  // Havuz
  'ocean','salda','ducapool','belize',
  // Düz Renkler
  'pergamon','saten','alaska','pyramid','sahra',
]

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchHtml(res.headers.location).then(resolve)
        return
      }
      if (res.statusCode !== 200) { res.resume(); resolve(null); return }
      let html = ''
      res.setEncoding('utf8')
      res.on('data', c => { html += c })
      res.on('end', () => resolve(html))
      res.on('error', () => resolve(null))
    }).on('error', () => resolve(null))
  })
}

function downloadImg(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImg(res.headers.location, dest).then(resolve)
        return
      }
      if (res.statusCode !== 200) { res.resume(); resolve(false); return }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', async () => {
        try {
          const buf = Buffer.concat(chunks)
          await sharp(buf)
            .resize(600, 1200, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 88 })
            .toFile(dest)
          resolve(true)
        } catch { resolve(false) }
      })
      res.on('error', () => resolve(false))
    }).on('error', () => resolve(false))
  })
}

// Görsel URL'den boyut suffix kaldır → orijinal
function hiResImgUrl(src) {
  return src.replace(/-\d+x\d+(?=\.jpg)/, '')
}

// img src'yi tam URL'e çevir
function absUrl(src) {
  if (src.startsWith('http')) return src
  return BASE + (src.startsWith('/') ? src : '/' + src)
}

// Sayfadan ürün kartlarını çıkar
function parseProducts(html) {
  // Absolute URL ile href (her ürün 2 kez görünebilir, dedupe)
  const hrefSet = new Set(
    [...html.matchAll(/href="(https:\/\/etiliseramik\.com\/product\/[^"]+)"/g)].map(m => m[1])
  )
  const hrefs = [...hrefSet]

  // urunler görselleri (thumbnail boyutlu olanlar dahil)
  const allImgs = [...html.matchAll(/src="([^"]*\/media\/urunler\/[^"]+\.jpg)"/g)].map(m => m[1])
  // Tekrarları kaldır, hi-res versiyonu al
  const uniqueImgs = [...new Map(allImgs.map(u => [hiResImgUrl(u), u])).values()]

  const products = []
  const count = Math.min(hrefs.length, uniqueImgs.length)
  for (let i = 0; i < count; i++) {
    const href  = hrefs[i]
    const parts = href.split('/').filter(Boolean)
    const slug  = parts[parts.length - 1]
    products.push({ href, imgSrc: hiResImgUrl(uniqueImgs[i]), slug })
  }
  return products
}

// Seri slug → [{variantSlug, imgSrc}]
const variantMap = {}
let totalOk = 0, totalFail = 0

for (const seri of SERILER) {
  const url  = `${BASE}/series/${seri}/`
  const html = await fetchHtml(url)

  if (!html) {
    console.log(`  skip ${seri} (sayfa yok)`)
    continue
  }

  const products = parseProducts(html)
  if (products.length === 0) {
    console.log(`  skip ${seri} (varyant bulunamadı)`)
    continue
  }

  variantMap[seri] = {}
  const ok = []

  for (const { slug, imgSrc } of products) {
    const destFile = join(DEST, `${slug}.webp`)
    if (existsSync(destFile)) {
      variantMap[seri][slug] = `/images/varyant/${slug}.webp`
      ok.push(slug)
      totalOk++
      continue
    }
    const success = await downloadImg(imgSrc, destFile)
    if (success) {
      variantMap[seri][slug] = `/images/varyant/${slug}.webp`
      ok.push(slug)
      totalOk++
    } else {
      totalFail++
    }
  }

  console.log(`✓ ${seri}: ${ok.length}/${products.length} varyant`)

  // Rate limiting: sunucuyu yormamak için
  await new Promise(r => setTimeout(r, 300))
}

writeFileSync(MAP_OUT, JSON.stringify(variantMap, null, 2), 'utf8')
console.log(`\nToplam: ${totalOk} başarılı / ${totalFail} hata`)
console.log(`Harita kaydedildi: ${MAP_OUT}`)
