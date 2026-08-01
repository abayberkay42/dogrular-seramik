import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BANYO_MOBILYALARI } from '@/lib/banyo-mobilya-data'
import { AnimatedHeroBg } from '@/components/hero/AnimatedHeroBg'
import { BASE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Banyo Mobilyaları — Lavabo Dolabı',
  description:
    'Lavabo dolapları, boy dolapları ve aynalı üst modüllerden oluşan banyo mobilyası çözümleri. Hatay Antakya showroomumuzda inceleyebilirsiniz.',
  alternates: { canonical: `${BASE_URL}/banyo-mobilyalari` },
  openGraph: {
    title: 'Banyo Mobilyaları | Doğrular Seramik',
    description: 'Banyo mobilyası çözümleri — lavabo dolapları, boy dolapları, aynalı modüller.',
    url: `${BASE_URL}/banyo-mobilyalari`,
  },
}

export default function BanyoMobilyalariPage() {
  return (
    <main className="vc-page">
      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav className="vc-breadcrumb" aria-label="Sayfa yolu">
        <Link href="/vitrifiye" className="vc-breadcrumb-link">Ürünler</Link>
        <span className="vc-breadcrumb-sep" aria-hidden="true">/</span>
        <span className="vc-breadcrumb-current">Banyo Mobilyaları</span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="vc-hero vc-hero--bg" aria-labelledby="bm-hero-title">
        <AnimatedHeroBg src="/images/hero/kategori/banyo-mobilyalari.webp" />
        <div className="vc-hero-inner">
          <p className="vc-hero-eyebrow">Doğrular Seramik</p>
          <h1 id="bm-hero-title" className="vc-hero-title">Banyo Mobilyaları</h1>
          <p className="vc-hero-desc">
            Lavabo dolapları, boy dolapları ve aynalı üst modüllerle banyonuzu
            bütünleyen mobilya çözümleri.
          </p>
          <p className="vc-hero-count">{BANYO_MOBILYALARI.length} model</p>
        </div>
      </section>

      {/* ── Product grid ─────────────────────────────────────────────── */}
      <section className="vc-series" aria-label="Banyo mobilyası ürünleri">
        <div className="vc-series-inner">
          <ul className="bm-grid" role="list">
            {BANYO_MOBILYALARI.map((u) => (
              <li key={u.slug} className="bm-item">
                <div className="bm-thumb">
                  <Image
                    src={u.img}
                    alt={u.name}
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 50vw, 300px"
                    className="bm-img"
                  />
                </div>
                <div className="bm-body">
                  <h2 className="bm-name">{u.name}</h2>
                  {u.detay && <p className="bm-detay">{u.detay}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="vt-cta-strip" aria-label="İletişim">
        <div className="vt-cta-strip-inner">
          <p className="vt-cta-strip-text">Model ve fiyat bilgisi için bizimle iletişime geçin.</p>
          <Link href="/iletisim" className="vt-cta-btn">İletişim</Link>
          <Link href="/ornek-iste" className="vt-cta-btn vt-cta-btn--ghost">Örnek İste</Link>
        </div>
      </section>
    </main>
  )
}
