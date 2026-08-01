'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { search, type SearchEntry, type ResultType } from '@/lib/search-index'

const TYPE_LABELS: Record<ResultType, string> = {
  kategori: 'Kategori',
  seri: 'Seri',
  vitrifiye: 'Vitrifiye',
  sayfa: 'Sayfa',
  kimyasal: 'Yapı Kimyasalı',
  mobilya: 'Banyo Mobilyası',
  blog: 'Blog',
  marka: 'Marka',
  katalog: 'Katalog',
}

interface Props {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: Props) {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [cursor,  setCursor]  = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef  = useRef<HTMLUListElement>(null)
  const prefersReduced = useReducedMotion() ?? false

  // Reset state every time modal opens
  useEffect(() => {
    if (!open) return
    setQuery('')
    setResults([])
    setCursor(-1)
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(raf)
  }, [open])

  // Update results on query change
  useEffect(() => {
    setResults(search(query))
    setCursor(-1)
  }, [query])

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Scroll active result into view
  useEffect(() => {
    if (cursor < 0 || !listRef.current) return
    const items = listRef.current.querySelectorAll<HTMLElement>('[data-result]')
    items[cursor]?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowDown':
        e.preventDefault()
        setCursor((c) => Math.min(c + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setCursor((c) => Math.max(c - 1, -1))
        break
      case 'Enter':
        if (cursor >= 0 && results[cursor]) {
          e.preventDefault()
          window.location.href = results[cursor].href
          onClose()
        }
        break
    }
  }, [cursor, results, onClose])

  const hasResults = results.length > 0
  const hasQuery   = query.trim().length > 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="srch-backdrop"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Positioning wrapper — keeps centering independent from motion transform */}
          <div className="srch-panel-outer">
          <motion.div
            className="srch-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site araması"
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: prefersReduced ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -6 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.22,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {/* Input row */}
            <div className="srch-input-row">
              <svg
                className="srch-input-icon"
                width="17" height="17"
                viewBox="0 0 17 17"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.35"/>
                <path d="M11 11L15 15" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
              </svg>

              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="srch-input"
                placeholder="Seri, koleksiyon, ürün ara..."
                autoComplete="off"
                spellCheck={false}
                aria-label="Arama sorgusu"
                aria-controls="srch-listbox"
                aria-activedescendant={cursor >= 0 ? `srch-opt-${cursor}` : undefined}
                role="combobox"
                aria-expanded={hasResults}
                aria-haspopup="listbox"
              />

              <button
                className="srch-close-btn"
                onClick={onClose}
                aria-label="Aramayı kapat (Esc)"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Results */}
            {hasResults && (
              <ul
                ref={listRef}
                id="srch-listbox"
                className="srch-results"
                role="listbox"
                aria-label="Arama sonuçları"
              >
                {results.map((entry, i) => (
                  <li key={`${entry.id}-${i}`} role="presentation">
                    <Link
                      id={`srch-opt-${i}`}
                      href={entry.href}
                      role="option"
                      aria-selected={cursor === i}
                      data-result
                      className={`srch-result${cursor === i ? ' srch-result--active' : ''}`}
                      onClick={onClose}
                      onMouseEnter={() => setCursor(i)}
                    >
                      <span className={`srch-badge srch-badge--${entry.type}`}>
                        {TYPE_LABELS[entry.type]}
                      </span>

                      <span className="srch-result-text">
                        <span className="srch-result-title">{entry.title}</span>
                        <span className="srch-result-sub">{entry.subtitle}</span>
                      </span>

                      <svg
                        className="srch-result-arrow"
                        width="13" height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6.5H11M7.5 3L11 6.5L7.5 10"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Empty state */}
            {!hasResults && hasQuery && (
              <div className="srch-empty">
                <p className="srch-empty-text">
                  &ldquo;<em>{query}</em>&rdquo; için sonuç bulunamadı.
                </p>
              </div>
            )}

            {/* Footer keyboard hints */}
            <div className="srch-footer" aria-hidden="true">
              <span className="srch-hint">
                <kbd>↑</kbd><kbd>↓</kbd> gezin
              </span>
              <span className="srch-hint">
                <kbd>↵</kbd> seç
              </span>
              <span className="srch-hint">
                <kbd>Esc</kbd> kapat
              </span>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
