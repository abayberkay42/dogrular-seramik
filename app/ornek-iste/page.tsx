import type { Metadata } from 'next'
import { SampleRequestForm } from '@/components/forms/SampleRequestForm'

export const metadata: Metadata = {
  title: 'Ücretsiz Seramik Örneği İste',
  description:
    'Porselen seramik koleksiyonlarımızdan ücretsiz örnek isteyin. Hatay Antakya ve çevresine gönderim. Kararınızdan önce yüzeyi elinizde hissedin.',
  alternates: { canonical: '/ornek-iste' },
  openGraph: {
    title: 'Örnek İste — Doğrular Seramik',
    description:
      'Seramik koleksiyonlarımızdan ücretsiz örnek isteyin.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Doğrular Seramik',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Örnek İste — Doğrular Seramik',
    description: 'Seramik koleksiyonlarımızdan ücretsiz örnek isteyin.',
  },
}

export default function OrnekIstePage() {
  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="sr-hero" aria-label="Örnek talep sayfası başlığı">
        <div className="sr-hero-inner">
          <p className="sr-label pg-animate-in" aria-hidden="true">Örnek İste</p>
          <h1 className="sr-heading pg-animate-in pg-animate-in--d1">
            Kararınızı vermeden önce<br />
            yüzeyi hissedin.
          </h1>
          <p className="sr-sub pg-animate-in pg-animate-in--d2">
            Seçtiğiniz koleksiyondan fiziksel örnek gönderiyoruz. Işığı nasıl
            tuttuğunu, ağırlığını, dokusunu — bizzat değerlendirin.
          </p>
        </div>
      </section>

      {/* Dark → Light divider */}
      <div className="section-transition-divider" aria-hidden="true" />

      {/* ── Form section ────────────────────────────────────────────── */}
      <section className="sr-body" aria-label="Örnek talep formu">
        <div className="sr-body-inner">
          <div className="sr-form-container">
            <SampleRequestForm />
          </div>
        </div>
      </section>
    </main>
  )
}
