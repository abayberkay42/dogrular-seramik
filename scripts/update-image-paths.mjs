/**
 * etili-categories.ts içindeki eski grup image path'lerini
 * yeni seri-bazlı path'lerle değiştirir.
 */
import { readFileSync, writeFileSync } from 'fs'

const FILE = 'D:/Claude-skil/dogrular-seramik/lib/etili-categories.ts'

// seri ismi (normalize edilmiş) → webp dosya adı (uzantısız)
const MAP = {
  // Beyaz ve Siyah
  assos: 'ayazma', athena: 'athena', ayazma: 'ayazma',
  calacatta: 'calacatta', marmo: 'marmo', milet: 'milet',
  nepal: 'nepal', river: 'river', nova: 'napoli',
  napoli: 'napoli', nevada: 'nevada', nil: 'nil',
  straton: 'straton', gordion: 'gordion', kartal: 'kartal',
  leodikya: 'leodikya', leton: 'leton', malibu: 'maydos',
  maydos: 'maydos', fortis: 'fortis',
  // Mermer
  armada: 'armada', gediz: 'gediz', hatay: 'hatay', zenith: 'zenith',
  aspendos: 'aspendos', riva: 'riva', nox: 'nox', perge: 'perge',
  finike: 'finike', plain: 'plain', sava: 'sava', sardes: 'sardes',
  alanya: 'alanya', atlantis: 'atlantis', bolu: 'bolu', dover: 'dover',
  efes: 'efes', dalaman: 'dalaman', emperador: 'emperador',
  eternal: 'eternal', himalaya: 'himalaya', karya: 'karya',
  marbella: 'marbella', meridyen: 'meridyen', mezo: 'mezo',
  mira: 'mira', mumbai: 'mumbai', olimpos: 'olimpos',
  serenity: 'serenity', sevilla: 'sevilla', paonazzo: 'paonazzo',
  tinda: 'tinda', toros: 'toros', travertine: 'travertine',
  vega: 'vega', demre: 'demre', simena: 'simena', hazar: 'hazar',
  royal: 'royal', paros: 'paros', rodos: 'rodos', datca: 'datca',
  spider: 'spider', meram: 'meram', sandmar: 'sandmar',
  // Taş
  milas: 'milas', cakiltasi: 'cakil-tasi', belgiumstone: 'belgium-stone',
  granit: 'granit', karalps: 'karalps', patara: 'patara',
  oxide: 'oxide', stoneblast: 'stone-blast', petra: 'petra',
  troya: 'troya', naya: 'naya', boston: 'boston', sorgun: 'sorgun',
  gravel: 'gravel', pebble: 'pebble', sand: 'sand', atmos: 'atmos',
  agrea: 'agrea', antares: 'antares', best: 'best', bluestone: 'bluestone',
  terazzo: 'terazzo',
  // Beton
  cementino: 'cementino', cerastone: 'cerastone', horizon: 'horizon',
  kreastone: 'kreastone', molde: 'molde', town: 'town',
  heraklion: 'heraklion', cemento: 'cemento', tokio: 'tokio',
  // Onyx
  onix: 'onix', onicemoon: 'onice-moon', onice: 'onice',
  florida: 'florida', paradise: 'paradise',
  // Dekor
  scintilla: 'scintilla', siena: 'siena', verona: 'verona',
  washington: 'washington', arya: 'arya', apollon: 'apollon',
  banyeres: 'banyeres', barcelona: 'barcelona', brixton: 'brixton',
  bursa: 'bursa', brianna: 'brianna', chateau: 'chateau',
  carlingford: 'carlingford', doveverona: 'dove-verona', dorset: 'dorset',
  darwin: 'darwin', durham: 'durham', eagle: 'eagle', firenze: 'firenze',
  kappadokya: 'kappadokya', ledbury: 'ledbury', lisbone: 'lisbone',
  milan: 'milan', mansa: 'mansa', merona: 'mansa', milton: 'milton',
  musana: 'mansa', venice: 'venice', keten: 'keten',
  // Ahşap
  mese: 'mese', panwall: 'panwall', sedir: 'sedir', woodline: 'woodline',
  burgaz: 'burgaz', mersin: 'mersin', parke: 'parke',
  beldevere: 'beldevere', forest: 'forest', teras: 'teras', lapland: 'lapland',
  // Havuz
  belize: 'belize',
}

function normalize(str) {
  return str.toLowerCase()
    .replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g')
    .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ü/g,'u')
    .replace(/[^a-z0-9]/g,'')
}

const lines = readFileSync(FILE, 'utf8').split('\n')
const out = []
let updated = 0
let currentSeri = null

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  // seri isim satırını yakala
  const isimMatch = line.match(/^\s+isim: '([^']+)',/)
  if (isimMatch) {
    currentSeri = isimMatch[1]
  }

  // image satırını güncelle
  const imgMatch = line.match(/^(\s+)image: '\/images\/koleksiyon\/[^']+',/)
  if (imgMatch && currentSeri) {
    const key = normalize(currentSeri)
    const webp = MAP[key]
    if (webp) {
      out.push(`${imgMatch[1]}image: '/images/koleksiyon/${webp}.webp',`)
      updated++
      continue
    }
  }

  out.push(line)
}

writeFileSync(FILE, out.join('\n'), 'utf8')
console.log(`Güncellendi: ${updated} image satırı`)

// Kontrol
const verify = readFileSync(FILE, 'utf8').split('\n').filter(l => l.includes('image:'))
console.log('\nİlk 12 image satırı:')
verify.slice(0, 12).forEach(l => console.log(' ', l.trim()))
console.log('\nEski grup path kontrolü (bvs-, mermer-p, tas-p vs):')
const old = readFileSync(FILE, 'utf8').split('\n').filter(l => l.includes('image:') && (l.includes('-p1') || l.includes('-p2') || l.includes('bvs-') || l.includes('mermer-') || l.includes('tas-') || l.includes('beton-') || l.includes('onyx-')))
console.log('Kalan eski path sayısı:', old.length)
