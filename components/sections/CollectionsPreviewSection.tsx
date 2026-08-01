'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import type { Easing, Transition } from 'motion/react'
import { useCallback, useRef } from 'react'
import { ETILI_KATEGORILER } from '@/lib/etili-categories'

const EASE_MATERIAL: Easing = [0.25, 0.46, 0.45, 0.94]

function t(duration: number, ease: Easing, delay?: number): Transition {
  return delay !== undefined ? { duration, ease, delay } : { duration, ease }
}

const VIEWPORT = { once: true, amount: 0.08 } as const

const KAT_IMAGES: Record<string, string> = {
  'mermer':         '/images/koleksiyon/hatay.webp',
  'beyaz-ve-siyah': '/images/koleksiyon/gordion.webp',
  'beton':          '/images/koleksiyon/horizon.webp',
  'tas':            '/images/koleksiyon/patara.webp',
  'onyx':           '/images/koleksiyon/onix.webp',
  'ahsap':          '/images/koleksiyon/mese.webp',
}

const FEATURED_SLUGS = ['mermer', 'beton', 'beyaz-ve-siyah', 'tas', 'onyx', 'ahsap'] as const
const TILE_CLASSES    = ['ctile-a', 'ctile-b', 'ctile-c', 'ctile-d', 'ctile-e', 'ctile-f'] as const

export function CollectionsPreviewSection() {
  const prefersReduced = useReducedMotion() ?? false
  const rafRef = useRef<number | null>(null)

  const featured = FEATURED_SLUGS
    .map((slug) => ETILI_KATEGORILER.find((k) => k.slug === slug))
    .filter(Boolean) as typeof ETILI_KATEGORILER

  const totalSeri = ETILI_KATEGORILER.reduce((acc, k) => acc + k.seriler.length, 0)

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transition = 'box-shadow 350ms cubic-bezier(0.23,1,0.32,1)'
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card   = e.currentTarget
    const { clientX, clientY } = e
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width  - 0.5
      const y = (clientY - rect.top)  / rect.height - 0.5
      card.style.transform =
        `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-8px) scale(1.01)`
      rafRef.current = null
    })
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    const card = e.currentTarget
    card.style.transition =
      'transform 750ms cubic-bezier(0.23,1,0.32,1), box-shadow 600ms cubic-bezier(0.23,1,0.32,1)'
    card.style.transform = ''
  }, [])

  return (
    <section aria-label="Koleksiyon önizleme" className="collections-section">
      <div className="collections-shell">

        {/* ── Section heading ─────────────────────────────────────────── */}
        <motion.div
          className="collections-head"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={prefersReduced ? t(0.2, 'easeOut') : t(0.7, EASE_MATERIAL)}
        >
          <div className="collections-head-row">
            <h2 className="collections-heading">Koleksiyonlar</h2>
            <p className="collections-subhead">
              {ETILI_KATEGORILER.length}&thinsp;Kategori
              <span className="collections-subhead-sep" aria-hidden="true" />
              {totalSeri}&thinsp;Seri
            </p>
          </div>
        </motion.div>

        {/* ── Collections grid ────────────────────────────────────────── */}
        <ul
          className="collections-grid"
          role="list"
          aria-label="Koleksiyon listesi"
        >
          {featured.map((kat, i) => (
            <motion.li
              key={kat.slug}
              className={TILE_CLASSES[i]}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={
                prefersReduced
                  ? t(0.2, 'easeOut', i * 0.04)
                  : t(0.8, EASE_MATERIAL, 0.1 + i * 0.09)
              }
            >
              <Link
                href={`/koleksiyonlar/kategori/${kat.slug}`}
                className="kol-card"
                aria-label={`${kat.isim} — ${kat.seriler.length} seri`}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Image */}
                <div className="kol-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={KAT_IMAGES[kat.slug] ?? '/images/koleksiyon/armada.webp'}
                    alt=""
                    className="kol-card-img"
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>

                {/* Dark vignette */}
                <div className="kol-card-vignette" aria-hidden="true" />

                {/* Overlay text */}
                <div className="kol-card-content">
                  <p className="kol-card-eyebrow">{kat.isimEn}</p>
                  <h3 className="kol-card-title">{kat.isim}</h3>
                  <div className="kol-card-foot">
                    <span className="kol-card-count">
                      {kat.seriler.length}&nbsp;Seri
                    </span>
                    <span className="kol-card-arrow" aria-hidden="true">
                      <svg
                        width="18" height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 9H14.5M9.5 4L14.5 9L9.5 14"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* ── "Tüm Koleksiyonlar" link ─────────────────────────────── */}
        <motion.div
          className="collections-footer"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={prefersReduced ? t(0.2, 'easeOut') : t(0.5, EASE_MATERIAL, 0.5)}
        >
          <Link href="/koleksiyonlar" className="collections-more-link">
            <span>Tüm Koleksiyonlar</span>
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
