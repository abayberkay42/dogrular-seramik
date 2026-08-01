import sharp from 'sharp'
import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = path.resolve('Do9Frular_Seramik_-_logo.png')

// Check dimensions first
const meta = await sharp(SRC).metadata()
console.log(`Logo: ${meta.width}x${meta.height}px, format: ${meta.format}, channels: ${meta.channels}`)
console.log(`Has alpha: ${meta.hasAlpha}`)

// 1. Copy full-size logo to public
await mkdir('public/images', { recursive: true })
await sharp(SRC)
  .png()
  .toFile('public/images/logo.png')
console.log('✓ public/images/logo.png')

// 2. app/icon.png — 32×32 for browser favicon (Next.js App Router convention)
await sharp(SRC)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('app/icon.png')
console.log('✓ app/icon.png (32×32)')

// 3. app/apple-icon.png — 180×180 for Apple touch icon
await sharp(SRC)
  .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('app/apple-icon.png')
console.log('✓ app/apple-icon.png (180×180)')

// 4. Navbar-optimized version: max height 48px, transparent bg
const navH = 48
const navW = Math.round((meta.width / meta.height) * navH)
await sharp(SRC)
  .resize(navW * 2, navH * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('public/images/logo-nav.png')
console.log(`✓ public/images/logo-nav.png (${navW * 2}x${navH * 2} @2x)`)

console.log('\nAll logo files ready.')
