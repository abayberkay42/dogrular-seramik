/**
 * Doğrular Seramik'in çalıştığı markalar.
 *
 * `href` site içindeki ilgili ürün bölümüne, `site` üreticinin kendi
 * sayfasına gider.
 */

export interface Marka {
  slug: string
  name: string
  kategori: string
  description: string
  /** Site içi ürün bölümü */
  href: string
  /** Üreticinin resmi sitesi */
  site?: string
  accent: string
  /** Bu markadan sitede listelenen ürün/seri özeti */
  ozet?: string
}

/** Logo şeridinde görünen markalar — kart listesinden daha geniştir.
 *  `dikey`: logo dikey kompozisyonda, şeritte daha yüksek kutu alır. */
export interface MarkaLogo {
  slug: string
  ad: string
  dikey?: boolean
}

export const MARKA_LOGOLARI: MarkaLogo[] = [
  { slug: 'etili-seramik',    ad: 'Etili Seramik', dikey: true },
  { slug: 'turkuaz-seramik',  ad: 'Turkuaz Seramik' },
  { slug: 'vitra',            ad: 'VitrA' },
  { slug: 'kutahya-seramik',  ad: 'Kütahya Seramik' },
  { slug: 'graniser-seramik', ad: 'Graniser Seramik' },
  { slug: 'anka-seramik',     ad: 'Anka Seramik' },
  { slug: 'balneom',          ad: 'Balneom' },
  { slug: 'duxxa',            ad: 'Duxxa' },
  { slug: 'kyk',              ad: 'Kütahya Yapı Kimyasalları' },
  { slug: 'matkim',           ad: 'Matkim' },
  { slug: 'weber',            ad: 'Weber' },
  { slug: 'firat-boru',       ad: 'Fırat Boru' },
]

export const MARKALAR: Marka[] = [
  {
    slug: 'etili-seramik',
    name: 'Etili Seramik',
    kategori: 'Porselen Seramik',
    description:
      'Büyük format porselen yüzeyler. Mermer, ahşap, beton, taş ve onyx dokularında geniş koleksiyon yelpazesi.',
    href: '/koleksiyonlar',
    site: 'https://etiliseramik.com',
    accent: '#c8a96e',
    ozet: 'Koleksiyonlar',
  },
  {
    slug: 'turkuaz-seramik',
    name: 'Turkuaz Seramik · CeraStyle',
    kategori: 'Vitrifiye',
    description:
      'Antibakteriyel Clean Active teknolojisi ve ödüllü tasarımlarıyla lavabo, klozet, armatür ve duş sistemleri.',
    href: '/vitrifiye',
    site: 'https://www.turkuazseramik.com.tr',
    accent: '#4fb3b8',
    ozet: 'Vitrifiye ürünleri',
  },
  {
    slug: 'balneom',
    name: 'Balneom',
    kategori: 'Banyo Mobilyası',
    description:
      'Lavabo dolapları, boy dolapları, aynalı üst modüller ve çamaşır makinesi dolaplarıyla banyo mobilyası çözümleri.',
    href: '/banyo-mobilyalari',
    site: 'https://www.balneom.com',
    accent: '#8ca8c0',
    ozet: 'Banyo mobilyaları',
  },
  {
    slug: 'kyk',
    name: 'Kütahya Yapı Kimyasalları',
    kategori: 'Yapı Kimyasalı',
    description:
      'Yapıştırıcı, derz dolgu, su yalıtım, tamir harcı, zemin kaplama, sıva ve astar gruplarında geniş ürün ailesi.',
    href: '/kimyasal-urunler#kyk',
    site: 'https://www.kyk.com.tr',
    accent: '#b08f6a',
    ozet: 'Kimyasal ürünler',
  },
  {
    slug: 'matkim',
    name: 'Matkim Yapı Kimyasalları',
    kategori: 'Yapı Kimyasalı',
    description:
      'Derz dolgu, ince ve kaba sıva, yalıtım harçları ile yapıştırma harçları gruplarında hazır harç çözümleri.',
    href: '/kimyasal-urunler#matkim',
    site: 'https://www.matkim.com.tr',
    accent: '#7d9a6d',
    ozet: 'Kimyasal ürünler',
  },
  {
    slug: 'vitra',
    name: 'VitrA',
    kategori: 'Karo Seramik',
    description:
      'PRO serisi genel katalogları, özel kategori ve sistem katalogları ile geniş karo seramik arşivi.',
    href: '/kataloglar',
    site: 'https://www.vitra.com.tr',
    accent: '#9c8fa8',
    ozet: 'Kataloglar',
  },
]
