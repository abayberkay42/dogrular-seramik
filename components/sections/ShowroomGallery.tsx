'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

const IMAGES = [
  '/images/showroom-1.jpg',
  '/images/showroom-2.jpg',
  '/images/showroom-3.jpg',
  '/images/showroom-4.jpg',
  '/images/showroom-5.jpg',
  '/images/showroom-6.jpg',
]

const TRACK = [...IMAGES, ...IMAGES]
const SPEED  = 0.7 // px per frame

function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index)
  const prev = useCallback(() => setCurrent(i => (i - 1 + IMAGES.length) % IMAGES.length), [])
  const next = useCallback(() => setCurrent(i => (i + 1) % IMAGES.length), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, prev, next])

  const btnBase: React.CSSProperties = { position: 'absolute', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', lineHeight: 1 }

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <button style={{ ...btnBase, top: 20, right: 28, fontSize: 28, opacity: 0.7 }} onClick={onClose} aria-label="Kapat">✕</button>
      <button style={{ ...btnBase, top: '50%', left: 20, fontSize: 56, transform: 'translateY(-50%)', opacity: 0.6, padding: '0 16px' }} onClick={e => { e.stopPropagation(); prev() }} aria-label="Önceki">‹</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMAGES[current]} alt={`Showroom fotoğrafı ${current + 1}`} onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '86vh', objectFit: 'contain', borderRadius: 2, boxShadow: '0 24px 80px rgba(0,0,0,0.6)', display: 'block' }} />
      <button style={{ ...btnBase, top: '50%', right: 20, fontSize: 56, transform: 'translateY(-50%)', opacity: 0.6, padding: '0 16px' }} onClick={e => { e.stopPropagation(); next() }} aria-label="Sonraki">›</button>
      <span style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.1em', fontFamily: 'system-ui' }}>{current + 1} / {IMAGES.length}</span>
    </div>,
    document.body
  )
}

export function ShowroomGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const rafRef     = useRef(0)
  const pausedRef  = useRef(false)
  const drag       = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  /* ── Auto-scroll via scrollLeft ────────────────────────────────────── */
  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += SPEED
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) el.scrollLeft -= half
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* ── Drag handlers ─────────────────────────────────────────────────── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = galleryRef.current; if (!el) return
    pausedRef.current = true
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const d = drag.current; if (!d.active) return
    const el = galleryRef.current; if (!el) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 4) d.moved = true
    const half = el.scrollWidth / 2
    let next = d.startScroll - dx
    if (next < 0) next += half
    if (next >= half) next -= half
    el.scrollLeft = next
  }, [])

  const onMouseUp = useCallback(() => {
    drag.current.active = false
    pausedRef.current   = false
  }, [])

  const onMouseLeave = useCallback(() => {
    if (drag.current.active) { drag.current.active = false; pausedRef.current = false }
  }, [])

  return (
    <>
      <div
        ref={galleryRef}
        className="sr-gallery"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'grab' }}
      >
        <div className="sr-track">
          {TRACK.map((src, i) => {
            const realIdx = i % IMAGES.length
            return (
              <button
                key={i}
                className="sr-slide"
                style={{ backgroundImage: `url('${src}')` }}
                aria-hidden={i >= IMAGES.length || undefined}
                aria-label={`Showroom fotoğrafı ${realIdx + 1}`}
                onClick={() => {
                  if (drag.current.moved) { drag.current.moved = false; return }
                  setLightbox(realIdx)
                }}
              />
            )
          })}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
