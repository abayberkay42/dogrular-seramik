'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'
import type { Easing, Transition } from 'motion/react'

const EASE_MATERIAL: Easing = [0.25, 0.46, 0.45, 0.94]

function t(duration: number, ease: Easing, delay?: number): Transition {
  return delay !== undefined ? { duration, ease, delay } : { duration, ease }
}

export function BrandStatementSection() {
  const prefersReduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section
      aria-label="Doğrular Seramik yaklaşımı"
      className="brand-statement-section"
    >
      <div ref={ref} className="brand-statement-inner">

        {/*
          Accent rule: the only use of --ds-accent in this section (D-023).
          Clip-path left-to-right reveal mirrors the hero headline entry gesture.
        */}
        <motion.div
          aria-hidden="true"
          className="brand-statement-rule"
          initial={prefersReduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
          animate={
            isInView
              ? prefersReduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }
              : prefersReduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }
          }
          transition={prefersReduced ? t(0.2, 'easeOut') : t(0.55, EASE_MATERIAL)}
        />

        {/*
          Sentence 1 — Philosophical claim. Large display scale.
          Sets the context: space is defined by surfaces, not furniture.
        */}
        <motion.p
          className="brand-statement-text brand-statement-text--primary"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={
            isInView
              ? prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }
              : prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }
          }
          transition={prefersReduced ? t(0.2, 'easeOut', 0.04) : t(0.85, EASE_MATERIAL, 0.15)}
        >
          Bir mekânı kalıcı kılan şey, içindeki mobilya değildir; zemini, duvarı, her yüzeyidir.
        </motion.p>

        {/*
          Sentence 2 — Technical proof. Intimate body scale, muted.
          The scale drop creates tension: the reader leans in to read the evidence.
          DM Sans weight 300 introduces warmth against Syne's geometry.
        */}
        <motion.p
          className="brand-statement-text brand-statement-text--intimate"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={
            isInView
              ? prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }
              : prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }
          }
          transition={prefersReduced ? t(0.2, 'easeOut', 0.06) : t(0.8, EASE_MATERIAL, 0.38)}
        >
          Porselen, 1200 derece ısıda sinterleşerek ışığı ve zamanı onlarca yıl aynı biçimde taşır.
        </motion.p>

        {/*
          Sentence 3 — Brand proclamation. Largest scale, longest duration.
          The climax. Lands with maximum weight after the intimate pause of sentence 2.
        */}
        <motion.p
          className="brand-statement-text brand-statement-text--climax"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={
            isInView
              ? prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }
              : prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }
          }
          transition={prefersReduced ? t(0.2, 'easeOut', 0.08) : t(0.95, EASE_MATERIAL, 0.65)}
        >
          Biz yüzey üretmiyoruz. Mekânın mimarisini inşa ediyoruz.
        </motion.p>

      </div>
    </section>
  )
}
