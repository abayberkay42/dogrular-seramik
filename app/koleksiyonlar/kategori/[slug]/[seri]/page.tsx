import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ETILI_KATEGORILER } from '@/lib/etili-categories'
import { BASE_URL } from '@/lib/config'

interface Props {
  params: Promise<{ slug: string; seri: string }>
}

function seriSlug(isim: string): string {
  return isim
    .toLowerCase()
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function generateStaticParams() {
  const params: { slug: string; seri: string }[] = []
  for (const kat of ETILI_KATEGORILER) {
    for (const s of kat.seriler) {
      params.push({ slug: kat.slug, seri: seriSlug(s.isim) })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, seri } = await params
  const kat = ETILI_KATEGORILER.find((k) => k.slug === slug)
  if (!kat) return {}
  const s = kat.seriler.find((s) => seriSlug(s.isim) === seri)
  if (!s) return {}
  return {
    title: `${s.isim} Serisi — ${kat.isim} Koleksiyonu`,
    description: `${s.isim} serisinin tüm renk ve boyut seçenekleri. ${kat.isim} koleksiyonu.`,
    alternates: {
      canonical: `${BASE_URL}/koleksiyonlar/kategori/${slug}/${seri}`,
    },
  }
}

export default async function SeriPage({ params }: Props) {
  const { slug, seri } = await params
  const kat = ETILI_KATEGORILER.find((k) => k.slug === slug)
  if (!kat) notFound()

  const s = kat.seriler.find((s) => seriSlug(s.isim) === seri)
  if (!s) notFound()

  return (
    <main className="seri-page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="seri-hero">
        <div className="seri-shell">
          <nav className="seri-breadcrumb">
            <Link href="/koleksiyonlar">Koleksiyonlar</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/koleksiyonlar/kategori/${slug}`}>{kat.isim}</Link>
            <span aria-hidden="true">›</span>
            <span>{s.isim}</span>
          </nav>

          <div className="seri-hero-inner">
            {s.image && (
              <div className="seri-hero-img-wrap" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.isim} className="seri-hero-img" />
              </div>
            )}
            <div className="seri-hero-text">
              <p className="seri-eyebrow">Etili Seramik · {kat.isimEn}</p>
              <h1 className="seri-title">{s.isim}</h1>
              {s.kalinlik && (
                <div className="seri-kalinlik-badge">{s.kalinlik}</div>
              )}
              <div className="seri-meta">
                <div className="seri-meta-item">
                  <div className="seri-meta-num">{s.boyutlar.length}</div>
                  <div className="seri-meta-label">Varyant</div>
                </div>
                <div className="seri-meta-sep" />
                <div className="seri-meta-item">
                  <div className="seri-meta-num">
                    {[...new Set(s.boyutlar.map((v) => v.boyut))].length}
                  </div>
                  <div className="seri-meta-label">Format</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark → Light */}
      <div className="section-transition-divider" aria-hidden="true" />

      {/* ── Varyant grid ─────────────────────────────────────────────── */}
      <section className="seri-varyantlar">
        <div className="seri-shell">
          <div className="seri-varyant-grid">
            {s.boyutlar.map((v, i) => (
              <div key={i} className="seri-varyant-card">
                <div className="seri-varyant-img-wrap">
                  {v.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={v.image}
                      alt={`${s.isim} ${v.renk} ${v.boyut}`}
                      className="seri-varyant-img"
                    />
                  ) : s.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={s.image}
                      alt={`${s.isim} ${v.renk}`}
                      className="seri-varyant-img"
                    />
                  ) : (
                    <div className="seri-varyant-img-placeholder" aria-hidden="true" />
                  )}
                </div>
                <div className="seri-varyant-info">
                  <p className="seri-varyant-renk">{v.renk}</p>
                  <p className="seri-varyant-boyut">{v.boyut}</p>
                  {v.sayfa && (
                    <p className="seri-varyant-sayfa">Katalog s.{v.sayfa}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="kat-cta">
        <div className="kat-shell">
          <p className="kat-cta-text">
            {s.isim} serisi hakkında bilgi almak için bizimle iletişime geçin.
          </p>
          <div className="kat-cta-btns">
            <Link href="/ornek-iste" className="kat-cta-btn">Örnek İste</Link>
            <Link
              href={`/koleksiyonlar/kategori/${slug}`}
              className="kat-cta-btn kat-cta-btn--ghost"
            >
              ← {kat.isim} Koleksiyonu
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
