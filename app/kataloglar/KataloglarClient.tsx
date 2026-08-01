'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { BOLUMLER, type Katalog } from '@/lib/katalog-data'

const GAP = 'clamp(20px, 3vw, 36px)'


function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function TypografikKapak({ katalog }: { katalog: Katalog }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(155deg, ${hexToRgba(katalog.accent, 0.26)} 0%, rgba(14,13,12,0.96) 62%, rgba(9,8,8,1) 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 18px',
      }}
    >
      {/* decorative rules */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.045)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.045)' }} />
      </div>

      {/* top: brand */}
      <span style={{
        position: 'relative',
        fontFamily: 'var(--font-body), system-ui, sans-serif',
        fontSize: '0.5rem',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
      }}>
        {katalog.marka}
      </span>

      {/* center: title */}
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display), system-ui, sans-serif',
          fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
          fontWeight: 400,
          letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.94)',
          marginBottom: 10,
          lineHeight: 1.25,
        }}>
          {katalog.baslik}
        </div>
        <div style={{ height: 1, width: 30, margin: '0 auto', background: katalog.accent, opacity: 0.75 }} />
      </div>

      {/* bottom: year */}
      <span style={{
        position: 'relative',
        fontFamily: 'var(--font-display), system-ui, sans-serif',
        fontSize: '0.8125rem',
        letterSpacing: '0.08em',
        color: katalog.accent,
        opacity: 0.9,
      }}>
        {katalog.yil ?? 'PDF'}
      </span>
    </div>
  )
}

function KatalogCard({ katalog, delay, prefersReduced }: {
  katalog: Katalog
  delay: number
  prefersReduced: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <a
        href={katalog.pdf}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${katalog.marka} — ${katalog.baslik}${katalog.yil ? ` ${katalog.yil}` : ''}, PDF görüntüle`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3/4',
            borderRadius: 6,
            overflow: 'hidden',
            background: '#141312',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            boxShadow: hovered ? '0 28px 64px rgba(0,0,0,0.55)' : '0 4px 20px rgba(0,0,0,0.25)',
            transition: 'transform 350ms cubic-bezier(0.23,1,0.32,1), box-shadow 350ms cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          {katalog.cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={katalog.cover}
              alt={`${katalog.baslik} katalog kapağı`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
              }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <TypografikKapak katalog={katalog} />
          )}

          {katalog.tag && (
            <div style={{
              position: 'absolute',
              top: 14,
              left: 14,
              zIndex: 4,
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontSize: '0.5rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              background: katalog.accent,
              borderRadius: 2,
              padding: '4px 8px',
            }}>
              {katalog.tag}
            </div>
          )}

          {/* Hover overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: 'rgba(0,0,0,0.52)',
            backdropFilter: 'blur(3px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 280ms ease',
            zIndex: 10,
            color: 'rgba(255,255,255,0.95)',
            fontFamily: 'var(--font-body), system-ui, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2v10M5.5 8.5l3.5 3.5 3.5-3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 14h14" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            PDF Görüntüle
          </div>
        </div>

        {/* Below cover: meta */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 10,
          padding: '11px 2px 0',
        }}>
          <span style={{
            fontFamily: 'var(--font-body), system-ui, sans-serif',
            fontSize: '0.9375rem',
            fontWeight: 400,
            color: 'var(--ds-text-on-light)',
          }}>
            {katalog.baslik}
          </span>
          <span style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: '0.8125rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
            color: katalog.accent,
            flexShrink: 0,
          }}>
            {katalog.yil ?? 'PDF'}
          </span>
        </div>
      </a>
    </motion.div>
  )
}

export function KataloglarClient() {
  const prefersReduced = useReducedMotion() ?? false
  const toplam = BOLUMLER.reduce((a, b) => a + b.kataloglar.length, 0)

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── Açık zeminli arka plan ──────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Katman 1 — kırık beyaz taban */}
        <div style={{ position: 'absolute', inset: 0, background: '#f6f5f3' }} />

        {/* Katman 2 — seramik dokusu; görselin okunabilir kalması için
            opaklık yükseltildi, üstündeki beyaz örtü inceltildi */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/hero/slider/leton.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          filter: 'grayscale(45%) contrast(1.02) brightness(1.12)',
        }} />

        {/* Katman 3 — merkezde hafif aydınlanma */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 75% 65% at 50% 36%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.14) 55%, rgba(0,0,0,0.05) 100%)',
        }} />

        {/* Katman 4 — dikey derinlik */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 45%, rgba(0,0,0,0.05) 100%)',
        }} />

        {/* Katman 5 — ince grain */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.16 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="kat-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#kat-noise)" opacity="0.08" />
        </svg>

        {/* Katman 6 — yumuşak vinyet */}
        <div style={{
          position: 'absolute', inset: 0,
          boxShadow: 'inset 0 0 140px 50px rgba(0,0,0,0.05)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(96px,14vw,160px) 0 clamp(40px,5vw,64px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 clamp(20px,5vw,40px)' }}>
            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'oklch(42% 0 0)',
                margin: '0 0 14px',
              }}
            >
              Doğrular Seramik
            </motion.p>
            <motion.h1
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: 'var(--font-display), system-ui, sans-serif',
                fontSize: 'clamp(2.25rem,5.5vw,3.75rem)',
                fontWeight: 400,
                letterSpacing: '-0.04em',
                color: 'var(--ds-text-on-light)',
                margin: '0 0 14px',
                lineHeight: 1.05,
              }}
            >
              Kataloglar
            </motion.h1>
            <motion.p
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '0.9375rem',
                fontWeight: 300,
                color: 'oklch(42% 0 0)',
                margin: 0,
                lineHeight: 1.65,
              }}
            >
              Etili Seramik, Turkuaz Seramik ve VitrA ürün kataloglarını inceleyin — {toplam} katalog, PDF olarak görüntüleyin.
            </motion.p>
          </div>
        </section>

        {/* Catalog sections */}
        <section style={{ padding: '0 0 clamp(80px,12vw,140px)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(20px,5vw,40px)' }}>
            {BOLUMLER.map((bolum, bi) => (
              <div key={bolum.id} style={{ marginBottom: bi === BOLUMLER.length - 1 ? 0 : 'clamp(56px, 8vw, 88px)' }}>
                <motion.div
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ marginBottom: 'clamp(24px, 3vw, 36px)', textAlign: 'center' }}
                >
                  <h2 style={{
                    fontFamily: 'var(--font-display), system-ui, sans-serif',
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--ds-text-on-light)',
                    margin: '0 0 8px',
                  }}>
                    {bolum.baslik}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    color: 'oklch(42% 0 0)',
                    margin: '0 auto',
                    maxWidth: '56ch',
                  }}>
                    {bolum.aciklama}
                  </p>
                  <div style={{ height: 1, background: 'var(--ds-border-light)', marginTop: 'clamp(16px, 2vw, 22px)' }} />
                </motion.div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                  gap: GAP,
                }}>
                  {bolum.kataloglar.map((kat, i) => (
                    <KatalogCard
                      key={kat.id}
                      katalog={kat}
                      delay={Math.min(i * 0.07, 0.35)}
                      prefersReduced={prefersReduced}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
