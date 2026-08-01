const sharp = require('./node_modules/sharp');
const path  = require('path');
const fs    = require('fs');

const SRC  = 'D:/Claude-skil/dogrular-seramik';
const DEST = 'D:/Claude-skil/dogrular-seramik/public/images/hero/slider';

const files = [
  { src: 'datca_serisi-scaled.jpg',                       out: 'datca.webp'        },
  { src: 'slider_1_pebble_pearl_tokio_gri-scaled.jpg',    out: 'pebble-pearl.webp' },
  { src: 'slider_2_meridyen_yesil-scaled.jpg',            out: 'meridyen.webp'     },
  { src: 'slider_3_leton_bej-scaled.jpg',                 out: 'leton.webp'        },
  { src: 'slider_4_paradise_rain_forest-scaled.jpg',      out: 'paradise.webp'     },
];

(async () => {
  for (const f of files) {
    const srcPath  = path.join(SRC,  f.src);
    const destPath = path.join(DEST, f.out);
    const meta = await sharp(srcPath).metadata();
    await sharp(srcPath)
      .webp({ quality: 93, effort: 5, lossless: false })
      .toFile(destPath);
    const inSz  = (fs.statSync(srcPath).size  / 1024).toFixed(0);
    const outSz = (fs.statSync(destPath).size / 1024).toFixed(0);
    console.log(`${f.out}  ${meta.width}x${meta.height}  ${inSz}KB -> ${outSz}KB`);
  }
  console.log('Done.');
})();
