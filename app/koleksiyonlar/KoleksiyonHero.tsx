'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  '/images/hero/slider/leton.webp',
  '/images/hero/slider/paradise.webp',
  '/images/hero/slider/datca.webp',
  '/images/hero/slider/meridyen.webp',
  '/images/hero/slider/pebble-pearl.webp',
]

interface Props {
  katCount: number
  seriCount: number
}

export function KoleksiyonHero({ katCount, seriCount }: Props) {
  const heroRef     = useRef<HTMLElement>(null)
  const bgLayerRef  = useRef<HTMLDivElement>(null)
  const bgInnerRef  = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const imgRefs     = useRef<(HTMLDivElement | null)[]>([])
  const katNumRef   = useRef<HTMLSpanElement>(null)
  const seriNumRef  = useRef<HTMLSpanElement>(null)

  const prefersReduced = useReducedMotion() ?? false
  const mouse = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 })

  // ── Opening timeline + crossfade + scroll scrub ───────────────────
  useEffect(() => {
    const imgs = imgRefs.current.filter(Boolean) as HTMLDivElement[]

    if (prefersReduced) {
      if (imgs[0]) gsap.set(imgs[0], { opacity: 1 })
      if (bgLayerRef.current) gsap.set(bgLayerRef.current, { opacity: 1 })
      return
    }

    let crossfadeTimer: ReturnType<typeof setInterval>

    const ctx = gsap.context(() => {
      // ── Initial states ───────────────────────────────────────────
      gsap.set(bgLayerRef.current, { opacity: 0, scale: 1.12 })
      gsap.set(imgs, { opacity: 0 })
      if (imgs[0]) gsap.set(imgs[0], { opacity: 1 })

      const content    = contentRef.current
      if (!content) return

      const label      = content.querySelector<HTMLElement>('.kh-label')
      const titleLines = content.querySelectorAll<HTMLElement>('.kh-title-line')
      const leadLines  = content.querySelectorAll<HTMLElement>('.kh-lead-line')
      const statsEl    = content.querySelector<HTMLElement>('.kh-stats')

      gsap.set([label, titleLines, leadLines, statsEl], { opacity: 0, y: 30 })

      // ── Opening timeline ─────────────────────────────────────────
      const tl = gsap.timeline()

      tl.to(bgLayerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 2.0,
          ease: 'power4.out',
        }, 0.4)
        .to(label, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.2)
        .to(titleLines, {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.14,
        }, 1.52)
        .to(leadLines, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        }, 2.0)
        .to(statsEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 2.4)

      // ── Counter animation ────────────────────────────────────────
      const animateCounter = (el: HTMLSpanElement | null, target: number) => {
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          delay: 2.45,
          ease: 'power2.out',
          onUpdate() { el.textContent = String(Math.round(obj.val)) },
        })
      }
      animateCounter(katNumRef.current, katCount)
      animateCounter(seriNumRef.current, seriCount)

      // ── Crossfade between images ─────────────────────────────────
      let cur = 0
      if (imgs.length > 1) {
        crossfadeTimer = setInterval(() => {
          const nxt = (cur + 1) % imgs.length
          gsap.to(imgs[cur], { opacity: 0, duration: 2.0, ease: 'power2.inOut' })
          gsap.to(imgs[nxt], { opacity: 1, duration: 2.0, ease: 'power2.inOut' })
          cur = nxt
        }, 6000)
      }

      // ── Scroll scrub ─────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      })
        .to(bgLayerRef.current, { scale: 1.1, ease: 'none' }, 0)
        .to(contentRef.current, { y: -80, opacity: 0, ease: 'none' }, 0)
    }, heroRef)

    return () => {
      ctx.revert()
      clearInterval(crossfadeTimer)
    }
  }, [prefersReduced, katCount, seriCount])

  // ── Mouse parallax (RAF lerp) ─────────────────────────────────────
  useEffect(() => {
    if (prefersReduced) return
    let raf: number

    const onMouse = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      const m = mouse.current
      m.cx += (m.tx - m.cx) * 0.05
      m.cy += (m.ty - m.cy) * 0.05
      if (bgInnerRef.current) {
        gsap.set(bgInnerRef.current, { x: m.cx * 9, y: m.cy * 7 })
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [prefersReduced])

  return (
    <section ref={heroRef} className="kh-hero" aria-label="Koleksiyonlar sayfası başlığı">

      {/* ── Cinematic background ───────────────────────────────── */}
      <div ref={bgLayerRef} className="kh-bg-layer" aria-hidden="true">
        <div ref={bgInnerRef} className="kh-bg-inner">
          {IMAGES.map((src, i) => (
            <div
              key={src}
              ref={(el) => { imgRefs.current[i] = el }}
              className="kh-bg-img-wrap"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="kh-bg-img"
                loading={i === 0 ? 'eager' : 'lazy'}
                // @ts-expect-error — fetchpriority is a valid HTML attribute
                fetchpriority={i === 0 ? 'high' : 'auto'}
                decoding={i === 0 ? 'sync' : 'async'}
              />
            </div>
          ))}
        </div>
        <div className="kh-vignette" aria-hidden="true" />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div ref={contentRef} className="kh-content">
        <div className="kh-content-inner">

          <p className="kh-label" aria-hidden="true">Koleksiyonlar</p>

          <h1 className="kh-title">
            <span className="kh-title-line">Yüzeyin dili</span>
          </h1>

          <p className="kh-lead" role="doc-subtitle">
            <span className="kh-lead-line">Her koleksiyon, mimari bir karakter kararıdır.</span>
            <span className="kh-lead-line">Doğal taştan beton estetiğine,</span>
            <span className="kh-lead-line">mineral tonlardan dekoratif dokusallığa.</span>
          </p>

          <div className="kh-stats">
            <div className="kh-stat">
              <span
                ref={katNumRef}
                className="kh-stat-num"
                aria-label={`${katCount} kategori`}
              >
                {katCount}
              </span>
              <span className="kh-stat-label" aria-hidden="true">Kategori</span>
            </div>
            <span className="kh-stat-sep" aria-hidden="true" />
            <div className="kh-stat">
              <span
                ref={seriNumRef}
                className="kh-stat-num"
                aria-label={`${seriCount} seri`}
              >
                {seriCount}
              </span>
              <span className="kh-stat-label" aria-hidden="true">Seri</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
