export interface TileVariant {
  boyut: string
  renk: string
  sayfa?: string
  image?: string
}

export interface TileSeries {
  isim: string
  kalinlik?: string
  image?: string
  boyutlar: TileVariant[]
}

export interface TileKategori {
  isim: string
  slug: string
  isimEn: string
  aciklama: string
  seriler: TileSeries[]
}

export const ETILI_KATEGORILER: TileKategori[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1. BEYAZ VE SİYAH
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Beyaz ve Siyah',
    slug: 'beyaz-ve-siyah',
    isimEn: 'White and Black',
    aciklama: 'Beyaz ve siyah tonlarında mermer desenli seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Assos',
        image: '/images/koleksiyon/ayazma.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Beyaz/White', sayfa: '108' },
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '108' },
        ],
      },
      {
        isim: 'Athena',
        image: '/images/koleksiyon/athena.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '134' },
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '134', image: '/images/varyant/athena-gri-60x60-full-lappato-9mm.webp' },
          { boyut: '30×80', renk: 'Beyaz/White', sayfa: '134' },
        ],
      },
      {
        isim: 'Ayazma',
        image: '/images/koleksiyon/ayazma.webp',
        boyutlar: [
          { boyut: '30×80', renk: 'Beyaz/White', sayfa: '278' },
          { boyut: '45×45', renk: 'Beyaz/White', sayfa: '278', image: '/images/varyant/ayazma-beyaz-45x45-mat-75mm.webp' },
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '278', image: '/images/varyant/ayazma-beyaz-60x60-mat-9mm.webp' },
          { boyut: '90×90', renk: 'Beyaz/White', sayfa: '279' },
          { boyut: '30×80', renk: 'Açık Gri/Light Grey', sayfa: '279' },
        ],
      },
      {
        isim: 'Calacatta',
        image: '/images/koleksiyon/calacatta.webp',
        boyutlar: [
          { boyut: '60×40', renk: 'Gold', sayfa: '101' },
        ],
      },
      {
        isim: 'Marmo',
        image: '/images/koleksiyon/marmo.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Vidratto', sayfa: '177' },
        ],
      },
      {
        isim: 'Milet',
        image: '/images/koleksiyon/milet.webp',
        boyutlar: [
          { boyut: '45×90', renk: 'Gri/Grey', sayfa: '108' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '108', image: '/images/varyant/milet-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Carbon Black', sayfa: '108' },
        ],
      },
      {
        isim: 'Nepal',
        image: '/images/koleksiyon/nepal.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Beyaz/White', sayfa: '108' },
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '108' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '110' },
        ],
      },
      {
        isim: 'River',
        image: '/images/koleksiyon/river.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '108', image: '/images/varyant/river-beyaz-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '108' },
          { boyut: '60×120', renk: 'Carbon Black', sayfa: '108' },
        ],
      },
      {
        isim: 'Nova',
        image: '/images/koleksiyon/napoli.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Siyah/Black', sayfa: '188' },
        ],
      },
      {
        isim: 'Napoli',
        image: '/images/koleksiyon/napoli.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Carbon Black', sayfa: '108' },
        ],
      },
      {
        isim: 'Nevada',
        image: '/images/koleksiyon/nevada.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Carbon Black', sayfa: '108' },
        ],
      },
      {
        isim: 'Nil',
        kalinlik: '7mm',
        image: '/images/koleksiyon/nil.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', image: '/images/varyant/nil-gri-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', image: '/images/varyant/nil-bej-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Straton',
        kalinlik: '7mm',
        image: '/images/koleksiyon/straton.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bold' },
        ],
      },
      {
        isim: 'Gordion',
        kalinlik: '7mm',
        image: '/images/koleksiyon/gordion.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey' },
        ],
      },
      {
        isim: 'Kartal',
        kalinlik: '7mm',
        image: '/images/koleksiyon/kartal.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey' },
          { boyut: '60×120', renk: 'Beyaz/White' },
        ],
      },
      {
        isim: 'Leodikya',
        kalinlik: '7mm',
        image: '/images/koleksiyon/leodikya.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', image: '/images/varyant/leodikya-gri-60x120-full-lappato-75mm.webp' },
        ],
      },
      {
        isim: 'Leton',
        image: '/images/koleksiyon/leton.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '46' },
        ],
      },
      {
        isim: 'Malibu',
        image: '/images/koleksiyon/maydos.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '47' },
        ],
      },
      {
        isim: 'Maydos',
        image: '/images/koleksiyon/maydos.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '48' },
        ],
      },
      {
        isim: 'Fortis',
        image: '/images/koleksiyon/fortis.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '42', image: '/images/varyant/fortis-acik-gri-60x120-full-lappato-75mm.webp' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. MERMER
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Mermer',
    slug: 'mermer',
    isimEn: 'Marbles',
    aciklama: 'Doğal mermer dokusunu yansıtan premium porselen seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Armada',
        image: '/images/koleksiyon/armada.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Latte', sayfa: '245', image: '/images/varyant/armada-latte-30x90-parlak-9mm.webp' },
          { boyut: '30×90', renk: 'Absin', sayfa: '245' },
          { boyut: '30×90', renk: 'Vizon', sayfa: '248', image: '/images/varyant/armada-vizon-30x90-parlak-9mm.webp' },
        ],
      },
      {
        isim: 'Gediz',
        image: '/images/koleksiyon/gediz.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Açık Gri/Light Grey', sayfa: '313' },
          { boyut: '60×60', renk: 'Yeşil/Green', sayfa: '372', image: '/images/varyant/gediz-yesil-60x60-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Hatay',
        image: '/images/koleksiyon/hatay.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Light Grey', sayfa: '257', image: '/images/varyant/hatay-acik-gri-30x90-parlak-9mm.webp' },
          { boyut: '30×90', renk: 'Bej/Beige', sayfa: '257', image: '/images/varyant/hatay-acik-bej-30x90-parlak-9mm.webp' },
          { boyut: '30×90', renk: 'Light Beige', sayfa: '257', image: '/images/varyant/hatay-acik-bej-30x90-parlak-9mm.webp' },
          { boyut: '30×90', renk: 'Dark Beige', sayfa: '257', image: '/images/varyant/hatay-defne-koyu-bej-30x90-parlak-9mm.webp' },
          { boyut: '30×90', renk: 'Dark Grey', sayfa: '257', image: '/images/varyant/hatay-defne-koyu-gri-30x90-parlak-9mm.webp' },
          { boyut: '45×45', renk: 'Light Grey', sayfa: '257', image: '/images/varyant/hatay-acik-gri-45x45-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Açık Koyu Bej/Dark Beige', sayfa: '258', image: '/images/varyant/hatay-koyu-bej-45x45-parlak-75mm.webp' },
        ],
      },
      {
        isim: 'Zenith',
        image: '/images/koleksiyon/zenith.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Taba', sayfa: '269', image: '/images/varyant/zenith-taba-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Bej/Beige', sayfa: '269', image: '/images/varyant/zenith-bej-30x90-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '271', image: '/images/varyant/zenith-gri-60x60-mat-9mm.webp' },
          { boyut: '60×62', renk: 'Antrasit/Anthracite', sayfa: '271' },
        ],
      },
      {
        isim: 'Aspendos',
        kalinlik: '7mm',
        image: '/images/koleksiyon/aspendos.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '40', image: '/images/varyant/aspendos-beyaz-60x120-full-lappato-75mm.webp' },
          { boyut: '60×120', renk: 'Koyu Gri/Dark Grey', sayfa: '40', image: '/images/varyant/aspendos-koyu-gri-60x120-full-lappato-75mm.webp' },
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '41', image: '/images/varyant/aspendos-acik-gri-60x120-full-lappato-75mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '41', image: '/images/varyant/aspendos-antrasit-60x120-full-lappato-75mm.webp' },
        ],
      },
      {
        isim: 'Riva',
        kalinlik: '7mm',
        image: '/images/koleksiyon/riva.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '41', image: '/images/varyant/riva-bej-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '41', image: '/images/varyant/riva-beyaz-60x120-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Fortis',
        kalinlik: '7mm',
        image: '/images/koleksiyon/fortis.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '42', image: '/images/varyant/fortis-acik-gri-60x120-full-lappato-75mm.webp' },
          { boyut: '60×120', renk: 'Gümüş/Silver', sayfa: '43' },
        ],
      },
      {
        isim: 'Nox',
        kalinlik: '7mm',
        image: '/images/koleksiyon/nox.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '93' },
        ],
      },
      {
        isim: 'Perge',
        kalinlik: '7mm',
        image: '/images/koleksiyon/perge.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '40', image: '/images/varyant/perge-acik-gri-60x120-full-lappato-75mm.webp' },
          { boyut: '60×120', renk: 'Stone', sayfa: '40' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '40' },
          { boyut: '60×120', renk: 'Koyu Gri/Dark Grey', sayfa: '40', image: '/images/varyant/perge-koyu-gri-60x120-full-lappato-75mm.webp' },
        ],
      },
      {
        isim: 'Finike',
        kalinlik: '7mm',
        image: '/images/koleksiyon/finike.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '44', image: '/images/varyant/finike-gri-60x120-sparkly-75mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '44', image: '/images/varyant/finike-bej-60x120-sparkly-75mm.webp' },
          { boyut: '60×120', renk: 'Bone', sayfa: '45', image: '/images/varyant/finike-bone-60x120-sparkly-75mm.webp' },
          { boyut: '30×60', renk: 'Açık Bej/Light Beige', sayfa: '144' },
          { boyut: '30×60', renk: 'Koyu Bej/Dark Beige', sayfa: '144' },
        ],
      },
      {
        isim: 'Plain',
        kalinlik: '7mm',
        image: '/images/koleksiyon/plain.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '94' },
          { boyut: '60×120', renk: 'Pearl', sayfa: '94', image: '/images/varyant/plain-pearl-60x120-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Sava',
        kalinlik: '7mm',
        image: '/images/koleksiyon/sava.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Karamel', sayfa: '113' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '113', image: '/images/varyant/sava-antrasit-60x120-full-lappato-75mm.webp' },
        ],
      },
      {
        isim: 'Sardes',
        kalinlik: '7mm',
        image: '/images/koleksiyon/sardes.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '115', image: '/images/varyant/sardes-acik-gri-60x120-full-lappato-75mm.webp' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '115' },
        ],
      },
      {
        isim: 'Ayazma',
        kalinlik: '8mm',
        image: '/images/koleksiyon/ayazma.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Açık Gri/Light Grey', sayfa: '249', image: '/images/varyant/ayazma-acik-gri-30x60-parlak-75mm.webp' },
          { boyut: '30×60', renk: 'Koyu Gri/Dark Grey', sayfa: '249', image: '/images/varyant/ayazma-koyu-gri-30x60-parlak-75mm.webp' },
          { boyut: '30×60', renk: 'Bej/Beige', sayfa: '249', image: '/images/varyant/ayazma-bej-30x60-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Koyu Gri/Dark Grey', sayfa: '251', image: '/images/varyant/ayazma-koyu-gri-45x45-mat-75mm.webp' },
          { boyut: '30×90', renk: 'Bej/Beige', sayfa: '251', image: '/images/varyant/ayazma-bej-30x90-parlak-9mm.webp' },
          { boyut: '30×90', renk: 'Kahve/Brown', sayfa: '251', image: '/images/varyant/ayazma-kahve-30x90-parlak-9mm.webp' },
        ],
      },
      {
        isim: 'Alanya',
        kalinlik: '8mm',
        image: '/images/koleksiyon/alanya.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Bej/Beige', sayfa: '274', image: '/images/varyant/alanya-bej-30x60-parlak-75mm.webp' },
          { boyut: '30×60', renk: 'Beyaz/White', sayfa: '274' },
          { boyut: '30×60', renk: 'Koyu Bej/Dark Beige', sayfa: '274' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '274', image: '/images/varyant/alanya-bej-60x120-full-lappato-9mm.webp' },
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '275', image: '/images/varyant/alanya-bej-45x45-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Kahveli/Brown', sayfa: '275', image: '/images/varyant/alanya-kahve-45x45-parlak-75mm.webp' },
        ],
      },
      {
        isim: 'Atlantis',
        kalinlik: '8mm',
        image: '/images/koleksiyon/atlantis.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '80', image: '/images/varyant/atlantis-gri-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '80', image: '/images/varyant/atlantis-antrasit-60x120-full-lappato-9mm.webp' },
          { boyut: '60×80', renk: 'Gri/Grey', sayfa: '127', image: '/images/varyant/atlantis-gri-60x60-full-lappato-9mm.webp' },
          { boyut: '60×80', renk: 'Kahve/Brown', sayfa: '127', image: '/images/varyant/atlantis-kahve-60x60-full-lappato-9mm.webp' },
          { boyut: '60×80', renk: 'Antrasit/Anthracite', sayfa: '127', image: '/images/varyant/atlantis-antrasit-60x60-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Bolu',
        kalinlik: '8mm',
        image: '/images/koleksiyon/bolu.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '80', image: '/images/varyant/bolu-acik-gri-60x120-full-lappato-9mm.webp' },
          { boyut: '60×80', renk: 'Gri/Grey', sayfa: '128' },
        ],
      },
      {
        isim: 'Dover',
        kalinlik: '8mm',
        image: '/images/koleksiyon/dover.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '80', image: '/images/varyant/dover-gri-60x60-full-lappato-9mm.webp' },
          { boyut: '60×60', renk: 'Luna', sayfa: '80' },
          { boyut: '60×60', renk: 'Wenge', sayfa: '470' },
        ],
      },
      {
        isim: 'Efes',
        kalinlik: '8mm',
        image: '/images/koleksiyon/efes.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Light Beige', sayfa: '80' },
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '80', image: '/images/varyant/efes-acik-gri-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Koyu Gri/Dark Grey', sayfa: '80', image: '/images/varyant/efes-koyu-gri-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Dalaman',
        kalinlik: '8mm',
        image: '/images/koleksiyon/dalaman.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '84', image: '/images/varyant/dalaman-gri-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Emperador',
        kalinlik: '8mm',
        image: '/images/koleksiyon/emperador.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Kahve/Brown', sayfa: '80', image: '/images/varyant/emperador-kahve-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '80' },
        ],
      },
      {
        isim: 'Eternal',
        kalinlik: '8mm',
        image: '/images/koleksiyon/eternal.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '80' },
          { boyut: '60×120', renk: 'Bone', sayfa: '80' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '80' },
        ],
      },
      {
        isim: 'Himalaya',
        kalinlik: '8mm',
        image: '/images/koleksiyon/himalaya.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '98', image: '/images/varyant/himalaya-gri-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Kahve/Brown', sayfa: '98', image: '/images/varyant/himalaya-kahve-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Karya',
        kalinlik: '8mm',
        image: '/images/koleksiyon/karya.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Mavi/Blue', sayfa: '87', image: '/images/varyant/karya-mavi-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Marbella',
        kalinlik: '8mm',
        image: '/images/koleksiyon/marbella.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '114', image: '/images/varyant/marbella-bone-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Lappato', sayfa: '114' },
          { boyut: '60×120', renk: 'Soft Lappato', sayfa: '114' },
        ],
      },
      {
        isim: 'Meridyen',
        kalinlik: '8mm',
        image: '/images/koleksiyon/meridyen.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Yeşil/Green', sayfa: '100', image: '/images/varyant/meridyen-yesil-bookmatch-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '100' },
        ],
      },
      {
        isim: 'Mezo',
        kalinlik: '8mm',
        image: '/images/koleksiyon/mezo.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '104', image: '/images/varyant/mezo-bej-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '104' },
        ],
      },
      {
        isim: 'Mira',
        kalinlik: '8mm',
        image: '/images/koleksiyon/mira.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '108' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '108' },
        ],
      },
      {
        isim: 'Mumbai',
        kalinlik: '8mm',
        image: '/images/koleksiyon/mumbai.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '108' },
        ],
      },
      {
        isim: 'Olimpos',
        kalinlik: '8mm',
        image: '/images/koleksiyon/olimpos.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '113', image: '/images/varyant/olimpos-bej-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Serenity',
        kalinlik: '8mm',
        image: '/images/koleksiyon/serenity.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '343', image: '/images/varyant/serenity-beyaz-60x120-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '343', image: '/images/varyant/serenity-beyaz-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Gümüş/Silver', sayfa: '343', image: '/images/varyant/serenity-silver-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Sevilla',
        kalinlik: '8mm',
        image: '/images/koleksiyon/sevilla.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '107', image: '/images/varyant/sevilla-graphite-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '107' },
          { boyut: '60×120', renk: 'Bone', sayfa: '107', image: '/images/varyant/sevilla-bone-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '107' },
        ],
      },
      {
        isim: 'Paonazzo',
        kalinlik: '8mm',
        image: '/images/koleksiyon/paonazzo.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '117' },
        ],
      },
      {
        isim: 'Tinda',
        kalinlik: '9mm',
        image: '/images/koleksiyon/tinda.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '131', image: '/images/varyant/tinda-bej-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Açık Gri/Light Gray', sayfa: '131', image: '/images/varyant/tinda-acik-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Koyu Gri/Dark Gray', sayfa: '131', image: '/images/varyant/tinda-koyu-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '131', image: '/images/varyant/tinda-antrasit-60x120-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Açık Gri/Light Grey', sayfa: '131', image: '/images/varyant/tinda-acik-gri-60x60-semi-lappato-9mm.webp' },
          { boyut: '60×60', renk: 'Koyu Gri/Dark Grey', sayfa: '131', image: '/images/varyant/tinda-koyu-gri-60x60-semi-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Toros',
        kalinlik: '9mm',
        image: '/images/koleksiyon/toros.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '132', image: '/images/varyant/toros-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '132', image: '/images/varyant/toros-bej-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '132', image: '/images/varyant/toros-antrasit-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bone', sayfa: '132', image: '/images/varyant/toros-bone-60x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Travertine',
        kalinlik: '9mm',
        image: '/images/koleksiyon/travertine.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Krem/Cream', sayfa: '133', image: '/images/varyant/travertine-krem-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '133', image: '/images/varyant/travertine-gri-60x120-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '133' },
          { boyut: '60×60', renk: 'Krem/Cream', sayfa: '133', image: '/images/varyant/travertine-krem-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Vega',
        kalinlik: '9mm',
        image: '/images/koleksiyon/vega.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gold', sayfa: '135', image: '/images/varyant/vega-gold-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Demre',
        image: '/images/koleksiyon/demre.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Bej/Beige', sayfa: '143', image: '/images/varyant/demre-bej-30x60-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Simena',
        image: '/images/koleksiyon/simena.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Açık Bej/Light Beige', sayfa: '149', image: '/images/varyant/simena-acik-bej-30x60-mat-75mm.webp' },
          { boyut: '30×60', renk: 'Koyu Bej/Dark Beige', sayfa: '149', image: '/images/varyant/simena-koyu-bej-30x60-mat-75mm.webp' },
          { boyut: '30×60', renk: 'Gri/Grey', sayfa: '149', image: '/images/varyant/simena-gri-30x60-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Hazar',
        image: '/images/koleksiyon/hazar.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Açık Bej/Light Beige', sayfa: '281', image: '/images/varyant/hazar-acik-bej-30x60-parlak-75mm.webp' },
          { boyut: '30×60', renk: 'Koyu Bej/Dark Beige', sayfa: '281' },
          { boyut: '30×60', renk: 'Gri/Grey', sayfa: '281', image: '/images/varyant/hazar-acik-gri-30x60-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Açık Bej/Light Beige', sayfa: '282', image: '/images/varyant/hazar-acik-bej-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Koyu Bej/Dark Beige', sayfa: '282' },
          { boyut: '45×45', renk: 'Dark Grey', sayfa: '282', image: '/images/varyant/hazar-koyu-gri-45x45-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Royal',
        image: '/images/koleksiyon/royal.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Bej/Beige', sayfa: '286', image: '/images/varyant/royal-bej-30x60-parlak-75mm.webp' },
          { boyut: '30×60', renk: 'Gri/Grey', sayfa: '286', image: '/images/varyant/royal-acik-gri-30x60-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Koyu Bej/Dark Beige', sayfa: '287' },
          { boyut: '45×45', renk: 'Gri/Grey', sayfa: '287', image: '/images/varyant/royal-acik-gri-45x45-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Paros',
        image: '/images/koleksiyon/paros.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Beyaz/White', sayfa: '151', image: '/images/varyant/paros-beyaz-45x45-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '151', image: '/images/varyant/paros-bej-45x45-parlak-75mm.webp' },
        ],
      },
      {
        isim: 'Rodos',
        image: '/images/koleksiyon/rodos.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Beyaz/White', sayfa: '152' },
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '152' },
        ],
      },
      {
        isim: 'Datça',
        image: '/images/koleksiyon/datca.webp',
        boyutlar: [
          { boyut: '60×80', renk: 'Gri/Grey', sayfa: '129' },
        ],
      },
      {
        isim: 'Spider',
        image: '/images/koleksiyon/spider.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '313' },
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '313', image: '/images/varyant/spider-beyaz-60x60-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Meram',
        image: '/images/koleksiyon/meram.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '140', image: '/images/varyant/meram-bej-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Gold', sayfa: '140' },
        ],
      },
      {
        isim: 'Sandmar',
        image: '/images/koleksiyon/sandmar.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '180', image: '/images/varyant/sandmar-gri-60x60-mat-9mm.webp' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. TAŞ
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Taş',
    slug: 'tas',
    isimEn: 'Stone',
    aciklama: 'Doğal taş görünümlü sert ve dayanıklı porselen seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Milas',
        image: '/images/koleksiyon/milas.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Gri/Grey', sayfa: '246', image: '/images/varyant/milas-gri-45x45-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Çakıl Taşı',
        image: '/images/koleksiyon/cakil-tasi.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Çakıl Taşı', sayfa: '247', image: '/images/varyant/cakil-tasi-cakil-tasi-45x45-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Belgium Stone',
        image: '/images/koleksiyon/belgium-stone.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Siyah/Black', sayfa: '48', image: '/images/varyant/belgium-stone-siyah-60x60-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bone', sayfa: '71', image: '/images/varyant/belgium-stone-bone-60x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Granit',
        image: '/images/koleksiyon/granit.webp',
        boyutlar: [
          { boyut: '60×40', renk: 'Bay Brown', sayfa: '48' },
        ],
      },
      {
        isim: 'Karalps',
        image: '/images/koleksiyon/karalps.webp',
        boyutlar: [
          { boyut: '60×40', renk: 'Gri/Grey', sayfa: '48' },
        ],
      },
      {
        isim: 'Patara',
        image: '/images/koleksiyon/patara.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Cephe', sayfa: '240' },
        ],
      },
      {
        isim: 'Oxide',
        image: '/images/koleksiyon/oxide.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '186' },
          { boyut: '60×60', renk: 'Kahve/Brown', sayfa: '186' },
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '186', image: '/images/varyant/oxide-antrasit-60x60-semi-lappato-9mm.webp' },
          { boyut: '60×60', renk: 'Turkuaz/Turquoise', sayfa: '186', image: '/images/varyant/oxide-turkuaz-60x60-semi-lappato-9mm.webp' },
          { boyut: '60×60', renk: 'Kobalt/Cobalt', sayfa: '186', image: '/images/varyant/oxide-cobalt-60x60-semi-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Stone Blast',
        image: '/images/koleksiyon/stone-blast.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bone', sayfa: '188', image: '/images/varyant/stone-blast-bone-60x60-blast-9mm.webp' },
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '188', image: '/images/varyant/stone-blast-antrasit-60x60-blast-9mm.webp' },
          { boyut: '60×120', renk: 'Bone', sayfa: '128', image: '/images/varyant/stone-blast-bone-60x120-blast-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '128' },
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '128' },
        ],
      },
      {
        isim: 'Petra',
        image: '/images/koleksiyon/petra.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '188', image: '/images/varyant/petra-bej-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '188', image: '/images/varyant/petra-gri-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Troya',
        image: '/images/koleksiyon/troya.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '365' },
        ],
      },
      {
        isim: 'Naya',
        image: '/images/koleksiyon/naya.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '188' },
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '188', image: '/images/varyant/naya-bej-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Boston',
        image: '/images/koleksiyon/boston.webp',
        boyutlar: [
          { boyut: '6×90', renk: 'Açık Gri/Light Grey', sayfa: '188', image: '/images/varyant/boston-acik-gri-30x90-mat-9mm.webp' },
          { boyut: '6×90', renk: 'Gri/Grey', sayfa: '188' },
          { boyut: '6×90', renk: 'Bej/Beige', sayfa: '188' },
          { boyut: '6×90', renk: 'Antrasit/Anthracite', sayfa: '188', image: '/images/varyant/boston-antrasit-30x90-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Sorgun',
        image: '/images/koleksiyon/sorgun.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Kül Gri/Ash Grey', sayfa: '174' },
          { boyut: '30×60', renk: 'Kahve/Brown', sayfa: '174', image: '/images/varyant/sorgun-kahve-30x60-mat-75mm.webp' },
          { boyut: '30×80', renk: 'Kül Gri/Ash Grey', sayfa: '174' },
        ],
      },
      {
        isim: 'Gravel',
        kalinlik: '7mm',
        image: '/images/koleksiyon/gravel.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bone', sayfa: '57', image: '/images/varyant/gravel-bone-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Pearl', sayfa: '57', image: '/images/varyant/gravel-pearl-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Plum', sayfa: '57' },
        ],
      },
      {
        isim: 'Pebble',
        kalinlik: '7mm',
        image: '/images/koleksiyon/pebble.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bone', sayfa: '58', image: '/images/varyant/pebble-bone-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Pearl', sayfa: '58', image: '/images/varyant/pebble-pearl-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Plum', sayfa: '58' },
        ],
      },
      {
        isim: 'Sand',
        kalinlik: '7mm',
        image: '/images/koleksiyon/sand.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Pure', sayfa: '60', image: '/images/varyant/sand-pure-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Bone', sayfa: '60', image: '/images/varyant/sand-bone-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Pearl', sayfa: '60', image: '/images/varyant/sand-pearl-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Plum', sayfa: '60' },
        ],
      },
      {
        isim: 'Atmos',
        kalinlik: '9mm',
        image: '/images/koleksiyon/atmos.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '65', image: '/images/varyant/atmos-bone-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '65', image: '/images/varyant/atmos-graphite-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Stone', sayfa: '65', image: '/images/varyant/atmos-bone-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '65', image: '/images/varyant/atmos-graphite-60x120-mat-9mm.webp' },
          { boyut: '60×130', renk: 'Bej/Beige', sayfa: '65', image: '/images/varyant/atmos-bone-60x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Agrea',
        kalinlik: '9mm',
        image: '/images/koleksiyon/agrea.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '86', image: '/images/varyant/agrea-antrasit-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Gri-Beyaz/Grey-White', sayfa: '86' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '86' },
        ],
      },
      {
        isim: 'Antares',
        kalinlik: '9mm',
        image: '/images/koleksiyon/antares.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '64' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '64' },
        ],
      },
      {
        isim: 'Best',
        kalinlik: '9mm',
        image: '/images/koleksiyon/best.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Silense Whole', sayfa: '73', image: '/images/varyant/best-silence-whale-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Silense Pure', sayfa: '73', image: '/images/varyant/best-silence-pure-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Silense Bone', sayfa: '73', image: '/images/varyant/best-silence-bone-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Ivory', sayfa: '74', image: '/images/varyant/best-silence-krem-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Tanned', sayfa: '74', image: '/images/varyant/best-silence-tarmac-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Ma Pure', sayfa: '75', image: '/images/varyant/best-ceppo-pure-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Ma Ivory', sayfa: '75', image: '/images/varyant/best-ceppo-krem-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Ma Tanned', sayfa: '75', image: '/images/varyant/best-ceppo-tarmac-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Greige', sayfa: '76', image: '/images/varyant/best-stone-krem-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bone Cream', sayfa: '76', image: '/images/varyant/best-ceppo-bone-60x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Bluestone',
        kalinlik: '9mm',
        image: '/images/koleksiyon/bluestone.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Blue', sayfa: '138', image: '/images/varyant/bluestone-mavi-60x120-full-lappato-9mm.webp' },
        ],
      },
      {
        isim: 'Terazzo',
        image: '/images/koleksiyon/terazzo.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '130', image: '/images/varyant/terazzo-bej-60x120-mat-9mm.webp' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. BETON
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Beton',
    slug: 'beton',
    isimEn: 'Concrete',
    aciklama: 'Endüstriyel beton estetiğini yansıtan modern porselen seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Cementino',
        image: '/images/koleksiyon/cementino.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'İnci/Pearl', sayfa: '82', image: '/images/varyant/cementino-bone-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Açık Gri/Light Grey', sayfa: '82', image: '/images/varyant/cementino-acik-gri-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '82', image: '/images/varyant/cementino-graphite-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Koyu Gri/Dark Grey', sayfa: '82', image: '/images/varyant/cementino-blast-koyu-gri-60x60-blast-9mm.webp' },
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '82', image: '/images/varyant/cementino-beyaz-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '82', image: '/images/varyant/cementino-blast-graphite-60x120-blast-9mm.webp' },
          { boyut: '60×120', renk: 'İnci/Pearl', sayfa: '82', image: '/images/varyant/cementino-bone-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '82', image: '/images/varyant/cementino-acik-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '82', image: '/images/varyant/cementino-beyaz-60x120-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Blast Beyaz/White', sayfa: '254', image: '/images/varyant/cementino-blast-beyaz-30x90-blast-9mm.webp' },
          { boyut: '30×90', renk: 'Blast Greige', sayfa: '254', image: '/images/varyant/cementino-blast-greige-30x90-blast-9mm.webp' },
          { boyut: '30×90', renk: 'Blast Açık Gri/Light Grey', sayfa: '254', image: '/images/varyant/cementino-blast-acik-gri-30x90-blast-9mm.webp' },
          { boyut: '30×90', renk: 'Blast Koyu Gri/Dark Grey', sayfa: '255', image: '/images/varyant/cementino-blast-koyu-gri-30x90-blast-9mm.webp' },
          { boyut: '30×90', renk: 'Blast Antrasit/Anthracite', sayfa: '255' },
        ],
      },
      {
        isim: 'Cerastone',
        image: '/images/koleksiyon/cerastone.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '98', image: '/images/varyant/cerastone-gri-60x120-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '98', image: '/images/varyant/cerastone-antrasit-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Dark Grey', sayfa: '98', image: '/images/varyant/cerastone-koyu-gri-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Light Grey', sayfa: '98', image: '/images/varyant/cerastone-bone-60x60-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '98', image: '/images/varyant/cerastone-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Koyu Gri/Dark Grey', sayfa: '98', image: '/images/varyant/cerastone-koyu-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Taş/Stone', sayfa: '98' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '98', image: '/images/varyant/cerastone-antrasit-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bone Stone/Cream', sayfa: '98', image: '/images/varyant/cerastone-bone-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Taba', sayfa: '98' },
        ],
      },
      {
        isim: 'Horizon',
        image: '/images/koleksiyon/horizon.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '88', image: '/images/varyant/horizon-gri-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '88', image: '/images/varyant/horizon-bej-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '88', image: '/images/varyant/horizon-antrasit-60x60-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '88', image: '/images/varyant/horizon-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '88', image: '/images/varyant/horizon-bej-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '88', image: '/images/varyant/horizon-antrasit-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Taba', sayfa: '88', image: '/images/varyant/horizon-taba-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '88' },
        ],
      },
      {
        isim: 'Kreastone',
        image: '/images/koleksiyon/kreastone.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '90', image: '/images/varyant/kreastone-bej-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Light Grey', sayfa: '90' },
        ],
      },
      {
        isim: 'Molde',
        image: '/images/koleksiyon/molde.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Açık Gri/Light Grey', sayfa: '97', image: '/images/varyant/molde-acik-gri-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Koyu Gri/Dark Grey', sayfa: '97', image: '/images/varyant/molde-koyu-gri-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '97' },
          { boyut: '60×120', renk: 'Açık Gri/Light Grey', sayfa: '97', image: '/images/varyant/molde-acik-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Koyu Gri/Dark Grey', sayfa: '97', image: '/images/varyant/molde-koyu-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '97', image: '/images/varyant/molde-antrasit-60x120-mat-9mm.webp' },
          { boyut: '30×60', renk: 'Açık Gri/Light Grey', sayfa: '263', image: '/images/varyant/molde-acik-gri-30x90-mat-9mm.webp' },
          { boyut: '30×60', renk: 'Koyu Gri/Dark Grey', sayfa: '263', image: '/images/varyant/molde-koyu-gri-30x90-mat-9mm.webp' },
          { boyut: '30×60', renk: 'Antrasit/Anthracite', sayfa: '264', image: '/images/varyant/molde-antrasit-60x60-mat-9mm.webp' },
          { boyut: '45×65', renk: 'Açık Gri/Light Grey', sayfa: '263', image: '/images/varyant/molde-acik-gri-60x60-mat-9mm.webp' },
          { boyut: '60×65', renk: 'Açık Gri/Light Grey', sayfa: '263', image: '/images/varyant/molde-acik-gri-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Town',
        image: '/images/koleksiyon/town.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '174', image: '/images/varyant/town-bej-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Light Grey', sayfa: '174', image: '/images/varyant/town-acik-gri-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Heraklion',
        image: '/images/koleksiyon/heraklion.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Açık Bej/Light Beige', sayfa: '114', image: '/images/varyant/heraklion-acik-bej-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Pembe/Pink', sayfa: '114' },
        ],
      },
      {
        isim: 'Cemento',
        image: '/images/koleksiyon/cemento.webp',
        boyutlar: [
          { boyut: '45×60', renk: 'Blast Beyaz/White', sayfa: '143', image: '/images/varyant/cemento-rustik-beyaz-30x60-mat-75mm.webp' },
          { boyut: '45×60', renk: 'Blast Koyugri/Dark Grey', sayfa: '143', image: '/images/varyant/cemento-rustik-koyu-gri-30x60-mat-75mm.webp' },
          { boyut: '45×60', renk: 'Blast Greige', sayfa: '143', image: '/images/varyant/cemento-rustik-gri-30x60-mat-75mm.webp' },
          { boyut: '30×60', renk: 'Blast Beyaz/White', sayfa: '143', image: '/images/varyant/cemento-rustik-beyaz-30x60-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Tokio',
        kalinlik: '7mm',
        image: '/images/koleksiyon/tokio.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '86', image: '/images/varyant/tokio-gri-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Smoked', sayfa: '86' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '86', image: '/images/varyant/tokio-antrasit-60x120-mat-75mm.webp' },
          { boyut: '60×120', renk: 'Bone Cream', sayfa: '86' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. ONYX
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Onyx',
    slug: 'onyx',
    isimEn: 'Onyx',
    aciklama: 'Oniks taşının büyüleyici translusan görünümünü yansıtan özel koleksiyon.',
    seriler: [
      {
        isim: 'Onix',
        image: '/images/koleksiyon/onix.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Beyaz/White', sayfa: '229', image: '/images/varyant/onix-beyaz-45x45-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '229', image: '/images/varyant/onix-bej-45x45-parlak-75mm.webp' },
        ],
      },
      {
        isim: 'Onice',
        image: '/images/koleksiyon/onice.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '229', image: '/images/varyant/onice-bej-60x60-full-lappato-9mm.webp' },
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '229', image: '/images/varyant/onice-gri-60x60-full-lappato-9mm.webp' },
          { boyut: '60×63', renk: 'Bej/Beige', sayfa: '229' },
        ],
      },
      {
        isim: 'Onice Moon',
        image: '/images/koleksiyon/onice-moon.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '114' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '114' },
        ],
      },
      {
        isim: 'Florida',
        image: '/images/koleksiyon/florida.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Turkuaz/Turquoise', sayfa: '114', image: '/images/varyant/florida-turkuaz-60x120-full-lappato-75mm.webp' },
        ],
      },
      {
        isim: 'Paradise',
        image: '/images/koleksiyon/paradise.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Rain Forest Green', sayfa: '247', image: '/images/varyant/paradise-rain-forest-green-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Rain Forest Cream', sayfa: '247' },
          { boyut: '60×60', renk: 'Middle Mexi/Turkuaz', sayfa: '247' },
          { boyut: '60×60', renk: 'Amazon Max', sayfa: '247', image: '/images/varyant/paradise-amazon-mavi-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Salmon Rose', sayfa: '247', image: '/images/varyant/paradise-rose-onyx-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Turkuaz/Turquoise', sayfa: '247' },
          { boyut: '60×60', renk: 'Amazon Silver', sayfa: '247', image: '/images/varyant/paradise-amazon-mavi-60x60-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Rain Forest Green', sayfa: '120', image: '/images/varyant/paradise-rain-forest-green-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Middle Mexi/Turkuaz', sayfa: '120', image: '/images/varyant/paradise-amazon-mavi-60x120-mat-9mm.webp' },
          { boyut: '40×60', renk: 'Rain Forest Green', sayfa: '120' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. DEKOR
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Dekor',
    slug: 'dekor',
    isimEn: 'Decor',
    aciklama: 'Özgün desen ve dokularıyla mekânlara karakter katan dekoratif seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Scintilla',
        image: '/images/koleksiyon/scintilla.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Milano', sayfa: '239' },
          { boyut: '45×35', renk: 'Milano Pre-Cut', sayfa: '239' },
          { boyut: '45×45', renk: 'Midnight', sayfa: '239', image: '/images/varyant/scintilla-midnight-mavi-45x45-mat-85mm.webp' },
          { boyut: '45×35', renk: 'Midnight Pre-Cut', sayfa: '239', image: '/images/varyant/scintilla-midnight-mavi-45x45-mat-85mm.webp' },
        ],
      },
      {
        isim: 'Cementino Milan',
        image: '/images/koleksiyon/cementino.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Neo Decor', sayfa: '244' },
          { boyut: '60×60', renk: 'Neo Decor', sayfa: '244' },
        ],
      },
      {
        isim: 'Siena',
        image: '/images/koleksiyon/siena.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Antrasit/Anthracite', sayfa: '216', image: '/images/varyant/siena-antrasit-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Taş/Stone', sayfa: '216' },
        ],
      },
      {
        isim: 'Verona',
        image: '/images/koleksiyon/verona.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'İstanbul Decor', sayfa: '217' },
        ],
      },
      {
        isim: 'Washington',
        image: '/images/koleksiyon/washington.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'İstanbul Decor', sayfa: '217' },
          { boyut: '45×45', renk: 'Dark Green', sayfa: '217' },
        ],
      },
      {
        isim: 'Düden',
        image: '/images/koleksiyon/duden.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '254' },
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '254' },
        ],
      },
      {
        isim: 'Arya',
        image: '/images/koleksiyon/arya.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Beyaz/White', sayfa: '246' },
          { boyut: '30×60', renk: 'Wenge', sayfa: '246' },
        ],
      },
      {
        isim: 'İzmir',
        image: '/images/koleksiyon/izmir.webp',
        boyutlar: [
          { boyut: '10×60', renk: 'Gri/Grey', sayfa: '280' },
          { boyut: '10×60', renk: 'Bej/Beige', sayfa: '280' },
        ],
      },
      {
        isim: 'Armada',
        image: '/images/koleksiyon/armada.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Stone Decor', sayfa: '244' },
        ],
      },
      {
        isim: 'Athena',
        image: '/images/koleksiyon/athena.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Hayfa/Dark Grey', sayfa: '248' },
          { boyut: '30×90', renk: 'Antrasit/Anthracite', sayfa: '248' },
          { boyut: '30×90', renk: 'Greige', sayfa: '248' },
        ],
      },
      {
        isim: 'Boston',
        image: '/images/koleksiyon/boston.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Açık Gri/Light Grey', sayfa: '252', image: '/images/varyant/boston-acik-gri-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Antrasit/Anthracite', sayfa: '252', image: '/images/varyant/boston-antrasit-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Taba', sayfa: '253', image: '/images/varyant/boston-taba-30x90-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Style Flat',
        image: '/images/koleksiyon/styleflat.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Krem/Cream Decor', sayfa: '265' },
          { boyut: '30×90', renk: 'Beyaz/White Decor', sayfa: '265' },
          { boyut: '30×90', renk: 'Açık Gri/Light Grey Decor', sayfa: '265' },
          { boyut: '30×90', renk: 'Antrasit/Anthracite Decor', sayfa: '266' },
          { boyut: '30×90', renk: 'Yeşil/Green Decor', sayfa: '266' },
          { boyut: '30×90', renk: 'Lacivert/Dark Blue Decor', sayfa: '266' },
          { boyut: '30×90', renk: 'Yağ/Olive Decor', sayfa: '267' },
          { boyut: '30×90', renk: 'Plum Decor', sayfa: '267' },
          { boyut: '30×90', renk: 'Leather Bej Decor', sayfa: '267' },
        ],
      },
      {
        isim: 'Zenith',
        image: '/images/koleksiyon/zenith.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Leather Gri/Grey', sayfa: '269', image: '/images/varyant/zenith-gri-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Bej Mozaik/Beige Mosaic', sayfa: '271', image: '/images/varyant/zenith-mozaik-bej-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Gri Mozaik/Grey Mosaic', sayfa: '271', image: '/images/varyant/zenith-mozaik-gri-30x90-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Hatay',
        image: '/images/koleksiyon/hatay.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Açık Gri/Light Grey Decor', sayfa: '257', image: '/images/varyant/hatay-acik-gri-30x90-parlak-9mm.webp' },
          { boyut: '30×90', renk: 'Koyu Bej/Dark Beige Decor', sayfa: '257', image: '/images/varyant/hatay-defne-koyu-bej-30x90-parlak-9mm.webp' },
        ],
      },
      {
        isim: 'Molde',
        image: '/images/koleksiyon/molde.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Neo Decor', sayfa: '244' },
        ],
      },
      {
        isim: 'Apollon',
        image: '/images/koleksiyon/apollon.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Charcoal/Antrasit', sayfa: '333' },
          { boyut: '45×45', renk: 'Beyaz/White', sayfa: '333' },
        ],
      },
      {
        isim: 'Banyeres',
        image: '/images/koleksiyon/banyeres.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Pre-Cut', sayfa: '331' },
        ],
      },
      {
        isim: 'Barcelona',
        image: '/images/koleksiyon/barcelona.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Classic', sayfa: '331' },
          { boyut: '45×45', renk: 'White', sayfa: '331' },
        ],
      },
      {
        isim: 'Brixton',
        image: '/images/koleksiyon/brixton.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Gri/Grey', sayfa: '333' },
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '333' },
        ],
      },
      {
        isim: 'Bursa',
        image: '/images/koleksiyon/bursa.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Blue Pre-Cut', sayfa: '331' },
          { boyut: '45×45', renk: 'Milan Pre-Cut', sayfa: '331' },
        ],
      },
      {
        isim: 'Brianna',
        image: '/images/koleksiyon/brianna.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mavi/Blue', sayfa: '337' },
          { boyut: '45×45', renk: 'Mix', sayfa: '337' },
        ],
      },
      {
        isim: 'Chateau',
        image: '/images/koleksiyon/chateau.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '337' },
          { boyut: '45×45', renk: 'Gri/Grey', sayfa: '337' },
        ],
      },
      {
        isim: 'Carlingford',
        image: '/images/koleksiyon/carlingford.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '309' },
        ],
      },
      {
        isim: 'Dove Verona',
        image: '/images/koleksiyon/dove-verona.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Pre-Cut', sayfa: '314' },
        ],
      },
      {
        isim: 'Dorset',
        image: '/images/koleksiyon/dorset.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Gri/Grey Pre-Cut', sayfa: '312', image: '/images/varyant/dorset-gri-45x45-mat-85mm.webp' },
          { boyut: '45×45', renk: 'Bej/Beige Pre-Cut', sayfa: '312' },
          { boyut: '45×45', renk: 'Turkuaz/Turquoise Pre-Cut', sayfa: '312' },
        ],
      },
      {
        isim: 'Darwin',
        image: '/images/koleksiyon/darwin.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '317' },
        ],
      },
      {
        isim: 'Durham',
        image: '/images/koleksiyon/durham.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '319' },
        ],
      },
      {
        isim: 'Eagle',
        image: '/images/koleksiyon/eagle.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '318' },
        ],
      },
      {
        isim: 'Firenze',
        image: '/images/koleksiyon/firenze.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '315' },
        ],
      },
      {
        isim: 'Kappadokya',
        image: '/images/koleksiyon/kappadokya.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '316' },
        ],
      },
      {
        isim: 'Ledbury',
        image: '/images/koleksiyon/ledbury.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '311' },
        ],
      },
      {
        isim: 'Lisbone',
        image: '/images/koleksiyon/lisbone.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '316' },
        ],
      },
      {
        isim: 'Milan',
        image: '/images/koleksiyon/milan.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '310' },
        ],
      },
      {
        isim: 'Mansa',
        image: '/images/koleksiyon/mansa.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '316' },
        ],
      },
      {
        isim: 'Merona',
        image: '/images/koleksiyon/mansa.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '315' },
        ],
      },
      {
        isim: 'Milton',
        image: '/images/koleksiyon/milton.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '311' },
        ],
      },
      {
        isim: 'Musana',
        image: '/images/koleksiyon/mansa.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '316' },
        ],
      },
      {
        isim: 'Venice',
        image: '/images/koleksiyon/venice.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Mix', sayfa: '314' },
        ],
      },
      {
        isim: 'Keten',
        image: '/images/koleksiyon/keten.webp',
        boyutlar: [
          { boyut: '80×90', renk: 'Dekor', sayfa: '259' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 7. AHŞAP
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Ahşap',
    slug: 'ahsap',
    isimEn: 'Wood',
    aciklama: 'Doğal ahşap görünümünü porselen seramiğin dayanıklılığıyla birleştiren koleksiyon.',
    seriler: [
      {
        isim: 'Meşe',
        kalinlik: '9mm',
        image: '/images/koleksiyon/mese.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '105', image: '/images/varyant/mese-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '105', image: '/images/varyant/mese-bej-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Kahve/Brown', sayfa: '105', image: '/images/varyant/mese-kahve-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Wenge', sayfa: '105', image: '/images/varyant/mese-wenge-60x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Panwall',
        kalinlik: '9mm',
        image: '/images/koleksiyon/panwall.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Açık Bej/Light Beige', sayfa: '118', image: '/images/varyant/panwall-acik-bej-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Koyu Bej/Dark Beige', sayfa: '118', image: '/images/varyant/panwall-koyu-bej-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Antrasit/Anthracite', sayfa: '118', image: '/images/varyant/panwall-antrasit-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Kahve Beyaz/Creamwhite', sayfa: '118' },
        ],
      },
      {
        isim: 'Sedir',
        kalinlik: '9mm',
        image: '/images/koleksiyon/sedir.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '121', image: '/images/varyant/sedir-bej-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '121', image: '/images/varyant/sedir-gri-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Kahve/Brown', sayfa: '121', image: '/images/varyant/sedir-kahve-60x120-mat-9mm.webp' },
          { boyut: '60×120', renk: 'Mix', sayfa: '121', image: '/images/varyant/sedir-mix-60x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Woodline',
        kalinlik: '9mm',
        image: '/images/koleksiyon/woodline.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '114', image: '/images/varyant/woodline-beyaz-60x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Meşe',
        kalinlik: '7.5mm',
        image: '/images/koleksiyon/mese.webp',
        boyutlar: [
          { boyut: '20×120', renk: 'Bej/Beige', sayfa: '145', image: '/images/varyant/mese-bej-20x120-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Burgaz',
        image: '/images/koleksiyon/burgaz.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Gri/Grey', sayfa: '204', image: '/images/varyant/burgaz-gri-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '204', image: '/images/varyant/burgaz-bej-45x45-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Mersin',
        image: '/images/koleksiyon/mersin.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '200', image: '/images/varyant/mersin-bej-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Gri/Grey', sayfa: '200', image: '/images/varyant/mersin-gri-45x45-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Parke',
        image: '/images/koleksiyon/parke.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '206', image: '/images/varyant/parke-bej-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Gri/Grey', sayfa: '206', image: '/images/varyant/parke-gri-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Kahve/Brown', sayfa: '206', image: '/images/varyant/parke-kahve-45x45-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Beldevere',
        image: '/images/koleksiyon/beldevere.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Wenge', sayfa: '146', image: '/images/varyant/beldevere-wenge-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Walnut', sayfa: '146', image: '/images/varyant/beldevere-walnut-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Vintage', sayfa: '146' },
        ],
      },
      {
        isim: 'Forest',
        image: '/images/koleksiyon/forest.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '171', image: '/images/varyant/forest-bej-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '171', image: '/images/varyant/forest-gri-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Teras',
        image: '/images/koleksiyon/teras.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Gri/Grey', sayfa: '197', image: '/images/varyant/teras-gri-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '197', image: '/images/varyant/teras-bej-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Kahve/Brown', sayfa: '197', image: '/images/varyant/teras-kahve-60x60-mat-9mm.webp' },
        ],
      },
      {
        isim: 'Lapland',
        image: '/images/koleksiyon/lapland.webp',
        boyutlar: [
          { boyut: '20×120', renk: 'Parke Kahve/Pinewood Brown', sayfa: '138' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 8. HAVUZ
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Havuz',
    slug: 'havuz',
    isimEn: 'Pool',
    aciklama: 'Yüzme havuzu ve su kenarı alanlar için özel tasarlanmış kaymaz seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Ocean',
        image: '/images/koleksiyon/ocean.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Turkuaz/Turquoise', sayfa: '148', image: '/images/varyant/ocean-turkuaz-30x60-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Salda',
        image: '/images/koleksiyon/salda.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Mavi/Blue', sayfa: '148', image: '/images/varyant/salda-mavi-30x60-mat-75mm.webp' },
        ],
      },
      {
        isim: 'Ducapool',
        image: '/images/koleksiyon/ducapool.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Deniz Mavisi/Marine Blue', sayfa: '219' },
          { boyut: '45×45', renk: 'Açık Mavi/Light Blue', sayfa: '219' },
        ],
      },
      {
        isim: 'Belize',
        kalinlik: '13mm',
        image: '/images/koleksiyon/belize.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Gri/Grey', sayfa: '41' },
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '41' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '41' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 9. DÜZ RENKLER
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Düz Renkler',
    slug: 'duz-renkler',
    isimEn: 'Monocolor',
    aciklama: 'Sade ve minimalist tek renk porselen seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Pergamon',
        image: '/images/koleksiyon/pergamon.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Beyaz/White', sayfa: '232', image: '/images/varyant/pergamon-beyaz-45x45-parlak-75mm.webp' },
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '232', image: '/images/varyant/pergamon-bej-45x45-parlak-75mm.webp' },
        ],
      },
      {
        isim: 'Saten',
        image: '/images/koleksiyon/saten.webp',
        boyutlar: [
          { boyut: '45×45', renk: 'Bej/Beige', sayfa: '234' },
        ],
      },
      {
        isim: 'Alaska',
        image: '/images/koleksiyon/alaska.webp',
        boyutlar: [
          { boyut: '60×60', renk: 'Beyaz/White', sayfa: '154', image: '/images/varyant/alaska-beyaz-60x60-mat-9mm.webp' },
          { boyut: '60×60', renk: 'Süper Beyaz/Super White', sayfa: '154', image: '/images/varyant/alaska-super-beyaz-60x60-full-lappato-9mm.webp' },
          { boyut: '30×90', renk: 'Beyaz/White', sayfa: '244', image: '/images/varyant/alaska-beyaz-30x90-saten-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Opak Beyaz/Opaque White', sayfa: '244', image: '/images/varyant/alaska-opak-beyaz-30x90-parlak-9mm.webp' },
          { boyut: '60×120', renk: 'Süper Beyaz/Super White', sayfa: '69', image: '/images/varyant/alaska-super-beyaz-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Beyaz/White', sayfa: '69', image: '/images/varyant/alaska-beyaz-60x120-mat-9mm.webp' },
          { boyut: '30×60', renk: 'Beyaz/White', sayfa: '276', image: '/images/varyant/alaska-beyaz-30x60-mat-75mm.webp' },
          { boyut: '30×60', renk: 'Opak Beyaz/Opaque White', sayfa: '276', image: '/images/varyant/alaska-opak-beyaz-30x60-parlak-75mm.webp' },
        ],
      },
      {
        isim: 'Pyramid',
        image: '/images/koleksiyon/pyramid.webp',
        boyutlar: [
          { boyut: '30×60', renk: 'Beyaz/White', sayfa: '285', image: '/images/varyant/pyramid-beyaz-30x60-parlak-75mm.webp' },
          { boyut: '30×60', renk: 'Siyah/Black', sayfa: '285', image: '/images/varyant/pyramid-siyah-30x60-parlak-75mm.webp' },
          { boyut: '30×60', renk: 'Lila', sayfa: '285', image: '/images/varyant/pyramid-lila-30x60-parlak-75mm.webp' },
        ],
      },
      {
        isim: 'Style Flat',
        image: '/images/koleksiyon/styleflat.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Krem/Cream', sayfa: '265' },
          { boyut: '30×90', renk: 'Beyaz/White', sayfa: '265' },
          { boyut: '30×90', renk: 'Açık Gri/Light Grey', sayfa: '265' },
          { boyut: '30×90', renk: 'Antrasit/Anthracite', sayfa: '266' },
          { boyut: '30×90', renk: 'Yeşil/Green', sayfa: '266' },
          { boyut: '30×90', renk: 'Koyu Mavi/Dark Blue', sayfa: '266' },
        ],
      },
      {
        isim: 'Kayrak',
        kalinlik: '9mm',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '98' },
          { boyut: '60×120', renk: 'Siyah/Black', sayfa: '98' },
        ],
      },
      {
        isim: 'Sahra',
        kalinlik: '9mm',
        image: '/images/koleksiyon/sahra.webp',
        boyutlar: [
          { boyut: '60×120', renk: 'Bej/Beige', sayfa: '124', image: '/images/varyant/sahra-bej-60x120-full-lappato-9mm.webp' },
          { boyut: '60×120', renk: 'Bone', sayfa: '124', image: '/images/varyant/sahra-bone-60x120-full-lappato-9mm.webp' },
          { boyut: '60×60', renk: 'Bej/Beige', sayfa: '191', image: '/images/varyant/sahra-bej-60x60-full-lappato-9mm.webp' },
          { boyut: '60×60', renk: 'Bone', sayfa: '191', image: '/images/varyant/sahra-bone-60x60-full-lappato-9mm.webp' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 10. TEKSTİL
  // ─────────────────────────────────────────────────────────────────
  {
    isim: 'Tekstil',
    slug: 'tekstil',
    isimEn: 'Textile',
    aciklama: 'Kumaş ve tekstil dokusunu yansıtan yumuşak görünümlü seramik koleksiyonu.',
    seriler: [
      {
        isim: 'Keten',
        image: '/images/koleksiyon/keten.webp',
        boyutlar: [
          { boyut: '30×90', renk: 'Açık Bej/Light Beige', sayfa: '259', image: '/images/varyant/keten-acik-bej-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Koyu Bej/Dark Beige', sayfa: '259', image: '/images/varyant/keten-koyu-bej-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Açık Gri/Light Grey', sayfa: '259', image: '/images/varyant/keten-acik-gri-30x90-mat-9mm.webp' },
          { boyut: '30×90', renk: 'Koyu Gri/Dark Grey', sayfa: '259', image: '/images/varyant/keten-koyu-gri-30x90-mat-9mm.webp' },
          { boyut: '45×45', renk: 'Açık Bej/Light Beige', sayfa: '262', image: '/images/varyant/keten-acik-bej-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Koyu Bej/Dark Beige', sayfa: '262', image: '/images/varyant/keten-koyu-bej-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Açık Gri/Light Grey', sayfa: '262', image: '/images/varyant/keten-acik-gri-45x45-mat-75mm.webp' },
          { boyut: '45×45', renk: 'Koyu Gri/Dark Grey', sayfa: '262', image: '/images/varyant/keten-koyu-gri-45x45-mat-75mm.webp' },
        ],
      },
    ],
  },
]
