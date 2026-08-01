import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import {
  BLOG_YAZILARI,
  getYazi,
  tarihFormatla,
  type Blok,
} from '@/lib/blog-data'
import { BASE_URL } from '@/lib/config'

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return BLOG_YAZILARI.map((y) => ({ slug: y.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const yazi = getYazi(slug)
  if (!yazi) return {}
  const url = `${BASE_URL}/blog/${yazi.slug}`
  const gorsel = yazi.kapak ? `${BASE_URL}${yazi.kapak}` : undefined
  return {
    title: yazi.seoBaslik,
    description: yazi.aciklama,
    keywords: yazi.etiketler,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: yazi.baslik,
      description: yazi.aciklama,
      url,
      publishedTime: yazi.tarih,
      tags: yazi.etiketler,
      ...(gorsel ? { images: [{ url: gorsel, alt: yazi.baslik }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: yazi.baslik,
      description: yazi.aciklama,
      ...(gorsel ? { images: [gorsel] } : {}),
    },
  }
}

/** `[metin](/yol)` biçimindeki iç linkleri gerçek bağlantıya çevirir. */
function metniIsle(metin: string): ReactNode[] {
  const parcalar: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let son = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(metin)) !== null) {
    if (m.index > son) parcalar.push(metin.slice(son, m.index))
    parcalar.push(
      <Link key={`l-${i++}`} href={m[2]} className="post-link">
        {m[1]}
      </Link>,
    )
    son = m.index + m[0].length
  }
  if (son < metin.length) parcalar.push(metin.slice(son))
  return parcalar
}

function BlokRender({ blok, index }: { blok: Blok; index: number }) {
  switch (blok.tip) {
    case 'h2':
      return <h2 className="post-h2">{blok.metin}</h2>
    case 'h3':
      return <h3 className="post-h3">{blok.metin}</h3>
    case 'p':
      return <p className="post-p">{metniIsle(blok.metin)}</p>
    case 'liste':
      return (
        <ul className="post-list">
          {blok.ogeler.map((o, i) => (
            <li key={`${index}-${i}`}>{metniIsle(o)}</li>
          ))}
        </ul>
      )
    case 'not':
      return <aside className="post-not">{metniIsle(blok.metin)}</aside>
    case 'tablo':
      return (
        <div className="post-tablo-wrap">
          <table className="post-tablo">
            <thead>
              <tr>
                {blok.basliklar.map((b) => (
                  <th key={b} scope="col">{b}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blok.satirlar.map((satir, si) => (
                <tr key={`${index}-${si}`}>
                  {satir.map((h, hi) => (
                    <td key={hi}>{h}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export default async function BlogYaziPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const yazi = getYazi(slug)
  if (!yazi) notFound()

  const url = `${BASE_URL}/blog/${yazi.slug}`

  const digerleri = BLOG_YAZILARI.filter((y) => y.slug !== yazi.slug).slice(0, 3)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: yazi.baslik,
    description: yazi.aciklama,
    datePublished: yazi.tarih,
    dateModified: yazi.tarih,
    inLanguage: 'tr-TR',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(yazi.kapak ? { image: [`${BASE_URL}${yazi.kapak}`] } : {}),
    author: { '@type': 'Organization', name: 'Doğrular Seramik', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Doğrular Seramik',
      url: BASE_URL,
    },
    keywords: yazi.etiketler.join(', '),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: yazi.baslik, item: url },
    ],
  }

  const faqLd = yazi.sss?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: yazi.sss.map((s) => ({
          '@type': 'Question',
          name: s.soru,
          acceptedAnswer: { '@type': 'Answer', text: s.cevap },
        })),
      }
    : null

  return (
    <main className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav className="vc-breadcrumb" aria-label="Sayfa yolu">
        <Link href="/blog" className="vc-breadcrumb-link">Blog</Link>
        <span className="vc-breadcrumb-sep" aria-hidden="true">/</span>
        <span className="vc-breadcrumb-current">{yazi.kategori}</span>
      </nav>

      {/* ── Article ──────────────────────────────────────────────────── */}
      <article className="post">
        <header className="post-head">
          <p className="post-meta">
            <span className="post-kategori">{yazi.kategori}</span>
            <time dateTime={yazi.tarih}>{tarihFormatla(yazi.tarih)}</time>
            <span>{yazi.okuma} dk okuma</span>
          </p>
          <h1 className="post-baslik">{yazi.baslik}</h1>
          <p className="post-ozet">{yazi.ozet}</p>
        </header>

        {yazi.kapak && (
          <figure className="post-kapak">
            <Image
              src={yazi.kapak}
              alt={yazi.baslik}
              fill
              priority
              unoptimized
              sizes="(max-width: 800px) 100vw, 760px"
              className="post-kapak-img"
            />
          </figure>
        )}

        <div className="post-govde">
          {yazi.icerik.map((blok, i) => (
            <BlokRender key={i} blok={blok} index={i} />
          ))}
        </div>

        {yazi.sss && yazi.sss.length > 0 && (
          <section className="post-sss" aria-labelledby="sss-baslik">
            <h2 id="sss-baslik" className="post-h2">Sıkça Sorulan Sorular</h2>
            {yazi.sss.map((s) => (
              <div key={s.soru} className="post-sss-item">
                <h3 className="post-sss-soru">{s.soru}</h3>
                <p className="post-sss-cevap">{s.cevap}</p>
              </div>
            ))}
          </section>
        )}

        <footer className="post-etiketler" aria-label="Etiketler">
          {yazi.etiketler.map((e) => (
            <span key={e} className="post-etiket">{e}</span>
          ))}
        </footer>
      </article>

      {/* ── Related ──────────────────────────────────────────────────── */}
      {digerleri.length > 0 && (
        <section className="post-diger" aria-label="Diğer yazılar">
          <div className="post-diger-inner">
            <h2 className="post-diger-baslik">Diğer Yazılar</h2>
            <ul className="blog-grid" role="list">
              {digerleri.map((y) => (
                <li key={y.slug} className="blog-item">
                  <Link href={`/blog/${y.slug}`} className="blog-card-link">
                    <article className="blog-card">
                      <div className="blog-body">
                        <p className="blog-meta">
                          <span className="blog-kategori">{y.kategori}</span>
                          <span className="blog-okuma">{y.okuma} dk</span>
                        </p>
                        <h3 className="blog-baslik">{y.baslik}</h3>
                        <p className="blog-ozet">{y.ozet}</p>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="vt-cta-strip" aria-label="İletişim">
        <div className="vt-cta-strip-inner">
          <p className="vt-cta-strip-text">
            Projeniz için ürün seçiminde destek almak ister misiniz?
          </p>
          <Link href="/iletisim" className="vt-cta-btn">İletişim</Link>
          <Link href="/ornek-iste" className="vt-cta-btn vt-cta-btn--ghost">Örnek İste</Link>
        </div>
      </section>
    </main>
  )
}
