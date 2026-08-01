import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Sayfa Bulunamadı',
  robots: 'noindex',
}

export default function NotFound() {
  return (
    <main>
      <section className="nf-section" aria-label="Sayfa bulunamadı">
        <div className="nf-inner">
          <div className="nf-eyebrow" aria-hidden="true">
            <span className="nf-eyebrow-line" />
            <span className="nf-eyebrow-label">Doğrular Seramik</span>
          </div>
          <span className="nf-code" aria-hidden="true">404</span>
          <h1 className="nf-heading">Bu sayfa mevcut değil.</h1>
          <p className="nf-body">
            Aradığınız sayfa taşınmış, kaldırılmış ya da hiç var olmamış olabilir.
          </p>
          <nav className="nf-links" aria-label="Önerilen sayfalar">
            <Link href="/" className="nf-link-primary">
              Ana Sayfa
            </Link>
            <Link href="/koleksiyonlar" className="nf-link">
              Koleksiyonlar
            </Link>
            <Link href="/vitrifiye" className="nf-link">
              Vitrifiye
            </Link>
            <Link href="/iletisim" className="nf-link">
              İletişim
            </Link>
          </nav>
        </div>
      </section>
    </main>
  )
}
