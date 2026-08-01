import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { COLLECTIONS, getCollection } from '@/lib/data'
import { BASE_URL } from '@/lib/config'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return COLLECTIONS.map((col) => ({ slug: col.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const col = getCollection(slug)
  if (!col) return {}

  return {
    title: `${col.name} Koleksiyonu`,
    description: col.description,
    alternates: { canonical: `/koleksiyonlar/${slug}` },
    openGraph: {
      title: `${col.name} — Doğrular Seramik`,
      description: col.description,
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Doğrular Seramik',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${col.name} — Doğrular Seramik`,
      description: col.description,
    },
  }
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params
  const col = getCollection(slug)
  if (!col) notFound()


  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: col.name,
    description: col.description,
    brand: {
      '@type': 'Brand',
      name: 'Doğrular Seramik',
    },
    category: col.category,
    image: `${BASE_URL}${col.image}`,
    url: `${BASE_URL}/koleksiyonlar/${slug}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Doğrular Seramik',
      },
    },
  }

  return (
    <main>
      {/* ── Hero image ──────────────────────────────────────────────── */}
      <div className="cd-hero-image">
        <Image
          src={col.image}
          alt={col.alt}
          fill
          unoptimized
          priority
          sizes="100vw"
          className="cd-hero-img"
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <article className="cd-content">
        <div className="cd-shell">
          <header className="cd-head pg-animate-in">
            <p className="cd-label">{col.category}</p>
            <h1 className="cd-heading">{col.name}</h1>
            <p className="cd-description">{col.description}</p>
          </header>

          {/* Specs grid */}
          <div className="cd-specs pg-animate-in pg-animate-in--d1" role="region" aria-label="Teknik özellikler">
            <div>
              <p className="cd-spec-label">Boyutlar</p>
              <ul className="cd-spec-values" aria-label="Mevcut boyutlar">
                {col.dimensions.map((d) => (
                  <li key={d} className="cd-spec-value">{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="cd-spec-label">Yüzey</p>
              <ul className="cd-spec-values" aria-label="Yüzey seçenekleri">
                {col.finish.map((f) => (
                  <li key={f} className="cd-spec-value">{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="cd-spec-label">Özellikler</p>
              <ul className="cd-spec-values" aria-label="Koleksiyon özellikleri">
                {col.features.map((feat) => (
                  <li key={feat} className="cd-spec-value">{feat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* ── Tile Gallery ──────────────────────────────────────────────── */}
      {col.tileImages && col.tileImages.length > 0 && (
        <section className="cd-tile-gallery" aria-label={`${col.name} karo örnekleri`}>
          <div className="cd-shell">
            <header className="cd-gallery-head">
              <p className="cd-label" aria-hidden="true">Katalog Görselleri</p>
              <h2 className="cd-gallery-heading">Karo Örnekleri</h2>
            </header>
            <ul className="cd-tile-grid" role="list" aria-label="Karo görselleri">
              {col.tileImages.map((src, i) => (
                <li key={src} className="cd-tile-item">
                  <Image
                    src={src}
                    alt={`${col.name} — karo örneği ${i + 1}`}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
                    className="cd-tile-img"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Hero images slideshow ──────────────────────────────────────── */}
      {col.heroImages && col.heroImages.length > 1 && (
        <section className="cd-hero-gallery" aria-label={`${col.name} mekan görselleri`}>
          <div className="cd-shell">
            <header className="cd-gallery-head">
              <p className="cd-label" aria-hidden="true">Uygulama Görselleri</p>
              <h2 className="cd-gallery-heading">Mekan Uygulamaları</h2>
            </header>
            <ul className="cd-hero-gallery-grid" role="list">
              {col.heroImages.slice(1).map((src, i) => (
                <li key={src} className="cd-hero-gallery-item">
                  <Image
                    src={src}
                    alt={`${col.name} — mekan uygulaması ${i + 2}`}
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="cd-hero-gallery-img"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="cd-cta-section" aria-label="Örnek talebi">
        <div className="cd-shell">
          <div className="cd-cta-inner">
            <h2 className="cd-cta-heading">
              {col.name} koleksiyonundan örnek almak ister misiniz?
            </h2>
            <div className="cd-cta-actions">
              <Link href="/ornek-iste" className="cd-cta-primary">
                Örnek İste
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/koleksiyonlar" className="cd-cta-secondary">
                Tüm Koleksiyonlar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
    </main>
  )
}
