import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  VITRIFIYE_CATEGORIES,
  VITRIFIYE_SERIES,
  getVitrifiyeByCategory,
  getVitrifiyeCategory,
  type VitrifiyeCategory,
} from '@/lib/vitrifiye-data'
import { AnimatedHeroBg } from '@/components/hero/AnimatedHeroBg'
import { BASE_URL } from '@/lib/config'

type Params = { category: string }

export async function generateStaticParams(): Promise<Params[]> {
  return VITRIFIYE_CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params
  const cat = getVitrifiyeCategory(category as VitrifiyeCategory)
  if (!cat) return {}
  return {
    title: `${cat.label} — Vitrifiye`,
    description: cat.description,
    alternates: { canonical: `${BASE_URL}/vitrifiye/${category}` },
    openGraph: {
      title: `${cat.label} | Doğrular Seramik`,
      description: cat.description,
      url: `${BASE_URL}/vitrifiye/${category}`,
    },
  }
}

export default async function VitrifiyeCategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params
  const cat = getVitrifiyeCategory(category as VitrifiyeCategory)
  if (!cat) notFound()

  const series = getVitrifiyeByCategory(category as VitrifiyeCategory)

  return (
    <main className="vc-page">
      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav className="vc-breadcrumb" aria-label="Sayfa yolu">
        <Link href="/vitrifiye" className="vc-breadcrumb-link">Vitrifiye</Link>
        <span className="vc-breadcrumb-sep" aria-hidden="true">/</span>
        <span className="vc-breadcrumb-current">{cat.label}</span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="vc-hero vc-hero--bg" aria-labelledby="vc-hero-title">
        <AnimatedHeroBg src={`/images/hero/kategori/${category}.webp`} />
        <div className="vc-hero-inner">
          <p className="vc-hero-eyebrow">Turkuaz Seramik · CeraStyle</p>
          <h1 id="vc-hero-title" className="vc-hero-title">{cat.label}</h1>
          <p className="vc-hero-desc">{cat.description}</p>
          <p className="vc-hero-count">{series.length} seri · {series.reduce((a, s) => a + s.variants.length, 0)} model</p>
        </div>
      </section>

      {/* ── Series list ──────────────────────────────────────────────── */}
      <section className="vc-series" aria-label="Seri listesi">
        <div className="vc-series-inner">
          {series.map((s) => (
            <article key={s.slug} className="vc-series-item" id={s.slug}>
              <div className="vc-series-layout">

                {/* Sol: başlık + tablo */}
                <div className="vc-series-left">
                  <div className="vc-series-header">
                    <div className="vc-series-tags">
                      {s.isNew && <span className="vt-tag vt-tag--new">Yeni</span>}
                      {s.hasAwardDesign && <span className="vt-tag vt-tag--award">Ödüllü Tasarım</span>}
                      {s.hasCleanActive && <span className="vt-tag vt-tag--clean">Clean Active</span>}
                    </div>
                    <h2 className="vc-series-name">{s.name}</h2>
                    <p className="vc-series-desc">{s.description}</p>
                    {s.colors.length > 1 && (
                      <div className="vc-series-colors">
                        <span className="vc-series-colors-label">Renk seçenekleri:</span>
                        {s.colors.map((c) => (
                          <span key={c} className="vc-color-chip">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="vc-variants">
                    <table className="vc-table" role="table" aria-label={`${s.name} modelleri`}>
                      <thead>
                        <tr>
                          <th scope="col">Model</th>
                          <th scope="col">Boyut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.variants.map((v, i) => (
                          <tr key={`${s.slug}-v-${i}`}>
                            <td>{v.name}</td>
                            <td className="vc-td-dim">{v.dimensions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sağ: seri görseli */}
                <div className="vc-series-img-wrap" aria-label={`${s.name} görseli`}>
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      unoptimized
                      sizes="(max-width: 767px) 100vw, 300px"
                      className="vc-series-img"
                    />
                  ) : (
                    <div className="vc-series-img-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                      <span className="vc-series-img-label">Görsel eklenecek</span>
                    </div>
                  )}
                </div>

              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Other categories ─────────────────────────────────────────── */}
      <nav className="vc-other-cats" aria-label="Diğer kategoriler">
        <div className="vc-other-cats-inner">
          <h3 className="vc-other-cats-title">Diğer Kategoriler</h3>
          <div className="vc-other-cats-grid">
            {VITRIFIYE_CATEGORIES.filter((c) => c.slug !== category).map((c) => (
              <Link key={c.slug} href={`/vitrifiye/${c.slug}`} className="vc-other-cat-link">
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="vt-cta-strip" aria-label="İletişim">
        <div className="vt-cta-strip-inner">
          <p className="vt-cta-strip-text">Numune ve fiyat teklifi için bizimle iletişime geçin.</p>
          <Link href="/ornek-iste" className="vt-cta-btn">Örnek İste</Link>
          <Link href="/iletisim" className="vt-cta-btn vt-cta-btn--ghost">İletişim</Link>
        </div>
      </section>
    </main>
  )
}
