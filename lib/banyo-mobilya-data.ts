/**
 * Banyo mobilyası ürün listesi.
 *
 * Kaynak: balneom.com — Banyo Dolapları kategorisi.
 * Fiyat bilgisi bilinçli olarak tutulmuyor; teklif üzerine veriliyor.
 */

export interface BanyoMobilya {
  slug: string
  name: string
  /** Ölçü / kısa özellik satırı */
  detay?: string
  img: string
}

const g = (f: string) => `/images/banyo-mobilyalari/${f}`

export const BANYO_MOBILYALARI: BanyoMobilya[] = [
  // ─── Lale serisi ────────────────────────────────────────────────────
  { slug: 'lale-70', name: 'Lale Lavabolu Banyo Dolabı + Aynalı Dolap', detay: '70 cm · %100 MDF', img: g('lale-70.webp') },
  { slug: 'lale-80', name: 'Lale Lavabolu Banyo Dolabı + Aynalı Dolap', detay: '80 cm · %100 MDF', img: g('lale-80.webp') },
  { slug: 'lale-90', name: 'Lale Lavabolu Banyo Dolabı + Aynalı Dolap', detay: '90 cm · %100 MDF', img: g('lale-90.webp') },
  { slug: 'lale-100', name: 'Lale Lavabolu Banyo Dolabı + Aynalı Dolap', detay: '100 cm · %100 MDF', img: g('lale-100.webp') },
  { slug: 'lale-90-boy', name: 'Lale Lavabolu Banyo Dolabı + Boy Dolabı', detay: '90 cm · %100 MDF', img: g('lale-90-boy.webp') },
  { slug: 'lale-70-set', name: 'Lale Lavabolu Banyo Dolabı + Aynalı Dolap + Boy Dolabı', detay: '70 cm · set', img: g('lale-70-set.webp') },
  { slug: 'lale-80-set', name: 'Lale Lavabolu Banyo Dolabı + Aynalı Dolap + Boy Dolabı', detay: '80 cm · set', img: g('lale-80-set.webp') },
  { slug: 'lale-100-set', name: 'Lale Lavabolu Banyo Dolabı + Aynalı Dolap + Boy Dolabı', detay: '100 cm · set', img: g('lale-100-set.webp') },

  // ─── Lale Beyaz ─────────────────────────────────────────────────────
  { slug: 'lale-beyaz-70', name: 'Lale Beyaz Lavabolu Banyo Dolabı + Aynalı Dolap', detay: '70 cm · %100 MDF', img: g('lale-beyaz-70.webp') },
  { slug: 'lale-beyaz-90-boy', name: 'Lale Beyaz Lavabolu Banyo Dolabı + Boy Dolabı', detay: '90 cm · %100 MDF', img: g('lale-beyaz-90-boy.webp') },
  { slug: 'lale-beyaz-70-set', name: 'Lale Beyaz Lavabolu Banyo Dolabı + Aynalı Dolap + Boy Dolabı', detay: '70 cm · set', img: g('lale-beyaz-70-set.webp') },
  { slug: 'lale-beyaz-80-set', name: 'Lale Beyaz Lavabolu Banyo Dolabı + Aynalı Dolap + Boy Dolabı', detay: '80 cm · set', img: g('lale-beyaz-80-set.webp') },
  { slug: 'lale-beyaz-100-set', name: 'Lale Beyaz Lavabolu Banyo Dolabı + Aynalı Dolap + Boy Dolabı', detay: '100 cm · set', img: g('lale-beyaz-100-set.webp') },

  // ─── Gül serisi ─────────────────────────────────────────────────────
  { slug: 'gul-70', name: 'Gül Banyo Dolabı, Ayna ve Lavabo', detay: '70 cm', img: g('gul-70.webp') },
  { slug: 'gul-80', name: 'Gül Banyo Dolabı, Ayna ve Lavabo', detay: '80 cm', img: g('gul-80.webp') },
  { slug: 'gul-90', name: 'Gül Banyo Dolabı, Ayna ve Lavabo', detay: '90 cm', img: g('gul-90.webp') },
  { slug: 'gul-100', name: 'Gül Banyo Dolabı, Ayna ve Lavabo', detay: '100 cm', img: g('gul-100.webp') },
  { slug: 'gul-70-set', name: 'Gül Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '70 cm · set', img: g('gul-70-set.webp') },
  { slug: 'gul-80-set', name: 'Gül Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '80 cm · set', img: g('gul-80-set.webp') },
  { slug: 'gul-90-set', name: 'Gül Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '90 cm · set', img: g('gul-90-set.webp') },
  { slug: 'gul-100-set', name: 'Gül Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '100 cm · set', img: g('gul-100-set.webp') },

  // ─── Gül Beyaz ──────────────────────────────────────────────────────
  { slug: 'gul-beyaz-70', name: 'Gül Beyaz Banyo Dolabı, Ayna ve Lavabo', detay: '70 cm', img: g('gul-beyaz-70.webp') },
  { slug: 'gul-beyaz-80', name: 'Gül Beyaz Banyo Dolabı, Ayna ve Lavabo', detay: '80 cm', img: g('gul-beyaz-80.webp') },
  { slug: 'gul-beyaz-90', name: 'Gül Beyaz Banyo Dolabı, Ayna ve Lavabo', detay: '90 cm', img: g('gul-beyaz-90.webp') },
  { slug: 'gul-beyaz-100', name: 'Gül Beyaz Banyo Dolabı, Ayna ve Lavabo', detay: '100 cm', img: g('gul-beyaz-100.webp') },
  { slug: 'gul-beyaz-70-set', name: 'Gül Beyaz Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '70 cm · set', img: g('gul-beyaz-70-set.webp') },
  { slug: 'gul-beyaz-80-set', name: 'Gül Beyaz Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '80 cm · set', img: g('gul-beyaz-80-set.webp') },
  { slug: 'gul-beyaz-90-set', name: 'Gül Beyaz Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '90 cm · set', img: g('gul-beyaz-90-set.webp') },
  { slug: 'gul-beyaz-100-set', name: 'Gül Beyaz Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '100 cm · set', img: g('gul-beyaz-100-set.webp') },

  // ─── Erguvan serisi (gümüş kulp) ────────────────────────────────────
  { slug: 'erguvan-beyaz-80', name: 'Erguvan Beyaz Lavabolu Banyo Dolabı + Aynalı Üst Dolap', detay: '80 cm · gümüş kulp', img: g('erguvan-beyaz-80.webp') },
  { slug: 'erguvan-beyaz-100', name: 'Erguvan Beyaz Banyo Dolabı, Ayna ve Lavabo', detay: '100 cm · gümüş kulp', img: g('erguvan-beyaz-100.webp') },
  { slug: 'erguvan-beyaz-80-set', name: 'Erguvan Beyaz Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '80 cm · set', img: g('erguvan-beyaz-80-set.webp') },
  { slug: 'erguvan-beyaz-100-set', name: 'Erguvan Beyaz Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '100 cm · set', img: g('erguvan-beyaz-100-set.webp') },
  { slug: 'erguvan-antrasit-80', name: 'Erguvan Antrasit Lavabolu Banyo Dolabı + Aynalı Üst Dolap', detay: '80 cm · gümüş kulp', img: g('erguvan-antrasit-80.webp') },
  { slug: 'erguvan-antrasit-100', name: 'Erguvan Antrasit Banyo Dolabı, Ayna ve Lavabo', detay: '100 cm · gümüş kulp', img: g('erguvan-antrasit-100.webp') },
  { slug: 'erguvan-antrasit-80-set', name: 'Erguvan Antrasit Banyo Dolabı, Aynalı Üst Dolap ve Boy Dolabı', detay: '80 cm · set', img: g('erguvan-antrasit-80-set.webp') },
  { slug: 'erguvan-ant-100-set', name: 'Erguvan Antrasit Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '100 cm · set', img: g('erguvan-ant-100-set.webp') },
  { slug: 'erguvan-lacivert-80', name: 'Erguvan Lacivert Lavabolu Banyo Dolabı + Aynalı Üst Dolap', detay: '80 cm · gümüş kulp', img: g('erguvan-lacivert-80.webp') },
  { slug: 'erguvan-lacivert-100', name: 'Erguvan Lacivert Banyo Dolabı, Ayna ve Lavabo', detay: '100 cm · gümüş kulp', img: g('erguvan-lacivert-100.webp') },
  { slug: 'erguvan-lacivert-80-set', name: 'Erguvan Lacivert Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '80 cm · set', img: g('erguvan-lacivert-80-set.webp') },
  { slug: 'erguvan-lacivert-100-set', name: 'Erguvan Lacivert Banyo Dolabı, Ayna, Lavabo ve Boy Dolabı', detay: '100 cm · set', img: g('erguvan-lacivert-100-set.webp') },

  // ─── Selvi serisi ───────────────────────────────────────────────────
  { slug: 'selvi-65', name: 'Selvi Banyo Dolabı, Aynalı Üst Dolap ve Lavabo', detay: '65 cm', img: g('selvi-65.webp') },
  { slug: 'selvi-80', name: 'Selvi Banyo Dolabı, Aynalı Üst Dolap ve Lavabo', detay: '80 cm', img: g('selvi-80.webp') },
  { slug: 'selvi-65-set', name: 'Selvi Banyo Dolabı, Aynalı Üst Dolap, Lavabo ve Boy Dolabı', detay: '65 cm · set', img: g('selvi-65-set.webp') },
  { slug: 'selvi-80-set', name: 'Selvi Banyo Dolabı, Aynalı Üst Dolap, Lavabo ve Boy Dolabı', detay: '80 cm · set', img: g('selvi-80-set.webp') },

  // ─── Defne serisi ───────────────────────────────────────────────────
  { slug: 'defne-65', name: 'Defne Banyo Dolabı, Aynalı Üst Dolap ve Lavabo', detay: '65 cm', img: g('defne-65.webp') },
  { slug: 'defne-02-65', name: 'Defne 02 Banyo Dolabı, Aynalı Üst Dolap ve Lavabo', detay: '65 cm', img: g('defne-02-65.webp') },
  { slug: 'defne-80', name: 'Defne Banyo Dolabı, Aynalı Üst Dolap ve Lavabo', detay: '80 cm', img: g('defne-80.webp') },
  { slug: 'defne-80-set', name: 'Defne Banyo Dolabı, Aynalı Üst Dolap, Lavabo ve Boy Dolabı', detay: '80 cm · set', img: g('defne-80-set.webp') },

  // ─── Karanfil serisi ────────────────────────────────────────────────
  { slug: 'karanfil-antrasit-65', name: 'Karanfil Antrasit Lavabolu Banyo Dolabı + Aynalı Üst Dolap', detay: '65 cm', img: g('karanfil-antrasit-65.webp') },
  { slug: 'karanfil-antrasit-80', name: 'Karanfil Antrasit Lavabolu Banyo Dolabı + Aynalı Üst Dolap', detay: '80 cm', img: g('karanfil-antrasit-80.webp') },
  { slug: 'karanfil-antrasit-65-set', name: 'Karanfil Antrasit Banyo Dolabı, Aynalı Üst Dolap ve Boy Dolabı', detay: '65 cm · set', img: g('karanfil-antrasit-65-set.webp') },
  { slug: 'karanfil-antrasit-80-set', name: 'Karanfil Antrasit Banyo Dolabı, Aynalı Üst Dolap ve Boy Dolabı', detay: '80 cm · set', img: g('karanfil-antrasit-80-set.webp') },

  // ─── Zakkum serisi ──────────────────────────────────────────────────
  { slug: 'zakkum-100', name: 'Zakkum Banyo Dolabı ve Rafı', detay: '100 cm', img: g('zakkum-100.webp') },
  { slug: 'zakkum-120', name: 'Zakkum Banyo Dolabı, Aynalı Üst Dolap ve Rafı', detay: '120 cm', img: g('zakkum-120.webp') },
  { slug: 'zakkum-100-set', name: 'Zakkum Banyo Dolabı, Aynalı Üst Dolap, Boy Dolabı ve Rafı', detay: '100 cm · set', img: g('zakkum-100-set.webp') },
  { slug: 'zakkum-120-set', name: 'Zakkum Banyo Dolabı, Aynalı Üst Dolap, Boy Dolabı ve Rafı', detay: '120 cm · set', img: g('zakkum-120-set.webp') },

  // ─── Kadife (High Gloss) ────────────────────────────────────────────
  { slug: 'kadife-80', name: 'Kadife Beyaz Parlak Banyo Dolabı, Led Işıklı Aynalı Üst Dolap', detay: '80 cm · high gloss', img: g('kadife-80.webp') },
  { slug: 'kadife-100', name: 'Kadife Beyaz Parlak Banyo Dolabı, Led Işıklı Aynalı Üst Dolap', detay: '100 cm · high gloss', img: g('kadife-100.webp') },
  { slug: 'kadife-80-set', name: 'Kadife Beyaz Parlak Banyo Dolabı, Ledli Aynalı Üst Dolap ve Boy Dolabı', detay: '80 cm · set', img: g('kadife-80-set.webp') },
  { slug: 'kadife-100-set', name: 'Kadife Beyaz Parlak Banyo Dolabı, Ledli Aynalı Üst Dolap ve Boy Dolabı', detay: '100 cm · set', img: g('kadife-100-set.webp') },

  // ─── İdil serisi ────────────────────────────────────────────────────
  { slug: 'idil-65', name: 'İdil Banyo Dolabı, Aynalı Üst Dolap ve Lavabo', detay: '65 cm', img: g('idil-65.webp') },
  { slug: 'idil-80', name: 'İdil Banyo Dolabı, Aynalı Üst Dolap ve Lavabo', detay: '80 cm', img: g('idil-80.webp') },

  // ─── Çamaşır makinesi dolapları ─────────────────────────────────────
  { slug: 'camasir-bn2', name: 'Çamaşır Makinesi Dolabı Antrasit', detay: 'BN 2', img: g('camasir-bn2.webp') },
  { slug: 'camasir-bn3', name: 'Çamaşır Makinesi Dolabı Beyaz', detay: 'BN 3', img: g('camasir-bn3.webp') },
  { slug: 'camasir-bn4', name: 'Üst Dolaplı Çamaşır Makinesi Dolabı', detay: 'BN 4', img: g('camasir-bn4.webp') },
  { slug: 'camasir-bn5', name: 'Üst Dolaplı Çamaşır Makinesi Dolabı', detay: 'BN 5', img: g('camasir-bn5.webp') },
  { slug: 'camasir-bn6', name: 'Üst Dolaplı Çamaşır Makinesi Dolabı Beyaz', detay: 'BN 6', img: g('camasir-bn6.webp') },
  { slug: 'camasir-bn8', name: 'Çamaşır Makinesi Dolabı Beyaz', detay: 'BN 8', img: g('camasir-bn8.webp') },
  { slug: 'camasir-amalfi-bn9', name: 'Çamaşır Makinesi Dolabı Amalfi', detay: 'BN 9', img: g('camasir-amalfi-bn9.webp') },
  { slug: 'camasir-lefkas-bn10', name: 'Çamaşır Makinesi Dolabı Lefkas', detay: 'BN 10', img: g('camasir-lefkas-bn10.webp') },
  { slug: 'camasir-kurutmali-beyaz', name: 'Kurutmalı Çamaşır Makinesi Dolabı Beyaz', detay: '%100 MDF', img: g('camasir-kurutmali-beyaz.webp') },
]
