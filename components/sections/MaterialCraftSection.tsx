'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { Easing, Transition } from 'motion/react'
import Image from 'next/image'

const EASE_MATERIAL: Easing = [0.25, 0.46, 0.45, 0.94]

function tr(dur: number, ease: Easing, delay?: number): Transition {
  if (delay !== undefined) return { duration: dur, ease, delay }
  return { duration: dur, ease }
}

const VIEW = { once: true, amount: 0.12 } as const
const VIEW_EARLY = { once: true, amount: 0.05 } as const

export function MaterialCraftSection() {
  const prefersReduced = useReducedMotion() ?? false

  return (
    <section
      aria-label="Malzeme ve işçilik"
      className="mc-section"
    >
      <div className="mc-shell">

        {/* ── Row 1: Heading + secondary voice ── */}
        <div className="mc-head-row">
          <motion.h2
            className="mc-heading"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={prefersReduced ? tr(0.2, 'easeOut') : tr(0.88, EASE_MATERIAL)}
          >
            Her yüzey<br />bir karardır.
          </motion.h2>

          <motion.p
            className="mc-kicker"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={prefersReduced ? tr(0.2, 'easeOut', 0.06) : tr(0.70, EASE_MATERIAL, 0.38)}
          >
            Yüzeyin kendi bir hafızası vardır.
          </motion.p>
        </div>

        {/* ── Row 2: Primary image (clip-path reveal) + editorial text ── */}
        <div className="mc-primary-row">

          {/* Cinematic bottom-to-top reveal: top inset shrinks from 100% → 0% */}
          <motion.div
            className="mc-primary-image"
            initial={prefersReduced ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
            whileInView={prefersReduced ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
            viewport={VIEW_EARLY}
            transition={prefersReduced ? tr(0.25, 'easeOut') : tr(1.05, EASE_MATERIAL)}
          >
            <Image
              src="/images/craft/craft-01.svg"
              alt="Doğrular Seramik büyük format porselen yüzeyi — eğik ışıkta malzeme derinliği ve doğal taş dokusu"
              fill
              unoptimized
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 100vw, 66vw"
              className="mc-img"
            />
          </motion.div>

          {/* Editorial text — vertically centered beside the image on desktop */}
          <motion.div
            className="mc-primary-text"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={prefersReduced ? tr(0.2, 'easeOut', 0.1) : tr(0.8, EASE_MATERIAL, 0.50)}
          >
            <div className="mc-rule" aria-hidden="true" />
            <p className="mc-para">
              Porselen, 1200°C'de sinterleşerek elde edilir. Bu ısı malzemeye camın pürüzsüzlüğünü, taşın derinliğini ve onlarca yıllık kararlılığı verir.
            </p>
            <p className="mc-para">
              Doğrular Seramik'te her doku, ışıkla ilişkisine göre tasarlanır. Sabah güneşinde, akşam karanlığında, mekânın her saatinde aynı zarafeti taşır.
            </p>
          </motion.div>

        </div>

        {/* ── Row 3: Two detail images — portrait + landscape ── */}
        <div className="mc-detail-row">
          <motion.div
            className="mc-detail-a"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.975 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            viewport={VIEW}
            transition={prefersReduced ? tr(0.2, 'easeOut') : tr(0.82, EASE_MATERIAL)}
          >
            <Image
              src="/images/craft/craft-02.svg"
              alt="Doğrular Seramik porselen yüzey detayı — sinterleşme dokusu, malzemenin özü, yakın çekim"
              fill
              unoptimized
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 41vw"
              className="mc-img"
            />
          </motion.div>

          <motion.div
            className="mc-detail-b"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.975 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            viewport={VIEW}
            transition={prefersReduced ? tr(0.2, 'easeOut', 0.08) : tr(0.82, EASE_MATERIAL, 0.22)}
          >
            <Image
              src="/images/craft/craft-03.svg"
              alt="Doğrular Seramik koleksiyonu mimari uygulamada — büyük format porselen zemin ve duvar sürekliliği, doğal ışık"
              fill
              unoptimized
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 50vw"
              className="mc-img"
            />
          </motion.div>
        </div>

        {/* ── Row 4: Closing statement ── */}
        <motion.p
          className="mc-closing"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={prefersReduced ? tr(0.2, 'easeOut') : tr(0.82, EASE_MATERIAL)}
        >
          Malzeme doğru seçildiğinde, mekân konuşmaya başlar.
        </motion.p>

      </div>
    </section>
  )
}
