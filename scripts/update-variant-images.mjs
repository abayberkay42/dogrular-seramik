/**
 * variant-map.json'dan variant image pathlerini okuyup
 * etili-categories.ts içindeki her TileVariant'a image: eklер.
 *
 * variant-map.json yapısı:
 * {
 *   "armada": {
 *     "armada-latte-30x90-parlak-9mm":  "/images/varyant/armada-latte-30x90-parlak-9mm.webp",
 *     ...
 *   }
 * }
 *
 * Eşleştirme mantığı:
 *   variant slug içinde boyut (30x90) ve renk parçaları aranır.
 */
import { readFileSync, writeFileSync } from 'fs'

const MAP_FILE  = 'D:/Claude-skil/dogrular-seramik/scripts/variant-map.json'
const TS_FILE   = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'

const variantMap = JSON.parse(readFileSync(MAP_FILE, 'utf8'))

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]/g, '')
}

// Boyutu slug formatına çevir: "30×90" → "30x90"
function boyutToSlug(boyut) {
  return boyut.replace(/×/g, 'x').toLowerCase()
}

// Renk adından anlamlı parçaları al (Türkçe kısmı kullan, / öncesi)
function renkParts(renk) {
  const tr = renk.split('/')[0].trim()  // "Açık Bej" from "Açık Bej/Light Beige"
  return normalize(tr).split('').filter(Boolean)
}

// Bir variant slug'ının hem boyut hem renk parçalarını içerip içermediğini kontrol et
function matchesVariant(slug, boyut, renk) {
  const slugNorm = normalize(slug)
  const boyutNorm = normalize(boyutToSlug(boyut))
  if (!slugNorm.includes(boyutNorm)) return false
  // Renk: en az ilk 4 karakter eşleşmeli
  const renkNorm = normalize(renk.split('/')[0])
  if (renkNorm.length >= 3 && slugNorm.includes(renkNorm.substring(0, Math.min(renkNorm.length, 5)))) return true
  return false
}

// seri slug normalize
function seriNorm(isim) {
  return normalize(isim.split('/')[0])
}

let src = readFileSync(TS_FILE, 'utf8')
let addedCount = 0

// Her seri için variant map'i uygula
for (const [seriSlug, variants] of Object.entries(variantMap)) {
  const slugVariants = Object.entries(variants) // [[slug, path], ...]

  // TS dosyasındaki varyant satırlarını bul ve image ekle
  // Pattern: boyut: '...', renk: '...', sayfa?: '...' (image henüz yok)
  src = src.replace(
    /(\s+\{ boyut: '([^']+)', renk: '([^']+)'(, sayfa: '[^']+')? \})/g,
    (match, full, boyut, renk, sayfaPart) => {
      // Hangi seri bağlamında olduğunu bilemiyoruz doğrudan,
      // ama variant slug'larından eşleşeni bulabiliriz
      const matchedSlug = slugVariants.find(([slug]) => matchesVariant(slug, boyut, renk))
      if (!matchedSlug) return match

      const imagePath = matchedSlug[1]
      // Zaten image varsa atla
      if (match.includes('image:')) return match

      addedCount++
      const indent = full.match(/^(\s+)/)?.[1] ?? '        '
      return `${indent}{ boyut: '${boyut}', renk: '${renk}'${sayfaPart ?? ''}, image: '${imagePath}' }`
    }
  )
}

writeFileSync(TS_FILE, src, 'utf8')
console.log(`Eklenen variant image: ${addedCount}`)

// Kontrol
const imageCount = (src.match(/image: '\/images\/varyant\//g) || []).length
console.log(`Toplam varyant image alanı: ${imageCount}`)
