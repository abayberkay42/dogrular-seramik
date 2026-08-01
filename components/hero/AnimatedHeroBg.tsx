'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Kategori hero'ları için sinematik arka plan.
 *
 * Koleksiyonlar hero'sundaki davranışın aynısı:
 *   • açılışta hafif zoom-out ile belirme
 *   • fare hareketiyle yumuşak paralaks (RAF + lerp)
 *   • aşağı kaydırdıkça arka plan büyür, içerik yukarı kayıp solar
 *
 * Kapsayıcı <section> içine konur; tetikleyici olarak en yakın section'ı,
 * içerik olarak da bilinen hero sarmalayıcılarından ilk bulunanı kullanır.
 */
const ICERIK_SECICI = [
  '.vc-hero-inner',
  '.vt-hero-inner',
  '.ab-hero-inner',
  '.kat-shell',
].join(',')

export function AnimatedHeroBg({ src }: { src: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion() ?? false
  const mouse = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 })

  /* ── Açılış + scroll scrub ─────────────────────────────────────── */
  useEffect(() => {
    const root = rootRef.current
    const inner = innerRef.current
    if (!root || !inner) return

    if (prefersReduced) {
      gsap.set(root, { opacity: 1 })
      return
    }

    const section = root.closest('section')
    const content = section?.querySelector<HTMLElement>(ICERIK_SECICI) ?? null

    const ctx = gsap.context(() => {
      gsap.set(root, { opacity: 0 })
      gsap.set(inner, { scale: 1.1 })

      gsap.timeline()
        .to(root, { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0)
        .to(inner, { scale: 1, duration: 1.8, ease: 'power4.out' }, 0)

      if (!section) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      })
      tl.to(inner, { scale: 1.12, ease: 'none' }, 0)
      if (content) {
        tl.to(content, { y: -70, opacity: 0.1, ease: 'none' }, 0)
      }
    }, root)

    return () => ctx.revert()
  }, [prefersReduced])

  /* ── Fare paralaksı ────────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReduced) return
    let raf = 0

    const onMouse = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      const m = mouse.current
      m.cx += (m.tx - m.cx) * 0.05
      m.cy += (m.ty - m.cy) * 0.05
      if (innerRef.current) {
        gsap.set(innerRef.current, { x: m.cx * 14, y: m.cy * 10 })
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
    <div ref={rootRef} className="ahb" aria-hidden="true">
      <div
        ref={innerRef}
        className="ahb-inner"
        style={{ backgroundImage: `url('${src}')` }}
      />
    </div>
  )
}
