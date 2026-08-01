'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import type { Easing, Transition } from 'motion/react'

/* Brand motion signature — cubic-bezier as Motion-compatible tuple */
const EASE_MATERIAL: Easing = [0.25, 0.46, 0.45, 0.94]

/* Shared transition helper */
function t(duration: number, ease: Easing, delay?: number): Transition {
  return delay !== undefined
    ? { duration, ease, delay }
    : { duration, ease }
}

export function HeroSection() {
  const prefersReduced = useReducedMotion() ?? false
  const ctaRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (prefersReduced) return
    const timer = setTimeout(() => {
      const el = ctaRef.current
      if (!el) return
      el.classList.add('hero-cta--pulse')
      const onEnd = () => {
        el.classList.remove('hero-cta--pulse')
        el.removeEventListener('animationend', onEnd)
      }
      el.addEventListener('animationend', onEnd)
    }, 1780)
    return () => clearTimeout(timer)
  }, [prefersReduced])

  return (
    <section
      aria-label="Doğrular Seramik tanıtımı"
      className="hero-section"
    >
      {/* ── Layer 0: Photography ──────────────────────────────────────── */}
      <div className="hero-image-layer">
        <Image
          src="/images/hero/hero-desktop.svg"
          alt="Doğrular Seramik büyük format porselen seramiklerle döşenmiş geniş ve aydınlık bir mimari iç mekan"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-bg-img"
        />
      </div>

      {/* ── Layer 1: Gradient overlay ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="hero-gradient hero-overlay-layer"
      />

      {/* ── Layer 2: Text block ───────────────────────────────────────── */}
      <div className="hero-text">
        {/*
          Headline: clip-path left-to-right curtain reveal (full motion)
          or simple opacity fade (reduced motion). Both lines unveil as one unit —
          an architectural "emerging from stone" quality at full motion.
        */}
        <motion.h1
          className="hero-headline"
          initial={prefersReduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
          animate={prefersReduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
          transition={
            prefersReduced
              ? t(0.3, 'easeOut')
              : t(1.1, EASE_MATERIAL)
          }
        >
          Yüzey
          <br />
          Mimaridir.
        </motion.h1>

        <motion.p
          className="hero-subtext"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? t(0.3, 'easeOut', 0.1)
              : t(0.78, EASE_MATERIAL, 0.70)
          }
        >
          Mimari mekânları tanımlayan büyük format seramik yüzeyler.
        </motion.p>

        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? t(0.3, 'easeOut', 0.15)
              : t(0.70, EASE_MATERIAL, 0.98)
          }
        >
          <Link
            ref={ctaRef}
            href="/ornek-iste"
            className="hero-cta"
          >
            Örnek İste
            <span className="hero-cta__arrow" aria-hidden="true">
              <ArrowDiagonal />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ── Layer 3: Scroll indicator ─────────────────────────────────── */}
      {/*
        Positioning container uses flex-centering — NOT left+translateX —
        so Motion's scaleY on the line itself doesn't fight with CSS transform.
      */}
      {!prefersReduced && (
        <div aria-hidden="true" className="hero-scroll-indicator">
          <motion.div
            className="hero-scroll-line"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={t(0.65, EASE_MATERIAL, 1.78)}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      )}
    </section>
  )
}

/* Inline SVG to avoid external icon dependency — diagonal arrow */
function ArrowDiagonal() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
