import { readFileSync, writeFileSync } from 'fs'

const FILE = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'
let src = readFileSync(FILE, 'utf8')

// Eski grup path → yeni seri path haritası
const REPLACEMENTS = [
  // Düden
  [/(\s+isim: 'D[üu]den'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/duden.webp'`],
  // İzmir
  [/(\s+isim: '[İI]zmir'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/izmir.webp'`],
  // Ocean
  [/(\s+isim: 'Ocean'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/ocean.webp'`],
  // Salda
  [/(\s+isim: 'Salda'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/salda.webp'`],
  // Ducapool
  [/(\s+isim: 'Ducapool'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/ducapool.webp'`],
  // Pergamon
  [/(\s+isim: 'Pergamon'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/pergamon.webp'`],
  // Saten
  [/(\s+isim: 'Saten'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/saten.webp'`],
  // Alaska
  [/(\s+isim: 'Alaska'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/alaska.webp'`],
  // Pyramid
  [/(\s+isim: 'Pyramid'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/pyramid.webp'`],
  // Sahra
  [/(\s+isim: 'Sahra'[^\n]*\n\s+)image: '[^']+'/g,
   (m, pre) => `${pre}image: '/images/koleksiyon/sahra.webp'`],
]

// Style Flat için iki ayrı kategori var; ikisi de styleflat.webp alsın
src = src.replace(/(\s+isim: 'Style Flat'[^\n]*\n\s+)image: '[^']+'/g,
  (m, pre) => `${pre}image: '/images/koleksiyon/styleflat.webp'`)

// Kayrak için image satırını tamamen kaldır
src = src.replace(/(\s+isim: 'Kayrak'[^\n]*\n)\s+image: '[^']+',\n/g,
  '$1')

for (const [pattern, replacement] of REPLACEMENTS) {
  src = src.replace(pattern, replacement)
}

writeFileSync(FILE, src, 'utf8')

// Doğrulama
const remaining = [...src.matchAll(/image: '([^']+)'/g)]
  .map(m => m[1])
  .filter(p => p.includes('dekor-') || p.includes('havuz-') || p.includes('duz-'))
console.log('Kalan eski path:', remaining.length ? remaining : 'yok ✓')

// Güncellenen path'leri göster
const updated = [...src.matchAll(/isim: '([^']+)'[^\n]*\n\s+image: '\/images\/koleksiyon\/(duden|izmir|styleflat|ocean|salda|ducapool|pergamon|saten|alaska|pyramid|sahra)[^']+'[^\n]*/g)]
  .map(m => `  ${m[1]} → ${m[2]}.webp`)
console.log('Güncellenen seriler:\n' + updated.join('\n'))
