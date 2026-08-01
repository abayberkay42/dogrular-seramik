const sharp = require('sharp')
const path = require('path')

const DIR = path.join(__dirname, '../public/images/katalog')

const files = [
  { input: 'yeni-seriler-01.png',  output: 'yeni-seriler.webp' },
  { input: 'genel-2026-001.png',   output: 'genel-2026.webp'   },
  { input: 'genel-2022-001.png',   output: 'genel-2022.webp'   },
]

;(async () => {
  for (const f of files) {
    const inputPath  = path.join(DIR, f.input)
    const outputPath = path.join(DIR, f.output)
    const info = await sharp(inputPath)
      .webp({ quality: 92, effort: 5 })
      .toFile(outputPath)
    console.log(`✓ ${f.output}  ${Math.round(info.size / 1024)}KB  ${info.width}×${info.height}`)
  }
})()
