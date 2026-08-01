import sharp from 'sharp'
import https from 'https'
import { join } from 'path'

const DEST = 'D:/Claude-skil/dogrular-seramik/public/images/koleksiyon'
const BASE = 'https://etiliseramik.com/media'
const S    = `${BASE}/seriler`

const CANDIDATES = [
  ['duden',     [`${S}/duden_serisi-scaled.jpg`,      `${BASE}/duden_serisi.jpg`]],
  ['izmir',     [`${S}/izmir_serisi-scaled.jpg`,      `${BASE}/izmir_serisi.jpg`]],
  ['styleflat', [`${S}/style_flat_serisi-scaled.jpg`, `${BASE}/style_flat_serisi.jpg`, `${S}/styleflat_serisi-scaled.jpg`]],
  ['ocean',     [`${S}/ocean_serisi-scaled.jpg`,      `${BASE}/ocean_serisi.jpg`]],
  ['salda',     [`${S}/salda_serisi-scaled.jpg`,      `${BASE}/salda_serisi.jpg`]],
  ['ducapool',  [`${S}/ducapool_serisi-scaled.jpg`,   `${BASE}/ducapool_serisi.jpg`]],
  ['pergamon',  [`${S}/pergamon_serisi-scaled.jpg`,   `${BASE}/pergamon_serisi.jpg`]],
  ['saten',     [`${S}/saten_serisi-scaled.jpg`,      `${BASE}/saten_serisi.jpg`]],
  ['alaska',    [`${S}/alaska_serisi-scaled.jpg`,     `${BASE}/alaska_serisi.jpg`]],
  ['pyramid',   [`${S}/pyramid_serisi-scaled.jpg`,    `${BASE}/pyramid_serisi.jpg`]],
  ['kayrak',    [`${S}/kayrak_serisi-scaled.jpg`,     `${BASE}/kayrak_serisi.jpg`]],
  ['sahra',     [`${S}/sahra_serisi-scaled.jpg`,      `${BASE}/sahra_serisi.jpg`]],
]

function tryUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        tryUrl(res.headers.location).then(resolve)
        return
      }
      if (res.statusCode !== 200) { res.resume(); resolve(null); return }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', () => resolve(null))
    }).on('error', () => resolve(null))
  })
}

const found = []
const notFound = []

for (const [name, urls] of CANDIDATES) {
  let saved = false
  for (const url of urls) {
    const buf = await tryUrl(url)
    if (!buf) continue
    try {
      const dest = join(DEST, `${name}.webp`)
      await sharp(buf).resize(800, 800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 90 }).toFile(dest)
      console.log(`✓ ${name}.webp  ←  ${url.split('/').pop()}`)
      found.push(name)
      saved = true; break
    } catch(e) { /* görsel değil */ }
  }
  if (!saved) {
    console.log(`✗ ${name}  (bulunamadı)`)
    notFound.push(name)
  }
}

console.log(`\nİndirilen: ${found.join(', ') || 'yok'}`)
console.log(`Bulunamayan: ${notFound.join(', ') || 'yok'}`)
