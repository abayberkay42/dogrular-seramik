import type { Metadata } from 'next'
import Link from 'next/link'
import { MARKALAR, MARKA_LOGOLARI } from '@/lib/marka-data'
import { LogoMarquee } from '@/components/markalar/LogoMarquee'
import { BASE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Markalarımız — Seramik ve Banyo',
  description:
    'Etili Seramik, Turkuaz Seramik · CeraStyle, Balneom, Kütahya Yapı Kimyasalları, Matkim ve VitrA — Doğrular Seramik çatısı altında sunduğumuz markalar.',
  alternates: { canonical: `${BASE_URL}/markalarimiz` },
  openGraph: {
    title: 'Markalarımız — Seramik ve Banyo | Doğrular Seramik',
    description: 'Seramik, vitrifiye, banyo mobilyası ve yapı kimyasalı markalarımız.',
    url: `${BASE_URL}/markalarimiz`,
  },
}

export default function MarkalarimizPage() {
  return (
    <main className="vc-page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mk-hero" aria-labelledby="mk-hero-title">
        <div className="vc-hero-inner">
          <p className="vc-hero-eyebrow">Doğrular Seramik</p>
          <h1 id="mk-hero-title" className="vc-hero-title">Markalarımız</h1>
          <p className="vc-hero-desc">
            Seramik, vitrifiye, banyo mobilyası ve yapı kimyasalı alanlarında
            çalıştığımız markalar — hepsi tek çatı altında.
          </p>
          <p className="vc-hero-count">{MARKA_LOGOLARI.length} marka</p>
        </div>
      </section>

      {/* ── Kayan logo şeridi ────────────────────────────────────────── */}
      <LogoMarquee />

      {/* ── Brand grid ───────────────────────────────────────────────── */}
      <section className="vc-series" aria-label="Marka listesi">
        <div className="vc-series-inner">
          <ul className="mk-grid" role="list">
            {MARKALAR.map((m) => (
              <li key={m.slug} className="mk-item">
                <Link href={m.href} className="mk-card" style={{ ['--mk-accent' as string]: m.accent }}>
                  <span className="mk-card-rule" aria-hidden="true" />
                  <span className="mk-card-kategori">{m.kategori}</span>
                  <span className="mk-card-name">{m.name}</span>
                  <span className="mk-card-desc">{m.description}</span>
                  <span className="mk-card-foot">
                    {m.ozet && <span className="mk-card-ozet">{m.ozet}</span>}
                    <span className="mk-card-cta" aria-hidden="true">Ürünleri Gör →</span>
                  </span>
                </Link>
                {m.site && (
                  <a
                    href={m.site}
                    className="mk-card-site"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Üretici sitesi ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="vt-cta-strip" aria-label="İletişim">
        <div className="vt-cta-strip-inner">
          <p className="vt-cta-strip-text">
            Aradığınız markayı bulamadınız mı? Bizimle iletişime geçin.
          </p>
          <Link href="/iletisim" className="vt-cta-btn">İletişim</Link>
          <Link href="/ornek-iste" className="vt-cta-btn vt-cta-btn--ghost">Örnek İste</Link>
        </div>
      </section>
    </main>
  )
}
