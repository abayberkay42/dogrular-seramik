/**
 * Blog yazıları.
 *
 * Yeni yazı eklemek için `BLOG_YAZILARI` dizisine bir kayıt ekleyin —
 * liste sayfası, yazı sayfası ve sitemap otomatik güncellenir.
 * `tarih` ISO biçiminde (YYYY-MM-DD) verilmelidir.
 */

export type Blok =
  | { tip: 'p'; metin: string }
  | { tip: 'h2'; metin: string }
  | { tip: 'h3'; metin: string }
  | { tip: 'liste'; ogeler: string[] }
  | { tip: 'tablo'; basliklar: string[]; satirlar: string[][] }
  | { tip: 'not'; metin: string }

export interface SSS {
  soru: string
  cevap: string
}

export interface BlogYazi {
  slug: string
  baslik: string
  /** <title> için — 60 karakteri geçmemeli */
  seoBaslik: string
  /** meta description — 150-160 karakter ideal */
  aciklama: string
  ozet: string
  /** YYYY-MM-DD */
  tarih: string
  kategori: string
  etiketler: string[]
  okuma: number
  kapak?: string
  icerik: Blok[]
  sss?: SSS[]
}

export const BLOG_YAZILARI: BlogYazi[] = [
  // ───────────────────────────────────────────────────────────────────
  {
    slug: 'porselen-seramik-nedir',
    baslik: 'Porselen Seramik Nedir? Seramik ve Granit Arasındaki Farklar',
    seoBaslik: 'Porselen Seramik Nedir? Seramikten Farkı',
    aciklama:
      'Porselen seramik nedir, normal seramikten farkı ne? Su emme oranı, sertlik, sırlı ve sırsız porselen farkları ile doğru ürünü seçmenin yolları.',
    ozet:
      'Porselen seramik ile geleneksel duvar seramiği arasındaki teknik farkı su emme oranı belirler. Bu fark ürünün nerede kullanılabileceğini doğrudan etkiler.',
    tarih: '2026-08-01',
    kategori: 'Rehber',
    etiketler: ['porselen seramik', 'granit seramik', 'su emme oranı', 'EN 14411'],
    okuma: 6,
    kapak: '/images/collections/milet-nil/hero-webp/hero-01.webp',
    icerik: [
      { tip: 'p', metin: 'Seramik alışverişinde en sık karşılaşılan kafa karışıklığı "seramik", "porselen" ve "granit" kelimelerinin birbirinin yerine kullanılmasından kaynaklanır. Oysa bunlar pazarlama adları değil, teknik olarak birbirinden ayrılan ürün gruplarıdır ve aralarındaki fark ürünün nerede kullanılabileceğini belirler.' },

      { tip: 'h2', metin: 'Temel ayrım: su emme oranı' },
      { tip: 'p', metin: 'Seramik kaplamalar EN 14411 standardına göre su emme oranlarına (E değeri) göre sınıflandırılır. Bir karonun ne kadar su emdiği, onun donma direncini, lekelenmeye karşı davranışını ve mekanik dayanımını doğrudan etkiler.' },
      {
        tip: 'tablo',
        basliklar: ['Grup', 'Su emme oranı', 'Yaygın adı', 'Tipik kullanım'],
        satirlar: [
          ['BIa', '≤ %0,5', 'Porselen / granit seramik', 'Zemin, dış mekân, ıslak hacim, yoğun trafik'],
          ['BIb', '%0,5 – %3', 'Yarı vitrifiye', 'İç mekân zemin'],
          ['BIIa', '%3 – %6', 'Yarı poröz', 'İç mekân, hafif trafik'],
          ['BIII', '> %10', 'Duvar seramiği (fayans)', 'Sadece iç mekân duvar'],
        ],
      },
      { tip: 'p', metin: 'Halk arasında "granit seramik" denen ürün aslında BIa grubu porselen karodur. Doğal granit taşıyla bir ilgisi yoktur; ad, ürünün sertliğine yapılan bir benzetmeden gelir. Yani porselen seramik ve granit seramik pratikte aynı şeyi ifade eder.' },

      { tip: 'h2', metin: 'Neden su emme oranı bu kadar önemli?' },
      {
        tip: 'liste',
        ogeler: [
          'Don direnci: Gözenekli bir karo suyu içine alır; su donunca genleşir ve karoyu çatlatır. Dış mekânda mutlaka ≤ %0,5 su emen porselen kullanılmalıdır.',
          'Leke tutma: Düşük gözeneklilik, sıvının yüzeyin altına işlemesini engeller. Mutfak tezgâhı çevresi ve yoğun kullanılan zeminlerde belirleyicidir.',
          'Mekanik dayanım: Yoğun bünye daha yüksek kırılma yüküne dayanır. Ağır yük gören ticari alanlarda önem kazanır.',
          'Hijyen: Az gözenekli yüzey daha az kir tutar ve temizliği kolaylaştırır.',
        ],
      },

      { tip: 'h2', metin: 'Sırlı ve sırsız porselen farkı' },
      { tip: 'p', metin: 'Sırlı porselende desen, pişirim öncesi yüzeye uygulanan sır tabakasındadır. Bu sayede mermer, ahşap veya beton gibi çok çeşitli görünümler elde edilebilir. Sırsız (teknik) porselende ise renk ve desen karonun tüm kalınlığı boyunca devam eder; aşınma durumunda görünüm değişmez. Bu nedenle sırsız porselen genellikle fabrika, otopark ve yoğun ticari alanlarda tercih edilir.' },
      { tip: 'p', metin: 'Konut projelerinde sırlı porselen çoğu durumda yeterlidir ve tasarım esnekliği çok daha geniştir. Farklı doku seçeneklerini görmek için [mermer](/koleksiyonlar/kategori/mermer), [ahşap](/koleksiyonlar/kategori/ahsap) ve [beton](/koleksiyonlar/kategori/beton) koleksiyonlarını inceleyebilirsiniz.' },

      { tip: 'h2', metin: 'Yüzey işlemleri ne anlama gelir?' },
      {
        tip: 'liste',
        ogeler: [
          'Mat: Işığı yansıtmayan, doğal görünümlü yüzey. Kaymaya karşı daha güvenli olduğu için zeminde yaygındır.',
          'Parlak (lappato / full lappato): Kısmen veya tamamen parlatılmış yüzey. Işığı yansıtır, mekânı ferah gösterir; ıslakken kayganlaşabildiği için ıslak hacim zemininde dikkatli seçilmelidir.',
          'Yapılandırılmış (structured): Doku verilmiş yüzey. Dış mekân ve ıslak alanlarda kaymayı azaltır.',
          'Saten / silk: Mat ile parlak arası, yumuşak yansımalı yüzey.',
        ],
      },

      { tip: 'h2', metin: 'Kalınlık seçimi' },
      { tip: 'p', metin: 'Konut içi zeminlerde 9–10 mm kalınlık standarttır. Duvarda 6–8 mm yeterlidir. Araç geçişi olan teras, bahçe yolu ve otopark gibi alanlarda ise 20 mm kalınlığındaki ürünler kullanılır; bu karolar kum veya çakıl üzerine harçsız olarak da uygulanabilir.' },

      { tip: 'not', metin: 'Karar verirken ürünün teknik föyündeki su emme oranı, PEI sınıfı ve kayma direnci değerlerine bakın. Bu üç veri, ürünün sizin alanınıza uygun olup olmadığını isimden çok daha net söyler.' },
    ],
    sss: [
      {
        soru: 'Porselen seramik ile granit seramik aynı şey mi?',
        cevap: 'Evet. "Granit seramik" piyasada porselen karo için kullanılan yaygın bir addır. İkisi de su emme oranı %0,5 ve altındaki BIa grubu ürünleri tanımlar; doğal granit taşıyla ilgisi yoktur.',
      },
      {
        soru: 'Dış mekânda hangi seramik kullanılmalı?',
        cevap: 'Dış mekânda su emme oranı ≤ %0,5 olan porselen karo kullanılmalıdır. Donma-çözülme döngüsünde çatlama riskini bu ürünler taşımaz. Ayrıca yüzeyin kaymaya karşı en az R11 sınıfında olması önerilir.',
      },
      {
        soru: 'Duvar seramiği zeminde kullanılabilir mi?',
        cevap: 'Kullanılmamalıdır. Duvar seramiği (BIII grubu) yüksek su emen ve düşük mekanik dayanımlı bir üründür; zemin yükü altında kırılır. Zeminde porselen karo tercih edilmelidir.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: 'zemin-seramigi-secimi-pei-kayma-direnci',
    baslik: 'Zemin Seramiği Seçimi: PEI Sınıfı ve Kayma Direnci (R) Nedir?',
    seoBaslik: 'PEI Sınıfı ve Kayma Direnci (R) Nedir?',
    aciklama:
      'Zemin seramiği seçerken PEI aşınma sınıfı ve R kayma direnci değerleri ne anlama gelir? Hangi mekânda hangi sınıf kullanılmalı, tabloyla açıkladık.',
    ozet:
      'Zemin karosunu görünümüne göre seçmek çoğu zaman sorun yaratır. PEI ve R değerleri, karonun o mekânda ne kadar dayanacağını ve ne kadar güvenli olacağını söyler.',
    tarih: '2026-08-01',
    kategori: 'Rehber',
    etiketler: ['PEI sınıfı', 'kayma direnci', 'R10 R11', 'zemin seramiği'],
    okuma: 7,
    kapak: '/images/collections/assos/hero-webp/hero-01.webp',
    icerik: [
      { tip: 'p', metin: 'Zemin karosu seçerken çoğu kişi yalnızca renge ve dokuya bakar. Oysa aynı görünümdeki iki karodan biri beş yılda çizilirken diğeri ilk günkü hâlini koruyabilir; biri ıslakken güvenliyken diğeri kayganlaşabilir. Bu farkı iki teknik değer belirler: PEI ve R.' },

      { tip: 'h2', metin: 'PEI sınıfı: yüzey aşınma direnci' },
      { tip: 'p', metin: 'PEI, sırlı karolarda yüzeyin aşınmaya karşı direncini gösterir (EN ISO 10545-7). Test, karo yüzeyinde aşındırıcı bir yükün döndürülmesi ve görünür aşınmanın hangi devirde başladığının ölçülmesiyle yapılır. Sınıf yükseldikçe karo daha yoğun trafiğe uygundur.' },
      {
        tip: 'tablo',
        basliklar: ['PEI sınıfı', 'Uygun kullanım'],
        satirlar: [
          ['PEI I', 'Yalnızca duvar; ayak trafiği olmayan yüzeyler'],
          ['PEI II', 'Banyo, yatak odası gibi hafif trafikli, ayakkabısız alanlar'],
          ['PEI III', 'Konut içi genel kullanım — salon, koridor, mutfak'],
          ['PEI IV', 'Konut girişleri ve hafif ticari alanlar — ofis, butik'],
          ['PEI V', 'Yoğun ticari trafik — mağaza, otel lobisi, restoran'],
        ],
      },
      { tip: 'not', metin: 'PEI yalnızca sırlı karolar için geçerlidir. Sırsız (teknik) porselende renk tüm kalınlık boyunca devam ettiği için bu sınıflandırma kullanılmaz.' },

      { tip: 'h2', metin: 'R sınıfı: kayma direnci' },
      { tip: 'p', metin: 'R değeri, ayakkabılı yürüyüşte kayma direncini gösterir (DIN 51130 rampa testi). Yağlanmış eğimli bir yüzeyde test edilen kişinin kaymadan yürüyebildiği maksimum eğim açısına göre sınıf belirlenir.' },
      {
        tip: 'tablo',
        basliklar: ['Sınıf', 'Eğim açısı', 'Önerilen alan'],
        satirlar: [
          ['R9', '6° – 10°', 'Kuru iç mekân — salon, yatak odası, ofis'],
          ['R10', '10° – 19°', 'Banyo, mutfak, tuvalet, giriş holü'],
          ['R11', '19° – 27°', 'Teras, balkon, garaj, ticari mutfak'],
          ['R12', '27° – 35°', 'Endüstriyel mutfak, soğuk hava deposu'],
          ['R13', '> 35°', 'Ağır endüstriyel, yoğun yağ/su bulunan üretim alanları'],
        ],
      },
      { tip: 'p', metin: 'Yalın ayak kullanılan ıslak alanlar (duş içi, havuz çevresi, hamam) için ayrı bir sınıflandırma vardır (DIN 51097): A, B ve C. Havuz çevresinde en az B, duş ve hamam zemininde C sınıfı önerilir.' },

      { tip: 'h2', metin: 'Mekâna göre pratik seçim' },
      {
        tip: 'liste',
        ogeler: [
          'Salon ve yatak odası: PEI III, R9 — görünüm önceliklidir, parlak yüzey rahatlıkla kullanılabilir.',
          'Mutfak: PEI III–IV, R10 — su ve yağ sıçraması nedeniyle mat veya saten yüzey daha güvenlidir.',
          'Banyo zemini: PEI II–III, R10 — duş içinde ayrıca küçük ebat karo tercih edin; derz sayısı arttıkça tutunma artar.',
          'Giriş holü: PEI IV, R10 — dışarıdan gelen kum ve nem en çok bu alanı yıpratır.',
          'Balkon ve teras: PEI IV–V, R11, su emme ≤ %0,5 — don direnci burada zorunludur.',
          'Ticari alan: PEI IV–V, R10–R11 — kullanım yoğunluğuna göre yükseltilir.',
        ],
      },

      { tip: 'h2', metin: 'Sık yapılan hata: parlak karoyu ıslak alana koymak' },
      { tip: 'p', metin: 'Full lappato ve parlak yüzeyler mekânı ferah ve geniş gösterdiği için sık tercih edilir. Ancak bu yüzeylerin R değeri genellikle R9 seviyesindedir ve ıslandığında kayganlaşır. Banyo zemininde parlak yüzey kullanmak isterseniz, en azından duş alanını mat veya yapılandırılmış yüzeyle ayırmak güvenli bir çözümdür.' },
      { tip: 'p', metin: 'Uygun yüzey ve ebat kombinasyonlarını [koleksiyonlarımız](/koleksiyonlar) üzerinden inceleyebilir, kararınızdan önce [ücretsiz örnek](/ornek-iste) talep edebilirsiniz.' },
    ],
    sss: [
      {
        soru: 'Banyoya hangi R sınıfı seramik konmalı?',
        cevap: 'Banyo zemininde en az R10 sınıfı önerilir. Yalın ayak kullanılan duş içi için DIN 51097 kapsamında B veya C sınıfı yüzeyler daha güvenlidir. Küçük ebat karo kullanmak derz sayısını artırarak tutunmayı iyileştirir.',
      },
      {
        soru: 'PEI 5 her yerde kullanılabilir mi?',
        cevap: 'Teknik olarak evet, PEI V en dayanıklı sınıftır ve konutta da kullanılabilir. Ancak yüksek PEI genellikle daha sert ve mat yüzey anlamına gelir; salon gibi alanlarda PEI III yeterli olduğu için tasarım seçenekleri daha geniş olur.',
      },
      {
        soru: 'Kayma direnci yüksek karo zor mu temizlenir?',
        cevap: 'Yapılandırılmış yüzeyler pürüzlü olduğu için kir tutmaya biraz daha yatkındır. Konut içinde R10 çoğu durumda yeterlidir; R12–R13 gibi yüksek sınıflar endüstriyel alanlar içindir ve evde gereksiz temizlik zorluğu yaratır.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: 'banyo-seramigi-secerken-dikkat-edilecekler',
    baslik: 'Banyo Seramiği Seçerken Dikkat Edilmesi Gereken 8 Nokta',
    seoBaslik: 'Banyo Seramiği Seçimi: 8 Önemli Nokta',
    aciklama:
      'Banyo seramiği seçerken ebat, yüzey, derz rengi, su yalıtımı ve aydınlatma nasıl etkiler? Uygulamadan önce bilmeniz gereken 8 pratik başlık.',
    ozet:
      'Banyo, evin en zorlu alanı: sürekli nem, sıcaklık değişimi ve temizlik kimyasalları. Doğru seçim yalnızca görünümle değil, uzun ömürle de ilgili.',
    tarih: '2026-08-01',
    kategori: 'Rehber',
    etiketler: ['banyo seramiği', 'banyo tasarımı', 'su yalıtımı', 'derz'],
    okuma: 8,
    kapak: '/images/collections/zenith/hero-webp/hero-01.webp',
    icerik: [
      { tip: 'p', metin: 'Banyo, bir evde en çok zorlanan yüzeydir. Sürekli nem, ani sıcaklık değişimleri, sabun ve temizlik kimyasalları aynı alanda birleşir. Bu yüzden banyo seramiği seçimi, yalnızca estetik değil teknik bir karardır.' },

      { tip: 'h2', metin: '1. Zemin ve duvar için farklı ürün seçin' },
      { tip: 'p', metin: 'Duvarda kullanılan seramik zemine uygun olmayabilir. Duvar karoları hafif ve düşük dayanımlıdır; zeminde porselen kullanmak gerekir. Birçok koleksiyon aynı desende hem duvar hem zemin ürünü sunar, böylece bütünlük bozulmaz.' },

      { tip: 'h2', metin: '2. Kayma direncini göz ardı etmeyin' },
      { tip: 'p', metin: 'Banyo zemininde en az R10 sınıfı yüzey önerilir. Parlak karolar ıslandığında kayganlaşır. Görsel olarak parlak yüzey istiyorsanız duş alanını mat bir ürünle ayırmak iyi bir çözümdür.' },

      { tip: 'h2', metin: '3. Ebat, mekânın algısını değiştirir' },
      {
        tip: 'liste',
        ogeler: [
          'Büyük ebat (60x120, 80x80): Derz sayısı azalır, mekân daha geniş ve sakin görünür; temizlik kolaylaşır.',
          'Orta ebat (30x60, 60x60): En yaygın ve en esnek seçenek; fire oranı düşüktür.',
          'Küçük ebat ve mozaik: Duş içi zeminde tutunmayı artırır, eğimli yüzeylere daha kolay uyum sağlar.',
        ],
      },
      { tip: 'p', metin: 'Küçük banyolarda büyük format karo kullanmak, sanılanın aksine mekânı daraltmaz; derz çizgilerinin azalması alanı daha bütün ve geniş gösterir.' },

      { tip: 'h2', metin: '4. Derz rengi tasarımın parçasıdır' },
      { tip: 'p', metin: 'Karo rengiyle aynı tonda derz, yüzeyi tek parça gibi gösterir ve sakin bir görünüm verir. Kontrast derz ise karo formunu öne çıkarır, geometrik bir etki yaratır. Açık renk derzler zamanla daha çok kirlenir; banyo zemininde orta tonlar pratikte daha iyi sonuç verir.' },

      { tip: 'h2', metin: '5. Su yalıtımını seramiğe bırakmayın' },
      { tip: 'p', metin: 'Seramik ve derz su geçirmez bir tabaka değildir. Suyun yapıya ulaşmasını engelleyen katman, seramiğin altındaki su yalıtım malzemesidir. Duş alanı ve ıslak zeminlerde çimento veya likit esaslı su yalıtım ürünleri, köşe ve birleşimlerde yalıtım bandı ile birlikte uygulanmalıdır.' },
      { tip: 'p', metin: 'Bu iş için kullanılan su yalıtım harçları, bantlar ve astarları [kimyasal ürünler](/kimyasal-urunler) sayfamızda listeliyoruz.' },

      { tip: 'h2', metin: '6. Yapıştırıcıyı karoya göre seçin' },
      { tip: 'p', metin: 'Büyük format ve düşük su emen porselen karolar, standart yapıştırıcıyla değil; yüksek yapışma dayanımlı ve deformasyona uyum sağlayan (C2 sınıfı, tercihen S1) ürünlerle uygulanmalıdır. Yanlış yapıştırıcı, ilk yıl sorunsuz görünen ama sonradan boşalan yüzeylere yol açar.' },

      { tip: 'h2', metin: '7. Aydınlatmayı seçimden önce düşünün' },
      { tip: 'p', metin: 'Seramik rengi, altındaki ışığın renk sıcaklığına göre farklı görünür. 2700–3000K sıcak beyaz ışık bej ve krem tonları yumuşatır; 4000K ve üzeri nötr/soğuk ışık gri ve beyaz tonları öne çıkarır. Örnek karoyu mutlaka banyonuzda kullanacağınız ışık altında değerlendirin.' },

      { tip: 'h2', metin: '8. Vitrifiye ve seramiği birlikte planlayın' },
      { tip: 'p', metin: 'Lavabo, klozet ve dolap ölçüleri seramik yerleşimini etkiler. Özellikle asma klozet ve gömme rezervuar kullanılacaksa, duvar kaplaması planı montaj öncesinde netleşmelidir. [Vitrifiye ürünlerimizi](/vitrifiye) ve [banyo mobilyalarını](/banyo-mobilyalari) seramikle birlikte değerlendirmek, sonradan çıkacak uyumsuzlukları önler.' },

      { tip: 'not', metin: 'Fire payı unutulmaması gereken bir kalemdir. Düz yerleşimde %5–10, çapraz veya desenli yerleşimde %10–15 fazladan malzeme hesaplayın. Aynı üretim partisinden (aynı ton ve kalibre) almaya dikkat edin.' },
    ],
    sss: [
      {
        soru: 'Küçük banyoda büyük seramik kullanılır mı?',
        cevap: 'Evet, kullanılabilir ve çoğu zaman avantajlıdır. Büyük format karo derz sayısını azaltır, bu da mekânın daha bütün ve geniş algılanmasını sağlar. Yalnızca kesim ve taşıma planlamasının doğru yapılması gerekir.',
      },
      {
        soru: 'Banyo seramiği için ne kadar fire payı ayrılmalı?',
        cevap: 'Düz yerleşimde %5–10, çapraz veya desen içeren yerleşimlerde %10–15 fire payı hesaplanmalıdır. Sonradan tamamlama yaparken aynı ton ve kalibredeki ürünü bulmak zor olabileceği için baştan yeterli almak önemlidir.',
      },
      {
        soru: 'Derz rengi nasıl seçilmeli?',
        cevap: 'Karoyla aynı tondaki derz bütünlüklü ve sakin bir görünüm verir; kontrast derz karo formunu vurgular. Zeminde çok açık renk derzlerden kaçınmak, uzun vadede temizlik açısından daha pratiktir.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: 'rimless-klozet-nedir',
    baslik: 'Rimless (Kanalsız) Klozet Nedir? Avantajları ve Seçim Rehberi',
    seoBaslik: 'Rimless Klozet Nedir? Avantajları',
    aciklama:
      'Rimless kanalsız klozet nedir, klasik klozetten farkı ne? Hijyen, temizlik ve su tüketimi açısından avantajları ile asma-yere oturan model karşılaştırması.',
    ozet:
      'Kanalsız klozetler, klasik modellerdeki kir biriken iç kanalı ortadan kaldırır. Bu basit tasarım değişikliği hijyen ve temizlik açısından belirgin fark yaratır.',
    tarih: '2026-08-01',
    kategori: 'Ürün',
    etiketler: ['rimless klozet', 'kanalsız klozet', 'asma klozet', 'vitrifiye'],
    okuma: 6,
    kapak: '/images/collections/beton-koleksiyonu/hero-webp/hero-01.webp',
    icerik: [
      { tip: 'p', metin: 'Klasik klozetlerde suyun dağıtıldığı, klozetin üst kenarı boyunca uzanan kapalı bir kanal bulunur. Bu kanal gözle görünmez ve fırçayla tam olarak ulaşılamaz; zamanla kireç ve bakteri birikimi için elverişli bir alan hâline gelir. Rimless (kanalsız) klozetler bu kanalı tamamen kaldırır.' },

      { tip: 'h2', metin: 'Kanalsız sistem nasıl çalışır?' },
      { tip: 'p', metin: 'Rimless modellerde su, kapalı bir kanal yerine klozetin arka kısmındaki açık bir çıkıştan bırakılır ve yönlendirilmiş akışla iç yüzeyin tamamını dolaşır. Böylece hem yıkama kapsamı korunur hem de her noktaya elle ulaşılabilir hâle gelir.' },

      { tip: 'h2', metin: 'Başlıca avantajları' },
      {
        tip: 'liste',
        ogeler: [
          'Hijyen: Gizli kanal olmadığı için kir ve bakteri birikecek kapalı bölge kalmaz.',
          'Kolay temizlik: Klozetin iç yüzeyinin tamamı görünür ve tek hamlede silinebilir.',
          'Daha az kireçlenme: Sert suyun kanal içinde yaptığı birikim sorunu ortadan kalkar.',
          'Sıçrama kontrolü: Yönlendirilmiş akış, iyi tasarlanmış modellerde dışarı sıçramayı azaltır.',
          'Su verimliliği: Çoğu rimless model çift kademeli rezervuarla (3/6 litre) uyumludur.',
        ],
      },

      { tip: 'h2', metin: 'Asma klozet mi, yere oturan mı?' },
      {
        tip: 'tablo',
        basliklar: ['Kriter', 'Asma klozet', 'Yere oturan (takım)'],
        satirlar: [
          ['Temizlik', 'Altı boş, zemin kesintisiz silinir', 'Zemin birleşimi temizlik gerektirir'],
          ['Montaj', 'Gömme rezervuar ve taşıyıcı kasa gerekir', 'Doğrudan zemine monte edilir'],
          ['Mekân algısı', 'Zemini açık bıraktığı için ferah', 'Daha geleneksel görünüm'],
          ['Yükseklik ayarı', 'Montajda kullanıcıya göre ayarlanabilir', 'Sabit'],
          ['Uygulama maliyeti', 'Duvar içi kasa nedeniyle daha yüksek', 'Daha ekonomik'],
        ],
      },
      { tip: 'p', metin: 'Asma klozet tercih edilecekse duvarın taşıyıcı kasayı alacak derinlikte olması gerekir. Alçıpan duvarlarda uygun kasa sistemleriyle bu mümkündür; ancak planlama kaplama öncesinde yapılmalıdır.' },

      { tip: 'h2', metin: 'Klozet kapağı: UF mi PP mi?' },
      { tip: 'p', metin: 'Klozet kapakları genellikle iki malzemeden üretilir. Duroplast (UF) kapaklar daha ağır, sert ve çizilmeye dayanıklıdır; yüzeyi daha uzun süre ilk günkü gibi kalır. Polipropilen (PP) kapaklar daha hafif ve ekonomiktir. Her iki grupta da yavaş kapanan (soft close) menteşe seçeneği bulunur; bu mekanizma hem gürültüyü hem de darbe kaynaklı kırılmaları önler.' },

      { tip: 'h2', metin: 'Seçerken nelere bakmalı?' },
      {
        tip: 'liste',
        ogeler: [
          'Çıkış yönü: Mevcut tesisata göre alttan (yatay) veya arkadan (dikey) çıkışlı model seçilmelidir.',
          'Ebat: Asma klozetlerde 48–52 cm derinlik yaygındır; küçük banyolarda kısa modeller alan kazandırır.',
          'Kapak dahil mi: Bazı ürünler kapakla paket satılır, bazılarında ayrı alınır.',
          'Antibakteriyel kaplama: Bazı serilerde yüzeye uygulanan nano kaplama, kir tutunmasını azaltır.',
        ],
      },
      { tip: 'p', metin: 'Rimless klozet takımlarını ve uyumlu kapak seçeneklerini [klozet takımları](/vitrifiye/klozet-takimlari) ve [tamamlayıcı ürünler](/vitrifiye/tamamlayici) sayfalarımızda bulabilirsiniz.' },
    ],
    sss: [
      {
        soru: 'Rimless klozet gerçekten daha mı hijyenik?',
        cevap: 'Evet. Klasik klozetlerdeki kapalı kanal, fırçayla ulaşılamadığı için kir ve kireç birikimine açıktır. Rimless modellerde bu kanal bulunmadığından iç yüzeyin tamamı görünür ve temizlenebilir.',
      },
      {
        soru: 'Rimless klozette sıçrama olur mu?',
        cevap: 'İyi tasarlanmış modellerde su yönlendirilmiş akışla iç yüzeyi dolaştığı için sıçrama kontrol altındadır. Bu konuda modeller arasında fark olabildiğinden, ürünün yıkama performansına dair bilgileri kontrol etmek faydalıdır.',
      },
      {
        soru: 'Asma klozet her duvara monte edilebilir mi?',
        cevap: 'Gömme rezervuar ve taşıyıcı kasa için yeterli duvar derinliği gerekir. Tuğla duvarda niş açılarak, alçıpan sistemlerde ise uygun taşıyıcı kasayla uygulanabilir. Planlamanın seramik kaplama öncesinde yapılması önemlidir.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: 'seramik-yapistirici-ve-derz-dolgu-secimi',
    baslik: 'Seramik Yapıştırıcı ve Derz Dolgu Seçimi: C1, C2, S1, Epoksi Ne Demek?',
    seoBaslik: 'Seramik Yapıştırıcı Sınıfları: C1, C2, S1 Nedir?',
    aciklama:
      'Seramik yapıştırıcıda C1, C2, S1, S2 ve derz dolguda CG2, epoksi sınıfları ne anlama gelir? Zemine ve karoya göre doğru ürünü seçme rehberi.',
    ozet:
      'Yapıştırıcı ve derz, seramik uygulamasının görünmeyen ama en belirleyici kısmı. Yanlış sınıf seçimi, kusursuz görünen bir yüzeyin iki yıl içinde boşalmasına yol açabilir.',
    tarih: '2026-08-01',
    kategori: 'Uygulama',
    etiketler: ['seramik yapıştırıcı', 'derz dolgu', 'C2 S1', 'epoksi derz', 'EN 12004'],
    okuma: 8,
    kapak: '/images/collections/dekoratif-koleksiyonu/hero-webp/hero-05.webp',
    icerik: [
      { tip: 'p', metin: 'Seramik uygulamalarında ortaya çıkan sorunların önemli bir bölümü karodan değil, altındaki yapıştırıcıdan ve aradaki derzden kaynaklanır. Doğru sınıf seçildiğinde yüzey on yıllarca sorunsuz kalır; yanlış seçildiğinde ilk yıl fark edilmeyen kusurlar sonradan boşalma, çatlama ve renk bozulmasıyla kendini gösterir.' },

      { tip: 'h2', metin: 'Yapıştırıcı sınıfları nasıl okunur?' },
      { tip: 'p', metin: 'Seramik yapıştırıcıları EN 12004 standardına göre harflerle kodlanır. Kod, ürünün ne olduğunu ve hangi ek özellikleri taşıdığını sırayla anlatır.' },
      {
        tip: 'tablo',
        basliklar: ['Kod', 'Anlamı'],
        satirlar: [
          ['C', 'Çimento esaslı yapıştırıcı'],
          ['D', 'Dispersiyon (hazır macun) yapıştırıcı'],
          ['R', 'Reaksiyon reçineli (epoksi/poliüretan) yapıştırıcı'],
          ['1', 'Normal performans'],
          ['2', 'Yüksek yapışma dayanımı (≥ 1,0 N/mm²)'],
          ['F', 'Hızlı priz alan'],
          ['T', 'Kaymaya karşı dirençli (duvarda akmayı önler)'],
          ['E', 'Uzatılmış açık bekleme süresi'],
          ['S1', 'Deforme olabilen — esneklik ≥ 2,5 mm'],
          ['S2', 'Yüksek deforme olabilen — esneklik ≥ 5 mm'],
        ],
      },
      { tip: 'p', metin: 'Örneğin "C2TE S1" kodlu bir ürün: çimento esaslı, yüksek yapışma dayanımlı, kaymaya dirençli, uzun açık süreli ve esnek bir yapıştırıcıdır.' },

      { tip: 'h2', metin: 'Hangi durumda hangi yapıştırıcı?' },
      {
        tip: 'liste',
        ogeler: [
          'İç mekân duvar, küçük ebat seramik, stabil yüzey: C1 yeterlidir.',
          'Porselen karo (düşük su emen): C2 gereklidir — porselen suyu emmediği için yapışma tamamen yapıştırıcının kimyasal dayanımına bağlıdır.',
          'Büyük format (60x120 ve üzeri): C2 + S1. Büyük yüzeyde oluşan gerilmelerin esnek bir katmanla karşılanması gerekir.',
          'Isıtmalı (yerden ısıtma) zemin: C2 S1 — ısınma ve soğuma döngüsündeki hareketi karşılar.',
          'Islak hacim ve havuz: C2 S1, su yalıtım katmanıyla uyumlu ürün seçilmeli.',
          'Dış mekân ve cephe: C2 S1 veya S2; don ve termal şok dikkate alınmalıdır.',
          'Seramik üzerine seramik: Uygun astar + C2 S1 kombinasyonu gerekir.',
        ],
      },
      { tip: 'not', metin: 'Büyük format karolarda çift taraflı sürüm (hem zemine hem karo arkasına yapıştırıcı uygulama) yöntemi, altta boşluk kalmasını önler. Boşluklu uygulanan büyük karolar noktasal darbede kolayca kırılır.' },

      { tip: 'h2', metin: 'Derz dolgu: çimento esaslı mı, epoksi mi?' },
      { tip: 'p', metin: 'Derz dolgular EN 13888 standardına göre sınıflandırılır. CG çimento esaslı, RG ise reaksiyon reçineli (epoksi) ürünleri ifade eder.' },
      {
        tip: 'tablo',
        basliklar: ['Kriter', 'Çimento esaslı (CG2)', 'Epoksi (RG)'],
        satirlar: [
          ['Kimyasal direnç', 'Sınırlı', 'Çok yüksek'],
          ['Leke tutma', 'Zamanla lekelenebilir', 'Neredeyse geçirimsiz'],
          ['Uygulama kolaylığı', 'Kolay', 'Zor — hızlı çalışmak gerekir'],
          ['Maliyet', 'Ekonomik', 'Yüksek'],
          ['Tipik kullanım', 'Konut içi genel', 'Mutfak tezgâh arası, havuz, endüstriyel'],
        ],
      },
      { tip: 'p', metin: 'Konut projelerinin çoğunda su iticili CG2 sınıfı çimento esaslı derz yeterlidir. Epoksi derz ise sürekli kimyasal temas olan alanlarda — havuz, endüstriyel mutfak, laboratuvar — belirgin avantaj sağlar. Epoksi uygulaması deneyim gerektirir; yüzeyde kalan artık sertleştikten sonra temizlenmesi çok zordur.' },

      { tip: 'h2', metin: 'Derz genişliği ne olmalı?' },
      {
        tip: 'liste',
        ogeler: [
          'Rektifiyeli (kesilmiş kenarlı) büyük format: 1,5–2 mm',
          'Standart iç mekân karo: 2–3 mm',
          'Dış mekân ve teras: 3–5 mm — termal hareket için pay bırakılmalıdır',
          'Doğal taş görünümlü rustik ürünler: 3–8 mm, ürün karakterine göre',
        ],
      },
      { tip: 'p', metin: 'Derzsiz uygulama yapılmamalıdır. Karolar sıcaklık ve nem değişimiyle çalışır; derz bu hareketi karşılayan boşluktur. Ayrıca büyük yüzeylerde belirli aralıklarla genleşme derzi bırakılması gerekir.' },

      { tip: 'h2', metin: 'Astar ne işe yarar?' },
      { tip: 'p', metin: 'Astar, emici yüzeylerde (şap, alçı sıva, gazbeton) suyun yapıştırıcıdan hızla çekilmesini engeller ve yapışmayı iyileştirir. Emici olmayan yüzeylerde (mevcut seramik, boyalı yüzey) ise tutunma sağlayacak bir köprü oluşturur. Yüzey tipine uygun astar kullanmak, yapıştırıcının performansını doğrudan etkiler.' },
      { tip: 'p', metin: 'Yapıştırıcı, derz dolgu, astar ve su yalıtım ürünlerinin tam listesini [kimyasal ürünler](/kimyasal-urunler) sayfamızda bulabilirsiniz.' },
    ],
    sss: [
      {
        soru: 'Porselen karoda normal yapıştırıcı kullanılabilir mi?',
        cevap: 'Kullanılmamalıdır. Porselen karo su emmediği için mekanik kenetlenme oluşmaz; yapışma tamamen yapıştırıcının kimyasal dayanımına bağlıdır. Bu nedenle en az C2 sınıfı, büyük formatlarda C2 S1 ürün gerekir.',
      },
      {
        soru: 'Epoksi derz her yerde gerekli mi?',
        cevap: 'Hayır. Konut içi kullanımda su iticili CG2 sınıfı çimento esaslı derz çoğu durumda yeterlidir. Epoksi derz; havuz, endüstriyel mutfak, laboratuvar gibi sürekli kimyasal temas olan alanlarda avantaj sağlar.',
      },
      {
        soru: 'Yerden ısıtmalı zeminde hangi yapıştırıcı kullanılır?',
        cevap: 'Isınma-soğuma döngüsündeki boyutsal hareketi karşılayabilmesi için esnek, C2 S1 sınıfı bir yapıştırıcı kullanılmalıdır. Ayrıca sistemin ilk çalıştırılması, şap ve yapıştırıcı kürünü tamamladıktan sonra kademeli olarak yapılmalıdır.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  {
    slug: 'buyuk-format-seramik-avantajlari',
    baslik: 'Büyük Format Seramik: Avantajları, Ebatları ve Uygulama Detayları',
    seoBaslik: 'Büyük Format Seramik Avantajları',
    aciklama:
      'Büyük format porselen seramik nedir, hangi ebatlar var? Derz azalması, mekân algısı, uygulama zorlukları ve doğru yapıştırma tekniği hakkında rehber.',
    ozet:
      'Büyük format karolar mimari yüzey algısını değiştirir: daha az derz, daha bütün bir görünüm. Ancak uygulama toleransı standart ebatlara göre çok daha dardır.',
    tarih: '2026-08-01',
    kategori: 'Tasarım',
    etiketler: ['büyük format seramik', '60x120', 'slab', 'rektifiye'],
    okuma: 7,
    kapak: '/images/collections/ahsap-koleksiyonu/hero-webp/hero-02.webp',
    icerik: [
      { tip: 'p', metin: 'Son yıllarda seramik sektörünün en belirgin yönelimi büyük formatlara doğru. 60x120, 80x160 ve daha büyük ebatlar, yüzeyi karo dizisi olmaktan çıkarıp sürekli bir malzeme yüzeyine yaklaştırıyor. Bu, mimari algıda ciddi bir fark yaratıyor.' },

      { tip: 'h2', metin: 'Neden büyük format?' },
      {
        tip: 'liste',
        ogeler: [
          'Daha az derz: Görsel bölünme azalır, yüzey tek parça malzeme gibi okunur.',
          'Kolay temizlik: Derz sayısı azaldıkça kir tutan çizgi sayısı da azalır.',
          'Mekân algısı: Bölünmeyen yüzey mekânı daha geniş ve sakin gösterir.',
          'Desen sürekliliği: Mermer damarları gibi büyük ölçekli desenler kesintisiz aktarılabilir.',
          'Hijyen: Az derz, ıslak hacimlerde daha az birikim noktası demektir.',
        ],
      },

      { tip: 'h2', metin: 'Yaygın ebatlar' },
      {
        tip: 'tablo',
        basliklar: ['Ebat', 'Tipik kullanım'],
        satirlar: [
          ['60x120 cm', 'Konut zemini ve duvarı — en yaygın büyük format'],
          ['80x80 cm', 'Salon ve geniş iç mekân zeminleri'],
          ['100x100 cm', 'Ticari alanlar, geniş açıklıklı mekânlar'],
          ['120x260 cm ve üzeri (slab)', 'Tezgâh, duvar panosu, cephe kaplaması'],
        ],
      },

      { tip: 'h2', metin: 'Rektifiye ne demek?' },
      { tip: 'p', metin: 'Rektifiye, karonun pişirim sonrası kenarlarının hassas biçimde kesilerek tüm parçaların birebir aynı ölçüye getirilmesidir. Bu sayede 1,5–2 mm gibi çok ince derzlerle uygulama yapılabilir. Büyük format ürünlerin neredeyse tamamı rektifiyelidir; ince derz bu ürünlerin görsel etkisinin temel parçasıdır.' },

      { tip: 'h2', metin: 'Uygulamada dikkat edilmesi gerekenler' },
      { tip: 'p', metin: 'Büyük format karolarda hata payı standart ebatlara göre çok daha dardır. Küçük bir karoda fark edilmeyen zemin bozukluğu, 120 cm uzunluğunda bir karoda köşe kalkmasına ve kırılmaya yol açar.' },
      {
        tip: 'liste',
        ogeler: [
          'Zemin düzlüğü: Yüzey tesviyesi kritik. Gerekirse kendinden yayılan tesviye şapı (self-levelling) uygulanmalıdır.',
          'Çift taraflı sürüm: Yapıştırıcı hem zemine hem karo arkasına uygulanmalı; altta boşluk kalmamalıdır.',
          'Doğru tarak: Büyük formatta genellikle 10–12 mm dişli tarak kullanılır.',
          'Tesviye (nivelman) sistemi: Karolar arası kot farkını (lippage) önlemek için tesviye klipsleri kullanılmalıdır.',
          'Esnek yapıştırıcı: En az C2 S1 sınıfı ürün gereklidir.',
          'Kaydırmalı derz sınırı: Büyük formatta yarım kaydırmalı (%50) yerleşim önerilmez; %25–33 kaydırma daha güvenlidir, aksi hâlde karo ortasındaki hafif kamburluk kenarlarda kot farkı yaratır.',
          'Taşıma ve kesim: Vakumlu taşıma aparatı ve uygun kesim ekipmanı gerekir; bu ürünler tek kişiyle taşınmaya uygun değildir.',
        ],
      },

      { tip: 'h2', metin: 'İnce kalınlıklar (slim)' },
      { tip: 'p', metin: '3–6 mm kalınlığındaki ince büyük format ürünler, özellikle mevcut kaplama üzerine uygulama (renovasyon) ve cephe kaplamasında avantaj sağlar. Ağırlığı düşüktür ve eski zemini sökmeden üzerine uygulanabilir. Ancak zemin düzlüğü ve yapıştırıcı seçimi konusundaki hassasiyet daha da artar.' },

      { tip: 'h2', metin: 'Büyük format her mekâna uygun mu?' },
      { tip: 'p', metin: 'Çok sayıda kesim gerektiren dar ve girintili çıkıntılı alanlarda büyük format fire oranını yükseltir ve maliyeti artırır. Böyle mekânlarda orta ebatlar daha ekonomik olur. Buna karşılık banyo gibi görece küçük ama düzgün geometrili alanlarda büyük format oldukça iyi sonuç verir.' },
      { tip: 'p', metin: 'Büyük format seçeneklerini [koleksiyonlar](/koleksiyonlar) sayfamızdan inceleyebilir, uygulamada kullanılacak yapıştırıcı ve tesviye ürünleri için [kimyasal ürünler](/kimyasal-urunler) bölümüne bakabilirsiniz.' },
    ],
    sss: [
      {
        soru: 'Büyük format seramik küçük mekânda kullanılır mı?',
        cevap: 'Evet. Derz sayısının azalması mekânı daha bütün gösterdiği için küçük banyolarda bile iyi sonuç verir. Yalnızca çok fazla kesim gerektiren girintili çıkıntılı alanlarda fire oranı yükselir.',
      },
      {
        soru: 'Büyük format karo neden kırılıyor?',
        cevap: 'En yaygın nedeni altta boşluk kalmasıdır. Yapıştırıcının yalnızca zemine sürülmesi, karo altında hava boşlukları bırakır ve noktasal darbede kırılmaya yol açar. Çift taraflı sürüm ve düzgün zemin tesviyesi bu riski ortadan kaldırır.',
      },
      {
        soru: 'Büyük formatta derz kaç mm olmalı?',
        cevap: 'Rektifiyeli büyük format ürünlerde 1,5–2 mm derz standarttır. Derzsiz uygulama yapılmamalıdır; karolar sıcaklık ve nem değişimiyle çalıştığı için bu boşluk gereklidir.',
      },
    ],
  },
]

export const BLOG_KATEGORILERI = ['Rehber', 'Uygulama', 'Tasarım', 'Ürün'] as const

export function getYazi(slug: string): BlogYazi | undefined {
  return BLOG_YAZILARI.find((y) => y.slug === slug)
}

export function tarihFormatla(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const aylar = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ]
  return `${d} ${aylar[m - 1]} ${y}`
}
