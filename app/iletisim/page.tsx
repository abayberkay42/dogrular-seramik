import type { Metadata } from 'next'
import { ContactForm } from "@/components/forms/ContactForm"

export const metadata: Metadata = {
  title: "İletişim — Hatay Antakya Showroom",
  description:
    "Proje danışmanlığı, koleksiyon bilgisi veya örnek talebi için bizimle iletişime geçin. Hatay Antakya showroomumuzu ziyaret edebilir ya da online form üzerinden ulaşabilirsiniz.",
  alternates: { canonical: '/iletisim' },
  openGraph: {
    title: "İletişim — Doğrular Seramik",
    description: "Projeniz için bize ulaşın.",
    type: "website",
    locale: "tr_TR",
    siteName: "Doğrular Seramik",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim — Doğrular Seramik",
    description: "Projeniz için bize ulaşın.",
  },
}

export default function IletisimPage() {
  return (
    <main>
      {/* ── Hero — dark editorial ──────────────────────────────────── */}
      <section className="ct-hero" aria-label="İletişim sayfası başlığı">
        <div className="ct-hero-inner">
          <p className="pg-label pg-animate-in" aria-hidden="true">İletişim</p>
          <h1 className="pg-display-heading ct-hero-heading pg-animate-in pg-animate-in--d1">
            Konuşalım.
          </h1>
          <p className="pg-lead ct-lead pg-animate-in pg-animate-in--d2">
            Proje danışmanlığı, koleksiyon bilgisi veya örnek talebi —
            hangi konuda olursa olsun, ekibimiz size dönüş yapmaktan memnuniyet duyar.
          </p>
        </div>
      </section>

      {/* Dark → Light divider */}
      <div className="section-transition-divider" aria-hidden="true" />

      {/* ── Contact body ────────────────────────────────────────────── */}
      <section className="ct-body" aria-label="İletişim bilgileri ve form">
        <div className="ct-body-inner">
          <div className="ct-grid">

            {/* Left: contact info */}
            <aside className="ct-info" aria-label="İletişim bilgileri">
              <h2 className="ct-info-heading">
                Bize doğrudan ulaşın.
              </h2>

              <address className="ct-info-address">
                <div className="ct-info-block">
                  <p className="ct-info-label">E-posta</p>
                  <a
                    href="mailto:dogrularseramikk@gmail.com"
                    className="ct-info-value"
                  >
                    dogrularseramikk@gmail.com
                  </a>
                </div>

                <div className="ct-info-block">
                  <p className="ct-info-label">Telefon</p>
                  <a href="tel:+905373575667" className="ct-info-value">
                    +90 537 357 56 67
                  </a>
                </div>

                <div className="ct-info-block">
                  <p className="ct-info-label">Showroom</p>
                  <p className="ct-info-value ct-info-value--text">
                    Güneysöğüt, Antakya Samandağ Yolu<br />
                    31160 Hatay Merkez / Hatay
                  </p>
                </div>

                <div className="ct-info-block">
                  <p className="ct-info-label">Çalışma Saatleri</p>
                  <p className="ct-info-value ct-info-value--text">
                    Pazartesi–Cuma: 09:00–18:00<br />
                    Cumartesi: 10:00–15:00
                  </p>
                </div>
              </address>
            </aside>

            {/* Right: form */}
            <div className="ct-form-container">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
