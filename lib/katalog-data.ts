/**
 * Katalog listesi.
 *
 * Hem katalog sayfası hem de site içi arama bu veriyi kullanır.
 */

export type Katalog = {
  id: string
  baslik: string
  yil: string | null
  marka: string
  pdf: string
  accent: string
  tag?: string | null
  cover?: string
}

export type Bolum = {
  id: string
  baslik: string
  aciklama: string
  kataloglar: Katalog[]
}

export const BOLUMLER: Bolum[] = [
  {
    id: 'etili',
    baslik: 'Etili Seramik',
    aciklama: 'Porselen seramik koleksiyon ve genel katalogları.',
    kataloglar: [
      {
        id: 'yeni-seriler-2026',
        baslik: 'Yeni Seriler',
        yil: '2026',
        marka: 'Etili Seramik',
        pdf: 'https://etiliseramik.com/media/2026_yeni_seriler-web-r.pdf',
        accent: '#c8a96e',
        tag: 'YENİ',
        cover: '/images/katalog/yeni-seriler.webp',
      },
      {
        id: 'genel-katalog-2026',
        baslik: 'Genel Katalog',
        yil: '2026',
        marka: 'Etili Seramik',
        pdf: 'https://etiliseramik.com/media/ES_KatalogWeb.pdf',
        accent: '#8ca8c0',
        cover: '/images/katalog/genel-2026.webp',
      },
      {
        id: 'genel-katalog-2022',
        baslik: 'Genel Katalog',
        yil: '2022',
        marka: 'Etili Seramik',
        pdf: 'https://etiliseramik.com/media/etili_genel_katalog_2022.pdf',
        accent: '#b0a090',
        cover: '/images/katalog/genel-2022.webp',
      },
    ],
  },
  {
    id: 'turkuaz',
    baslik: 'Turkuaz Seramik · CeraStyle',
    aciklama: 'Lavabo, klozet, armatür ve duş sistemleri ürün kataloğu.',
    kataloglar: [
      {
        id: 'turkuaz-urun-katalogu',
        baslik: 'Ürün Kataloğu',
        yil: null,
        marka: 'Turkuaz Seramik',
        pdf: 'https://turkuazseramik.com.tr/download/catalog/urun_katalogu.pdf',
        accent: '#4fb3b8',
      },
    ],
  },
  {
    id: 'banyo-mobilya-aksesuar',
    baslik: 'Banyo Mobilyası ve Aksesuar',
    aciklama: 'Banyo dolabı koleksiyonları ile duş sistemleri ve banyo aksesuar katalogları.',
    kataloglar: [
      {
        id: 'balneom-genel-2026',
        baslik: 'Balneom Genel Katalog',
        yil: '2026',
        marka: 'Balneom',
        pdf: '/kataloglar/balneom-genel-katalog-2026.pdf',
        accent: '#8ca8c0',
      },
      {
        id: 'duxxa-aksesuar-dus-2025',
        baslik: 'Duxxa Aksesuar ve Duş Sistemleri',
        yil: '2025',
        marka: 'Duxxa',
        pdf: '/kataloglar/duxxa-aksesuar-dus-2025.pdf',
        accent: '#7f9b93',
      },
    ],
  },
  {
    id: 'vitra-genel',
    baslik: 'VitrA Karo · Genel Kataloglar',
    aciklama: 'PRO serisi genel ürün katalogları.',
    kataloglar: [
      {
        id: 'vitra-pro-nature-2026',
        baslik: 'PRO Nature',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/genel-kataloglar/VTR_26001_PRONature2026Global_06_NONRECYCLED_D.pdf',
        accent: '#7d9a6d',
      },
      {
        id: 'vitra-pro-residence-2026',
        baslik: 'PRO Residence',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/genel-kataloglar/PRO-Residence-2026-1.pdf',
        accent: '#b08f6a',
      },
      {
        id: 'vitra-pro-technic-2026',
        baslik: 'PRO Technic',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/genel-kataloglar/PRO_Technic_2026.pdf',
        accent: '#6f7f8c',
      },
    ],
  },
  {
    id: 'vitra-ozel',
    baslik: 'VitrA Karo · Özel Kategoriler',
    aciklama: 'Özel yüzey ve uygulama alanlarına yönelik kataloglar.',
    kataloglar: [
      {
        id: 'vitra-infinite-2026',
        baslik: 'Infinite',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/ozel-kategoriler/VTR_26002_InfiniteKatalogu2026Global_04_NONRECYCLED.pdf',
        accent: '#9c8fa8',
      },
      {
        id: 'vitra-20mm-2026',
        baslik: 'VitrA 20mm',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/ozel-kategoriler/VTR_26056_20mmKatalogu2026Global.pdf',
        accent: '#8a8578',
      },
      {
        id: 'vitra-white-tiles',
        baslik: 'White Tiles',
        yil: null,
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/ozel-kategoriler/White-Tiles.pdf',
        accent: '#a8a8a4',
      },
      {
        id: 'vitra-pool-wellness-2025',
        baslik: 'Pool & Wellness',
        yil: '2025',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/ozel-kategoriler/VTR_25032_PoolWellnessKatalogu2025_05.pdf',
        accent: '#5f9bb0',
      },
    ],
  },
  {
    id: 'vitra-sistem',
    baslik: 'VitrA Karo · Sistem Katalogları',
    aciklama: 'Seri bazlı sistem ve uygulama katalogları.',
    kataloglar: [
      {
        id: 'vitra-resincrete-2025',
        baslik: 'Resincrete',
        yil: '2025',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/karo-sistem-kataloglari/VTR_24051_ResincreteSistemKatalogu2025_new.pdf',
        accent: '#8d8b86',
      },
      {
        id: 'vitra-lightstone-2026',
        baslik: 'LightStone',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/karo-sistem-kataloglari/LightStoneSistemKatalogu2026.pdf',
        accent: '#bfae94',
      },
      {
        id: 'vitra-mode-2026',
        baslik: 'mode',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/karo-sistem-kataloglari/mode-2026.pdf',
        accent: '#7a8b9c',
      },
      {
        id: 'vitra-retromix-2025',
        baslik: 'retromix',
        yil: '2025',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/karo-sistem-kataloglari/retromix_SistemKatalogu2025.pdf',
        accent: '#b08278',
      },
      {
        id: 'vitra-miniworx-2026',
        baslik: 'miniworx',
        yil: '2026',
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/karo-sistem-kataloglari/miniworx-2026.pdf',
        accent: '#94a08a',
      },
      {
        id: 'vitra-color2',
        baslik: 'Color 2.0',
        yil: null,
        marka: 'VitrA',
        pdf: 'https://vitra.b-cdn.net/karo-sistem-kataloglari/Color-2.pdf',
        accent: '#c09a5e',
      },
    ],
  },
]
