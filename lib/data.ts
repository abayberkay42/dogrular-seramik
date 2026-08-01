export interface Collection {
  slug: string
  name: string
  category: string
  projectCount: number
  image: string
  alt: string
  sizes: string
  tileClass: string
  description: string
  features: string[]
  dimensions: string[]
  finish: string[]
  heroImages?: string[]
  tileImages?: string[]
}

export interface Project {
  slug: string
  name: string
  location: string
  year: string
  typology: string
  architect: string
  collectionSlug: string
  collectionName: string
  description: string[]
  images: { src: string; alt: string }[]
}

export const COLLECTIONS: Collection[] = [
  // Etili Seramik — Ahşap / Wood Series
  {
    slug: "ahsap-koleksiyonu",
    name: "Ahşap Koleksiyonu",
    category: "Ahşap Efekti",
    projectCount: 4,
    image: "/images/collections/ahsap-koleksiyonu/hero-webp/hero-01.webp",
    alt: "Etili Seramik Ahşap Koleksiyonu — doğal ahşap desenli porselen, Mersin ve Forest serileri",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 100vw, 58vw",
    tileClass: "ctile-a",
    description: "Etili Seramik'in Ahşap Koleksiyonu, doğal ağaç dokusunun sıcaklığını porselen kalitesiyle buluşturur. Mersin, Forest, Woodline ve Sedir serileri; Bej, Gri, Wenge ve Koyu Bej renk seçenekleriyle sunulmaktadır.",
    features: [
      "Mersin, Forest, Woodline, Sedir serileri",
      "Bej / Gri / Wenge / Koyu Bej renk seçenekleri",
      "Kaymaz yüzey dokusu",
      "Rektifiye kenar hassasiyeti",
    ],
    dimensions: ["45x45 cm", "30x60 cm", "20x120 cm"],
    finish: ["Mat", "Dokulu"],
    heroImages: [
      "/images/collections/ahsap-koleksiyonu/hero-webp/hero-01.webp",
      "/images/collections/ahsap-koleksiyonu/hero-webp/hero-02.webp",
      "/images/collections/ahsap-koleksiyonu/hero-webp/hero-03.webp",
      "/images/collections/ahsap-koleksiyonu/hero-webp/hero-04.webp",
    ],
    tileImages: Array.from({ length: 24 }, (_, i) =>
      `/images/collections/ahsap-koleksiyonu/tiles-webp/tile-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
  // Etili Seramik — Beton / Concrete Series
  {
    slug: "beton-koleksiyonu",
    name: "Beton Koleksiyonu",
    category: "Beton Efekti",
    projectCount: 3,
    image: "/images/collections/beton-koleksiyonu/hero-webp/hero-01.webp",
    alt: "Etili Seramik Beton Koleksiyonu — saf beton efektli minimal porselen, Best ve Molde serileri",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 42vw",
    tileClass: "ctile-b",
    description: "Minimalist mimari anlayışının porselen yansıması. Best, Molde ve Zenith serileri; White, Bone, Light Grey, Koyu Gri, Greige, Rustic White ve Rustic Grey tonlarında üretilmektedir.",
    features: [
      "Best, Molde, Zenith serileri",
      "7 renk seçeneği (White → Rustic Grey)",
      "Düşük su emiciliği",
      "Yüksek kimyasal direnç",
    ],
    dimensions: ["30x60 cm", "60x60 cm", "60x120 cm", "80x80 cm", "30x120 cm"],
    finish: ["Mat", "Saten"],
    heroImages: [
      "/images/collections/beton-koleksiyonu/hero-webp/hero-01.webp",
      "/images/collections/beton-koleksiyonu/hero-webp/hero-02.webp",
    ],
    tileImages: Array.from({ length: 24 }, (_, i) =>
      `/images/collections/beton-koleksiyonu/tiles-webp/tile-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
  // Etili Seramik — Taş / Stone: Assos
  {
    slug: "assos",
    name: "Assos Serisi",
    category: "Doğal Taş",
    projectCount: 2,
    image: "/images/collections/assos/hero-webp/hero-01.webp",
    alt: "Etili Seramik Assos Serisi — doğal taş efektli porselen, White ve Bej tonlarında",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 42vw",
    tileClass: "ctile-c",
    description: "Ege'nin antik taş dokusundan ilham alan Assos Serisi, White, Bej ve Gri tonlarında mekânlara doğal bir derinlik katar. Zemin ve duvar uygulamalarında estetik bir bütünlük sunar.",
    features: [
      "White / Bej / Gri renk paleti",
      "Doğal taş görünümü",
      "Zemin ve duvar uyumu",
      "Düşük su emiciliği",
    ],
    dimensions: ["30x60 cm", "60x60 cm", "45x90 cm", "60x120 cm"],
    finish: ["Mat"],
    heroImages: [
      "/images/collections/assos/hero-webp/hero-01.webp",
      "/images/collections/assos/hero-webp/hero-02.webp",
    ],
    tileImages: Array.from({ length: 9 }, (_, i) =>
      `/images/collections/assos/tiles-webp/tile-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
  // Etili Seramik — Taş / Stone: Milet & Nil
  {
    slug: "milet-nil",
    name: "Milet & Nil Serisi",
    category: "Doğal Taş",
    projectCount: 1,
    image: "/images/collections/milet-nil/hero-webp/hero-01.webp",
    alt: "Etili Seramik Milet ve Nil Serisi — altın ve gri tonlarında taş efektli porselen",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
    tileClass: "ctile-d",
    description: "Antik Anadolu ticaret kentlerinden esinlenen Milet ve Nil serileri, Gri, Bej ve Gold renk alternatifleriyle lüks iç mekânlar için seçkin bir yüzey dili oluşturur.",
    features: [
      "Gri / Bej / Gold renk seçenekleri",
      "Milet ve Nil alt serileri",
      "Büyük format seçenekleri",
      "Termal genişleme direnci",
    ],
    dimensions: ["30x60 cm", "45x90 cm", "60x120 cm", "80x80 cm"],
    finish: ["Mat", "Yarı Parlak"],
    heroImages: [
      "/images/collections/milet-nil/hero-webp/hero-01.webp",
      "/images/collections/milet-nil/hero-webp/hero-02.webp",
    ],
    tileImages: Array.from({ length: 24 }, (_, i) =>
      `/images/collections/milet-nil/tiles-webp/tile-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
  // Etili Seramik — Zenith
  {
    slug: "zenith",
    name: "Zenith Serisi",
    category: "Büyük Format Taş",
    projectCount: 2,
    image: "/images/collections/zenith/hero-webp/hero-01.webp",
    alt: "Etili Seramik Zenith Serisi — Nergis Gri, Mirror Decor ve Geo Decor içeren premium porselen",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
    tileClass: "ctile-e",
    description: "Zenith Serisi, Nergis Gri başta olmak üzere Mirror Decor ve Geo Decor gibi özel dekorlu yüzeyler sunar. Büyük format üretimiyle çağdaş mimari için güçlü bir yüzey kimliği oluşturur.",
    features: [
      "Mirror Decor ve Geo Decor alternatifleri",
      "Nergis Gri özel tonu",
      "Büyük format üretim kapasitesi",
      "Rektifiye kenar hassasiyeti",
    ],
    dimensions: ["60x120 cm", "80x80 cm", "30x120 cm", "20x120 cm"],
    finish: ["Mat", "Parlak", "Dekore"],
    heroImages: [
      "/images/collections/zenith/hero-webp/hero-01.webp",
      "/images/collections/zenith/hero-webp/hero-02.webp",
    ],
    tileImages: Array.from({ length: 24 }, (_, i) =>
      `/images/collections/zenith/tiles-webp/tile-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
  // Etili Seramik — Dekoratif (Brixton, Venice, Milton)
  {
    slug: "dekoratif-koleksiyonu",
    name: "Dekoratif Koleksiyonu",
    category: "Dekoratif",
    projectCount: 1,
    image: "/images/collections/dekoratif-koleksiyonu/hero-webp/hero-01.webp",
    alt: "Etili Seramik Dekoratif Koleksiyonu — Brixton, Venice, Milton ve Dorset desenli 45x45 porselen",
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
    tileClass: "ctile-f",
    description: "Brixton, Dorset, Venice ve Milton alt serileriyle zenginleşen Dekoratif Koleksiyonu, 45x45 cm formatında Cut ve Pre-Cut tasarımlarıyla giriş hollerinden oturma odalarına özgün bir doku katar.",
    features: [
      "Brixton / Dorset / Venice / Milton alt serileri",
      "Cut ve Pre-Cut desen alternatifleri",
      "45x45 cm standart format",
      "Parlak ve yarı parlak yüzey",
    ],
    dimensions: ["45x45 cm"],
    finish: ["Parlak", "Yarı Parlak"],
    heroImages: [
      "/images/collections/dekoratif-koleksiyonu/hero-webp/hero-01.webp",
      "/images/collections/dekoratif-koleksiyonu/hero-webp/hero-02.webp",
      "/images/collections/dekoratif-koleksiyonu/hero-webp/hero-03.webp",
      "/images/collections/dekoratif-koleksiyonu/hero-webp/hero-04.webp",
      "/images/collections/dekoratif-koleksiyonu/hero-webp/hero-05.png",
      "/images/collections/dekoratif-koleksiyonu/hero-webp/hero-06.png",
    ],
    tileImages: Array.from({ length: 12 }, (_, i) =>
      `/images/collections/dekoratif-koleksiyonu/tiles-webp/tile-${String(i + 1).padStart(2, '0')}.webp`
    ),
  },
]

export const PROJECTS: Project[] = [
  {
    slug: "bogazici-villa",
    name: "Boğaziçi Villa",
    location: "İstanbul",
    year: "2024",
    typology: "Konut Projesi",
    architect: "Selin Karahan Mimarlık",
    collectionSlug: "zenith",
    collectionName: "Zenith Serisi",
    description: [
      "İstanbul Boğazı manzaralı bu özel konut projesinde Etili Seramik Zenith Serisi, iç ve dış mekânlar arasında kesintisiz bir yüzey sürekliliği sağlamak üzere tasarlandı.",
      "Zemin kattan teraslara uzanan 480 m² uygulama alanında büyük format porselen, mimarın öngördüğü monolitik etkiyi hayata geçiriyor. Her yüzey geçişi, mekânın sınırlarını belirsizleştiriyor.",
    ],
    images: [
      {
        src: "/images/projects/bogazici-villa-1.svg",
        alt: "Boğaziçi Villa — ana salon zemin uygulaması, Zenith Serisi",
      },
      {
        src: "/images/projects/bogazici-villa-2.svg",
        alt: "Boğaziçi Villa — açık teras, Boğaz manzarası",
      },
      {
        src: "/images/projects/bogazici-villa-3.svg",
        alt: "Boğaziçi Villa — ana banyo, duvar ve zemin detayı",
      },
      {
        src: "/images/projects/bogazici-villa-4.svg",
        alt: "Boğaziçi Villa — mutfak, iç-dış geçiş",
      },
      {
        src: "/images/projects/bogazici-villa-5.svg",
        alt: "Boğaziçi Villa — giriş holü, geniş format yüzey",
      },
    ],
  },
  {
    slug: "nokta-otel",
    name: "Nokta Otel",
    location: "İzmir",
    year: "2023",
    typology: "Otelcilik",
    architect: "Atmos Tasarım",
    collectionSlug: "beton-koleksiyonu",
    collectionName: "Beton Koleksiyonu",
    description: [
      "İzmir körfezine hâkim bu butik otelde Etili Seramik Beton Koleksiyonu, 78 odanın ortak alanları ile koridorlarında tutarlı bir minimal atmosfer yaratıyor.",
      "Beton efektli büyük format yüzeyler, tasarım karar verici için hem görsel hem teknik bir çözüm sunuyor: yüksek trafikli alanlarda beklenen performansı, ödün vermeden karşılıyor.",
    ],
    images: [
      {
        src: "/images/projects/nokta-otel-1.svg",
        alt: "Nokta Otel — resepsiyon, geniş format beton efekt",
      },
      {
        src: "/images/projects/nokta-otel-2.svg",
        alt: "Nokta Otel — koridor, sürekli yüzey akışı",
      },
      {
        src: "/images/projects/nokta-otel-3.svg",
        alt: "Nokta Otel — restoran, zemin detayı",
      },
    ],
  },
  {
    slug: "mavi-kosk",
    name: "Mavi Köşk",
    location: "Bodrum",
    year: "2023",
    typology: "Konut Projesi",
    architect: "Akdeniz Mimarlık",
    collectionSlug: "assos",
    collectionName: "Assos Serisi",
    description: [
      "Bodrum yarımadasında denize sıfır konumdaki bu tatil villasında Etili Seramik Assos Serisi, havuz alanı, banyo ve dış cephe uygulamalarında doğal taş tonlarıyla yer alıyor.",
      "Doğal taş görünümü ile seramiğin bütünleştiği bu projede her yüzey geçişi, doğal ortamla mimari dili harmanlıyor.",
    ],
    images: [
      {
        src: "/images/projects/mavi-kosk-1.svg",
        alt: "Mavi Köşk — havuz kenarı, Assos Serisi doğal taş ton",
      },
      {
        src: "/images/projects/mavi-kosk-2.svg",
        alt: "Mavi Köşk — banyo, doğal taş efektli porselen",
      },
      {
        src: "/images/projects/mavi-kosk-3.svg",
        alt: "Mavi Köşk — dış cephe detay",
      },
    ],
  },
  {
    slug: "forma-ofis",
    name: "Forma Ofis",
    location: "Ankara",
    year: "2024",
    typology: "Kurumsal",
    architect: "Mimari Stüdyo 34",
    collectionSlug: "milet-nil",
    collectionName: "Milet & Nil Serisi",
    description: [
      "Ankara'nın en yeni kurumsal yapılarından biri olan Forma ofisinde Etili Seramik Milet & Nil Serisi, giriş holü ve konferans katlarında prestij kodunu taşıyor.",
      "Altın ton detayları içeren büyük format porselen, iş dünyasının güven ve kalite beklentisini estetik bir dille karşılıyor.",
    ],
    images: [
      {
        src: "/images/projects/forma-ofis-1.svg",
        alt: "Forma Ofis — giriş holü, Milet & Nil Serisi",
      },
      {
        src: "/images/projects/forma-ofis-2.svg",
        alt: "Forma Ofis — konferans katı, zemin ve duvar uyumu",
      },
    ],
  },
]

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getProjectsByCollection(collectionSlug: string): Project[] {
  return PROJECTS.filter((p) => p.collectionSlug === collectionSlug)
}
