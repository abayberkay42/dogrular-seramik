import type { Metadata } from 'next'
import Link from 'next/link'
import { ETILI_KATEGORILER } from '@/lib/etili-categories'
import { BASE_URL } from '@/lib/config'
import KoleksiyonGrid from './KoleksiyonGrid'
import { KoleksiyonHero } from './KoleksiyonHero'

const KAT_IMAGES: Record<string, string> = {
  'beyaz-ve-siyah': '/images/koleksiyon/gordion.webp',
  'mermer':         '/images/koleksiyon/hatay.webp',
  'tas':            '/images/koleksiyon/patara.webp',
  'beton':          '/images/koleksiyon/horizon.webp',
  'onyx':           '/images/koleksiyon/onix.webp',
  'dekor':          '/images/koleksiyon/washington.webp',
  'ahsap':          '/images/koleksiyon/mese.webp',
  'havuz':          '/images/koleksiyon/belize.webp',
  'duz-renkler':    '/images/koleksiyon/alaska.webp',
  'tekstil':        '/images/koleksiyon/keten.webp',
}

export const metadata: Metadata = {
  title: 'Seramik Koleksiyonları — Hatay Antakya',
  description:
    'Hatay Antakya’da büyük format porselen seramik koleksiyonları. Mermer, ahşap, beton, taş ve onyx dokularında zemin ve duvar seramiği — Güneysöğüt showroomumuzda.',
  alternates: { canonical: `${BASE_URL}/koleksiyonlar` },
  openGraph: {
    title: 'Seramik Koleksiyonları — Hatay Antakya | Doğrular Seramik',
    description: 'Büyük format porselen seramik koleksiyonlarımızı keşfedin.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Doğrular Seramik',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Koleksiyonlar — Doğrular Seramik',
    description: 'Büyük format porselen seramik koleksiyonlarımızı keşfedin.',
  },
}

export default function KoleksiyonlarPage() {
  const totalSeri    = ETILI_KATEGORILER.reduce((a, k) => a + k.seriler.length, 0)

  const items = ETILI_KATEGORILER.map((k) => ({
    slug:   k.slug,
    isim:   k.isim,
    isimEn: k.isimEn,
    count:  k.seriler.length,
    image:  KAT_IMAGES[k.slug] ?? '/images/koleksiyon/armada.webp',
  }))

  return (
    <main>
      {/* ── Cinematic Hero ────────────────────────────────────────────── */}
      <KoleksiyonHero
        katCount={ETILI_KATEGORILER.length}
        seriCount={totalSeri}
      />

      {/* ── Kategori grid ─────────────────────────────────────────────── */}
      <section className="kol-section" aria-label="Etili Seramik kategorileri">
        <div className="kol-section-shell">

          {/* Section header */}
          <div className="kol-section-head">
            <div className="kol-section-rule" aria-hidden="true" />
            <p className="kol-section-label">Tüm Kategoriler</p>
          </div>

          <KoleksiyonGrid items={items} />

        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────────── */}
      <section className="col-cta-strip" aria-label="Örnek talebi">
        <div className="col-page-shell">
          <div className="col-cta-inner">
            <p className="col-cta-text">
              Mekânınız için doğru koleksiyonu birlikte belirleyelim.
            </p>
            <Link href="/ornek-iste" className="col-cta-btn">
              Örnek İste
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
