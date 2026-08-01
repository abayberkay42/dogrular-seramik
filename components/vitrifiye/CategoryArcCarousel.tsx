'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from 'motion/react'

export type ArcCategory = {
  slug: string
  label: string
  description: string
  count: number
  image: string
}

const SPACING = 190
const NORM_DIVISOR = 380
const MAX_NORM = 1.6
const SPRING = { type: 'spring' as const, stiffness: 260, damping: 32, mass: 0.6 }

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function ArcCard({
  index,
  x,
  count,
  cat,
  onNavigate,
}: {
  index: number
  x: MotionValue<number>
  count: number
  cat: ArcCategory
  onNavigate: (slug: string) => void
}) {
  const range = SPACING * count
  // wrap this card's position into a symmetric window so the row loops forever
  const pos = useTransform(x, (v) => {
    const raw = v + index * SPACING
    const half = range / 2
    return ((raw + half) % range + range) % range - half
  })
  const rawNorm = useTransform(pos, (v) => v / NORM_DIVISOR)
  const norm = useTransform(rawNorm, (n) => clamp(n, -MAX_NORM, MAX_NORM))

  const translateX = pos
  // quadratic falloff bows the row into a symmetric arc (center highest, both ends drop)
  const translateY = useTransform(norm, (n) => n * n * 72)
  // cards lean INWARD, toward the centre: left side tilts right, right side tilts left
  const rotate = useTransform(norm, (n) => n * 20)
  const scale = useTransform(norm, (n) => clamp(1 - Math.abs(n) * 0.2, 0.7, 1))
  const zIndex = useTransform(norm, (n) => Math.round(100 - Math.abs(n) * 10))
  // fade fully out before the wrap point so the loop-around teleport is never visible
  const opacity = useTransform(rawNorm, (n) => clamp(1 - (Math.abs(n) - 1) / 0.7, 0, 1))

  return (
    <motion.a
      href={`/vitrifiye/${cat.slug}`}
      className="cac-card"
      style={{ x: translateX, y: translateY, rotate, scale, zIndex, opacity }}
      onClick={(e) => {
        e.preventDefault()
        onNavigate(cat.slug)
      }}
    >
      <div className="cac-card-inner">
        <Image
          src={cat.image}
          alt={cat.label}
          fill
          unoptimized
          draggable={false}
          sizes="(max-width: 767px) 40vw, 230px"
          className="cac-card-img"
        />
        <div className="cac-card-overlay" aria-hidden="true" />
        <div className="cac-card-body">
          <span className="cac-card-count">{cat.count} Seri</span>
          <h3 className="cac-card-label">{cat.label}</h3>
          <span className="cac-card-cta">Ürünleri Gör →</span>
        </div>
      </div>
    </motion.a>
  )
}

export function CategoryArcCarousel({ categories }: { categories: ArcCategory[] }) {
  const router = useRouter()
  const count = categories.length
  const lastIndex = count - 1
  const initialIndex = Math.round(lastIndex / 2)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const draggedRef = useRef(false)
  const dragStartX = useRef(0)
  const x = useMotionValue(-initialIndex * SPACING)

  const settleTo = (index: number) => {
    const wrapped = ((index % count) + count) % count
    setActiveIndex(wrapped)
    animate(x, -index * SPACING, SPRING)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const velocity = info.velocity.x
    let target = Math.round(-x.get() / SPACING)
    if (Math.abs(velocity) > 420) {
      target += velocity < 0 ? 1 : -1
    }
    settleTo(target)
    // swallow the click that follows a real drag
    setTimeout(() => { draggedRef.current = false }, 60)
  }

  const handleNavigate = (slug: string) => {
    if (draggedRef.current) return
    router.push(`/vitrifiye/${slug}`)
  }

  const progress = lastIndex === 0 ? 0 : activeIndex / lastIndex

  return (
    <div className="cac-wrap">
      <div className="cac-stage">
        <motion.div
          className="cac-surface"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => {
            draggedRef.current = true
            dragStartX.current = x.get()
          }}
          onDrag={(_, info) => {
            if (Math.abs(info.offset.x) > 4) draggedRef.current = true
            x.set(dragStartX.current + info.offset.x)
          }}
          onDragEnd={handleDragEnd}
          onClick={(e) => {
            // the surface sits above the cards to capture drags — on a plain
            // click (no real drag happened) forward it to the card underneath
            if (draggedRef.current) return
            const hit = document
              .elementsFromPoint(e.clientX, e.clientY)
              .find((el) => el !== e.currentTarget && (el as HTMLElement).closest('.cac-card'))
            const card = hit ? (hit as HTMLElement).closest('.cac-card') as HTMLAnchorElement | null : null
            const href = card?.getAttribute('href')
            if (href) router.push(href)
          }}
        />
        {categories.map((cat, i) => (
          <ArcCard key={cat.slug} index={i} x={x} count={count} cat={cat} onNavigate={handleNavigate} />
        ))}
      </div>

      <div className="cac-progress">
        <div className="cac-progress-track">
          <motion.div
            className="cac-progress-fill"
            animate={{ left: `${progress * 100}%` }}
            transition={SPRING}
          />
        </div>
      </div>
      <p className="cac-hint">
        <span className="cac-hint-arrow" aria-hidden="true">↔</span> Sürükleyerek gezinin
      </p>
    </div>
  )
}
