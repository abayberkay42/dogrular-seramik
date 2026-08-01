/**
 * Variant image hata tespiti ve otomatik düzeltme:
 *
 * Sorun 1 — Seri-içi kopya: Aynı seri içinde iki farklı renk varyantı aynı
 *   görseli paylaşıyorsa; renk adı slug'a daha az uyan varyantın image alanı silinir.
 *
 * Sorun 2 — Cross-seri kontaminasyon: Bir varyantın görseli, variant-map'te o
 *   seriye ait olmayan bir slug'a işaret ediyorsa image alanı silinir.
 */
import { readFileSync, writeFileSync } from 'fs'

const MAP_FILE = 'D:/Claude-skil/dogrular-seramik/scripts/variant-map.json'
const TS_FILE  = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'

const variantMap = JSON.parse(readFileSync(MAP_FILE, 'utf8'))

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

// Bir variant imagePath'in o seriye ait olup olmadığı
// (imagePath'in dosya adı, seri slugıyla başlıyorsa gerçek eşleşme)
function imageOwnerSlug(imagePath) {
  // /images/varyant/SLUG.webp → SLUG → ilk '-' öncesi kısım = seri
  const filename = imagePath.split('/').pop().replace('.webp','')
  // slug yapısı: {seri}-{renk}-{boyut}-{yüzey}-{kalınlık}
  // seri genellikle ilk tire grubuna kadar olan kısım
  return filename  // bütün slug döndür, caller kontrol eder
}

function imageBelongsToSeri(imagePath, seriIsim) {
  const slug = seriSlug(seriIsim)
  const filename = imagePath.split('/').pop().replace('.webp','')
  // Dosya adı seri slug'ıyla başlamalı
  return filename.startsWith(slug + '-') || filename === slug
}

// Bir renk ifadesinin slug'a ne kadar iyi uyduğunu puanla (daha yüksek = daha iyi)
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

function scoreRenkVsSlug(renk, slugNorm) {
  let score = 0
  const parts = renk.split('/').map(p => p.trim())
  for (const part of parts) {
    const words = part.split(/\s+/)
    for (const word of words) {
      const w = normalize(word)
      if (w.length < 2) continue
      if (slugNorm.includes(w)) { score++; continue }
      const tr = EN_TO_TR[w]
      if (tr && slugNorm.includes(tr)) score++
    }
  }
  return score
}

// ── TS dosyasını satır satır oku, seri + varyant bilgilerini topla ──────────

const src = readFileSync(TS_FILE, 'utf8')
const lines = src.split('\n')

// Her satır için indeks → seri ve varyant bilgisi
const lineInfo = []  // { type: 'seri'|'variant'|'other', lineIdx, seriIsim, boyut, renk, imagePath }

let currentSeriIsim = null
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  const seriM = line.match(/^        isim: '([^']+)',/)
  if (seriM) {
    currentSeriIsim = seriM[1]
    lineInfo.push({ type: 'seri', lineIdx: i, seriIsim: currentSeriIsim })
    continue
  }

  const varM = line.match(/^          \{ boyut: '([^']+)', renk: '([^']+)'(, sayfa: '[^']+')?(, image: '([^']+)')? \},?$/)
  if (varM) {
    const [,boyut, renk,,, imagePath] = varM
    lineInfo.push({ type: 'variant', lineIdx: i, seriIsim: currentSeriIsim, boyut, renk, imagePath })
    continue
  }

  lineInfo.push({ type: 'other', lineIdx: i })
}

// ── Sorunları tespit et ──────────────────────────────────────────────────────

const removals = new Set()  // kaldırılacak satır indeksleri (image alanı silinecek)
const report   = []

// Seri bazında varyantları grupla
const seriGroups = {}
for (const info of lineInfo) {
  if (info.type !== 'variant' || !info.imagePath) continue
  const key = info.seriIsim
  if (!seriGroups[key]) seriGroups[key] = []
  seriGroups[key].push(info)
}

for (const [seriIsim, variants] of Object.entries(seriGroups)) {
  // ── Sorun 1: Cross-seri kontaminasyon ─────────────────────────────────────
  for (const v of variants) {
    if (!imageBelongsToSeri(v.imagePath, seriIsim)) {
      report.push(`❌ Cross-seri [${seriIsim}] renk="${v.renk}" boyut="${v.boyut}" → ${v.imagePath.split('/').pop()}`)
      removals.add(v.lineIdx)
    }
  }

  // ── Sorun 2: Seri-içi kopya image ─────────────────────────────────────────
  // Sadece cross-seri sorunu OLMAYAN (temiz) varyantlara bak
  const cleanVariants = variants.filter(v => !removals.has(v.lineIdx))
  const byImage = {}
  for (const v of cleanVariants) {
    if (!byImage[v.imagePath]) byImage[v.imagePath] = []
    byImage[v.imagePath].push(v)
  }
  for (const [imgPath, group] of Object.entries(byImage)) {
    if (group.length < 2) continue
    const slugNorm = normalize(imgPath.split('/').pop().replace('.webp',''))
    // Her varyantı puanla
    const scored = group.map(v => ({ v, score: scoreRenkVsSlug(v.renk, slugNorm) }))
    scored.sort((a,b) => b.score - a.score)
    const bestScore = scored[0].score
    // En iyiyi koru, diğerlerini sil (eğer skor farklıysa)
    for (const { v, score } of scored.slice(1)) {
      if (score < bestScore) {
        report.push(`⚠️  Kopya-image [${seriIsim}] renk="${v.renk}" boyut="${v.boyut}" skor=${score}/${bestScore} → image silindi`)
        removals.add(v.lineIdx)
      } else {
        report.push(`ℹ️  Paylaşılan-image [${seriIsim}] renk="${v.renk}" boyut="${v.boyut}" skor=${score} (eşit, korundu) → ${imgPath.split('/').pop()}`)
      }
    }
  }
}

// ── Düzeltmeyi uygula ────────────────────────────────────────────────────────

const newLines = lines.map((line, i) => {
  if (!removals.has(i)) return line
  // image alanını kaldır
  return line.replace(/, image: '\/images\/varyant\/[^']+'/, '')
})

writeFileSync(TS_FILE, newLines.join('\n'), 'utf8')

// ── Rapor ────────────────────────────────────────────────────────────────────
console.log('=== Tespit & Düzeltme Raporu ===\n')
if (report.length === 0) {
  console.log('Hata bulunamadı.')
} else {
  report.forEach(r => console.log(r))
}
console.log(`\nDüzeltilen satır sayısı: ${removals.size}`)
