/**
 * Variant image hata tespiti ve düzeltme — v2
 *
 * Kategori slug + seri isim birlikte grup anahtarı olarak kullanılır
 * (aynı seri adı farklı kategorilerde olsa çakışmaz).
 *
 * Düzeltilen sorunlar:
 *   1. Cross-seri kontaminasyon: varyant image dosya adı o seri ile başlamıyorsa sil
 *   2. Seri-içi kopya: aynı serinin iki farklı rengi aynı image'ı paylaşıyorsa,
 *      renk adı image slug'a daha az uyan varyantın image'ını sil
 */
import { readFileSync, writeFileSync } from 'fs'

const TS_FILE = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'

// ── Yardımcılar ──────────────────────────────────────────────────────────────

function normalize(str) {
  return str.toLowerCase()
    .replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g')
    .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ü/g,'u')
    .replace(/[^a-z0-9]/g,'')
}

function seriSlug(isim) {
  return isim.toLowerCase()
    .replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g')
    .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ü/g,'u')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

// Görselin hangi seriye ait olduğunu dosya adından tespit et
function imageFilePrefix(imagePath) {
  return imagePath.split('/').pop().replace('.webp','')
}

// Varyant görseli o seriye ait mi?
function imageBelongsToSeri(imagePath, seriIsim) {
  const prefix = imageFilePrefix(imagePath)
  const slug = seriSlug(seriIsim)
  return prefix.startsWith(slug + '-') || prefix === slug
}

// İngilizce→Türkçe renk çevirisi (slug eşleştirme için)
const EN_TO_TR = {
  light:'acik', dark:'koyu', extra:'extra',
  white:'beyaz', black:'siyah',
  grey:'gri', gray:'gri',
  beige:'bej', cream:'krem',
  anthracite:'antrasit',
  brown:'kahve', walnut:'ceviz', oak:'mese',
  gold:'gold', silver:'gumus',
  blue:'mavi', green:'yesil', red:'kirmizi',
  ivory:'fil', natural:'dogal',
  sand:'kum', stone:'tas',
  smoked:'dumlu', decor:'dekor',
  latte:'latte', taba:'taba',
}

// Renk adının image slug'a uyum puanı
function scoreRenkVsSlug(renk, slugNorm) {
  let score = 0
  for (const part of renk.split('/').map(p => p.trim())) {
    for (const word of part.split(/\s+/)) {
      const w = normalize(word)
      if (w.length < 2) continue
      if (slugNorm.includes(w)) { score++; continue }
      const tr = EN_TO_TR[w]
      if (tr && slugNorm.includes(tr)) score++
    }
  }
  return score
}

// ── TS dosyasını oku ─────────────────────────────────────────────────────────

const src = readFileSync(TS_FILE, 'utf8')
const lines = src.split('\n')

// Satır bilgilerini topla (kategori + seri bağlamı)
let currentCatSlug  = null
let currentSeriIsim = null
const lineInfo = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  // Kategori slug satırı — 4 boşluk
  const catM = line.match(/^    slug: '([^']+)',/)
  if (catM) { currentCatSlug = catM[1]; continue }

  // Seri isim satırı — 8 boşluk
  const seriM = line.match(/^        isim: '([^']+)',/)
  if (seriM) { currentSeriIsim = seriM[1]; continue }

  // Varyant satırı — 10 boşluk
  const varM = line.match(/^          \{ boyut: '([^']+)', renk: '([^']+)'(, sayfa: '[^']+')?(, image: '([^']+)')? \},?$/)
  if (varM) {
    const [,boyut, renk,,, imagePath] = varM
    if (imagePath) {
      lineInfo.push({
        lineIdx: i,
        catSlug:  currentCatSlug,
        seriIsim: currentSeriIsim,
        groupKey: `${currentCatSlug}::${currentSeriIsim}`,
        boyut, renk, imagePath,
      })
    }
  }
}

// ── Sorunları tespit et ──────────────────────────────────────────────────────

const removals = new Set()
const report   = []

// Grup anahtarına (kat+seri) göre grupla
const groups = {}
for (const info of lineInfo) {
  if (!groups[info.groupKey]) groups[info.groupKey] = []
  groups[info.groupKey].push(info)
}

for (const [groupKey, variants] of Object.entries(groups)) {
  const seriIsim = variants[0].seriIsim

  // ── Sorun 1: Cross-seri kontaminasyon ─────────────────────────────────────
  for (const v of variants) {
    if (!imageBelongsToSeri(v.imagePath, seriIsim)) {
      report.push(`❌ Cross-seri [${groupKey}] renk="${v.renk}" boyut="${v.boyut}" → ${imageFilePrefix(v.imagePath)} (SİLİNDİ)`)
      removals.add(v.lineIdx)
    }
  }

  // ── Sorun 2: Seri-içi kopya image ─────────────────────────────────────────
  const clean = variants.filter(v => !removals.has(v.lineIdx))
  const byImage = {}
  for (const v of clean) {
    if (!byImage[v.imagePath]) byImage[v.imagePath] = []
    byImage[v.imagePath].push(v)
  }
  for (const [imgPath, group] of Object.entries(byImage)) {
    if (group.length < 2) continue
    const slugNorm = normalize(imageFilePrefix(imgPath))
    const scored = group.map(v => ({ v, s: scoreRenkVsSlug(v.renk, slugNorm) }))
    scored.sort((a,b) => b.s - a.s)
    const best = scored[0].s
    for (const { v, s } of scored.slice(1)) {
      if (s < best) {
        report.push(`⚠️  Kopya [${groupKey}] renk="${v.renk}" boyut="${v.boyut}" skor=${s}/${best} → image SİLİNDİ`)
        removals.add(v.lineIdx)
      } else {
        report.push(`ℹ️  Paylaşılan [${groupKey}] renk="${v.renk}" boyut="${v.boyut}" skor=${s} (eşit, KORUNDU) → ${imageFilePrefix(imgPath)}`)
      }
    }
  }
}

// ── Düzeltmeyi uygula ────────────────────────────────────────────────────────

const newLines = lines.map((line, i) => {
  if (!removals.has(i)) return line
  return line.replace(/, image: '\/images\/varyant\/[^']+'/, '')
})

writeFileSync(TS_FILE, newLines.join('\n'), 'utf8')

// ── Rapor ────────────────────────────────────────────────────────────────────
console.log('=== Hata Tespiti ve Düzeltme Raporu ===\n')
const errors    = report.filter(r => r.startsWith('❌'))
const removed   = report.filter(r => r.includes('SİLİNDİ') && !r.startsWith('❌'))
const kept      = report.filter(r => r.includes('KORUNDU'))

if (errors.length)  { console.log('── Cross-seri kontaminasyon:'); errors.forEach(r => console.log(' '+r)) }
if (removed.length) { console.log('\n── Seri-içi kopya (silinen):'); removed.forEach(r => console.log(' '+r)) }
if (kept.length)    { console.log('\n── Paylaşılan image (eşit skor, korunan):'); kept.forEach(r => console.log(' '+r)) }

const totalFixed = errors.length + removed.length
console.log(`\nDüzeltilen: ${totalFixed} | Korunan kopya: ${kept.length} | Toplam işlem: ${report.length}`)
