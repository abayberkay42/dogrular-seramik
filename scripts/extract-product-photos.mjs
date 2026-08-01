import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const RAW_DIR = path.resolve('public/images/vitrifiye/raw-extracted')
const OUT_DIR = path.resolve('public/images/vitrifiye/products')
const MIN_FILE_KB = 80   // skip icons/small images
const MIN_DIM = 350      // skip images smaller than 350px in any dimension

import { mkdir } from 'node:fs/promises'
await mkdir(OUT_DIR, { recursive: true })

const files = (await readdir(RAW_DIR))
  .filter(f => f.endsWith('.png'))
  .sort()

console.log(`Total PNG files: ${files.length}`)

const candidates = []
for (const file of files) {
  const fullPath = path.join(RAW_DIR, file)
  const s = await stat(fullPath)
  const sizeKB = s.size / 1024
  if (sizeKB < MIN_FILE_KB) continue

  try {
    const meta = await sharp(fullPath).metadata()
    const w = meta.width ?? 0
    const h = meta.height ?? 0
    if (w < MIN_DIM && h < MIN_DIM) continue
    // skip smask / transparency masks (grayscale with tiny size)
    if (meta.channels === 1 && sizeKB < 200) continue
    candidates.push({ file, fullPath, w, h, sizeKB: Math.round(sizeKB) })
  } catch (e) {
    console.warn(`Skip ${file}: ${e.message}`)
  }
}

console.log(`\nProduct photo candidates: ${candidates.length}`)
candidates.forEach(c => console.log(`  ${c.file}  ${c.w}x${c.h}  ${c.sizeKB}KB`))

console.log('\nConverting to WebP...')
let count = 0
for (const c of candidates) {
  count++
  const num = String(count).padStart(3, '0')
  const outFile = path.join(OUT_DIR, `product-${num}.webp`)
  await sharp(c.fullPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outFile)
  console.log(`  product-${num}.webp ← ${c.file} (${c.w}x${c.h})`)
}

console.log(`\nDone! ${count} product images saved to public/images/vitrifiye/products/`)
