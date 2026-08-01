import { ETILI_KATEGORILER } from './etili-categories'
import { VITRIFIYE_SERIES, VITRIFIYE_CATEGORIES } from './vitrifiye-data'
import { KIMYASAL_MARKALAR } from './kimyasal-data'
import { BANYO_MOBILYALARI } from './banyo-mobilya-data'
import { BLOG_YAZILARI } from './blog-data'
import { MARKALAR, MARKA_LOGOLARI } from './marka-data'
import { BOLUMLER } from './katalog-data'

export type ResultType =
  | 'kategori'
  | 'seri'
  | 'vitrifiye'
  | 'sayfa'
  | 'kimyasal'
  | 'mobilya'
  | 'blog'
  | 'marka'
  | 'katalog'

export interface SearchEntry {
  id: string
  type: ResultType
  typeLabel: string
  title: string
  subtitle: string
  keywords: string[]
  href: string
  image?: string
}

function seriSlug(isim: string): string {
  return isim
    .toLowerCase()
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .trim()
}

const INDEX: SearchEntry[] = []
const _seen = new Set<string>()

function uid(base: string): string {
  if (!_seen.has(base)) { _seen.add(base); return base }
  let n = 2
  while (_seen.has(`${base}--${n}`)) n++
  _seen.add(`${base}--${n}`)
  return `${base}--${n}`
}

// ── 1. Etili Seramik kategorileri ─────────────────────────────────────────
for (const kat of ETILI_KATEGORILER) {
  INDEX.push({
    id: uid(`kat::${kat.slug}`),
    type: 'kategori',
    typeLabel: 'Kategori',
    title: kat.isim,
    subtitle: `${kat.isimEn} · ${kat.seriler.length} Seri`,
    keywords: [kat.isim, kat.isimEn, kat.aciklama],
    href: `/koleksiyonlar/kategori/${kat.slug}`,
  })

  // ── 2. Her kategorinin serileri ──────────────────────────────────────────
  for (const seri of kat.seriler) {
    const uniqueColors = [...new Set(seri.boyutlar.map((v) => v.renk))]
    const uniqueSizes  = [...new Set(seri.boyutlar.map((v) => v.boyut))]
    INDEX.push({
      id: uid(`seri::${kat.slug}::${seriSlug(seri.isim)}`),
      type: 'seri',
      typeLabel: 'Seri',
      title: seri.isim,
      subtitle: kat.isim,
      keywords: [
        seri.isim,
        kat.isim,
        kat.isimEn,
        ...uniqueColors,
        ...uniqueSizes,
      ],
      href: `/koleksiyonlar/kategori/${kat.slug}/${seriSlug(seri.isim)}`,
      image: seri.image,
    })
  }
}

// ── 3. Vitrifiye serileri ──────────────────────────────────────────────────
for (const vs of VITRIFIYE_SERIES) {
  const catLabel = VITRIFIYE_CATEGORIES.find((c) => c.slug === vs.category)?.label ?? ''
  INDEX.push({
    id: uid(`vt::${vs.slug}`),
    type: 'vitrifiye',
    typeLabel: 'Vitrifiye',
    title: vs.name,
    subtitle: catLabel,
    keywords: [vs.name, catLabel, vs.description, ...vs.colors, ...vs.tags],
    href: `/vitrifiye/${vs.category}`,
  })
}

// ── 4. Vitrifiye kategorileri ──────────────────────────────────────────────
for (const cat of VITRIFIYE_CATEGORIES) {
  const seriler = VITRIFIYE_SERIES.filter((s) => s.category === cat.slug)
  INDEX.push({
    id: uid(`vtcat::${cat.slug}`),
    type: 'vitrifiye',
    typeLabel: 'Vitrifiye',
    title: cat.label,
    subtitle: `${seriler.length} seri`,
    keywords: [cat.label, cat.description, ...seriler.map((s) => s.name)],
    href: `/vitrifiye/${cat.slug}`,
  })
}

// ── 5. Yapı kimyasalları ───────────────────────────────────────────────────
for (const marka of KIMYASAL_MARKALAR) {
  for (const kat of marka.kategoriler) {
    for (const u of kat.urunler) {
      INDEX.push({
        id: uid(`km::${marka.slug}::${kat.slug}::${u.name}`),
        type: 'kimyasal',
        typeLabel: 'Yapı Kimyasalı',
        title: u.name,
        subtitle: `${marka.name} · ${kat.label}`,
        keywords: [u.name, marka.name, kat.label],
        href: `/kimyasal-urunler#${marka.slug}`,
        image: u.img,
      })
    }
  }
}

// ── 6. Banyo mobilyaları ───────────────────────────────────────────────────
for (const m of BANYO_MOBILYALARI) {
  INDEX.push({
    id: uid(`bm::${m.slug}`),
    type: 'mobilya',
    typeLabel: 'Banyo Mobilyası',
    title: m.name,
    subtitle: m.detay ?? 'Banyo mobilyası',
    keywords: [m.name, m.detay ?? '', 'banyo dolabı', 'lavabo dolabı'],
    href: '/banyo-mobilyalari',
    image: m.img,
  })
}

// ── 7. Blog yazıları ───────────────────────────────────────────────────────
for (const y of BLOG_YAZILARI) {
  INDEX.push({
    id: uid(`blog::${y.slug}`),
    type: 'blog',
    typeLabel: 'Blog',
    title: y.baslik,
    subtitle: `${y.kategori} · ${y.okuma} dk okuma`,
    keywords: ['blog', 'rehber', y.baslik, y.ozet, y.kategori, ...y.etiketler],
    href: `/blog/${y.slug}`,
    image: y.kapak,
  })
}

// ── 8. Markalar ────────────────────────────────────────────────────────────
for (const logo of MARKA_LOGOLARI) {
  const kart = MARKALAR.find((m) => m.name.includes(logo.ad) || logo.ad.includes(m.name))
  INDEX.push({
    id: uid(`marka::${logo.slug}`),
    type: 'marka',
    typeLabel: 'Marka',
    title: logo.ad,
    subtitle: kart?.kategori ?? 'Çalıştığımız marka',
    keywords: [logo.ad, kart?.kategori ?? '', kart?.description ?? ''],
    href: kart?.href ?? '/markalarimiz',
    image: `/images/markalar/${logo.slug}.webp`,
  })
}

// ── 9. Kataloglar ──────────────────────────────────────────────────────────
for (const bolum of BOLUMLER) {
  for (const k of bolum.kataloglar) {
    INDEX.push({
      id: uid(`kat-pdf::${k.id}`),
      type: 'katalog',
      typeLabel: 'Katalog',
      title: `${k.baslik}${k.yil ? ` ${k.yil}` : ''}`,
      subtitle: `${k.marka} · PDF`,
      keywords: [k.baslik, k.marka, bolum.baslik, k.yil ?? '', 'katalog', 'pdf'],
      href: '/kataloglar',
    })
  }
}

// ── 10. Sabit sayfalar ─────────────────────────────────────────────────────
const SAYFALAR: Array<{ title: string; subtitle: string; href: string; kw: string[] }> = [
  { title: 'Koleksiyonlar', subtitle: 'Etili Seramik porselen koleksiyonları',
    href: '/koleksiyonlar', kw: ['koleksiyon', 'seramik', 'porselen', 'karo'] },
  { title: 'Vitrifiye Ürünleri', subtitle: 'Lavabo, klozet, armatür, duş',
    href: '/vitrifiye', kw: ['vitrifiye', 'lavabo', 'klozet', 'armatür', 'duş', 'banyo'] },
  { title: 'Kimyasal Ürünler', subtitle: 'KYK ve Matkim yapı kimyasalları',
    href: '/kimyasal-urunler', kw: ['yapı kimyasalı', 'yapıştırıcı', 'derz', 'sıva', 'astar', 'su yalıtım'] },
  { title: 'Banyo Mobilyaları', subtitle: 'Lavabo dolabı ve boy dolabı modelleri',
    href: '/banyo-mobilyalari', kw: ['banyo mobilyası', 'dolap', 'lavabo dolabı', 'boy dolabı', 'balneom'] },
  { title: 'Kataloglar', subtitle: 'Ürün kataloglarını PDF olarak inceleyin',
    href: '/kataloglar', kw: ['katalog', 'pdf', 'broşür'] },
  { title: 'Markalarımız', subtitle: 'Çalıştığımız markalar',
    href: '/markalarimiz', kw: ['marka', 'markalar', 'bayi'] },
  { title: 'Blog', subtitle: 'Seramik ve banyo rehberi',
    href: '/blog', kw: ['blog', 'rehber', 'yazı', 'makale'] },
  { title: 'Hakkımızda', subtitle: 'Doğrular Seramik & Yapı',
    href: '/hakkimizda', kw: ['hakkımızda', 'firma', 'showroom', 'hatay', 'antakya'] },
  { title: 'İletişim', subtitle: 'Hatay Antakya showroom',
    href: '/iletisim', kw: ['iletişim', 'adres', 'telefon', 'harita', 'showroom', 'hatay', 'antakya'] },
  { title: 'Örnek İste', subtitle: 'Ücretsiz seramik örneği talebi',
    href: '/ornek-iste', kw: ['örnek', 'numune', 'ücretsiz'] },
]

for (const s of SAYFALAR) {
  INDEX.push({
    id: uid(`sayfa::${s.href}`),
    type: 'sayfa',
    typeLabel: 'Sayfa',
    title: s.title,
    subtitle: s.subtitle,
    keywords: [s.title, s.subtitle, ...s.kw],
    href: s.href,
  })
}

// ── Search function ────────────────────────────────────────────────────────
export function search(query: string, limit = 14): SearchEntry[] {
  if (!query.trim()) return []
  const q = normalize(query)

  const scored = INDEX.map((entry) => {
    const t   = normalize(entry.title)
    const s   = normalize(entry.subtitle)
    const kws = entry.keywords.map(normalize)

    let score = 0
    if (t === q)              score += 100
    else if (t.startsWith(q)) score += 80
    else if (t.includes(q))   score += 60
    if (s.includes(q))         score += 25
    for (const kw of kws) {
      if (kw === q)              score += 40
      else if (kw.startsWith(q)) score += 25
      else if (kw.includes(q))   score += 10
    }
    return { entry, score }
  })

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry)
}
