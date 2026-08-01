'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import type { Easing, Transition } from 'motion/react'
import { SearchModal } from '@/components/search/SearchModal'

const EASE_MATERIAL: Easing = [0.25, 0.46, 0.45, 0.94]

function t(duration: number, ease: Easing, delay?: number): Transition {
  return delay !== undefined ? { duration, ease, delay } : { duration, ease }
}

const NAV_LINKS = [
  { href: '/vitrifiye',     label: 'Vitrifiye' },
  { href: '/kataloglar',    label: 'Kataloglar' },
  { href: '/markalarimiz',  label: 'Markalarımız' },
  { href: '/blog',          label: 'Blog' },
  { href: '/hakkimizda',    label: 'Hakkımızda' },
  { href: '/iletisim',      label: 'İletişim' },
] as const

const URUNLER_ITEMS = [
  { href: '/koleksiyonlar',                  label: 'Koleksiyonlar' },
  { href: '/vitrifiye/etajerli-lavabolar',   label: 'Etajerlı Lavabolar' },
  { href: '/vitrifiye/tezgahustu-lavabolar', label: 'Tezgahüstü Lavabolar' },
  { href: '/vitrifiye/tezgah-alti-lavabolar', label: 'Tezgahaltı Lavabolar' },
  { href: '/vitrifiye/klozet-takimlari',     label: 'Klozet Takımları' },
  { href: '/vitrifiye/araturler',            label: 'Armatürler' },
  { href: '/vitrifiye/dus-sistemleri',       label: 'Duş Sistemleri' },
  { href: '/vitrifiye/tamamlayici',          label: 'Tamamlayıcı Ürünler' },
  { href: '/kimyasal-urunler',               label: 'Kimyasal Ürünler' },
  { href: '/banyo-mobilyalari',              label: 'Banyo Mobilyaları' },
]

export function NavigationBar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [searchOpen,    setSearchOpen]    = useState(false)
  const [urunlerOpen,   setUrunlerOpen]   = useState(false)
  const [mobileUrunler, setMobileUrunler] = useState(false)
  const urunlerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname        = usePathname()
  const prefersReduced  = useReducedMotion() ?? false
  const menuBtnRef      = useRef<HTMLButtonElement>(null)
  /* Mobil menü açıldığında odaklanılan ilk öğe — Ürünler akordiyon butonu. */
  const firstLinkRef    = useRef<HTMLButtonElement>(null)
  const searchBtnRef    = useRef<HTMLButtonElement>(null)

  const openSearch  = useCallback(() => { setMenuOpen(false); setSearchOpen(true) }, [])
  const closeSearch = useCallback(() => { setSearchOpen(false); searchBtnRef.current?.focus() }, [])

  const openUrunler  = () => { if (urunlerTimeout.current) clearTimeout(urunlerTimeout.current); setUrunlerOpen(true) }
  const closeUrunler = () => { urunlerTimeout.current = setTimeout(() => setUrunlerOpen(false), 120) }

  /* Scroll threshold ── fill background after 80 px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close menu + search on route change */
  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [pathname])

  /* Cmd+K / Ctrl+K opens search */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openSearch])

  /* Body scroll lock + focus to first link on open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => firstLinkRef.current?.focus())
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Escape closes menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  /* Açık zeminli sayfalarda şeffaf navbar okunmaz (logo ve linkler beyaz),
     bu yüzden bar en tepede de dolu kalır. */
  const LIGHT_PAGES = ['/blog', '/kataloglar']
  const isLightPage = LIGHT_PAGES.some(
    (p) => pathname === p || pathname.startsWith(p + '/'),
  )

  const filled = scrolled || menuOpen || isLightPage

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────────────────── */}
      <header
        className={`nav-header${filled ? ' nav-header--filled' : ''}`}
        aria-label="Ana gezinme"
      >
        {/* Background layer — opacity-controlled so backdrop-filter doesn't
            blur the hero while transparent */}
        <div className="nav-bg" aria-hidden="true" />

        <div className="nav-inner">

          {/* Logo */}
          <Link
            href="/"
            className="nav-logo"
            aria-label="Doğrular Seramik — Ana sayfa"
          >
            <Image
              src="/images/logo-nav.png"
              alt="Doğrular Seramik"
              width={81}
              height={48}
              className="nav-logo__img"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop links + right controls */}
          <div className="nav-right">
            <nav className="nav-links" aria-label="Site gezintisi">

              {/* Ürünler dropdown */}
              <div
                className="nav-dropdown-wrap"
                onMouseEnter={openUrunler}
                onMouseLeave={closeUrunler}
              >
                <button
                  className={`nav-link nav-dropdown-btn${
                    (isActive('/koleksiyonlar') || isActive('/vitrifiye')) ? ' nav-link--active' : ''
                  }${urunlerOpen ? ' nav-link--open' : ''}`}
                  aria-expanded={urunlerOpen}
                  aria-haspopup="true"
                  onClick={() => setUrunlerOpen(v => !v)}
                >
                  Ürünler
                  <svg className="nav-dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <AnimatePresence>
                  {urunlerOpen && (
                    <motion.div
                      className="nav-dropdown"
                      role="menu"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={t(prefersReduced ? 0.1 : 0.2, EASE_MATERIAL)}
                      onMouseEnter={openUrunler}
                      onMouseLeave={closeUrunler}
                    >
                      {URUNLER_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className={`nav-dropdown-item${isActive(item.href) ? ' nav-dropdown-item--active' : ''}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link${isActive(link.href) ? ' nav-link--active' : ''}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/ornek-iste"
              className="nav-cta"
              aria-label="Örnek talep formu"
            >
              Örnek İste
            </Link>

            {/* Search trigger */}
            <button
              ref={searchBtnRef}
              className="nav-search-btn"
              onClick={openSearch}
              aria-label="Arama (Ctrl+K)"
              aria-keyshortcuts="Control+k Meta+k"
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.35"/>
                <path d="M11 11L15 15" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              ref={menuBtnRef}
              className="nav-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="nav-mobile-menu"
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              <span
                className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
                aria-hidden="true"
              >
                <span className="nav-hamburger__top" />
                <span className="nav-hamburger__btm" />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ── Search modal ─────────────────────────────────────────────────── */}
      <SearchModal open={searchOpen} onClose={closeSearch} />

      {/* ── Mobile full-screen overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-mobile-menu"
            className="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Gezinme menüsü"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={t(prefersReduced ? 0.12 : 0.28, EASE_MATERIAL)}
          >
            {/* Large typographic links */}
            <nav
              className="nav-overlay-nav"
              aria-label="Mobil site gezintisi"
            >
              {/* Ürünler accordion */}
              <motion.div
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={t(prefersReduced ? 0.12 : 0.54, EASE_MATERIAL, prefersReduced ? 0 : 0.06)}
              >
                <button
                  ref={firstLinkRef}
                  className="nav-overlay-link nav-overlay-accordion-btn"
                  onClick={() => setMobileUrunler(v => !v)}
                  aria-expanded={mobileUrunler}
                >
                  Ürünler
                  <svg className={`nav-overlay-chevron${mobileUrunler ? ' is-open' : ''}`} width="12" height="7" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileUrunler && (
                    <motion.div
                      className="nav-overlay-sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={t(prefersReduced ? 0.1 : 0.25, EASE_MATERIAL)}
                    >
                      {URUNLER_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`nav-overlay-sub-link${isActive(item.href) ? ' is-active' : ''}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
                  animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={t(
                    prefersReduced ? 0.12 : 0.54,
                    EASE_MATERIAL,
                    prefersReduced ? 0 : 0.13 + i * 0.07,
                  )}
                >
                  <Link
                    href={link.href}
                    className={`nav-overlay-link${isActive(link.href) ? ' is-active' : ''}`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer: CTA + language */}
            <motion.div
              className="nav-overlay-foot"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={t(
                prefersReduced ? 0.12 : 0.44,
                EASE_MATERIAL,
                prefersReduced ? 0 : 0.34,
              )}
            >
              <button className="nav-overlay-search-btn" onClick={openSearch} aria-label="Arama">
                <svg width="16" height="16" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.35"/>
                  <path d="M11 11L15 15" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
                </svg>
                Ara
              </button>

              <Link href="/ornek-iste" className="nav-overlay-cta">
                Örnek İste
                <span className="nav-overlay-cta__arrow" aria-hidden="true">→</span>
              </Link>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

