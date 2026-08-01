'use client'

import { useEffect, useRef } from 'react'

export function CinematicBridgeSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const introLineRef = useRef<HTMLDivElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const herRef      = useRef<HTMLSpanElement>(null)
  const yuzeyRef    = useRef<HTMLSpanElement>(null)
  const line2Ref    = useRef<HTMLDivElement>(null)
  const goldLineRef = useRef<HTMLDivElement>(null)
  const tlRef       = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let dead = false

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (dead) return
      gsap.registerPlugin(ScrollTrigger)

      /* Ensure initial states are set before ScrollTrigger fires */
      gsap.set(introLineRef.current!, { scaleX: 0 })
      gsap.set(herRef.current!,       { opacity: 0, y: 20 })
      gsap.set(yuzeyRef.current!,     { opacity: 0, y: 20 })
      gsap.set(line2Ref.current!,     { opacity: 0, y: 28 })
      gsap.set(goldLineRef.current!,  { scaleX: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     'bottom bottom',
          scrub:   2.0,            /* 2s lag → luxury, unhurried feel */
        },
      })
      tlRef.current = tl

      /* ─ Phase 1: intro line expands from center (0 → 0.18) ─────────── */
      tl.to(introLineRef.current!,
        { scaleX: 1, ease: 'none', duration: 0.18 },
        0
      )

      /* ─ Phase 2a: "Her" lifts in (0.18 → 0.32) ─────────────────────── */
      tl.to(herRef.current!,
        { opacity: 1, y: 0, ease: 'none', duration: 0.13 },
        0.18
      )

      /* ─ Phase 2b: "yüzey" lifts in — slight offset for tension ──────── */
      tl.to(yuzeyRef.current!,
        { opacity: 1, y: 0, ease: 'none', duration: 0.13 },
        0.28
      )

      /* ─ Phase 3: "bir karakter taşır." rises in (0.42 → 0.64) ──────── */
      tl.to(line2Ref.current!,
        { opacity: 1, y: 0, ease: 'none', duration: 0.20 },
        0.42
      )

      /* ─ Phase 4: still moment (0.64 → 0.76) — no animation ─────────── */

      /* ─ Phase 5a: text drifts up + fades — ends at EXACTLY 1.0 ──────── */
      tl.to(textRef.current!,
        { y: -52, opacity: 0, ease: 'none', duration: 0.24 },
        0.76
      )

      /* ─ Phase 5b: gold line stretches — also ends at 1.0 ────────────── */
      tl.to(goldLineRef.current!,
        { scaleX: 1, ease: 'none', duration: 0.22 },
        0.78
      )
    })().catch(console.error)

    return () => {
      dead = true
      tlRef.current?.scrollTrigger?.kill()
      tlRef.current?.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Marka manifestosu"
      style={{
        height: '200vh',
        position: 'relative',
        background: '#F8F8F6',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Phase 1 — intro line */}
        <div
          ref={introLineRef}
          aria-hidden="true"
          style={{
            width: 'clamp(60px, 8vw, 120px)',
            height: '1px',
            background: '#C4C0BA',
            transformOrigin: 'center',
            marginBottom: 'clamp(36px, 5vh, 64px)',
          }}
        />

        {/* Statement text */}
        <div
          ref={textRef}
          style={{ textAlign: 'center', userSelect: 'none' }}
        >
          {/* Line 1 — "Her yüzey" */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: 0,
              marginBottom: '0.06em',
            }}
          >
            <span
              ref={herRef}
              style={{
                fontFamily:     'var(--font-display), system-ui, sans-serif',
                fontSize:       'clamp(52px, 9vw, 148px)',
                fontWeight:     300,
                lineHeight:     1.0,
                letterSpacing:  '-0.04em',
                color:          '#1A1A18',
                display:        'inline-block',
                fontStyle:      'normal',
                marginRight:    '0.28em',
              }}
            >
              Her
            </span>
            <span
              ref={yuzeyRef}
              style={{
                fontFamily:     'var(--font-display), system-ui, sans-serif',
                fontSize:       'clamp(52px, 9vw, 148px)',
                fontWeight:     300,
                lineHeight:     1.0,
                letterSpacing:  '-0.04em',
                color:          '#1A1A18',
                display:        'inline-block',
              }}
            >
              yüzey
            </span>
          </div>

          {/* Line 2 — "bir karakter taşır." */}
          <div
            ref={line2Ref}
            style={{
              fontFamily:    'var(--font-display), system-ui, sans-serif',
              fontSize:      'clamp(52px, 9vw, 148px)',
              fontWeight:    300,
              lineHeight:    1.0,
              letterSpacing: '-0.04em',
              color:         '#1A1A18',
            }}
          >
            bir karakter taşır.
          </div>
        </div>

        {/* Phase 5 — gold accent line */}
        <div
          ref={goldLineRef}
          aria-hidden="true"
          style={{
            width:           'clamp(160px, 52vw, 780px)',
            height:          '1px',
            background:      'var(--ds-accent)',
            transformOrigin: 'left center',
            marginTop:       'clamp(36px, 5vh, 64px)',
            opacity:         0.85,
          }}
        />
      </div>
    </section>
  )
}
