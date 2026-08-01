import { readFileSync, writeFileSync } from 'fs'
const FILE = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'
let src = readFileSync(FILE, 'utf8')

// Kayrak: kalinlik satırından sonra gelen image satırını sil
src = src.replace(
  /(\s+isim: 'Kayrak',\n\s+kalinlik: '[^']+',\n)\s+image: '[^']+',\n/,
  '$1'
)

// Sahra: eski path'i yenisiyle değiştir
src = src.split("image: '/images/koleksiyon/duz-bej.webp'")
         .join("image: '/images/koleksiyon/sahra.webp'")

writeFileSync(FILE, src, 'utf8')

const rem = [...src.matchAll(/image: '([^']+)'/g)]
  .map(m => m[1])
  .filter(p => p.includes('duz-') || p.includes('havuz-') || p.includes('dekor-'))
console.log('Kalan eski path:', rem.length ? rem.join(', ') : 'yok ✓')
