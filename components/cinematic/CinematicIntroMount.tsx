'use client'

import { useCallback, useState } from 'react'
import { CinematicIntro } from './CinematicIntro'

export function CinematicIntroMount() {
  const [visible, setVisible] = useState(true)
  const handleComplete = useCallback(() => setVisible(false), [])

  if (!visible) return null
  return <CinematicIntro onComplete={handleComplete} />
}
