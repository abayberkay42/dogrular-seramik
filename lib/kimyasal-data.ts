/**
 * Yapı kimyasalları ürün listesi.
 *
 * Kaynaklar:
 *  - Kütahya Yapı Kimyasalları (KYK) — kyk.com.tr
 *  - Matkim Yapı Kimyasalları      — matkim.com.tr
 *
 * Ürün adları üretici sitelerindeki güncel listelerden alınmıştır.
 */

export interface KimyasalUrun {
  name: string
  /** Üreticinin ürün detay sayfası */
  url?: string
  /** Yerel kopyası alınmış ürün görseli */
  img?: string
}

export interface KimyasalKategori {
  slug: string
  label: string
  urunler: KimyasalUrun[]
}

export interface KimyasalMarka {
  slug: string
  name: string
  description: string
  site: string
  kategoriler: KimyasalKategori[]
}

/** KYK ürün detay sayfaları tek bir query-string kalıbı kullanıyor. */
const kyk = (slug: string) => `https://www.kyk.com.tr/?product=${slug}`

export const KIMYASAL_MARKALAR: KimyasalMarka[] = [
  // ─── KÜTAHYA YAPI KİMYASALLARI ────────────────────────────────────
  {
    slug: 'kyk',
    name: 'Kütahya Yapı Kimyasalları',
    description:
      'Yapıştırıcı, derz dolgu, su yalıtım, tamir harcı, zemin kaplama, sıva ve astar gruplarında geniş ürün yelpazesi sunan KYK ürünleri.',
    site: 'https://www.kyk.com.tr',
    kategoriler: [
      {
        slug: 'yapistiricilar',
        label: 'Yapıştırıcılar',
        urunler: [
          { name: 'Artefix Jel', url: kyk('artefix-jel-2'), img: '/images/kimyasal/kyk/artefix-jel-2.webp' },
          { name: 'MegaFix Y101', url: kyk('megafix-megafix-y101'), img: '/images/kimyasal/kyk/megafix-megafix-y101.webp' },
          { name: 'MegaGranit Y102', url: kyk('megagranit-y102'), img: '/images/kimyasal/kyk/megagranit-y102.webp' },
          { name: 'MegaFlex Y103', url: kyk('megaflex-y103'), img: '/images/kimyasal/kyk/megaflex-y103.webp' },
          { name: 'MegaFlex Maxi Y104', url: kyk('megaflex-maxi-y104'), img: '/images/kimyasal/kyk/megaflex-maxi-y104.webp' },
          { name: 'MegaPool Y105', url: kyk('megapool-y105'), img: '/images/kimyasal/kyk/megapool-y105.webp' },
          { name: 'MegaPro RapidFlex Y113', url: kyk('megapro-rapidflex-y113'), img: '/images/kimyasal/kyk/megapro-rapidflex-y113.webp' },
          { name: 'MegaPro Facade Y111', url: kyk('megapro-facade-y111'), img: '/images/kimyasal/kyk/megapro-facade-y111.webp' },
          { name: 'MegaPro Y117', url: kyk('megapro-y117'), img: '/images/kimyasal/kyk/megapro-y117.webp' },
          { name: 'MegaPro Restorasyon Y116', url: kyk('megapro-restorasyon-y116'), img: '/images/kimyasal/kyk/megapro-restorasyon-y116.webp' },
          { name: 'MegaPro Pastemix Y201', url: kyk('megapro-pastemix-y201'), img: '/images/kimyasal/kyk/megapro-pastemix-y201.webp' },
          { name: 'MegaPro Y401', url: kyk('megapro-y401'), img: '/images/kimyasal/kyk/megapro-y401.webp' },
          { name: 'MegaBlok Y192', url: kyk('megablok-y192'), img: '/images/kimyasal/kyk/megablok-y192.webp' },
          { name: 'Artefix', url: kyk('artefix'), img: '/images/kimyasal/kyk/artefix.webp' },
          { name: 'Mantotherm Yapıştırma Harcı Y194', url: kyk('mantotherm-yapistirma-harci-y194'), img: '/images/kimyasal/kyk/mantotherm-yapistirma-harci-y194.webp' },
          { name: 'MegaPro Epo Y501', url: kyk('megapro-epo-y501'), img: '/images/kimyasal/kyk/megapro-epo-y501.webp' },
          { name: 'MegaPro Epo Y502', url: kyk('megapro-epo-y502'), img: '/images/kimyasal/kyk/megapro-epo-y502.webp' },
        ],
      },
      {
        slug: 'derz-dolgular',
        label: 'Derz Dolgular',
        urunler: [
          { name: 'MegaFuga Sil D102', url: kyk('megafuga-sil-d102'), img: '/images/kimyasal/kyk/megafuga-sil-d102.webp' },
          { name: 'MegaFuga Flex D103', url: kyk('megafuga-flex-d103'), img: '/images/kimyasal/kyk/megafuga-flex-d103.webp' },
          { name: 'MegaFuga Pool D105', url: kyk('megafuga-pool-d105'), img: '/images/kimyasal/kyk/megafuga-pool-d105.webp' },
          { name: 'MegaFuga Rustik D106', url: kyk('megafuga-rustik-d106'), img: '/images/kimyasal/kyk/megafuga-rustik-d106.webp' },
          { name: 'MegaEpoxy D501', url: kyk('megaepoxy-d501'), img: '/images/kimyasal/kyk/megaepoxy-d501.webp' },
          { name: 'MegaFuga Flex D201', url: kyk('megafuga-flex-d201'), img: '/images/kimyasal/kyk/megafuga-flex-d201.webp' },
        ],
      },
      {
        slug: 'su-yalitim',
        label: 'Su Yalıtım',
        urunler: [
          { name: 'Megaİzo Lastik 7 S102', url: kyk('megaizo-lastik-7-s102'), img: '/images/kimyasal/kyk/megaizo-lastik-7-s102.webp' },
          { name: 'Megaİzo Lastik 10 S103', url: kyk('megaizo-lastik-10-s103'), img: '/images/kimyasal/kyk/megaizo-lastik-10-s103.webp' },
          { name: 'Megaİzo Lastik 11 S104', url: kyk('megaizo-lastik-11-s104'), img: '/images/kimyasal/kyk/megaizo-lastik-11-s104.webp' },
          { name: 'Megaİzo Lastik 15 S105', url: kyk('megaizo-lastik-15-s105'), img: '/images/kimyasal/kyk/megaizo-lastik-15-s105.webp' },
          { name: 'Megaİzo Lastik 3 S903', url: kyk('megaizo-lastik-3-s903'), img: '/images/kimyasal/kyk/megaizo-lastik-3-s903.webp' },
          { name: 'Megaİzo S201', url: kyk('megaizo-s201'), img: '/images/kimyasal/kyk/megaizo-s201.webp' },
          { name: 'Megaİzo Lastik 5 S202', url: kyk('megaizo-lastik-5-s202'), img: '/images/kimyasal/kyk/megaizo-lastik-5-s202.webp' },
          { name: 'Megaİzo Lastik 6 S203', url: kyk('megaizo-lastik-6-s203'), img: '/images/kimyasal/kyk/megaizo-lastik-6-s203.webp' },
          { name: 'Megaİzo Lastik 6 Eco S204', url: kyk('megaizo-lastik-6-eco-s204'), img: '/images/kimyasal/kyk/megaizo-lastik-6-eco-s204.webp' },
          { name: 'Megaİzo Kristalize S106', url: kyk('megaizo-kristalize-s106'), img: '/images/kimyasal/kyk/megaizo-kristalize-s106.webp' },
          { name: 'Megaİzo K S301', url: kyk('megaizo-k-s301'), img: '/images/kimyasal/kyk/megaizo-k-s301.webp' },
          { name: 'Megaİzo 2K S302', url: kyk('megaizo-2k-s302'), img: '/images/kimyasal/kyk/megaizo-2k-s302.webp' },
          { name: 'Megaİzo 2K S303', url: kyk('megaizo-2k-s303'), img: '/images/kimyasal/kyk/megaizo-2k-s303.webp' },
          { name: 'Megaİzo S801', url: kyk('megaizo-s801'), img: '/images/kimyasal/kyk/megaizo-s801.webp' },
          { name: 'Megaİzo S802', url: kyk('megaizo-s802'), img: '/images/kimyasal/kyk/megaizo-s802.webp' },
          { name: 'Megaİzo S803', url: kyk('megaizo-s803'), img: '/images/kimyasal/kyk/megaizo-s803.webp' },
          { name: 'Megaİzo S804', url: kyk('megaizo-s804'), img: '/images/kimyasal/kyk/megaizo-s804.webp' },
          { name: 'Megaİzo PU 7 S401', url: kyk('megaizo-pu-7-s401'), img: '/images/kimyasal/kyk/megaizo-pu-7-s401.webp' },
          { name: 'Megaİzo PU 15 S403', url: kyk('megaizo-pu-15-s403'), img: '/images/kimyasal/kyk/megaizo-pu-15-s403.webp' },
          { name: 'Megaİzo PU 6 S404', url: kyk('megaizo-pu-6-s404'), img: '/images/kimyasal/kyk/megaizo-pu-6-s404.webp' },
          { name: 'Megaİzo S450', url: kyk('megaizo-s450'), img: '/images/kimyasal/kyk/megaizo-s450.webp' },
          { name: 'Megaİzo PU Mastik HM S492', url: kyk('megaizo-pu-mastik-hm-s492'), img: '/images/kimyasal/kyk/megaizo-pu-mastik-hm-s492.webp' },
          { name: 'Megaİzo Stoper S107', url: kyk('megaizo-stoper-s107'), img: '/images/kimyasal/kyk/megaizo-stoper-s107.webp' },
          { name: 'Megaİzo Bant S901', url: kyk('megaizo-bant-s901-megaizo-bant-kt-s910'), img: '/images/kimyasal/kyk/megaizo-bant-s901-megaizo-bant-kt-s910.webp' },
          { name: 'Megaİzo File S902', url: kyk('megaizo-file-s902'), img: '/images/kimyasal/kyk/megaizo-file-s902.webp' },
          { name: 'Megaİzo Bant DL S908', url: kyk('megaizo-bant-dl-s908'), img: '/images/kimyasal/kyk/megaizo-bant-dl-s908.webp' },
          { name: 'Megaİzo Bant SB S909', url: kyk('megaizo-bant-sb-s909'), img: '/images/kimyasal/kyk/megaizo-bant-sb-s909.webp' },
          { name: 'Megaİzo Bant KT S910', url: kyk('megaizo-bant-kt-s910'), img: '/images/kimyasal/kyk/megaizo-bant-kt-s910.webp' },
          { name: 'Megaİzo Bant PVC S911', url: kyk('megaizo-bant-pvc-s911'), img: '/images/kimyasal/kyk/megaizo-bant-pvc-s911.webp' },
        ],
      },
      {
        slug: 'tamir-harclari',
        label: 'Tamir Harçları',
        urunler: [
          { name: 'MegaTamir İ T101', url: kyk('megatamir-i-t101'), img: '/images/kimyasal/kyk/megatamir-i-t101.webp' },
          { name: 'MegaTamir K T102', url: kyk('megatamir-k-t102'), img: '/images/kimyasal/kyk/megatamir-k-t102.webp' },
          { name: 'MegaTamir İ Yapısal T103', url: kyk('megatamir-i-yapisal-t103'), img: '/images/kimyasal/kyk/megatamir-i-yapisal-t103.webp' },
          { name: 'MegaTamir K Yapısal T104', url: kyk('megatamir-k-yapisal-t104'), img: '/images/kimyasal/kyk/megatamir-k-yapisal-t104.webp' },
          { name: 'MegaTamir Grout T105', url: kyk('megatamir-grout-t105'), img: '/images/kimyasal/kyk/megatamir-grout-t105.webp' },
          { name: 'MegaTamir T106', url: kyk('megatamir-t106'), img: '/images/kimyasal/kyk/megatamir-t106.webp' },
          { name: 'MegaTamir T107', url: kyk('megatamir-t107'), img: '/images/kimyasal/kyk/megatamir-t107.webp' },
          { name: 'MegaTamir T108', url: kyk('megatamir-t108'), img: '/images/kimyasal/kyk/megatamir-t108.webp' },
          { name: 'MegaTamir T201', url: kyk('megatamir-t201'), img: '/images/kimyasal/kyk/megatamir-t201.webp' },
          { name: 'MegaTamir Epo T501', url: kyk('megatamir-epo-t501'), img: '/images/kimyasal/kyk/megatamir-epo-t501.webp' },
          { name: 'MegaTamir EpoGrout T502', url: kyk('megatamir-epogrout-t502'), img: '/images/kimyasal/kyk/megatamir-epogrout-t502.webp' },
          { name: 'MegaTamir T503', url: kyk('megatamir-t503'), img: '/images/kimyasal/kyk/megatamir-t503.webp' },
          { name: 'MegaTamir T902', url: kyk('megatamir-t902'), img: '/images/kimyasal/kyk/megatamir-t902.webp' },
        ],
      },
      {
        slug: 'zemin-malzemeleri',
        label: 'Zemin Malzemeleri',
        urunler: [
          { name: 'MegaZemin Z101', url: kyk('megazemin-z101'), img: '/images/kimyasal/kyk/megazemin-z101.webp' },
          { name: 'MegaZemin Z102', url: kyk('megazemin-z102'), img: '/images/kimyasal/kyk/megazemin-z102.webp' },
          { name: 'MegaZemin BYS Z121', url: kyk('megazemin-bys-z121'), img: '/images/kimyasal/kyk/megazemin-bys-z121.webp' },
          { name: 'MegaZemin Kür Z201', url: kyk('megazemin-kur-z201'), img: '/images/kimyasal/kyk/megazemin-kur-z201.webp' },
          { name: 'MegaZemin Z901', url: kyk('megazemin-z901'), img: '/images/kimyasal/kyk/megazemin-z901.webp' },
          { name: 'MegaZemin Z902', url: kyk('megazemin-z902'), img: '/images/kimyasal/kyk/megazemin-z902.webp' },
        ],
      },
      {
        slug: 'sivalar',
        label: 'Sıvalar',
        urunler: [
          { name: 'MegaSıva İ H101', url: kyk('megasiva-i-h101'), img: '/images/kimyasal/kyk/megasiva-i-h101.webp' },
          { name: 'MegaSıva K H102', url: kyk('megasiva-k-h102'), img: '/images/kimyasal/kyk/megasiva-k-h102.webp' },
          { name: 'MegaSıva Saten H103', url: kyk('megasiva-saten-h103'), img: '/images/kimyasal/kyk/megasiva-saten-h103.webp' },
          { name: 'MegaSıva Perlitli H104', url: kyk('megasiva-perlitli-h104'), img: '/images/kimyasal/kyk/megasiva-perlitli-h104.webp' },
          { name: 'MegaSıva Elyaflı H105', url: kyk('megasiva-elyafli-h105'), img: '/images/kimyasal/kyk/megasiva-elyafli-h105.webp' },
          { name: 'MegaSıva Makine İç H107', url: kyk('megasiva-makine-ic-h107'), img: '/images/kimyasal/kyk/megasiva-makine-ic-h107.webp' },
          { name: 'MegaSıva Makine Dış H108', url: kyk('megasiva-makine-dis-h108'), img: '/images/kimyasal/kyk/megasiva-makine-dis-h108.webp' },
          { name: 'MegaSıva H201', url: kyk('megasiva-h201'), img: '/images/kimyasal/kyk/megasiva-h201.webp' },
          { name: 'Mantotherm Sıva Harcı H111', url: kyk('mantotherm-siva-harci-h111'), img: '/images/kimyasal/kyk/mantotherm-siva-harci-h111.webp' },
          { name: 'Mantotherm Yüksek Darbe Dayanımlı Organik Sıva H202', url: kyk('mantotherm-yuksek-darbe-dayanimli-organik-siva-h202'), img: '/images/kimyasal/kyk/mantotherm-yuksek-darbe-dayanimli-organik-siva-h202.webp' },
          { name: 'Mantotherm Dekominera — İnce Tane Dokulu H112', url: kyk('mantotherm-dekominera-ince-tane-dokulu-h112'), img: '/images/kimyasal/kyk/mantotherm-dekominera-ince-tane-dokulu-h112.webp' },
          { name: 'Mantotherm Dekominera — Tane Dokulu H113', url: kyk('mantotherm-dekominera-tane-dokulu-h113'), img: '/images/kimyasal/kyk/mantotherm-dekominera-tane-dokulu-h113.webp' },
          { name: 'Mantotherm Dekominera — Çizgi Dokulu H114', url: kyk('mantotherm-dekominera-cizgi-dokulu-h114'), img: '/images/kimyasal/kyk/mantotherm-dekominera-cizgi-dokulu-h114.webp' },
        ],
      },
      {
        slug: 'astarlar',
        label: 'Astarlar',
        urunler: [
          { name: 'MegaFilm BB A101', url: kyk('megafilm-bb-a101'), img: '/images/kimyasal/kyk/megafilm-bb-a101.webp' },
          { name: 'MegaFilm A201', url: kyk('megafilm-a201'), img: '/images/kimyasal/kyk/megafilm-a201.webp' },
          { name: 'MegaFilm Visko A203', url: kyk('megafilm-visko-a203'), img: '/images/kimyasal/kyk/megafilm-visko-a203.webp' },
          { name: 'MegaFilm BB A204', url: kyk('megafilm-bb-a204'), img: '/images/kimyasal/kyk/megafilm-bb-a204.webp' },
          { name: 'MegaFilm A205', url: kyk('megafilm-a205'), img: '/images/kimyasal/kyk/megafilm-a205.webp' },
          { name: 'MegaFilm İzo A301', url: kyk('megafilm-izo-a301'), img: '/images/kimyasal/kyk/megafilm-izo-a301.webp' },
          { name: 'MegaFilm İzo PU A401', url: kyk('megafilm-izo-pu-a401'), img: '/images/kimyasal/kyk/megafilm-izo-pu-a401.webp' },
          { name: 'MegaFilm İzo Epo A501', url: kyk('megafilm-izo-epo-a501'), img: '/images/kimyasal/kyk/megafilm-izo-epo-a501.webp' },
          { name: 'MegaFilm A502', url: kyk('megafilm-a502'), img: '/images/kimyasal/kyk/megafilm-a502.webp' },
          { name: 'MegaFilm A901', url: kyk('megafilm-a901'), img: '/images/kimyasal/kyk/megafilm-a901.webp' },
          { name: 'Mantotherm Astar A206', url: kyk('mantotherm-astar-a206'), img: '/images/kimyasal/kyk/mantotherm-astar-a206.webp' },
        ],
      },
      {
        slug: 'katkilar-yardimci',
        label: 'Katkılar ve Yardımcı Malzemeler',
        urunler: [
          { name: 'MegaLatex K201', url: kyk('megalatex-k201'), img: '/images/kimyasal/kyk/megalatex-k201.webp' },
          { name: 'MegaAntiFreeze 10 K901', url: kyk('megaantifreeze-10-k901'), img: '/images/kimyasal/kyk/megaantifreeze-10-k901.webp' },
          { name: 'MegaClean K902', url: kyk('megaclean-k902'), img: '/images/kimyasal/kyk/megaclean-k902.webp' },
          { name: 'Silis Kumu K907', url: kyk('silis-kumu-k907'), img: '/images/kimyasal/kyk/silis-kumu-k907.webp' },
          { name: 'Mastar Takozu K908', url: kyk('mastar-takozu-k908'), img: '/images/kimyasal/kyk/mastar-takozu-k908.webp' },
          { name: 'Seramik Tesviye Sistemi', url: kyk('seramik-tesviye-sistemi'), img: '/images/kimyasal/kyk/seramik-tesviye-sistemi.webp' },
          { name: 'Mantotherm Donatı Filesi K914', url: kyk('mantotherm-donati-filesi-k914'), img: '/images/kimyasal/kyk/mantotherm-donati-filesi-k914.webp' },
          { name: 'Mantotherm Köşe Profili K915', url: kyk('mantotherm-kose-profili-k915'), img: '/images/kimyasal/kyk/mantotherm-kose-profili-k915.webp' },
          { name: 'Mantotherm Plastik Çivili Geniş Başlıklı Dübel K916', url: kyk('mantotherm-plastik-civili-genis-baslikli-dubel'), img: '/images/kimyasal/kyk/mantotherm-plastik-civili-genis-baslikli-dubel.webp' },
          { name: 'Mantotherm Taşyünü Dübeli K917', url: kyk('mantotherm-tasyunu-dubeli-k917'), img: '/images/kimyasal/kyk/mantotherm-tasyunu-dubeli-k917.webp' },
          { name: 'MegaKarbon Wrap K918', url: kyk('megakarbon-wrap-k918'), img: '/images/kimyasal/kyk/megakarbon-wrap-k918.webp' },
          { name: 'MegaKarbon Plate K919', url: kyk('megakarbon-plate-k919'), img: '/images/kimyasal/kyk/megakarbon-plate-k919.webp' },
        ],
      },
    ],
  },

  // ─── MATKİM YAPI KİMYASALLARI ─────────────────────────────────────
  {
    slug: 'matkim',
    name: 'Matkim Yapı Kimyasalları',
    description:
      'Derz dolgu, ince ve kaba sıva, yalıtım harçları ile yapıştırma harçları gruplarında Matkim ürünleri.',
    site: 'https://www.matkim.com.tr',
    kategoriler: [
      {
        slug: 'derz-dolgu-grubu',
        label: 'Derz Dolgu Grubu',
        urunler: [
          { name: 'Derz Dolgu', url: 'https://www.matkim.com.tr/urun/derz-dolgu/', img: '/images/kimyasal/matkim/derz-dolgu.webp' },
        ],
      },
      {
        slug: 'ince-siva-grubu',
        label: 'İnce Sıva Grubu',
        urunler: [
          { name: 'Hazır İnce Sıva', url: 'https://www.matkim.com.tr/urun/hazir-ince-siva/', img: '/images/kimyasal/matkim/hazir-ince-siva.webp' },
        ],
      },
      {
        slug: 'kaba-siva-grubu',
        label: 'Kaba Sıva Grubu',
        urunler: [
          { name: 'Elyaflı Hazır Makina Sıvası', url: 'https://www.matkim.com.tr/urun/elyafli-hazir-makina-sivasi/', img: '/images/kimyasal/matkim/elyafli-hazir-makina-sivasi.webp' },
          { name: 'Elyaflı Kaba Sıva Beyaz', url: 'https://www.matkim.com.tr/urun/elyafli-kaba-siva-beyaz/', img: '/images/kimyasal/matkim/elyafli-kaba-siva-beyaz.webp' },
          { name: 'Elyaflı Kaba Sıva Gri', url: 'https://www.matkim.com.tr/urun/elyafli-kaba-siva-gri/', img: '/images/kimyasal/matkim/elyafli-kaba-siva-gri.webp' },
        ],
      },
      {
        slug: 'yalitim-harclari-grubu',
        label: 'Yalıtım Harçları Grubu',
        urunler: [
          { name: 'Isı Mat', url: 'https://www.matkim.com.tr/urun/isi-mat/', img: '/images/kimyasal/matkim/isi-mat.webp' },
          { name: 'Isı Yalıtım Levhası Sıva Harcı', url: 'https://www.matkim.com.tr/urun/isi-yalitim-levhasi-siva-harci/', img: '/images/kimyasal/matkim/isi-yalitim-levhasi-siva-harci.webp' },
        ],
      },
      {
        slug: 'yapistirma-harclari-grubu',
        label: 'Yapıştırma Harçları Grubu',
        urunler: [
          { name: 'Akrilik Esaslı Seramik Yapıştırıcı', url: 'https://www.matkim.com.tr/urun/akrilik-esasli-seramik-yapistirici/', img: '/images/kimyasal/matkim/akrilik-esasli-seramik-yapistirici.webp' },
          { name: 'Gaz Beton', url: 'https://www.matkim.com.tr/urun/gaz-beton/', img: '/images/kimyasal/matkim/gaz-beton.webp' },
          { name: 'Granit Flex Yapıştırma Harcı', url: 'https://www.matkim.com.tr/urun/granit-flex-yapistirma-harci/', img: '/images/kimyasal/matkim/granit-flex-yapistirma-harci.webp' },
          { name: 'Granit Yapıştırma Harcı', url: 'https://www.matkim.com.tr/urun/granit-yapistirma-harci/', img: '/images/kimyasal/matkim/granit-yapistirma-harci.webp' },
          { name: 'Seramik Yapıştırma Harcı', url: 'https://www.matkim.com.tr/urun/seramik-yapistirma-harci/', img: '/images/kimyasal/matkim/seramik-yapistirma-harci.webp' },
        ],
      },
    ],
  },
]

export function kimyasalUrunSayisi(marka: KimyasalMarka): number {
  return marka.kategoriler.reduce((a, k) => a + k.urunler.length, 0)
}

export function kimyasalToplamUrun(): number {
  return KIMYASAL_MARKALAR.reduce((a, m) => a + kimyasalUrunSayisi(m), 0)
}
