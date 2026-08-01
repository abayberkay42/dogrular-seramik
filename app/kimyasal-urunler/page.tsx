import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  KIMYASAL_MARKALAR,
  kimyasalUrunSayisi,
  kimyasalToplamUrun,
} from '@/lib/kimyasal-data'
import { AnimatedHeroBg } from '@/components/hero/AnimatedHeroBg'
import { BASE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Yapı Kimyasalları — KYK ve Matkim',
  description:
    'Kütahya Yapı Kimyasalları (KYK) ve Matkim yapı kimyasalları ürün listesi — yapıştırıcılar, derz dolgular, su yalıtım, tamir harçları, sıvalar, astarlar ve yardımcı malzemeler.',
  alternates: { canonical: `${BASE_URL}/kimyasal-urunler` },
  openGraph: {
    title: 'Kimyasal Ürünler | Doğrular Seramik',
    description: 'KYK ve Matkim yapı kimyasalları ürün kataloğu.',
    url: `${BASE_URL}/kimyasal-urunler`,
  },
}

export default function KimyasalUrunlerPage() {
  const toplam = kimyasalToplamUrun()

  return (
    <main className="vc-page">
      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav className="vc-breadcrumb" aria-label="Sayfa yolu">
        <Link href="/vitrifiye" className="vc-breadcrumb-link">Ürünler</Link>
        <span className="vc-breadcrumb-sep" aria-hidden="true">/</span>
        <span className="vc-breadcrumb-current">Kimyasal Ürünler</span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="vc-hero vc-hero--bg" aria-labelledby="km-hero-title">
        <AnimatedHeroBg src="/images/hero/kategori/kimyasal-urunler.webp" />
        <div className="vc-hero-inner">
          <p className="vc-hero-eyebrow">Yapı Kimyasalları</p>
          <h1 id="km-hero-title" className="vc-hero-title">Kimyasal Ürünler</h1>
          <p className="vc-hero-desc">
            Yapıştırıcı, derz dolgu, su yalıtım, tamir harcı, sıva ve astar
            gruplarında yapı kimyasalları çözümleri.
          </p>
          <p className="vc-hero-count">
            {KIMYASAL_MARKALAR.length} marka · {toplam} ürün
          </p>
        </div>
      </section>

      {/* ── Brands ───────────────────────────────────────────────────── */}
      <section className="vc-series" aria-label="Yapı kimyasalları markaları">
        <div className="vc-series-inner">
          {KIMYASAL_MARKALAR.map((marka) => (
            <article key={marka.slug} className="km-brand" id={marka.slug}>
              <header className="km-brand-head">
                <h2 className="km-brand-name">{marka.name}</h2>
                <p className="km-brand-desc">{marka.description}</p>
                <p className="km-brand-count">
                  {marka.kategoriler.length} grup · {kimyasalUrunSayisi(marka)} ürün
                </p>
              </header>

              {marka.kategoriler.map((kat) => (
                <div key={kat.slug} className="km-cat">
                  <h3 className="km-cat-name">
                    {kat.label} <span aria-hidden="true">· {kat.urunler.length}</span>
                  </h3>
                  <ul className="km-grid" role="list">
                    {kat.urunler.map((u) => {
                      const body = (
                        <>
                          <span className="km-item-thumb">
                            {u.img ? (
                              <Image
                                src={u.img}
                                alt={u.name}
                                fill
                                unoptimized
                                sizes="(max-width: 767px) 45vw, 200px"
                                className="km-item-img"
                              />
                            ) : null}
                          </span>
                          <span className="km-item-name">{u.name}</span>
                        </>
                      )
                      return (
                        <li key={`${kat.slug}-${u.name}`} className="km-item">
                          {u.url ? (
                            <a
                              href={u.url}
                              className="km-item-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${u.name} — üretici sayfasında aç (yeni sekme)`}
                            >
                              {body}
                            </a>
                          ) : (
                            body
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="vt-cta-strip" aria-label="İletişim">
        <div className="vt-cta-strip-inner">
          <p className="vt-cta-strip-text">
            Ürün seçimi, teknik detay ve fiyat teklifi için bizimle iletişime geçin.
          </p>
          <Link href="/iletisim" className="vt-cta-btn">İletişim</Link>
          <Link href="/ornek-iste" className="vt-cta-btn vt-cta-btn--ghost">Örnek İste</Link>
        </div>
      </section>
    </main>
  )
}
