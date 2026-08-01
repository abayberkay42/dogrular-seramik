/**
 * Variant image eşleştirme — v2
 * Düzeltmeler:
 *   1. Seri bazlı eşleştirme (cross-series yanlış match yok)
 *   2. Türkçe↔İngilizce renk çevirisi (Light Grey ↔ acik-gri)
 *   3. Her renk kelimesi ayrı ayrı eşleştirilir (AND mantığı)
 *   4. TR/EN bileşik renk adı → parça parça denenir
 */
import { readFileSync, writeFileSync } from 'fs'

const MAP_FILE = 'D:/Claude-skil/dogrular-seramik/scripts/variant-map.json'
const TS_FILE  = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'

const variantMap = JSON.parse(readFileSync(MAP_FILE, 'utf8'))

// ── Yardımcı fonksiyonlar ────────────────────────────────────────────────────

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

// İngilizce renk kelimesi → Türkçe slug karşılığı
const EN_TO_TR = {
  light: 'acik', dark: 'koyu', extra: 'extra',
  white: 'beyaz', black: 'siyah',
  grey: 'gri',   gray: 'gri',
  beige: 'bej',  cream: 'krem',
  anthracite: 'antrasit',
  brown: 'kahve', walnut: 'ceviz', oak: 'mese',
  gold: 'gold',  silver: 'gumus',
  blue: 'mavi',  green: 'yesil', red: 'kirmizi',
  ivory: 'fil',  natural: 'dogal',
  sand: 'kum',   stone: 'tas',
  smoked: 'dumlu', decor: 'dekor', defne: 'defne',
  latte: 'latte', taba: 'taba',
}

// Bir renk kelimesinin (veya çevirisinin) slug'da olup olmadığını kontrol et
function wordInSlug(word, slugNorm) {
  const w = normalize(word)
  if (w.length < 2) return true  // çok kısa kelimeler atla
  if (slugNorm.includes(w)) return true
  // İngilizce → Türkçe çevirisi
  const tr = EN_TO_TR[w]
  if (tr && slugNorm.includes(tr)) return true
  // Türkçe → İngilizce (ters)
  for (const [en, trVal] of Object.entries(EN_TO_TR)) {
    if (trVal === w && slugNorm.includes(en)) return true
  }
  return false
}

// Bir renk ifadesinin tüm kelimelerinin slug'da olup olmadığını kontrol et
function colorMatchesPart(colorPart, slugNorm) {
  const words = colorPart.trim().split(/\s+/).filter(w => w.length >= 2)
  if (words.length === 0) return false
  return words.every(w => wordInSlug(w, slugNorm))
}

// Boyut eşleştirme (× → x)
function boyutInSlug(boyut, slugNorm) {
  const b = normalize(boyut.replace(/×/g,'x'))
  return slugNorm.includes(b)
}

// Ana eşleştirme: boyut ve renk slug'da mı?
function matchesVariant(slug, boyut, renk) {
  const slugNorm = normalize(slug)
  if (!boyutInSlug(boyut, slugNorm)) return false

  // Renk: TR/EN parçalarına böl, HERHANGİ BİRİ tam eşleşirse kabul et
  const parts = renk.split('/').map(p => p.trim()).filter(Boolean)
  return parts.some(part => colorMatchesPart(part, slugNorm))
}

// ── Ana işlem ───────────────────────────────────────────────────────────────

let src = readFileSync(TS_FILE, 'utf8')

// Adım 1: Mevcut tüm variant image alanlarını temizle
const oldCount = (src.match(/, image: '\/images\/varyant\/[^']+'/g) || []).length
src = src.replace(/, image: '\/images\/varyant\/[^']+'/g, '')
console.log(`Sıfırlanan eski image alanı: ${oldCount}`)

// Adım 2: Satır satır tara, seri bağlamını izle
const lines = src.split('\n')
const result = []
let currentSeriMapKey = null
let addedCount = 0
let missCount = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  // Seri isim satırı — tam 8 boşluk
  const seriIsimM = line.match(/^        isim: '([^']+)',/)
  if (seriIsimM) {
    const name = seriIsimM[1]
    const slug = seriSlug(name)
    if (variantMap[slug]) {
      currentSeriMapKey = slug
    } else {
      // Tire olmadan dene (styleflat vs style-flat)
      const noHyphen = slug.replace(/-/g,'')
      currentSeriMapKey = variantMap[noHyphen] ? noHyphen : null
    }
  }

  // Varyant satırı — tam 10 boşluk, henüz image yok
  if (currentSeriMapKey && !line.includes('image:')) {
    const vm = line.match(/^(          \{ boyut: '([^']+)', renk: '([^']+)'(, sayfa: '[^']+')? \}),?$/)
    if (vm) {
      const [, , boyut, renk] = vm
      const variants = variantMap[currentSeriMapKey]
      let matched = null
      for (const [vSlug, vPath] of Object.entries(variants)) {
        if (matchesVariant(vSlug, boyut, renk)) {
          matched = vPath
          break
        }
      }
      if (matched) {
        // virgülle biten satırları koru
        const comma = line.trimEnd().endsWith(',') ? ',' : ''
        result.push(line.replace(/( \}),?$/, `, image: '${matched}' }${comma}`))
        addedCount++
        continue
      } else {
        missCount++
        // debug: console.log(`  MISS [${currentSeriMapKey}] boyut="${boyut}" renk="${renk}"`)
      }
    }
  }

  result.push(line)
}

const newSrc = result.join('\n')
writeFileSync(TS_FILE, newSrc, 'utf8')
console.log(`Eklenen image: ${addedCount}`)
console.log(`Eşleşmeyen:   ${missCount}`)
const total = (newSrc.match(/image: '\/images\/varyant\//g) || []).length
console.log(`Toplam variant image: ${total}`)
