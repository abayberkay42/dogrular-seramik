'use client'

import { useEffect, useRef, useState, useCallback } from 'react'


/* ── Material texture generators ───────────────────────────────────────────── */
async function genMat(): Promise<HTMLCanvasElement> {
  /* Load real macro photography for Mat */
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image()
    el.crossOrigin = 'anonymous'
    el.onload  = () => resolve(el)
    el.onerror = reject
    el.src = '/images/mat-texture.png'
  })
  const cv = document.createElement('canvas')
  cv.width = img.naturalWidth
  cv.height = img.naturalHeight
  const ctx = cv.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return cv
}

async function genParlak(): Promise<HTMLCanvasElement> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image()
    el.crossOrigin = 'anonymous'
    el.onload  = () => resolve(el)
    el.onerror = reject
    el.src = '/images/parlak-texture.png'
  })
  const cv = document.createElement('canvas')
  cv.width = img.naturalWidth
  cv.height = img.naturalHeight
  const ctx = cv.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return cv
}

async function genTraverten(): Promise<HTMLCanvasElement> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image()
    el.crossOrigin = 'anonymous'
    el.onload  = () => resolve(el)
    el.onerror = reject
    el.src = '/images/traverten-texture.png'
  })
  const cv = document.createElement('canvas')
  cv.width = img.naturalWidth
  cv.height = img.naturalHeight
  const ctx = cv.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return cv
}

async function genMermer(): Promise<HTMLCanvasElement> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image()
    el.crossOrigin = 'anonymous'
    el.onload  = () => resolve(el)
    el.onerror = reject
    el.src = '/images/mermer-texture.png'
  })
  const cv = document.createElement('canvas')
  cv.width = img.naturalWidth
  cv.height = img.naturalHeight
  const ctx = cv.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return cv
}

async function genBeton(): Promise<HTMLCanvasElement> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image()
    el.crossOrigin = 'anonymous'
    el.onload  = () => resolve(el)
    el.onerror = reject
    el.src = '/images/beton-texture.png'
  })
  const cv = document.createElement('canvas')
  cv.width = img.naturalWidth
  cv.height = img.naturalHeight
  const ctx = cv.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return cv
}

const GENERATORS: Array<() => Promise<HTMLCanvasElement>> = [genMat, genParlak, genTraverten, genMermer, genBeton]

/* ── Material metadata ─────────────────────────────────────────────────────── */
const MATERIALS = [
  {
    id: 'mat', name: 'Mat',
    description: 'Işığı yumuşak biçimde dağıtan mat yüzey, mekânlara dingin ve sofistike bir atmosfer kazandırır. Parmak izlerine karşı dirençli yapısıyla günlük kullanımda kalıcı zarafet sunar.',
    usage: [{ label: 'Salon',   sub: 'Zemin Kaplama', icon: 'salon'  },
            { label: 'Koridor', sub: 'Duvar Kaplama', icon: 'wall'   },
            { label: 'Ofis',    sub: 'Tüm Yüzeyler',  icon: 'office' }],
  },
  {
    id: 'parlak', name: 'Parlak',
    description: 'Yüksek parlaklık değeriyle ışığı kusursuz yansıtan bu yüzey, mekânlara genişlik ve canlılık hissi katar. Her açıdan farklı bir görünüm sunan dinamik bir estetik yaratır.',
    usage: [{ label: 'Banyo',  sub: 'Duvar Kaplama', icon: 'bath'    },
            { label: 'Mutfak', sub: 'Tezgah Arkası', icon: 'kitchen' },
            { label: 'Salon',  sub: 'Zemin',         icon: 'salon'   }],
  },
  {
    id: 'traverten', name: 'Traverten',
    description: 'Doğal traverten dokusunu modern üretim teknolojisiyle buluşturuyoruz. Sıcak tonları ve zamansız yüzeyiyle mekânlara doğal bir zarafet katar.',
    usage: [{ label: 'Salon',    sub: 'Zemin Kaplama', icon: 'salon'   },
            { label: 'Banyo',    sub: 'Duvar Kaplama', icon: 'bath'    },
            { label: 'Dış Mekan', sub: 'Teras Kaplama', icon: 'outdoor' }],
  },
  {
    id: 'mermer', name: 'Mermer',
    description: 'Doğal mermerin akışkan damarları ve kristal parlaklığı, seramik güvencesiyle buluşuyor. Sofistike mekânlar için zamansız bir seçim.',
    usage: [{ label: 'Banyo',  sub: 'Zemin & Duvar', icon: 'bath'    },
            { label: 'Salon',  sub: 'Zemin Kaplama', icon: 'salon'   },
            { label: 'Mutfak', sub: 'Ada Yüzeyi',    icon: 'kitchen' }],
  },
  {
    id: 'beton', name: 'Beton Görünümlü',
    description: 'Endüstriyel estetiği modern yaşam alanlarına taşıyan beton görünümlü seramik. Soğuk gri tonları ve minimal dokusuyla çağdaş tasarım anlayışını yansıtır.',
    usage: [{ label: 'Mutfak', sub: 'Zemin & Duvar', icon: 'kitchen' },
            { label: 'Ofis',   sub: 'Tüm Yüzeyler',  icon: 'office'  },
            { label: 'Dış Mekan', sub: 'Teras',       icon: 'outdoor' }],
  },
] as const

/* ── Icons ─────────────────────────────────────────────────────────────────── */
function Icon({ type }: { type: string }) {
  const p = { width: 28, height: 28, viewBox: '0 0 28 28', fill: 'none', stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (type === 'salon')   return <svg {...p}><path d="M4 18v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><rect x="2" y="18" width="24" height="3" rx="1"/><path d="M6 18v-3h16v3"/></svg>
  if (type === 'bath')    return <svg {...p}><path d="M4 16h20v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3z"/><path d="M4 16V9a2 2 0 0 1 4 0v2h12"/><circle cx="8.5" cy="22.5" r="0.7" fill="currentColor"/><circle cx="19.5" cy="22.5" r="0.7" fill="currentColor"/></svg>
  if (type === 'kitchen') return <svg {...p}><rect x="3" y="7" width="22" height="14" rx="1"/><circle cx="11" cy="13" r="3"/><circle cx="19" cy="13" r="3"/><line x1="3" y1="21" x2="25" y2="21"/></svg>
  if (type === 'office')  return <svg {...p}><rect x="2" y="14" width="24" height="2" rx="1"/><path d="M7 16v6M21 16v6M4 9l3-3h14l3 3"/></svg>
  if (type === 'outdoor') return <svg {...p}><circle cx="14" cy="12" r="4"/><line x1="14" y1="4" x2="14" y2="6"/><line x1="14" y1="18" x2="14" y2="20"/><line x1="4" y1="12" x2="6" y2="12"/><line x1="22" y1="12" x2="24" y2="12"/><line x1="7" y1="7" x2="8.4" y2="8.4"/><line x1="21" y1="7" x2="19.6" y2="8.4"/><path d="M6 24h16" strokeWidth="1.4"/></svg>
  return <svg {...p}><rect x="3" y="5" width="22" height="18" rx="1"/><line x1="3" y1="12" x2="25" y2="12"/><line x1="3" y1="18" x2="25" y2="18"/><line x1="14" y1="5" x2="14" y2="12"/><line x1="9" y1="12" x2="9" y2="18"/><line x1="19" y1="12" x2="19" y2="18"/><line x1="14" y1="18" x2="14" y2="23"/></svg>
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export function MaterialLabSection() {
  const [active,    setActive]    = useState(0)
  const [displayed, setDisplayed] = useState(0)

  const canvasARef = useRef<HTMLCanvasElement>(null)
  const canvasBRef = useRef<HTMLCanvasElement>(null)
  const lightRef       = useRef<HTMLCanvasElement>(null)
  const descRef        = useRef<HTMLParagraphElement>(null)
  const panelContentRef = useRef<HTMLDivElement>(null)

  const texturesRef = useRef<(HTMLCanvasElement | null)[]>([null, null, null, null, null])
  const abRef       = useRef(false)
  const transRef    = useRef(false)
  const rafRef      = useRef(0)

  const sizeCanvas = useCallback((cv: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1
    cv.width  = cv.offsetWidth  * dpr
    cv.height = cv.offsetHeight * dpr
  }, [])

  const blitTex = useCallback((cv: HTMLCanvasElement, tex: HTMLCanvasElement) => {
    const ctx = cv.getContext('2d')!
    ctx.drawImage(tex, 0, 0, cv.width, cv.height)
  }, [])

  /* Generate textures progressively (active material first) */
  useEffect(() => {
    let alive = true
    ;(async () => {
      for (let i = 0; i < GENERATORS.length; i++) {
        if (!alive) break
        if (i > 0) await new Promise<void>(r => setTimeout(r, 20))
        const tex = await GENERATORS[i]()
        if (!alive) break
        texturesRef.current[i] = tex
        if (i === 0 && canvasARef.current) {
          sizeCanvas(canvasARef.current)
          blitTex(canvasARef.current, tex)
        }
      }
    })()
    return () => { alive = false }
  }, [sizeCanvas, blitTex])

  /* Re-size & re-blit when container resizes (handles mobile layout shift) */
  useEffect(() => {
    const container = canvasARef.current?.parentElement
    if (!container) return
    const ro = new ResizeObserver(() => {
      const cv = abRef.current ? canvasBRef.current : canvasARef.current
      const tex = texturesRef.current[displayed]
      if (cv && tex) { sizeCanvas(cv); blitTex(cv, tex) }
      if (lightRef.current) sizeCanvas(lightRef.current)
    })
    ro.observe(container)
    return () => ro.disconnect()
  }, [displayed, sizeCanvas, blitTex])

  /* Animated light sweep — per-material character */
  useEffect(() => {
    const lightCv = lightRef.current
    if (!lightCv) return

    /* ── Per-material light config ─────────────────────────────────────────
     *  cr/cg/cb  – light RGB
     *  ambR      – ambient radius as fraction of canvas min-dimension
     *  ambI      – ambient opacity
     *  specR     – specular highlight radius (0 = none)
     *  specI     – specular peak opacity
     *  speed     – radians-per-ms (very slow = 0.00006-0.0001)
     *  px/py     – path functions returning 0-1 normalised position
     * ──────────────────────────────────────────────────────────────────── */
    const CFG = [
      /* 0 Mat – warm broad sweep, zero specular (light scatters in every direction) */
      { cr: 255, cg: 238, cb: 195,
        ambR: 0.82, ambI: 0.22, specR: 0, specI: 0,
        speed: 0.000058,
        px: (t: number) => 0.22 + Math.sin(t)        * 0.38,
        py: (t: number) => 0.30 + Math.sin(t * 0.62) * 0.18 },

      /* 1 Parlak – tight white specular + faint ambient, like studio flash on mirror tile */
      { cr: 255, cg: 252, cb: 248,
        ambR: 0.55, ambI: 0.10, specR: 0.07, specI: 0.95,
        speed: 0.000072,
        px: (t: number) => 0.18 + Math.sin(t * 0.88) * 0.44,
        py: (t: number) => 0.20 + Math.sin(t * 0.55) * 0.13 },

      /* 2 Traverten – warm amber raking light (sweeps left↔right, barely moves vertically) */
      { cr: 255, cg: 225, cb: 155,
        ambR: 0.72, ambI: 0.30, specR: 0.20, specI: 0.38,
        speed: 0.000052,
        px: (t: number) => 0.10 + Math.sin(t * 0.78) * 0.50,
        py: (t: number) => 0.28 + Math.sin(t * 0.42) * 0.06 },

      /* 3 Mermer – cool crystalline white, medium specular, slightly slower drift */
      { cr: 240, cg: 245, cb: 255,
        ambR: 0.64, ambI: 0.16, specR: 0.10, specI: 0.72,
        speed: 0.000062,
        px: (t: number) => 0.24 + Math.sin(t * 0.92) * 0.36,
        py: (t: number) => 0.22 + Math.sin(t * 0.57) * 0.20 },

      /* 4 Beton – cool blue-grey industrial diffuse, no specular */
      { cr: 210, cg: 225, cb: 242,
        ambR: 0.78, ambI: 0.17, specR: 0, specI: 0,
        speed: 0.000048,
        px: (t: number) => 0.28 + Math.sin(t * 0.70) * 0.30,
        py: (t: number) => 0.35 + Math.sin(t * 0.46) * 0.14 },
    ][displayed]

    let dead = false
    const t0 = performance.now()

    const tick = (now: number) => {
      if (dead) return
      const t   = (now - t0) * CFG.speed
      const ctx = lightCv.getContext('2d')!
      const w   = lightCv.width, h = lightCv.height
      const dim = Math.min(w, h)
      const lx  = CFG.px(t) * w
      const ly  = CFG.py(t) * h

      ctx.clearRect(0, 0, w, h)

      /* Ambient soft fill */
      const ag = ctx.createRadialGradient(lx, ly, 0, lx, ly, CFG.ambR * dim)
      ag.addColorStop(0,   `rgba(${CFG.cr},${CFG.cg},${CFG.cb},${CFG.ambI})`)
      ag.addColorStop(0.5, `rgba(${CFG.cr},${CFG.cg},${CFG.cb},${+(CFG.ambI * 0.22).toFixed(3)})`)
      ag.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = ag
      ctx.fillRect(0, 0, w, h)

      /* Sharp specular highlight (glossy materials only) */
      if (CFG.specI > 0) {
        const sg = ctx.createRadialGradient(lx, ly, 0, lx, ly, CFG.specR * dim)
        sg.addColorStop(0,    `rgba(255,255,255,${CFG.specI})`)
        sg.addColorStop(0.2,  `rgba(255,255,255,${+(CFG.specI * 0.45).toFixed(3)})`)
        sg.addColorStop(0.55, `rgba(255,255,255,${+(CFG.specI * 0.06).toFixed(3)})`)
        sg.addColorStop(1,    'rgba(0,0,0,0)')
        ctx.fillStyle = sg
        ctx.fillRect(0, 0, w, h)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    sizeCanvas(lightCv)
    rafRef.current = requestAnimationFrame(tick)
    return () => { dead = true; cancelAnimationFrame(rafRef.current) }
  }, [displayed, sizeCanvas])

  /* Material transition */
  const selectMat = useCallback(async (idx: number) => {
    if (idx === active || transRef.current) return
    transRef.current = true
    setActive(idx)

    const { gsap } = await import('gsap')

    /* ── Right panel: fade out → update content → fade in ── */
    const panel = panelContentRef.current
    if (panel) {
      gsap.to(panel, {
        opacity: 0, y: -6, duration: 0.14, ease: 'power2.in',
        onComplete: () => {
          setDisplayed(idx)
          requestAnimationFrame(() => {
            gsap.fromTo(panel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' })
          })
        },
      })
    }

    /* ── Left canvas: crossfade texture ── */
    const a = canvasARef.current, b = canvasBRef.current
    if (!a || !b) { transRef.current = false; return }

    const tex = texturesRef.current[idx] ?? await GENERATORS[idx]().then(t => { texturesRef.current[idx] = t; return t })

    if (!abRef.current) {
      if (tex) { sizeCanvas(b); blitTex(b, tex) }
      gsap.set(b, { opacity: 0, zIndex: 2 })
      gsap.set(a, { zIndex: 1 })
      gsap.to(b, { opacity: 1, duration: 0.85, ease: 'power2.inOut', onComplete: () => {
        abRef.current = true; transRef.current = false
      }})
    } else {
      if (tex) { sizeCanvas(a); blitTex(a, tex) }
      gsap.set(a, { opacity: 1, zIndex: 1 })
      gsap.to(b, { opacity: 0, duration: 0.85, ease: 'power2.inOut', onComplete: () => {
        abRef.current = false; transRef.current = false
      }})
    }
  }, [active, sizeCanvas, blitTex])

  const mat = MATERIALS[displayed]

  return (
    <section
      aria-label="Malzeme Laboratuvarı"
      className="ml-section"
      style={{ position: 'relative', background: 'oklch(16% 0 0)' }}
    >
      {/* ── Left: texture surface (70%) ─────────────────────────────────────── */}
      <div className="ml-left" style={{ position: 'relative', overflow: 'hidden' }}>
        <canvas ref={canvasARef} aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 1 }} />
        <canvas ref={canvasBRef} aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 2, opacity: 0 }} />
        <canvas ref={lightRef} aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 3, mixBlendMode: 'screen' }} />
        {/* Gradient fade into right panel */}
        <div aria-hidden="true" className="ml-gradient" style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }} />
        {/* Bottom labels */}
        <div className="ml-bottom-labels" style={{ position: 'absolute', bottom: 'clamp(22px, 3.5vh, 38px)', left: 'clamp(28px, 3.5vw, 52px)',
          right: 'clamp(28px, 3.5vw, 52px)', zIndex: 5, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', fontSize: '0.6rem',
            letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            Malzeme Laboratuvarı
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', fontSize: '0.6rem',
              letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)' }}>
              {String(active + 1).padStart(2, '0')}
            </span>
            <span style={{ display: 'block', width: '36px', height: '1px', background: 'rgba(255,255,255,0.14)' }} />
            <span style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', fontSize: '0.6rem',
              letterSpacing: '0.12em', color: 'rgba(255,255,255,0.16)' }}>
              {String(MATERIALS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: material panel (30%) ─────────────────────────────────────── */}
      <div className="ml-right" style={{ background: 'oklch(13% 0 0)', display: 'flex',
        flexDirection: 'column', padding: 'clamp(40px, 6vh, 68px) clamp(30px, 3.5vw, 52px)',
        position: 'relative', overflow: 'hidden' }}>

        {/* Material nav */}
        <nav className="ml-nav">
          {MATERIALS.map((m, i) => {
            const on = i === active
            return (
              <button key={m.id} onClick={() => selectMat(i)} className="ml-nav-btn">
                <span className={`ml-nav-bar${on ? ' ml-nav-bar--on' : ''}`} style={{
                  display: 'block', width: '2px', flexShrink: 0,
                  height: on ? '18px' : '0px',
                  background: 'var(--ds-accent)',
                  transition: 'height 380ms cubic-bezier(0.25,0.46,0.45,0.94)',
                }} />
                <span style={{
                  fontFamily: 'var(--font-display), system-ui, sans-serif',
                  fontSize: on ? 'clamp(1.3rem, 2.1vw, 1.7rem)' : 'clamp(1.05rem, 1.7vw, 1.4rem)',
                  fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1,
                  color: on ? 'var(--ds-accent)' : 'oklch(40% 0 0)',
                  transition: 'color 380ms ease, font-size 380ms ease',
                }}>
                  {m.name}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: 'clamp(22px, 3.5vh, 38px)' }} />

        {/* Animated content block — description + link + usage */}
        <div ref={panelContentRef}>

        {/* Description */}
        <p ref={descRef} style={{
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontSize: 'clamp(0.78rem, 0.95vw, 0.88rem)', fontWeight: 300,
          lineHeight: 1.85, color: 'oklch(52% 0 0)', margin: '0 0 clamp(20px, 3vh, 34px) 0',
        }}>
          {mat.description}
        </p>

        {/* Link */}
        <a href="/koleksiyonlar" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'oklch(55% 0 0)',
          textDecoration: 'none', marginBottom: 'clamp(22px, 3.5vh, 38px)',
          transition: 'color 200ms',
        }}>
          Koleksiyonu İncele
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: 'clamp(18px, 3vh, 32px)' }} />

        {/* Usage areas */}
        <div>
          <p style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', fontSize: '0.58rem',
            fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'oklch(35% 0 0)', margin: '0 0 14px 0' }}>
            Kullanım Alanları
          </p>
          <div style={{ display: 'flex', gap: 'clamp(10px, 1.8vw, 20px)' }}>
            {mat.usage.map(u => {
              const photo: Record<string, string> = {
                salon:   '/images/salon.png',
                bath:    '/images/banyo.png',
                outdoor: '/images/dis-mekan.png',
                kitchen: '/images/mutfak.png',
                office:  '/images/ofis.png',
                wall:    '/images/koridor.png',
              }
              const src = photo[u.icon]
              return (
                <div key={u.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', flex: '1 1 0', minWidth: 0 }}>
                  {src ? (
                    <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '2px',
                      overflow: 'hidden', flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.06)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={u.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ) : (
                    <span style={{ color: 'oklch(42% 0 0)', padding: '4px 0' }}>
                      <Icon type={u.icon} />
                    </span>
                  )}
                  <p style={{ fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontSize: '0.7rem', fontWeight: 500, color: 'oklch(60% 0 0)',
                    margin: 0, lineHeight: 1.2 }}>{u.label}</p>
                  <p style={{ fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontSize: '0.58rem', fontWeight: 300, color: 'oklch(36% 0 0)',
                    margin: 0, lineHeight: 1.2 }}>{u.sub}</p>
                </div>
              )
            })}
          </div>
        </div>

        </div> {/* /panelContentRef */}

        {/* Accent progress line */}
        <div aria-hidden="true" className="ml-progress-line" style={{
          position: 'absolute', top: 0, left: 0, width: '1px',
          height: `${((active + 1) / MATERIALS.length) * 100}%`,
          background: 'linear-gradient(to bottom, transparent, var(--ds-accent), transparent)',
          opacity: 0.4, transition: 'height 650ms cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
      </div>
    </section>
  )
}
