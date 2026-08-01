import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description:
    'Doğrular Seramik KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aydınlatma metni.',
  robots: 'noindex',
}

export default function KvkkPage() {
  return (
    <main>
      <section className="legal-page" aria-label="KVKK aydınlatma metni">
        <div className="legal-shell">
          <header className="legal-header">
            <p className="pg-label" aria-hidden="true">Yasal</p>
            <h1 className="legal-heading">KVKK Aydınlatma Metni</h1>
            <p className="legal-date">Son güncelleme: Ocak 2025</p>
          </header>

          <div className="legal-body">
            <section aria-labelledby="kvkk-giris">
              <h2 id="kvkk-giris" className="legal-section-heading">Giriş</h2>
              <p className="legal-para">
                6698 Sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) 10. maddesi uyarınca,
                kişisel verilerinizin işlenmesine ilişkin olarak sizi bilgilendirme yükümlülüğümüzü
                yerine getirmek amacıyla bu aydınlatma metni hazırlanmıştır.
              </p>
            </section>

            <section aria-labelledby="kvkk-sorumlu">
              <h2 id="kvkk-sorumlu" className="legal-section-heading">Veri Sorumlusu</h2>
              <p className="legal-para">
                Doğrular Seramik, veri sorumlusu sıfatıyla kişisel verilerinizi işlemektedir.
                İletişim: dogrularseramikk@gmail.com
              </p>
            </section>

            <section aria-labelledby="kvkk-isleme">
              <h2 id="kvkk-isleme" className="legal-section-heading">Kişisel Veri İşleme Amaçları</h2>
              <ul className="legal-list">
                <li>İletişim taleplerinizin karşılanması</li>
                <li>Örnek ürün gönderiminin gerçekleştirilmesi</li>
                <li>Proje danışmanlığı hizmetinin sunulması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              </ul>
            </section>

            <section aria-labelledby="kvkk-haklariniz">
              <h2 id="kvkk-haklariniz" className="legal-section-heading">İlgili Kişi Hakları</h2>
              <p className="legal-para">
                KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="legal-list">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri öğrenme</li>
                <li>Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
              </ul>
              <p className="legal-para">
                Haklarınızı kullanmak için{' '}
                <a href="mailto:dogrularseramikk@gmail.com" className="legal-link">
                  dogrularseramikk@gmail.com
                </a>{' '}
                adresine e-posta gönderebilirsiniz.
              </p>
            </section>
          </div>

          <nav className="legal-back" aria-label="Geri dön">
            <Link href="/" className="legal-back-link">
              ← Ana Sayfaya Dön
            </Link>
          </nav>
        </div>
      </section>
    </main>
  )
}
