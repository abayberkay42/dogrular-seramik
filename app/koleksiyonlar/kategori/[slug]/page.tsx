import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedHeroBg } from '@/components/hero/AnimatedHeroBg'
import { notFound } from 'next/navigation'
import { ETILI_KATEGORILER } from '@/lib/etili-categories'
import { BASE_URL } from '@/lib/config'

function seriSlug(isim: string): string {
  return isim
    .toLowerCase()
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ETILI_KATEGORILER.map((k) => ({ slug: k.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const kat = ETILI_KATEGORILER.find((k) => k.slug === slug)
  if (!kat) return {}
  return {
    title: `${kat.isim} Koleksiyonu — Etili Seramik`,
    description: kat.aciklama,
    alternates: { canonical: `${BASE_URL}/koleksiyonlar/kategori/${slug}` },
  }
}

const HERO_BACKGROUNDS: Record<string, string> = {
  'beyaz-ve-siyah': '/images/beyaz-ve-siyah-bg.webp',
  'mermer':         '/images/mermer-bg.webp',
  'tas':            '/images/tas-bg.webp',
  'beton':          '/images/beton-bg.webp',
  'onyx':           '/images/onyx-bg.webp',
  'dekor':          '/images/dekor-bg.webp',
  'ahsap':          '/images/ahsap-bg.webp',
  'duz-renkler':    '/images/duz-renkler-bg.webp',
  'tekstil':        '/images/tekstil-bg.webp',
  'havuz':          '/images/havuz-bg.webp',
}

export default async function KategoriPage({ params }: Props) {
  const { slug } = await params
  const kat = ETILI_KATEGORILER.find((k) => k.slug === slug)
  if (!kat) notFound()

  const heroBg = HERO_BACKGROUNDS[slug]

  return (
    <main className="kat-page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="kat-hero">
        {heroBg && <AnimatedHeroBg src={heroBg} />}
        <div className="kat-shell">
          <Link href="/koleksiyonlar" className="kat-back">
            ← Koleksiyonlar
          </Link>
          <p className="kat-eyebrow">Etili Seramik · {kat.isimEn}</p>
          <h1 className="kat-title">{kat.isim}</h1>
          <p className="kat-desc">{kat.aciklama}</p>
          <div className="kat-stats">
            <span className="kat-stat">
              <span className="kat-stat-num">{kat.seriler.length}</span>
              <span className="kat-stat-label">Seri</span>
            </span>
            <span className="kat-stat-sep" />
            <span className="kat-stat">
              <span className="kat-stat-num">
                {kat.seriler.reduce((a, s) => a + s.boyutlar.length, 0)}
              </span>
              <span className="kat-stat-label">Varyant</span>
            </span>
          </div>
        </div>
      </section>

      {/* Dark → Light */}
      <div className="section-transition-divider" aria-hidden="true" />

      {/* ── Series grid ──────────────────────────────────────────────── */}
      <section className="kat-seriler">
        <div className="kat-shell">
          {kat.seriler.map((seri) => {
            const href = `/koleksiyonlar/kategori/${slug}/${seriSlug(seri.isim)}`
            return (
              <Link
                key={seri.isim + (seri.kalinlik ?? '')}
                href={href}
                className="kat-seri-card kat-seri-link"
              >
                {/* Üst: seri görseli */}
                {seri.image && (
                  <div className="kat-seri-img-wrap" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={seri.image}
                      alt={`${seri.isim} seramik görseli`}
                      className="kat-seri-img"
                    />
                  </div>
                )}

                {/* Alt: başlık + varyant listesi */}
                <div className="kat-seri-content">
                  <div className="kat-seri-head">
                    <h2 className="kat-seri-name">{seri.isim}</h2>
                    {seri.kalinlik && (
                      <span className="kat-seri-kalinlik">{seri.kalinlik}</span>
                    )}
                  </div>
                  <ul className="kat-boyutlar" role="list">
                    {seri.boyutlar.map((v, i) => (
                      <li key={i} className="kat-boyut-row">
                        <span className="kat-boyut-size">{v.boyut}</span>
                        <span className="kat-boyut-renk">{v.renk}</span>
                        {v.sayfa && (
                          <span className="kat-boyut-sayfa">Sayfa {v.sayfa}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="kat-cta">
        <div className="kat-shell">
          <p className="kat-cta-text">
            {kat.isim} koleksiyonu hakkında bilgi almak için bizimle iletişime geçin.
          </p>
          <div className="kat-cta-btns">
            <Link href="/ornek-iste" className="kat-cta-btn">Örnek İste</Link>
            <Link href="/koleksiyonlar" className="kat-cta-btn kat-cta-btn--ghost">
              Diğer Koleksiyonlar
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
