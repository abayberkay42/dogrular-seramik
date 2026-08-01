import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Doğrular Seramik gizlilik politikası ve kişisel veri işleme esasları.',
  robots: 'noindex',
}

export default function GizlilikPage() {
  return (
    <main>
      <section className="legal-page" aria-label="Gizlilik politikası">
        <div className="legal-shell">
          <header className="legal-header">
            <p className="pg-label" aria-hidden="true">Yasal</p>
            <h1 className="legal-heading">Gizlilik Politikası</h1>
            <p className="legal-date">Son güncelleme: Ocak 2025</p>
          </header>

          <div className="legal-body">
            <section aria-labelledby="veri-sorumlusu">
              <h2 id="veri-sorumlusu" className="legal-section-heading">Veri Sorumlusu</h2>
              <p className="legal-para">
                Bu web sitesi, Doğrular Seramik tarafından işletilmektedir. Kişisel verileriniz
                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) çerçevesinde işlenmektedir.
              </p>
            </section>

            <section aria-labelledby="toplanan-veriler">
              <h2 id="toplanan-veriler" className="legal-section-heading">Toplanan Veriler</h2>
              <p className="legal-para">
                Web sitemizi ziyaret ettiğinizde veya iletişim formlarımızı doldurduğunuzda
                aşağıdaki veriler toplanabilir:
              </p>
              <ul className="legal-list">
                <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
                <li>Mesleğiniz ve şirket bilginiz (isteğe bağlı)</li>
                <li>Teslimat adresi (örnek talebi için)</li>
                <li>Tarayıcı ve cihaz bilgileri (analitik amaçlı)</li>
              </ul>
            </section>

            <section aria-labelledby="kullanim-amaci">
              <h2 id="kullanim-amaci" className="legal-section-heading">Kullanım Amacı</h2>
              <p className="legal-para">
                Verileriniz yalnızca talep ettiğiniz hizmeti sunmak, örnek göndermek
                ve proje danışmanlığı kapsamında sizinle iletişime geçmek için kullanılır.
                Verileriniz üçüncü taraflarla paylaşılmaz.
              </p>
            </section>

            <section aria-labelledby="haklariniz">
              <h2 id="haklariniz" className="legal-section-heading">Haklarınız</h2>
              <p className="legal-para">
                KVKK kapsamında kişisel verilerinize erişme, düzeltme veya silme hakkına
                sahipsiniz. Bu haklarınızı kullanmak için{' '}
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
