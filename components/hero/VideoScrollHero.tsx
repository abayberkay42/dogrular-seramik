'use client'

import { useEffect, useRef, useState } from 'react'

/* Kaydırma mesafesi.
   VIDEO_VH: videonun tamamının oynadığı kaydırma yüksekliği (ekran boyu cinsinden).
   TOTAL_VH: bölümün toplam yüksekliği; aradaki fark metin katmanının belirmesine ayrılır.
   Değer düştükçe aynı kaydırma miktarında video daha hızlı ilerler. */
const VIDEO_VH    = 300
const TOTAL_VH    = 400
const VIDEO_RATIO = VIDEO_VH / TOTAL_VH
const MOBILE_FRAMES  = 152
const DESKTOP_FRAMES = 152

export function VideoScrollHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection (matches motorcycle-rental approach)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 1)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current
    const chevron = chevronRef.current
    if (!section || !overlay || !chevron) return

    let dead = false

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }, LenisModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ])
      if (dead) return

      const Lenis = (LenisModule as any).default ?? LenisModule
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({ smoothWheel: true, lerp: 0.10 })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((t: number) => lenis.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)

      const onUpdateShared = (p: number) => {
        const textP = Math.max(0, (p - VIDEO_RATIO) / (1 - VIDEO_RATIO))
        overlay.style.opacity       = String(textP)
        overlay.style.pointerEvents = textP > 0.5 ? 'auto' : 'none'
        chevron.style.opacity       = String(Math.max(0, 1 - p / 0.08))
      }

      // ── Canvas + frame-by-frame (both mobile and desktop) ──
      const totalFrames = isMobile ? MOBILE_FRAMES  : DESKTOP_FRAMES
      const frameDir    = isMobile ? 'frames-mobile' : 'frames-1080'
      /* Karelerin kaynak çözünürlüğü — görsel yüklenene kadar kullanılan
         yedek değerler. Mobil kareler 1152×2048 videodan çıkarıldı. */
      const nativeW     = isMobile ? 1152 : 1920
      const nativeH     = isMobile ? 2048 : 1080

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const setCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1
        canvas.width  = window.innerWidth  * dpr
        canvas.height = window.innerHeight * dpr
      }
      setCanvasSize()

      let lastFrameIdx = 0
      const frames: HTMLImageElement[] = new Array(totalFrames)

      const drawFrame = (img: HTMLImageElement) => {
        const cw = canvas.width, ch = canvas.height
        const iw = img.naturalWidth  || nativeW
        const ih = img.naturalHeight || nativeH
        const scale = Math.max(cw / iw, ch / ih)
        const sw = iw * scale, sh = ih * scale
        ctx.fillStyle = '#1e1e1e'
        ctx.fillRect(0, 0, cw, ch)
        ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh)
      }

      const resize = () => {
        setCanvasSize()
        if (frames[lastFrameIdx]) drawFrame(frames[lastFrameIdx])
      }
      window.addEventListener('resize', resize)

      // Load frames progressively — start scroll as soon as first frame is ready
      let scrollReady = false
      for (let i = 0; i < totalFrames; i++) {
        const img = new window.Image()
        img.src = `/${frameDir}/frame_${String(i + 1).padStart(4, '0')}.webp`
        img.onload = () => {
          frames[i] = img
          if (i === 0 && !scrollReady) { drawFrame(img); scrollReady = true }
        }
      }

      // Wait only for first frame before setting up scroll
      await new Promise<void>(resolve => {
        const check = () => frames[0] ? resolve() : requestAnimationFrame(check)
        check()
      })
      if (dead) return

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: self => {
          const p        = self.progress
          const videoP   = Math.min(p / VIDEO_RATIO, 1)
          const frameIdx = Math.min(totalFrames - 1, Math.floor(videoP * totalFrames))
          if (frameIdx !== lastFrameIdx && frames[frameIdx]) {
            drawFrame(frames[frameIdx])
            lastFrameIdx = frameIdx
          }
          onUpdateShared(p)
        },
      })

      cleanupRef.current = () => {
        dead = true
        st.kill()
        lenis.destroy()
        gsap.ticker.remove((t: number) => lenis.raf(t * 1000))
        window.removeEventListener('resize', resize)
      }
    })().catch(console.error)

    return () => { dead = true; cleanupRef.current?.() }
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      style={{ height: `${TOTAL_VH}vh`, position: 'relative' }}
      aria-label="Ürün yolculuğu ve marka mesajı"
    >
      <div
        style={{
          position: 'sticky', top: 0, width: '100%', height: '100vh',
          overflow: 'hidden', background: '#1e1e1e', zIndex: 1,
        }}
      >
        {/* Canvas: frame-by-frame (both mobile and desktop) */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {/* Radial vignette */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
            zIndex: 2,
          }}
        />

        {/* Text overlay */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 5,
            opacity: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.62) 55%, rgba(0,0,0,0.25) 100%)',
          }}
        >
          <div
            style={{
              width: 'min(720px, 84vw)', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(20px, 3vw, 36px)',
            }}
          >
            <div style={{ width: '40px', height: '1px', background: 'var(--ds-accent)', borderRadius: '1px' }} />
            <h1 style={{
              fontFamily: 'var(--font-display), system-ui, sans-serif',
              fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 400,
              letterSpacing: '-0.03em', lineHeight: 1.15,
              color: 'oklch(95% 0 0)', margin: 0,
            }}>
              Zamansız Tasarım.<br />Üstün İşçilik.
            </h1>
            <p style={{
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: 300,
              color: 'oklch(68% 0 0)', lineHeight: 1.7, margin: 0,
            }}>
              Her projede estetik ve fonksiyonelliği kusursuz bir dengeyle buluşturuyoruz.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/koleksiyonlar" style={{
                display: 'inline-block', padding: '14px 28px',
                background: 'var(--ds-accent)', color: 'oklch(12% 0 0)',
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '0.8rem', fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: '2px', transition: 'background 200ms ease',
              }}>
                Koleksiyonları Keşfet
              </a>
              <a href="/ornek-iste" style={{
                display: 'inline-block', padding: '14px 28px',
                background: 'transparent', color: 'oklch(92% 0 0)',
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '0.8rem', fontWeight: 400,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: '2px',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'border-color 200ms ease, color 200ms ease',
              }}>
                Örnek Al
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue — outer div controls opacity via JS, inner div has the bounce animation */}
        <div
          ref={chevronRef}
          aria-label="Aşağı kaydır"
          style={{
            position: 'absolute', bottom: 'clamp(20px, 3.5vh, 36px)',
            left: '50%', transform: 'translateX(-50%)',
            zIndex: 10, pointerEvents: 'none',
            transition: 'opacity 0.15s linear',
          }}
        >
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            animation: 'ds-scroll-bounce 1.8s ease-in-out infinite',
          }}>
            <span style={{
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#ffffff', background: 'rgba(0,0,0,0.45)',
              padding: '5px 12px', borderRadius: '20px',
            }}>
              Aşağı Kaydır
            </span>
            <svg width="16" height="9" viewBox="0 0 16 9" fill="none">
              <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
