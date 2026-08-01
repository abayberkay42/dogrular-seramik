import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_YAZILARI, tarihFormatla } from '@/lib/blog-data'
import { BASE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Blog — Seramik ve Banyo Rehberi',
  description:
    'Seramik seçimi, uygulama teknikleri, banyo tasarımı ve yapı kimyasalları üzerine rehber yazılar — Doğrular Seramik blog.',
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: 'Blog — Seramik ve Banyo Rehberi | Doğrular Seramik',
    description: 'Seramik ve banyo üzerine rehber yazılar.',
    url: `${BASE_URL}/blog`,
  },
}

export default function BlogPage() {
  const yazilar = [...BLOG_YAZILARI].sort((a, b) => b.tarih.localeCompare(a.tarih))

  return (
    <main className="blog-page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mk-hero" aria-labelledby="blog-hero-title">
        <div className="vc-hero-inner">
          <p className="vc-hero-eyebrow">Doğrular Seramik</p>
          <h1 id="blog-hero-title" className="vc-hero-title">Blog</h1>
          <p className="vc-hero-desc">
            Seramik seçimi, uygulama teknikleri, banyo tasarımı ve yapı
            kimyasalları üzerine rehber yazılar.
          </p>
          {yazilar.length > 0 && (
            <p className="vc-hero-count">{yazilar.length} yazı</p>
          )}
        </div>
      </section>

      {/* ── Posts ────────────────────────────────────────────────────── */}
      <section className="vc-series" aria-label="Blog yazıları">
        <div className="vc-series-inner">
          {yazilar.length === 0 ? (
            <div className="km-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16v16H4z" />
                <path d="M8 9h8M8 13h8M8 17h5" />
              </svg>
              <p className="km-empty-title">İlk yazılar hazırlanıyor</p>
              <p className="km-empty-text">
                Seramik seçimi, uygulama ve bakım üzerine rehber içeriklerimiz
                kısa süre içinde burada yayınlanacak.
              </p>
            </div>
          ) : (
            <ul className="blog-grid" role="list">
              {yazilar.map((y) => (
                <li key={y.slug} className="blog-item">
                  <Link href={`/blog/${y.slug}`} className="blog-card-link">
                    <article className="blog-card">
                      <div className="blog-thumb">
                        {y.kapak ? (
                          <Image
                            src={y.kapak}
                            alt={y.baslik}
                            fill
                            unoptimized
                            sizes="(max-width: 767px) 100vw, 360px"
                            className="blog-img"
                          />
                        ) : (
                          <span className="blog-thumb-fallback" aria-hidden="true">
                            {y.kategori}
                          </span>
                        )}
                      </div>
                      <div className="blog-body">
                        <p className="blog-meta">
                          <span className="blog-kategori">{y.kategori}</span>
                          <span className="blog-tarih">{tarihFormatla(y.tarih)}</span>
                          {y.okuma && <span className="blog-okuma">{y.okuma} dk okuma</span>}
                        </p>
                        <h2 className="blog-baslik">{y.baslik}</h2>
                        <p className="blog-ozet">{y.ozet}</p>
                        <span className="blog-devam" aria-hidden="true">Yazıyı Oku →</span>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="vt-cta-strip" aria-label="İletişim">
        <div className="vt-cta-strip-inner">
          <p className="vt-cta-strip-text">
            Projeniz için görüş almak ister misiniz?
          </p>
          <Link href="/iletisim" className="vt-cta-btn">İletişim</Link>
          <Link href="/ornek-iste" className="vt-cta-btn vt-cta-btn--ghost">Örnek İste</Link>
        </div>
      </section>
    </main>
  )
}
