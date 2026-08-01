import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { VITRIFIYE_CATEGORIES, VITRIFIYE_SERIES } from '@/lib/vitrifiye-data'
import { BASE_URL } from '@/lib/config'
import { CategoryArcCarousel, type ArcCategory } from '@/components/vitrifiye/CategoryArcCarousel'
import { AnimatedHeroBg } from '@/components/hero/AnimatedHeroBg'

const CATEGORY_ARC_IMAGES: Record<string, string> = {
  'etajerli-lavabolar':      '/images/vitrifiye/categories/etajerli-lavabolar.webp',
  'tezgahustu-lavabolar':    '/images/vitrifiye/categories/tezgahustu-lavabolar.webp',
  'tezgah-alti-lavabolar':   '/images/vitrifiye/categories/tezgah-alti-lavabolar.webp',
  'klozet-takimlari':        '/images/vitrifiye/categories/klozet-takimlari.webp',
  'araturler':               '/images/vitrifiye/categories/araturler.webp',
  'dus-sistemleri':          '/images/vitrifiye/categories/dus-sistemleri.webp',
  'tamamlayici':             '/images/vitrifiye/categories/tamamlayici.webp',
}

export const metadata: Metadata = {
  title: 'Vitrifiye — Lavabo, Klozet, Armatür',
  description:
    'Hatay Antakya’da Turkuaz Seramik · CeraStyle vitrifiye ürünleri: lavabo, klozet takımı, armatür ve duş sistemleri. Rimless klozet ve Clean Active antibakteriyel seçenekler.',
  alternates: { canonical: `${BASE_URL}/vitrifiye` },
  openGraph: {
    title: 'Vitrifiye — Lavabo, Klozet, Armatür | Doğrular Seramik',
    description: 'Turkuaz Seramik / CeraStyle — lavabo, klozet, armatür ve duş sistemi ürün kataloğu.',
    url: `${BASE_URL}/vitrifiye`,
  },
}

const CATEGORY_ORDER = [
  'etajerli-lavabolar',
  'tezgahustu-lavabolar',
  'tezgah-alti-lavabolar',
  'klozet-takimlari',
  'araturler',
  'dus-sistemleri',
  'tamamlayici',
] as const

export default function VitrifiyePage() {
  return (
    <main className="vt-page">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="vt-hero" aria-label="Vitrifiye ürünleri">
        <AnimatedHeroBg src="/images/vitrifiye-bg.webp" />
        <div className="vt-hero-inner">
          <p className="vt-hero-eyebrow">Turkuaz Seramik · CeraStyle</p>
          <h1 className="vt-hero-title">
            Vitrifiye
            <br />
            Ürünleri
          </h1>
          <p className="vt-hero-desc">
            Lavabo, klozet, armatür ve duş sistemlerinde antibakteriyel Clean Active
            teknolojisi ve ödüllü tasarımlarla — 13 renk seçeneğine kadar.
          </p>
          <div className="vt-hero-badges">
            <span className="vt-badge">Clean Active Antibakteriyel</span>
            <span className="vt-badge">13 Renk Seçeneği</span>
            <span className="vt-badge">Ödüllü Tasarım</span>
          </div>
        </div>
      </section>

      {/* ── Categories arc carousel ──────────────────────────────────── */}
      <section className="vt-cats" aria-label="Ürün kategorileri">
        <div className="vt-cats-inner">
          <h2 className="vt-section-title">Ürün Kategorileri</h2>
          <CategoryArcCarousel
            categories={VITRIFIYE_CATEGORIES.map((cat): ArcCategory => ({
              slug: cat.slug,
              label: cat.label,
              description: cat.description,
              count: VITRIFIYE_SERIES.filter((s) => s.category === cat.slug).length,
              image: CATEGORY_ARC_IMAGES[cat.slug],
            }))}
          />
        </div>
      </section>

      {/* ── Product photo gallery ─────────────────────────────────────── */}
      <section className="vt-katalog" aria-label="CeraStyle ürün fotoğrafları">
        <div className="vt-katalog-inner">
          <header className="vt-katalog-head">
            <p className="vt-katalog-eyebrow">Turkuaz Seramik · CeraStyle</p>
            <h2 className="vt-katalog-title">Ürün Galerisi</h2>
            <p className="vt-katalog-desc">
              Lavabo, klozet, armatür ve duş sistemi koleksiyonlarından seçme ürün fotoğrafları.
            </p>
          </header>
          <div className="vt-katalog-grid">
            {Array.from({ length: 100 }, (_, i) => {
              const num = String(i + 1).padStart(3, '0')
              return (
                <div key={num} className="vt-katalog-item">
                  <Image
                    src={`/images/vitrifiye/products/product-${num}.webp`}
                    alt={`CeraStyle / Turkuaz Seramik — ürün ${i + 1}`}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
                    className="vt-katalog-img"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Brand info ────────────────────────────────────────────────── */}
      <section className="vt-brand" aria-label="Marka hakkında">
        <div className="vt-brand-inner">
          <div className="vt-brand-col">
            <h2 className="vt-brand-title">Turkuaz Seramik &amp; CeraStyle</h2>
            <p className="vt-brand-text">
              Turkuaz Seramik, antibakteriyel nano teknoloji kaplama ("Clean Active") ile
              seramik sektöründe çığır açmıştır. Gün ışığından üretilen 13,2 MWp kapasiteli
              güneş enerjisiyle desteklenen üretim tesislerinde, iF Design, Good Design,
              A&apos;Design ve Design Turkey ödülleri kazanmış ürünler hayat bulmaktadır.
            </p>
            <ul className="vt-brand-certs">
              <li>ISO 9001 Kalite Yönetim Sistemi</li>
              <li>ISO 14001 Çevre Yönetim Sistemi</li>
              <li>ISO 50001 Enerji Yönetim Sistemi</li>
              <li>Avrupa Akreditasyon Sertifikası</li>
              <li>Türk Akreditasyon Sertifikası</li>
            </ul>
          </div>
          <div className="vt-brand-col vt-brand-col--colors">
            <h3 className="vt-brand-subtitle">CeraStyle Renk Dünyası</h3>
            <p className="vt-brand-text">13 farklı ton ile banyonuza özgün bir karakter katın:</p>
            <div className="vt-colors-grid">
              {[
                'Mat Somon', 'Mat Zümrüt', 'Mat Buz Mavisi', 'Mat Yakut',
                'Mat Çala', 'Mat Amber', 'Mat Su Yeşili',
                'Mat Beyaz', 'Mat Kapuçino', 'Mat Gri', 'Parlak Siyah', 'Beyaz',
              ].map((c) => (
                <span key={c} className="vt-color-chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="vt-cta-strip" aria-label="İletişim">
        <div className="vt-cta-strip-inner">
          <p className="vt-cta-strip-text">
            Fiyat bilgisi ve ürün numunesi için bizimle iletişime geçin.
          </p>
          <Link href="/ornek-iste" className="vt-cta-btn">
            Örnek İste
          </Link>
          <Link href="/iletisim" className="vt-cta-btn vt-cta-btn--ghost">
            İletişim
          </Link>
        </div>
      </section>
    </main>
  )
}
