export interface VitrifiyeSeries {
  slug: string
  name: string
  category: VitrifiyeCategory
  description: string
  colors: string[]
  variants: VitrifiyeVariant[]
  tags: string[]
  isNew?: boolean
  hasCleanActive?: boolean
  hasAwardDesign?: boolean
  image?: string
}

export interface VitrifiyeVariant {
  name: string
  dimensions: string
  priceWhite?: number
  priceColored?: number
  note?: string
}

export type VitrifiyeCategory =
  | 'etajerli-lavabolar'
  | 'tezgahustu-lavabolar'
  | 'tezgah-alti-lavabolar'
  | 'klozet-takimlari'
  | 'araturler'
  | 'dus-sistemleri'
  | 'tamamlayici'

export const VITRIFIYE_CATEGORIES: {
  slug: VitrifiyeCategory
  label: string
  description: string
  icon: string
}[] = [
  {
    slug: 'etajerli-lavabolar',
    label: 'Etajerlı Lavabolar',
    description: 'Dolaplarınızı koruyan damlalik tasarımlı etajerlı lavabo serileri',
    icon: '⬛',
  },
  {
    slug: 'tezgahustu-lavabolar',
    label: 'Tezgahüstü Lavabolar',
    description: 'Tezgah üstüne oturan, estetik ve işlevsel lavabo serileri',
    icon: '⬜',
  },
  {
    slug: 'tezgah-alti-lavabolar',
    label: 'Tezgahaltı Lavabolar',
    description: 'Tezgah altına monte edilen gizli montaj lavabo çözümleri',
    icon: '▪',
  },
  {
    slug: 'klozet-takimlari',
    label: 'Klozet Takımları',
    description: 'Rimless kanalsız yıkama teknolojili klozet ve lavabo takımları',
    icon: '◻',
  },
  {
    slug: 'araturler',
    label: 'Armatürler',
    description: 'Lavabo, banyo ve mutfak bataryaları — çoklu renk seçenekleriyle',
    icon: '⚙',
  },
  {
    slug: 'dus-sistemleri',
    label: 'Duş Sistemleri',
    description: 'Duş setleri ve ankastre duş sistemleri',
    icon: '🚿',
  },
  {
    slug: 'tamamlayici',
    label: 'Tamamlayıcı Ürünler',
    description: 'Rezervuar, klozet kapağı, gömme rezervuar ve aksesuarlar',
    icon: '🔧',
  },
]

export const VITRIFIYE_SERIES: VitrifiyeSeries[] = [
  // ─── ETAJERLİ LAVABOLAR ────────────────────────────────────────────
  {
    slug: 'biza',
    name: 'İbiza Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Estetik ve işlevselliği ödüllü tasarımla buluşturan İbiza, iF Design, Good Design ve A\'Design ödüllerine sahip Rimless Asma Klozet ile uyumlu etajerlı lavabo serisidir.',
    colors: ['Beyaz'],
    tags: ['ödüllü-tasarım', 'geniş-format'],
    hasAwardDesign: true,
    image: '/images/vitrifiye/series/biza.webp',
    variants: [
      { name: 'İbiza Etajerli Lavabo', dimensions: '61x51 cm', priceWhite: 5720 },
      { name: 'İbiza Etajerli Lavabo', dimensions: '71x51 cm', priceWhite: 6500 },
      { name: 'İbiza Etajerli Lavabo', dimensions: '81x51 cm', priceWhite: 7340 },
      { name: 'İbiza Etajerli Lavabo', dimensions: '91x51 cm', priceWhite: 9000 },
      { name: 'İbiza Etajerli Lavabo', dimensions: '101x51 cm', priceWhite: 9980 },
      { name: 'İbiza Etajerli Lavabo (Tek Hazneli)', dimensions: '121x51 cm', priceWhite: 21340 },
      { name: 'İbiza Etajerli Lavabo (Çift Hazneli, Çift Batarya)', dimensions: '121x51 cm', priceWhite: 22700 },
    ],
  },
  {
    slug: 'arte-plus',
    name: 'Arte Plus Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Tüm çevresini saran zarif damlalık tasarımıyla su damlalarının dışarı taşmasını önler; dolaplarınızın ilk günkü görünümünü uzun yıllar korur.',
    colors: ['Beyaz'],
    tags: ['yeni', 'clean-active', 'damlalık'],
    isNew: true,
    hasCleanActive: true,
    image: '/images/vitrifiye/series/arte-plus.webp',
    variants: [
      { name: 'Arte Plus Lavabo', dimensions: '45x36 cm', priceWhite: 2450, priceColored: 3180 },
      { name: 'Arte Plus Lavabo', dimensions: '55x36 cm', priceWhite: 2840, priceColored: 3684 },
      { name: 'Arte Plus Lavabo', dimensions: '65x45 cm', priceWhite: 3900, priceColored: 5052 },
      { name: 'Arte Plus Lavabo', dimensions: '75x45 cm', priceWhite: 4460, priceColored: 5808 },
      { name: 'Arte Plus Lavabo', dimensions: '80x45 cm', priceWhite: 4800, priceColored: 6240 },
      { name: 'Arte Plus Lavabo', dimensions: '85x45 cm', priceWhite: 5280, priceColored: 6864 },
      { name: 'Arte Plus Lavabo', dimensions: '100x45 cm', priceWhite: 6540, priceColored: 8502 },
    ],
  },
  {
    slug: 'kapadokya',
    name: 'Kapadokya Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Doğal taş dokusundan ilham alan Kapadokya Serisi, 5 farklı renk seçeneğiyle her banyo stiline uyum sağlar.',
    colors: ['Beyaz', 'Mat Siyah', 'Mat Beyaz', 'Mat Kapuçino', 'Mat Gri', 'Parlak Siyah'],
    tags: ['çok-renkli', 'doğal-taş'],
    image: '/images/vitrifiye/series/kapadokya.webp',
    variants: [
      { name: 'Kapadokya Etajerli Lavabo', dimensions: '65x48 cm', priceWhite: 5150, priceColored: 8240, note: '5 renk seçeneği' },
      { name: 'Kapadokya Etajerli Lavabo', dimensions: '80x48 cm', priceWhite: 6150, priceColored: 9850, note: '5 renk seçeneği' },
      { name: 'Kapadokya Etajerli Lavabo', dimensions: '100x48 cm', priceWhite: 8470, priceColored: 13550, note: '5 renk seçeneği' },
    ],
  },
  {
    slug: 'blue',
    name: 'Blue Serisi',
    category: 'etajerli-lavabolar',
    description:
      'İF Design, Good Design ve A\'Design ödüllü Blue Lavabo, yan kenarlarda su damlalığı detayıyla dolaplarınızı korur.',
    colors: ['Beyaz'],
    tags: ['ödüllü-tasarım', 'clean-active', 'damlalık'],
    hasAwardDesign: true,
    hasCleanActive: true,
    image: '/images/vitrifiye/series/blue.webp',
    variants: [
      { name: 'Blue Etajerli Lavabo', dimensions: '50x36,5 cm', priceWhite: 3100, priceColored: 4024 },
      { name: 'Blue Etajerli Lavabo', dimensions: '60x47 cm', priceWhite: 4020, priceColored: 5227 },
      { name: 'Blue Etajerli Lavabo', dimensions: '65x47 cm', priceWhite: 4500, priceColored: 5865 },
      { name: 'Blue Etajerli Lavabo', dimensions: '70x47 cm', priceWhite: 5120, priceColored: 6655 },
      { name: 'Blue Etajerli Lavabo', dimensions: '80x47 cm', priceWhite: 6070, priceColored: 7882 },
      { name: 'Blue Etajerli Lavabo', dimensions: '100x47 cm', priceWhite: 7070, priceColored: 9192 },
      { name: 'Blue Etajerli Lavabo (Seramik Kapaklı)', dimensions: '60x38 cm', priceWhite: 4000, priceColored: 4803 },
      { name: 'Blue Etajerli Lavabo (Seramik Kapaklı)', dimensions: '80x38 cm', priceWhite: 5020, priceColored: 6520 },
    ],
  },
  {
    slug: 'arya',
    name: 'Arya Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Tek dolap ile 4 farklı lavabo kullanım esnekliği sunar (Arya-Frame-Elite-Yeni Mona). Yan damlalık detayıyla dolaplarınızı korur.',
    colors: ['Beyaz'],
    tags: ['esnek-uyum', '4-lavabo-uyumu'],
    image: '/images/vitrifiye/series/arya.webp',
    variants: [
      { name: 'Arya Etajerli Lavabo', dimensions: '60x45 cm', priceWhite: 3880 },
      { name: 'Arya Etajerli Lavabo', dimensions: '80x45 cm', priceWhite: 5250 },
      { name: 'Arya Etajerli Lavabo', dimensions: '100x45 cm', priceWhite: 6530 },
      { name: 'Arya Etajerli Lavabo', dimensions: '120x45 cm', priceWhite: 11200 },
    ],
  },
  {
    slug: 'elite',
    name: 'Elite Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Tek dolap ile 4 farklı lavabo kullanım esnekliği sunan Elite, Clean Active antibakteriyel kaplama seçeneğiyle sunulmaktadır.',
    colors: ['Beyaz'],
    tags: ['clean-active', '4-lavabo-uyumu'],
    hasCleanActive: true,
    image: '/images/vitrifiye/series/elite.webp',
    variants: [
      { name: 'Elite Etajerli Lavabo', dimensions: '60x45 cm', priceWhite: 3430, priceColored: 4649 },
      { name: 'Elite Etajerli Lavabo', dimensions: '70x45 cm', priceWhite: 4140, priceColored: 5511 },
      { name: 'Elite Etajerli Lavabo', dimensions: '80x45 cm', priceWhite: 4790, priceColored: 6148 },
      { name: 'Elite Etajerli Lavabo', dimensions: '90x45 cm', priceWhite: 5270, priceColored: 7021 },
      { name: 'Elite Etajerli Lavabo', dimensions: '100x45 cm', priceWhite: 5820, priceColored: 7930 },
      { name: 'Elite Etajerli Lavabo', dimensions: '120x45 cm', priceWhite: 9950, priceColored: 12933 },
      { name: 'Elite Etajerli Lavabo (Çift Hazneli Çift Delikli)', dimensions: '120x45 cm', priceWhite: 10700, priceColored: 13900 },
    ],
  },
  {
    slug: 'frame',
    name: 'Frame Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Geometrik çizgileriyle modern banyolara uyum sağlayan Frame, Clean Active seçeneği ve geniş boyut aralığıyla dikkat çeker.',
    colors: ['Beyaz'],
    tags: ['clean-active', '4-lavabo-uyumu'],
    hasCleanActive: true,
    image: '/images/vitrifiye/series/frame.webp',
    variants: [
      { name: 'Frame Etajerli Lavabo (Sağdan Bataryalı)', dimensions: '50x28 cm', priceWhite: 2195, priceColored: 2856 },
      { name: 'Frame Etajerli Lavabo (Soldan Bataryalı)', dimensions: '50x28 cm', priceWhite: 2195, priceColored: 2856 },
      { name: 'Frame Etajerli Lavabo', dimensions: '50x38 cm', priceWhite: 2900, priceColored: 3764 },
      { name: 'Frame Etajerli Lavabo', dimensions: '60x45 cm', priceWhite: 3430, priceColored: 4464 },
      { name: 'Frame Etajerli Lavabo', dimensions: '65x45 cm', priceWhite: 3800, priceColored: 4944 },
      { name: 'Frame Etajerli Lavabo', dimensions: '70x45 cm', priceWhite: 4140, priceColored: 5388 },
      { name: 'Frame Etajerli Lavabo', dimensions: '80x45 cm', priceWhite: 4790, priceColored: 6228 },
      { name: 'Frame Etajerli Lavabo', dimensions: '90x45 cm', priceWhite: 5270, priceColored: 6852 },
      { name: 'Frame Etajerli Lavabo', dimensions: '100x45 cm', priceWhite: 5820, priceColored: 7572 },
    ],
  },
  {
    slug: 'yeni-mona',
    name: 'Yeni Mona Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Şık ve sade tasarımıyla 4 farklı seri uyumuyla (Arya-Frame-Elite-Yeni Mona) tek dolapta çoklu seçenek sunan Yeni Mona.',
    colors: ['Beyaz'],
    tags: ['4-lavabo-uyumu'],
    image: '/images/vitrifiye/series/yeni-mona.webp',
    variants: [
      { name: 'Yeni Mona Etajerli Lavabo', dimensions: '60x45 cm', priceWhite: 3520 },
      { name: 'Yeni Mona Etajerli Lavabo', dimensions: '80x45 cm', priceWhite: 5000 },
      { name: 'Yeni Mona Etajerli Lavabo', dimensions: '100x45 cm', priceWhite: 6200 },
    ],
  },
  {
    slug: 'anova',
    name: 'Anova Serisi',
    category: 'etajerli-lavabolar',
    description: 'Geniş derinliği (50 cm) ile konforlu kullanım sunan Anova, şık hatlarıyla modern banyolar için tasarlanmıştır.',
    colors: ['Beyaz'],
    tags: ['geniş-derinlik'],
    image: '/images/vitrifiye/series/anova.webp',
    variants: [
      { name: 'Anova Etajerli Lavabo', dimensions: '65x50 cm', priceWhite: 4400 },
      { name: 'Anova Etajerli Lavabo', dimensions: '80x50 cm', priceWhite: 5340 },
      { name: 'Anova Etajerli Lavabo', dimensions: '100x50 cm', priceWhite: 6600 },
    ],
  },
  {
    slug: 'luna',
    name: 'Luna Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Tüm kenarları saran su damlalığı detayıyla dolapları tamamen koruyan Luna, 2026 yeni koleksiyonuna dahil edilmiştir.',
    colors: ['Beyaz'],
    tags: ['yeni', 'damlalık'],
    isNew: true,
    image: '/images/vitrifiye/series/luna.webp',
    variants: [
      { name: 'Luna Etajerli Lavabo', dimensions: '50x38 cm', priceWhite: 3360 },
      { name: 'Luna Etajerli Lavabo', dimensions: '60x46 cm', priceWhite: 3865 },
      { name: 'Luna Etajerli Lavabo', dimensions: '65x46 cm', priceWhite: 3965 },
      { name: 'Luna Etajerli Lavabo', dimensions: '80x46 cm', priceWhite: 5390 },
      { name: 'Luna Etajerli Lavabo', dimensions: '100x46 cm', note: 'Yakında' },
    ],
  },
  {
    slug: 'porto',
    name: 'Porto Serisi',
    category: 'etajerli-lavabolar',
    description: '38 cm derinliğiyle dar banyolara özel tasarlanmış Porto, 125 cm genişliğe kadar büyük format seçeneği sunar.',
    colors: ['Beyaz'],
    tags: ['dar-derinlik'],
    image: '/images/vitrifiye/series/porto.webp',
    variants: [
      { name: 'Porto Etajerli Lavabo', dimensions: '55x38 cm', priceWhite: 2710 },
      { name: 'Porto Etajerli Lavabo', dimensions: '65x38 cm', priceWhite: 3300 },
      { name: 'Porto Etajerli Lavabo', dimensions: '85x38 cm', priceWhite: 4180 },
      { name: 'Porto D Etajerli Lavabo', dimensions: '125x48 cm', priceWhite: 15140 },
    ],
  },
  {
    slug: 'sharp',
    name: 'Sharp Serisi',
    category: 'etajerli-lavabolar',
    description:
      'Keskin geometrik hatlarıyla öne çıkan Sharp, 6 renk seçeneği (Beyaz, Mat Siyah, Mat Beyaz, Mat Kapuçino, Mat Gri, Parlak Siyah) ve geniş boyut aralığıyla her tarzı karşılar.',
    colors: ['Beyaz', 'Mat Siyah', 'Mat Beyaz', 'Mat Kapuçino', 'Mat Gri', 'Parlak Siyah'],
    tags: ['çok-renkli', 'geometrik'],
    image: '/images/vitrifiye/series/sharp.webp',
    variants: [
      { name: 'Sharp Etajerli Lavabo', dimensions: '40x30 cm', priceWhite: 2610, priceColored: 4170 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '48x48 cm', priceWhite: 4100, priceColored: 6570 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '50x25 cm (Sağdan)', priceWhite: 2220, priceColored: 3550 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '50x25 cm (Soldan)', priceWhite: 2220, priceColored: 3550 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '50x30 cm', priceWhite: 2760, priceColored: 4420 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '60x30 cm (Sağdan)', priceWhite: 3140, priceColored: 5020 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '60x30 cm (Soldan)', priceWhite: 3140, priceColored: 5020 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '60x48 cm', priceWhite: 4910, priceColored: 7850 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '65x38 cm', priceWhite: 3910, priceColored: 6250 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '80x35 cm', priceWhite: 4900, priceColored: 7840 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '80x48 cm', priceWhite: 6360, priceColored: 10180 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '85x38 cm', priceWhite: 5200, priceColored: 8320 },
      { name: 'Sharp Etajerli Lavabo', dimensions: '100x48 cm', priceWhite: 8200, priceColored: 13120 },
      { name: 'Sharp Etajerli Lavabo (Çift Delikli)', dimensions: '100x48 cm', priceWhite: 8650, priceColored: 13840 },
      { name: 'Sharp Etajerli Lavabo (Çift Hazneli)', dimensions: '120x48 cm', priceWhite: 15750, priceColored: 25200 },
    ],
  },
  {
    slug: 'plus',
    name: 'Plus Serisi',
    category: 'etajerli-lavabolar',
    description: 'Derin ve geniş yapısıyla (51 cm derinlik) konforlu kullanım sunan Plus, tek boyutu ile sade bir çözüm üretir.',
    colors: ['Beyaz'],
    tags: [],
    image: '/images/vitrifiye/series/plus.webp',
    variants: [
      { name: 'Plus Etajerli Lavabo', dimensions: '90x51 cm', priceWhite: 5680 },
    ],
  },
  {
    slug: 'lila',
    name: 'Lila Serisi',
    category: 'etajerli-lavabolar',
    description: 'Yumuşak hatları ve geniş derinliğiyle (45-48 cm) ferah bir kullanım alanı sunan Lila Serisi.',
    colors: ['Beyaz'],
    tags: [],
    image: '/images/vitrifiye/series/lila.webp',
    variants: [
      { name: 'Lila Etajerli Lavabo', dimensions: '65x45 cm', priceWhite: 3470 },
      { name: 'Lila Etajerli Lavabo', dimensions: '80x45 cm', priceWhite: 4130 },
      { name: 'Lila Etajerli Lavabo', dimensions: '100x48 cm', priceWhite: 4880 },
    ],
  },
  {
    slug: 'harmony',
    name: 'Harmony Serisi',
    category: 'etajerli-lavabolar',
    description: 'İnce profil tasarımı (sadece 26,4 cm derinlik) ile dar mekanlar için geliştirilmiş Harmony, sağdan ve soldan hazne seçeneği sunar.',
    colors: ['Beyaz'],
    tags: ['dar-derinlik'],
    image: '/images/vitrifiye/series/harmony.webp',
    variants: [
      { name: 'Harmony Etajerli Lavabo (Soldan Hazneli)', dimensions: '65x32x20,5 cm', priceWhite: 4840 },
      { name: 'Harmony Etajerli Lavabo (Sağdan Hazneli)', dimensions: '80x37,5x26,4 cm', priceWhite: 5280 },
      { name: 'Harmony Etajerli Lavabo (Soldan Hazneli)', dimensions: '100x37,5x26,4 cm', priceWhite: 6610 },
      { name: 'Harmony Etajerli Lavabo (Sağdan Hazneli)', dimensions: '100x37,5x26,4 cm', priceWhite: 6610 },
    ],
  },

  // ─── TEZGAH ALTI LAVABOLAR ─────────────────────────────────────────
  {
    slug: 'tezgah-alti-serisi',
    name: 'Tezgah Altı Lavabo Serisi',
    category: 'tezgah-alti-lavabolar',
    description: 'Tezgah altına monte edilen gizli montaj lavabo çözümleri.',
    colors: ['Beyaz'],
    tags: [],
    image: '/images/vitrifiye/series/tezgah-alti-serisi.webp',
    variants: [
      { name: 'Tezgah Altı Lavabo, Suit, Ø38', dimensions: 'Ø38 cm' },
      { name: 'Tezgahaltı Lavabo', dimensions: '35x30 cm' },
      { name: 'Tezgahaltı Lavabo', dimensions: '43x34 cm' },
      { name: 'Tezgahaltı Lavabo', dimensions: '48x39 cm' },
      { name: 'Tezgahaltı Lavabo', dimensions: '55x43 cm' },
      { name: 'Tezgahaltı Lavabo, City', dimensions: '40x55 cm' },
    ],
  },

  // ─── TEZGAHÜSTÜ LAVABOLAR ──────────────────────────────────────────
  {
    slug: 'hera',
    name: 'Hera Serisi',
    category: 'tezgahustu-lavabolar',
    description:
      'İnce kenarlı tezgahüstü lavabo tasarımıyla modern banyolara yakışan Hera, 5 renk seçeneği ve "Duvara Sıfır" modeli ile sunulmaktadır.',
    colors: ['Beyaz', 'Mat Siyah', 'Mat Beyaz', 'Mat Kapuçino', 'Mat Gri', 'Parlak Siyah'],
    tags: ['çok-renkli', 'ince-kenar'],
    image: '/images/vitrifiye/series/hera.webp',
    variants: [
      { name: 'Hera Tezgahüstü Lavabo', dimensions: '40x30 cm', priceWhite: 2770 },
      { name: 'Hera Tezgahüstü Lavabo', dimensions: '48x48 cm', priceWhite: 5780, priceColored: 9250 },
      { name: 'Hera Tezgahüstü Lavabo', dimensions: '50x36 cm', priceWhite: 4340, priceColored: 6950 },
      { name: 'Hera Tezgahüstü Lavabo (Duvara Sıfır)', dimensions: '60x42 cm', priceWhite: 6630, priceColored: 10610 },
      { name: 'Hera Tezgahüstü Lavabo', dimensions: '60x38 cm', priceWhite: 6140, priceColored: 9820 },
      { name: 'Hera Tezgahüstü Lavabo', dimensions: '60x42 cm', priceWhite: 7060, priceColored: 11290 },
      { name: 'Hera Etajerli Lavabo', dimensions: '80x48 cm', priceWhite: 8060, priceColored: 12900 },
    ],
  },
  {
    slug: 'aqua',
    name: 'Aqua Serisi',
    category: 'tezgahustu-lavabolar',
    description:
      'Mikro kabarcıklı su teknolojisiyle donatılmış Aqua, kimyasal kullanmadan derinlemesine temizlik sağlayan yenilikçi armatür uyumu ile sunulmaktadır.',
    colors: ['Beyaz', 'Mat Siyah', 'Mat Beyaz', 'Mat Kapuçino', 'Mat Gri', 'Parlak Siyah'],
    tags: ['çok-renkli', 'micro-bubble-tech'],
    image: '/images/vitrifiye/series/aqua.webp',
    variants: [
      { name: 'Aqua Tezgahüstü Lavabo', dimensions: '75x40 cm (Duvara Sıfır)', priceWhite: 0, priceColored: 0, note: 'Fiyat bilgisi için iletişime geçin' },
      { name: 'Aqua Tezgahüstü Lavabo', dimensions: '80x40 cm', priceWhite: 0, priceColored: 0, note: 'Fiyat bilgisi için iletişime geçin' },
    ],
  },
  {
    slug: 'duru',
    name: 'Duru Serisi',
    category: 'tezgahustu-lavabolar',
    description:
      'Kanalsız yıkama teknolojisiyle üretilmiş Duru, BTW Rimless Klozet ve Asma Klozet alternatifleriyle tam takım çözüm sunar.',
    colors: ['Beyaz'],
    tags: ['rimless', 'kanalsız-yıkama'],
    image: '/images/vitrifiye/series/duru.webp',
    variants: [
      { name: 'Duru Lavabo', dimensions: '35x45 cm', priceWhite: 2670, priceColored: 3471 },
      { name: 'Duru Lavabo', dimensions: '40x50 cm', priceWhite: 3440, priceColored: 4472 },
      { name: 'Duru Lavabo', dimensions: '45x55 cm', priceWhite: 4230, priceColored: 5499 },
      { name: 'Duru Lavabo', dimensions: '50x60 cm', priceWhite: 4650, priceColored: 6045 },
    ],
  },
  {
    slug: 'bella',
    name: 'Bella Serisi',
    category: 'tezgahustu-lavabolar',
    description:
      'Kanalsız yıkama teknolojisiyle (Rimless) üretilmiş Bella, Duvara Sıfır ve Asma Klozet alternatifleriyle tam banyo takımı sunar.',
    colors: ['Beyaz'],
    tags: ['rimless', 'kanalsız-yıkama', 'clean-active'],
    hasCleanActive: true,
    image: '/images/vitrifiye/series/bella.webp',
    variants: [
      { name: 'Bella Lavabo', dimensions: '35x45 cm', priceWhite: 2670, priceColored: 3471 },
      { name: 'Bella Lavabo', dimensions: '40x50 cm', priceWhite: 3440, priceColored: 4472 },
      { name: 'Bella Lavabo', dimensions: '45x55 cm', priceWhite: 4230, priceColored: 5499 },
      { name: 'Bella Lavabo', dimensions: '50x60 cm', priceWhite: 4650, priceColored: 6045 },
      { name: 'Bella Kolon Ayak', dimensions: 'Standart', priceWhite: 2440, priceColored: 3172 },
      { name: 'Bella Yarım Ayak', dimensions: 'Standart', priceWhite: 2100, priceColored: 2730 },
    ],
  },

  // ─── KLOZET TAKIMLARI ──────────────────────────────────────────────
  {
    slug: 'bella-klozet',
    name: 'Bella Klozet Takımları',
    category: 'klozet-takimlari',
    description:
      'Kanalsız yıkama teknolojisiyle üretilmiş Bella Duvara Sıfır ve Bella VORTEX Rimless Klozet takımları — yavaş kapanır kapak dahil paket halinde sunulmaktadır.',
    colors: ['Beyaz'],
    tags: ['rimless', 'kanalsız-yıkama', 'vortex'],
    image: '/images/vitrifiye/series/bella-klozet.webp',
    variants: [
      { name: 'Bella Duvara Sıfır Rimless Klozet Takımı (UF Kapak)', dimensions: 'Standart', priceWhite: 18720 },
      { name: 'Bella Duvara Sıfır Rimless Klozet Takımı (PP Kapak)', dimensions: 'Standart', priceWhite: 17540 },
      { name: 'Bella VORTEX Asma Klozet Takımı (52 cm, UF Kapak)', dimensions: '52 cm', priceWhite: 10760 },
      { name: 'Bella VORTEX Asma Klozet Takımı (52 cm, PP Kapak)', dimensions: '52 cm', priceWhite: 9580 },
      { name: 'Bella Rimless Asma Klozet (48 cm, Gizli Montaj, UF)', dimensions: '48 cm', priceWhite: 10160 },
      { name: 'Bella Rimless Asma Klozet (48 cm, Gizli Montaj, PP)', dimensions: '48 cm', priceWhite: 8980 },
      { name: 'Bella Rimless Asma Klozet (48 cm, Açık Montaj, UF)', dimensions: '48 cm', priceWhite: 10160 },
      { name: 'Bella Rimless Asma Klozet (48 cm, Açık Montaj, PP)', dimensions: '48 cm', priceWhite: 8980 },
    ],
  },
  {
    slug: 'duru-klozet',
    name: 'Duru Klozet Takımları',
    category: 'klozet-takimlari',
    description:
      'Kanalsız yıkama teknolojisiyle üretilmiş Duru BTW Rimless ve Asma Klozet takımları. Bella Rezervuar dahil komple çözüm.',
    colors: ['Beyaz'],
    tags: ['rimless', 'kanalsız-yıkama'],
    image: '/images/vitrifiye/series/duru-klozet.webp',
    variants: [
      { name: 'Duru BTW Rimless Klozet Takımı (Alttan Çıkışlı, PP)', dimensions: 'Standart', priceWhite: 19450 },
      { name: 'Duru BTW Rimless Klozet Takımı (Alttan Çıkışlı, PP Alt)', dimensions: 'Standart', priceWhite: 18270 },
      { name: 'Duru Takım Klozet (Alttan Çıkışlı, PP)', dimensions: 'Standart', priceWhite: 14890 },
      { name: 'Duru Takım Klozet (Arkadan Çıkışlı, PP)', dimensions: 'Standart', priceWhite: 15170 },
      { name: 'Duru Asma Klozet Takımı (PP)', dimensions: 'Standart', priceWhite: 6880 },
    ],
  },

  // ─── ARMATÜRLERi ───────────────────────────────────────────────────
  {
    slug: 'hera-armaturl',
    name: 'Hera Armatür Serisi',
    category: 'araturler',
    description:
      'Hera Serisi armatürler, 4 renk seçeneğiyle (Krom, Mat Gold, Mat Siyah, Gun Metal) geniş bir tercih yelpazesi sunar.',
    colors: ['Krom', 'Mat Gold', 'Mat Siyah', 'Gun Metal'],
    tags: ['çok-renkli', 'çoklu-renk'],
    image: '/images/vitrifiye/series/hera-armaturl.webp',
    variants: [
      { name: 'Hera Lavabo Bataryası', dimensions: '166×152 mm', priceWhite: 5600 },
      { name: 'Hera Yüksek Lavabo Bataryası', dimensions: '215×269 mm', priceWhite: 9100 },
      { name: 'Hera Mutfak Bataryası', dimensions: '215×356 mm', priceWhite: 6200 },
      { name: 'Hera Banyo Bataryası', dimensions: '190×160 mm', priceWhite: 6600 },
      { name: 'Hera Lavabo Bataryası (Mat Gold)', dimensions: '166×152 mm', priceWhite: 6590 },
      { name: 'Hera Yüksek Lavabo Bataryası (Mat Gold)', dimensions: '215×269 mm', priceWhite: 10710 },
      { name: 'Hera Mutfak Bataryası (Mat Gold)', dimensions: '215×356 mm', priceWhite: 7130 },
      { name: 'Hera Banyo Bataryası (Mat Gold)', dimensions: '190×160 mm', priceWhite: 7950 },
      { name: 'Hera Lavabo Bataryası (Mat Siyah)', dimensions: '166×152 mm', priceWhite: 6500 },
      { name: 'Hera Yüksek Lavabo Bataryası (Mat Siyah)', dimensions: '215×269 mm', priceWhite: 10090 },
      { name: 'Hera Mutfak Bataryası (Mat Siyah)', dimensions: '215×356 mm', priceWhite: 6850 },
      { name: 'Hera Banyo Bataryası (Mat Siyah)', dimensions: '190×160 mm', priceWhite: 7380 },
      { name: 'Hera Lavabo Bataryası (Gun Metal)', dimensions: '166×152 mm', priceWhite: 6860 },
      { name: 'Hera Yüksek Lavabo Bataryası (Gun Metal)', dimensions: '215×269 mm', priceWhite: 11140 },
      { name: 'Hera Mutfak Bataryası (Gun Metal)', dimensions: '215×356 mm', priceWhite: 7560 },
      { name: 'Hera Banyo Bataryası (Gun Metal)', dimensions: '190×160 mm', priceWhite: 8360 },
    ],
  },
  {
    slug: 'blue-armatur',
    name: 'Blue Armatür Serisi',
    category: 'araturler',
    description: 'Blue Lavabo ile uyumlu olarak tasarlanan armatür serisi. Banyo, lavabo ve mutfak modelleri.',
    colors: ['Krom'],
    tags: [],
    image: '/images/vitrifiye/series/blue-armatur.webp',
    variants: [
      { name: 'Blue Lavabo Bataryası', dimensions: '188×170 mm', priceWhite: 4950 },
      { name: 'Blue Mutfak Bataryası', dimensions: '215×407 mm', priceWhite: 6600 },
      { name: 'Blue Banyo Bataryası', dimensions: '212×177 mm', priceWhite: 6800 },
    ],
  },
  {
    slug: 'aqua-armatur',
    name: 'Aqua Armatür Serisi',
    category: 'araturler',
    description:
      'Mikro kabarcıklı su teknolojisiyle donatılmış Aqua armatürleri — kimyasal kullanmadan derinlemesine temizlik. Entegreli arıtma su bağlantısı seçeneği.',
    colors: ['Krom'],
    tags: ['micro-bubble-tech'],
    image: '/images/vitrifiye/series/aqua-armatur.webp',
    variants: [
      { name: 'Aqua Lavabo Bataryası', dimensions: '176×184 mm', priceWhite: 4610 },
      { name: 'Aqua Mutfak Bataryası', dimensions: '238×387 mm', priceWhite: 5620 },
      { name: 'Aqua Banyo Bataryası', dimensions: '212×190 mm', priceWhite: 0, note: 'Fiyat için iletişime geçin' },
      { name: 'Aqua Esnek Çıkışlı Mutfak Bataryası (Siyah Hortumlu)', dimensions: '269×497 mm', priceWhite: 0, note: 'Fiyat için iletişime geçin' },
    ],
  },
  {
    slug: 'nova-armatur',
    name: 'Nova Armatür Serisi',
    category: 'araturler',
    description: 'Entegreli arıtma su bağlantısı seçeneğiyle Nova Serisi armatürler. Lavabo, banyo, mutfak modelleri.',
    colors: ['Krom'],
    tags: [],
    image: '/images/vitrifiye/series/nova-armatur.webp',
    variants: [
      { name: 'Nova Lavabo Bataryası', dimensions: '179×167 mm', priceWhite: 5820 },
      { name: 'Nova Yüksek Lavabo Bataryası', dimensions: '213×299 mm', priceWhite: 9300 },
      { name: 'Nova Mutfak Bataryası', dimensions: '238×430 mm', priceWhite: 8100 },
      { name: 'Nova Banyo Bataryası', dimensions: '215×186 mm', priceWhite: 8360 },
      { name: 'Nova Esnek Çıkışlı Mutfak Bataryası', dimensions: '287×495 mm', priceWhite: 11020 },
    ],
  },
  {
    slug: 'frame-armatur',
    name: 'Frame Armatür Serisi',
    category: 'araturler',
    description: 'Frame Lavabo serisiyle tasarım bütünlüğü sağlayan geometrik armatür serisi.',
    colors: ['Krom'],
    tags: [],
    image: '/images/vitrifiye/series/frame-armatur.webp',
    variants: [
      { name: 'Frame Lavabo Bataryası', dimensions: '179×167 mm', priceWhite: 5660 },
      { name: 'Frame Yüksek Lavabo Bataryası', dimensions: '213×299 mm', priceWhite: 9750 },
      { name: 'Frame Mutfak Bataryası', dimensions: '238×430 mm', priceWhite: 7900 },
      { name: 'Frame Banyo Bataryası', dimensions: '215×186 mm', priceWhite: 8300 },
    ],
  },
  {
    slug: 'luna-armatur',
    name: 'Luna Armatür Serisi',
    category: 'araturler',
    description: 'Luna Serisi lavabo ile uyumlu, hem krom hem Mat Siyah renk seçeneğiyle sunulan armatürler.',
    colors: ['Krom', 'Mat Siyah'],
    tags: [],
    image: '/images/vitrifiye/series/luna-armatur.webp',
    variants: [
      { name: 'Luna Lavabo Bataryası', dimensions: '174×297 mm', priceWhite: 6820 },
      { name: 'Luna Lavabo Bataryası (Mat Siyah)', dimensions: '174×297 mm', priceWhite: 9200 },
      { name: 'Luna Mutfak Bataryası (Mat Siyah)', dimensions: '261×275 mm', priceWhite: 9840 },
      { name: 'Luna Banyo Bataryası (Mat Siyah)', dimensions: '215×165 mm', priceWhite: 8510 },
    ],
  },
  {
    slug: 'biza-armatur',
    name: 'İbiza Armatür Serisi',
    category: 'araturler',
    description: 'İbiza Serisi lavabo ile mükemmel uyum sağlayan İbiza Armatür Serisi.',
    colors: ['Krom'],
    tags: [],
    image: '/images/vitrifiye/series/biza-armatur.webp',
    variants: [
      { name: 'İbiza Lavabo Bataryası', dimensions: 'Standart', priceWhite: 0, note: 'Fiyat için iletişime geçin' },
      { name: 'İbiza Yüksek Lavabo Bataryası', dimensions: 'Standart', priceWhite: 0, note: 'Fiyat için iletişime geçin' },
      { name: 'İbiza Banyo Bataryası', dimensions: 'Standart', priceWhite: 0, note: 'Fiyat için iletişime geçin' },
    ],
  },

  // ─── DUŞ SİSTEMLERİ ────────────────────────────────────────────────
  {
    slug: 'dus-sistemleri-serisi',
    name: 'Duş Sistemleri Serisi',
    category: 'dus-sistemleri',
    description: 'Duş setleri ve ankastre duş sistemleri.',
    colors: ['Krom', 'Altın'],
    tags: [],
    image: '/images/vitrifiye/series/dus-sistemleri-serisi.webp',
    variants: [
      { name: 'Duş Seti, Lal', dimensions: '9SS1233200' },
      { name: 'Ankastre Duş Sistemi, Sharp Altın', dimensions: 'SS01200010300011-MIX' },
      { name: 'Duş Sistemi, Mona', dimensions: '9SS1303300' },
    ],
  },

  // ─── TAMAMLAYICI ÜRÜNLER ───────────────────────────────────────────
  {
    slug: 'klozet-kapaklari',
    name: 'Klozet Kapakları Serisi',
    category: 'tamamlayici',
    description: 'Yavaş kapanır menteşe teknolojili, çeşitli serilerle uyumlu klozet kapakları.',
    colors: ['Beyaz'],
    tags: [],
    image: '/images/vitrifiye/series/klozet-kapaklari.webp',
    variants: [
      { name: 'Klozet Kapağı, Abs', dimensions: '9SC1344003' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Gala Slim', dimensions: '9SC1663S02' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Noura Slim (UF)', dimensions: '9SC1671001' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Noura Slim (PP)', dimensions: '9SC1673001' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Bedensel Engelli', dimensions: '9SC1053000' },
      { name: 'Klozet Kapağı, Yumurcak', dimensions: '9SC1134000' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Bella Slim', dimensions: '9SC1061001' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Duru Slim', dimensions: '9SC1143S02' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Lila', dimensions: '9SC1343001' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, İbiza', dimensions: '9SC1211001' },
      { name: 'Klozet Kapağı, Yavaş Kapanır, Mona Slim', dimensions: '9SC1301001' },
    ],
  },
  {
    slug: 'rezervuar-ic-takimlari',
    name: 'Rezervuar İç Takımları Serisi',
    category: 'tamamlayici',
    description: 'Tek kademeli rezervuar iç takımları, çeşitli rezervuar serileriyle uyumlu.',
    colors: ['Standart'],
    tags: [],
    image: '/images/vitrifiye/series/rezervuar-ic-takimlari.webp',
    variants: [
      { name: 'Rezervuar İç Takım, Ova (Tek Kademeli)', dimensions: '9FF0071000' },
      { name: 'Rezervuar İç Takım, Damla (Tek Kademeli)', dimensions: '9FF0072000' },
      { name: 'Rezervuar İç Takım, Yumurcak (Tek Kademeli)', dimensions: '9FF1551000' },
    ],
  },
  {
    slug: 'baglanti-hortumlari',
    name: 'Bağlantı Hortumları Serisi',
    category: 'tamamlayici',
    description: 'Paslanmaz çelik örgülü, dayanıklı su bağlantı hortumları.',
    colors: ['Standart'],
    tags: [],
    image: '/images/vitrifiye/series/baglanti-hortumlari.webp',
    variants: [
      { name: 'TAQ GRIF Paslanmaz Çelik Örgülü Bağlantı Hortumu', dimensions: 'Standart' },
      { name: 'TAQ Paslanmaz Çelik Örgülü Bağlantı Hortumu', dimensions: 'Standart' },
    ],
  },
  {
    slug: 'sifon-suzgecler',
    name: 'Sifon ve Süzgeçler Serisi',
    category: 'tamamlayici',
    description: 'Lavabo ve eviye sifonları ile lavabo süzgeçleri.',
    colors: ['Krom'],
    tags: [],
    image: '/images/vitrifiye/series/sifon-suzgecler.webp',
    variants: [
      { name: 'S Lavabo / Eviye Sifonu', dimensions: '9SP0011000' },
      { name: 'Lavabo Sifonu (Düz)', dimensions: '42 cm' },
      { name: 'Yuvarlak Lavabo Süzgeci (Aç-Kapa)', dimensions: '9SB001M010' },
      { name: 'Yuvarlak Lavabo Süzgeci (Aç-Kapa)', dimensions: '9SB001M011' },
    ],
  },
]

export function getVitrifiyeSeries(slug: string): VitrifiyeSeries | undefined {
  return VITRIFIYE_SERIES.find((s) => s.slug === slug)
}

export function getVitrifiyeByCategory(category: VitrifiyeCategory): VitrifiyeSeries[] {
  return VITRIFIYE_SERIES.filter((s) => s.category === category)
}

export function getVitrifiyeCategory(slug: VitrifiyeCategory) {
  return VITRIFIYE_CATEGORIES.find((c) => c.slug === slug)
}
