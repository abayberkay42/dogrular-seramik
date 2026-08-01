'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { Easing, Transition } from 'motion/react'
import Image from 'next/image'

const EASE_MATERIAL: Easing = [0.25, 0.46, 0.45, 0.94]

function tr(dur: number, ease: Easing, delay?: number): Transition {
  if (delay !== undefined) return { duration: dur, ease, delay }
  return { duration: dur, ease }
}

const VIEW = { once: true, amount: 0.12 } as const
const VIEW_EARLY = { once: true, amount: 0.04 } as const

export function LuxuryTrustSection() {
  const prefersReduced = useReducedMotion() ?? false
  const imageRef = useRef<HTMLDivElement>(null)

  // Scroll-linked parallax — image moves slightly slower than the viewport
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const rawImageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  // Hooks called unconditionally; parallax disabled for reduced-motion users at runtime
  const imageY = prefersReduced ? ('0%' as const) : rawImageY

  return (
    <section aria-label="Mimari bakış açımız" className="lte-section">
      <div className="lte-shell">

        {/* ── Declaration heading — large, commanding, white on dark ── */}
        <motion.div
          className="lte-top"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={prefersReduced ? tr(0.2, 'easeOut') : tr(0.92, EASE_MATERIAL)}
        >
          <h2 className="lte-heading">
            Seramiği biliriz.<br />Mimariyi düşünürüz.
          </h2>
        </motion.div>

        {/* ── Full-width architectural image with subtle scroll parallax ── */}
        <motion.div
          ref={imageRef}
          className="lte-image-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEW_EARLY}
          transition={tr(1.15, EASE_MATERIAL)}
        >
          {/* Inner div extends beyond container — allows parallax without revealing bg */}
          <motion.div className="lte-image-inner" style={{ y: imageY }}>
            <Image
              src="/images/trust/trust-01.svg"
              alt="Doğrular Seramik showroom — hassas aydınlatma altında koleksiyon örnekleri, mimari atmosfer"
              fill
              unoptimized
              sizes="100vw"
              className="lte-img"
            />
          </motion.div>
        </motion.div>

        {/* ── Asymmetric editorial prose — proof through specificity ── */}
        <div className="lte-body-row">
          <motion.div
            className="lte-body-main"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={prefersReduced ? tr(0.2, 'easeOut', 0.06) : tr(0.84, EASE_MATERIAL, 0.15)}
          >
            <p className="lte-body-text">
              Koleksiyonlarımız standart katalog ürünleri değildir. Her biri, mimarların belirli bir mekân sorusuna yanıt ararken doğmuştur: ışık nereye düşmeli, yüzey ne kadar derinlik taşımalı, malzeme onlarca yıl nasıl yaşlanmalı. Bu soruları ciddiye aldığımızda, ortaya gerçekten farklı bir şey çıkıyor.
            </p>
          </motion.div>

          <motion.div
            className="lte-body-aside"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={prefersReduced ? tr(0.2, 'easeOut', 0.1) : tr(0.78, EASE_MATERIAL, 0.35)}
          >
            <p className="lte-aside-text">
              Doğru malzemeyi bulmak, mimari kalitenin en kritik kararıdır. Bu kararı veren kişinin yanında olmak, markamızın varoluş sebebidir.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
