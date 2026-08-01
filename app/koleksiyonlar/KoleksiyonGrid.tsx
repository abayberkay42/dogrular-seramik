'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

export interface KolItem {
  slug: string
  isim: string
  isimEn: string
  count: number
  image: string
}

export default function KoleksiyonGrid({ items }: { items: KolItem[] }) {
  const gridRef = useRef<HTMLUListElement>(null)
  const rafRef  = useRef<number | null>(null)

  // ── Scroll reveal ────────────────────────────────────────────────────────
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = Array.from(grid.querySelectorAll<HTMLLIElement>('.kol-item'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLLIElement
          const delay = Number(el.dataset.idx ?? 0) * 80
          setTimeout(() => el.classList.add('kol-item--visible'), delay)
          observer.unobserve(el)
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -24px 0px' },
    )

    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // ── 3-D tilt (requestAnimationFrame, real-time) ──────────────────────────
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Kill any lingering return animation so the tilt starts instantly
    e.currentTarget.style.transition = 'box-shadow 350ms cubic-bezier(0.23,1,0.32,1)'
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card     = e.currentTarget
    const clientX  = e.clientX
    const clientY  = e.clientY

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      const x = (clientX - rect.left)  / rect.width  - 0.5  // -0.5 … 0.5
      const y = (clientY - rect.top)   / rect.height - 0.5

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
    // Re-enable transition → smooth return to rest
    card.style.transition =
      'transform 750ms cubic-bezier(0.23,1,0.32,1), box-shadow 600ms cubic-bezier(0.23,1,0.32,1)'
    card.style.transform = ''
  }, [])

  return (
    <ul
      ref={gridRef}
      className="kol-grid"
      role="list"
      aria-label="Kategori listesi"
    >
      {items.map((item, i) => (
        <li
          key={item.slug}
          className="kol-item"
          data-idx={i}
        >
          <Link
            href={`/koleksiyonlar/kategori/${item.slug}`}
            className="kol-card"
            aria-label={`${item.isim} — ${item.count} seri`}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* ── Görsel ──────────────────────────────────── */}
            <div className="kol-card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="kol-card-img"
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>

            {/* ── Gradient overlay ────────────────────────── */}
            <div className="kol-card-vignette" aria-hidden="true" />

            {/* ── Metin (image üzerinde) ──────────────────── */}
            <div className="kol-card-content">
              <p className="kol-card-eyebrow">{item.isimEn}</p>
              <h2 className="kol-card-title">{item.isim}</h2>
              <div className="kol-card-foot">
                <span className="kol-card-count">{item.count}&nbsp;Seri</span>
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
        </li>
      ))}
    </ul>
  )
}
