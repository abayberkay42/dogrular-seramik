'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

// ─── Scene config ─────────────────────────────────────────────────────────────

interface Scene {
  id: string
  camKey: string          // matches CSS @keyframes ds-cam-{key}
  src: string
  durationMs: number
  grade: string           // CSS filter colour grade
  tint: string            // colour overlay for mood
  label: string
}

const SCENES: Scene[] = [
  {
    id: 's1',
    camKey: 'exterior',
    src: '/images/hero/slider/leton.webp',
    durationMs: 4800,
    grade: 'brightness(1.06) contrast(1.14) saturate(1.22)',
    tint: 'rgba(255,210,120,0.07)',
    label: 'Villa dış cephesi — altın saat',
  },
  {
    id: 's2',
    camKey: 'living',
    src: '/images/hero/slider/pebble-pearl.webp',
    durationMs: 3600,
    grade: 'brightness(0.94) contrast(1.10) saturate(1.06)',
    tint: 'rgba(240,228,200,0.05)',
    label: 'Salon — seramik zemin',
  },
  {
    id: 's3',
    camKey: 'bathroom',
    src: '/images/hero/slider/meridyen.webp',
    durationMs: 3400,
    grade: 'brightness(0.88) contrast(1.20) saturate(0.88) hue-rotate(10deg)',
    tint: 'rgba(168,205,235,0.06)',
    label: 'Banyo — mermer seramik',
  },
  {
    id: 's4',
    camKey: 'kitchen',
    src: '/images/hero/slider/paradise.webp',
    durationMs: 3600,
    grade: 'brightness(1.02) contrast(1.10) saturate(1.14)',
    tint: 'rgba(200,225,180,0.04)',
    label: 'Mutfak — premium yüzeyler',
  },
  {
    id: 's5',
    camKey: 'terrace',
    src: '/images/hero/slider/datca.webp',
    durationMs: 4400,
    grade: 'brightness(1.12) contrast(1.07) saturate(1.28)',
    tint: 'rgba(255,232,168,0.08)',
    label: 'Teras — dış mekan seramikleri',
  },
]

const CROSSFADE_MS = 1300
const TOTAL_MS = SCENES.reduce((s, sc) => s + sc.durationMs, 0)
const EASING = 'cubic-bezier(0.14, 0.00, 0.04, 1.00)' // ultra-smooth dolly momentum

// ─── Bokeh canvas ────────────────────────────────────────────────────────────

function BokehCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return

    const resize = () => {
      cvs.width = window.innerWidth
      cvs.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Warm floating light orbs
    const orbs = Array.from({ length: 22 }, () => ({
      x: Math.random() * cvs.width,
      y: Math.random() * cvs.height,
      r: 4 + Math.random() * 24,
      a: 0.012 + Math.random() * 0.038,
      vx: (Math.random() - 0.5) * 0.10,
      vy: -0.04 - Math.random() * 0.16,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height)
      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, `rgba(255,222,150,${o.a})`)
        g.addColorStop(1, 'rgba(255,222,150,0)')
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        o.x += o.vx
        o.y += o.vy
        if (o.y + o.r < 0)            { o.y = cvs.height + o.r; o.x = Math.random() * cvs.width }
        if (o.x < -o.r)               o.x = cvs.width + o.r
        if (o.x > cvs.width + o.r)    o.x = -o.r
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        zIndex: 4, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.55,
      }}
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const prefersReduced = useReducedMotion() ?? false

  // Session flag — show once per tab session
  const [active, setActive] = useState(false)
  const [sceneIdx, setSceneIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef    = useRef<number | null>(null)
  const t0Ref     = useRef<number>(0)

  // Eagerly preload all scene images to prevent per-scene flash
  useEffect(() => {
    SCENES.forEach(s => {
      const img = new window.Image()
      img.src = s.src
    })
  }, [])

  // Determine on mount whether to show
  useEffect(() => {
    if (prefersReduced) { onComplete(); return }
    const shown = sessionStorage.getItem('ds-intro-shown')
    if (shown) { onComplete(); return }
    sessionStorage.setItem('ds-intro-shown', '1')
    t0Ref.current = performance.now()
    setActive(true)
  }, [prefersReduced, onComplete])

  // Progress bar (RAF loop)
  useEffect(() => {
    if (!active) return
    const tick = (now: number) => {
      const pct = Math.min((now - t0Ref.current) / TOTAL_MS, 1)
      setProgress(pct)
      if (pct < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active])

  // Dismiss: start the exit animation
  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setActive(false)
    // onComplete fires via AnimatePresence onExitComplete
  }, [])

  // Scene sequencer
  useEffect(() => {
    if (!active) return
    const scene = SCENES[sceneIdx]
    timerRef.current = setTimeout(() => {
      if (sceneIdx < SCENES.length - 1) {
        setSceneIdx(i => i + 1)
      } else {
        dismiss()
      }
    }, scene.durationMs)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, sceneIdx, dismiss])

  const scene = SCENES[sceneIdx]
  const camAnim = `ds-cam-${scene.camKey} ${scene.durationMs}ms ${EASING} both`

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {active && (
        <motion.div
          key="ds-cinematic"
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            overflow: 'hidden', background: '#1e1e1e',
            contain: 'strict',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label="Sinematik açılış"
          role="presentation"
          aria-hidden="true"
        >

          {/* ── Scene images ──────────────────────────────────────────────── */}
          <AnimatePresence>
            <motion.div
              key={scene.id}
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${scene.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: scene.grade,
                // CSS animation handles camera — unaffected by React reconciliation
                animation: camAnim,
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: CROSSFADE_MS / 1000, ease: 'easeInOut' }}
            >
              {/* Mood colour tint */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: scene.tint,
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── Bokeh dust particles ───────────────────────────────────────── */}
          <BokehCanvas />

          {/* ── Film grain ────────────────────────────────────────────────── */}
          <svg
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              zIndex: 5, pointerEvents: 'none', opacity: 0.32,
            }}
          >
            <filter id="ci-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#ci-grain)" opacity="0.11" />
          </svg>

          {/* ── Cinematic letterbox — solid bars (true 2.35:1 feel) ──────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '8vh', background: '#1e1e1e', zIndex: 6, pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '8.5vh', background: '#1e1e1e', zIndex: 6, pointerEvents: 'none',
            }}
          />

          {/* ── Vignette ──────────────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none',
              boxShadow: 'inset 0 0 180px 70px rgba(0,0,0,0.68)',
            }}
          />

          {/* ── Centre lens flare — subtle warmth ─────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '42%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '45vw', height: '30vw',
              background: 'radial-gradient(ellipse, rgba(255,220,140,0.045) 0%, transparent 70%)',
              zIndex: 6, pointerEvents: 'none',
            }}
          />

          {/* ── Brand watermark ───────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 'calc(8.5vh + 18px)', left: 28,
              zIndex: 9, margin: 0, pointerEvents: 'none',
              fontFamily: 'var(--font-display), system-ui, sans-serif',
              fontSize: 'clamp(0.55rem, 0.9vw, 0.68rem)',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.26)',
            }}
          >
            Doğrular Seramik
          </motion.p>

          {/* ── Scene counter ─────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`label-${sceneIdx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.32, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: 'calc(8.5vh + 18px)', right: 28,
                zIndex: 9, margin: 0, pointerEvents: 'none',
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '0.56rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)',
              }}
            >
              {String(sceneIdx + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(SCENES.length).padStart(2, '0')}
            </motion.p>
          </AnimatePresence>

          {/* ── Progress bar ──────────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '8.5vh', left: 0, right: 0,
              height: 1.5, zIndex: 9,
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(progress * 100).toFixed(2)}%`,
                background: 'linear-gradient(to right, rgba(200,169,110,0.5), rgba(220,190,130,0.75))',
                transition: 'width 0.18s linear',
              }}
            />
          </div>

          {/* ── Skip button ───────────────────────────────────────────────── */}
          <motion.button
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            style={{
              position: 'absolute',
              bottom: 'calc(8.5vh + 20px)', right: 102,
              zIndex: 10, cursor: 'pointer',
              padding: '6px 15px',
              border: '1px solid rgba(255,255,255,0.16)',
              background: 'rgba(0,0,0,0.42)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontSize: '0.56rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', borderRadius: 2,
            }}
          >
            Geç
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
