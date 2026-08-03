'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import type { Easing, Transition } from 'motion/react'
import { COLLECTIONS } from '@/lib/data'

const EASE_MATERIAL: Easing = [0.25, 0.46, 0.45, 0.94]

function t(duration: number, ease: Easing, delay?: number): Transition {
  return delay !== undefined ? { duration, ease, delay } : { duration, ease }
}

const VIEWPORT = { once: true, amount: 0.08 }

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const prefersReduced = useReducedMotion() ?? false

  const fadeUp = (delay = 0) => ({
    initial: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    whileInView: prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: t(prefersReduced ? 0.2 : 0.82, EASE_MATERIAL, delay),
  })

  return (
    <footer className="site-footer" aria-label="Site altı">

      {/* Section boundary — architectural separator */}
      <div className="footer-boundary" aria-hidden="true" />

      <div className="footer-shell">

        {/* ── Main editorial grid ──────────────────────────────────────────── */}
        <div className="footer-grid">

          {/* ── A: Brand identity ── */}
          <motion.div className="footer-brand" {...fadeUp()}>
            <Link
              href="/"
              className="footer-logo"
              aria-label="Doğrular Seramik — Ana sayfa"
            >
              <span className="footer-logo__name">Doğrular</span>
              <span className="footer-logo__sub">Seramik</span>
            </Link>

            <p className="footer-statement">
              Mimari mekânları tanımlayan büyük format porselen yüzeyler.
              Seramiği biliriz. Mimariyi düşünürüz.
            </p>

            <nav
              className="footer-social"
              aria-label="Sosyal medya bağlantıları"
            >
              <a
                href="https://www.instagram.com/dogrularseramik/"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram'da takip edin (yeni sekmede açılır)"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com/dogrularseramik"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest'te takip edin (yeni sekmede açılır)"
              >
                Pinterest
              </a>
              <a
                href="https://linkedin.com/company/dogrularseramik"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn'de takip edin (yeni sekmede açılır)"
              >
                LinkedIn
              </a>
            </nav>
          </motion.div>

          {/* ── B: Collections ── */}
          <motion.div {...fadeUp(0.09)}>
            <nav aria-label="Koleksiyonlar gezintisi">
              <h3 className="footer-group-label">Koleksiyonlar</h3>
              <ul className="footer-link-list">
                {COLLECTIONS.map((col) => (
                  <li key={col.slug}>
                    <Link href={`/koleksiyonlar/${col.slug}`} className="footer-link">
                      {col.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/koleksiyonlar"
                    className="footer-link footer-link--all"
                  >
                    Tüm Koleksiyonlar →
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>

          {/* ── C: Pages + Projects ── */}
          <motion.div {...fadeUp(0.16)}>
            <nav aria-label="Site sayfaları">
              <h3 className="footer-group-label">Keşfet</h3>
              <ul className="footer-link-list">
                <li>
                  <Link href="/koleksiyonlar" className="footer-link">
                    Koleksiyonlar
                  </Link>
                </li>
                <li>
                  <Link href="/vitrifiye" className="footer-link">
                    Vitrifiye Ürünleri
                  </Link>
                </li>
                <li>
                  <Link href="/kataloglar" className="footer-link">
                    Kataloglar
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" className="footer-link">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/ornek-iste" className="footer-link">
                    Örnek İste
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="footer-link">
                    İletişim
                  </Link>
                </li>
              </ul>
            </nav>

          </motion.div>

          {/* ── D: Contact ── */}
          <motion.div {...fadeUp(0.22)}>
            <address
              className="footer-contact"
              aria-label="İletişim bilgileri"
            >
              <h3 className="footer-group-label">İletişim</h3>

              <div className="footer-contact-body">
                <a
                  href="mailto:dogrularseramik@gmail.com"
                  className="footer-contact-row footer-contact-row--link"
                >
                  dogrularseramik@gmail.com
                </a>
                <a
                  href="tel:+905373575667"
                  className="footer-contact-row footer-contact-row--link"
                >
                  +90 537 357 56 67
                </a>
                <p className="footer-contact-row footer-contact-row--address">
                  Güneysöğüt, Antakya Samandağ Yolu<br />
                  31160 Hatay Merkez / Hatay
                </p>
                <Link href="/ornek-iste" className="footer-contact-cta">
                  Örnek İste →
                </Link>
              </div>
            </address>
          </motion.div>

        </div>

        {/* ── Google Maps ──────────────────────────────────────────────────── */}
        <motion.div className="footer-map" {...fadeUp(0.25)}>

          {/* Label */}
          <p className="footer-map-label">Mağaza Konumu</p>

          {/* Map iframe */}
          <div className="footer-map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.584709333667!2d36.113847076359214!3d36.17665920259917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1525c49eaaca5961%3A0x7dc25f0d8310d5f0!2sDo%C4%9Frular%20Seramik%20Yap%C4%B1%20%E2%80%93%20Hatay%20Antakya%20Seramik%2C%20Vitrifiye%20%26%20Banyo%20%26%20S%C4%B1hhi%20Tesisat!5e0!3m2!1str!2str!4v1781535408602!5m2!1str!2str"
              title="Doğrular Seramik konumu — Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address card */}
          <div className="footer-map-addr">
            <svg
              className="footer-map-addr-pin"
              width="18" height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 1.5C6.515 1.5 4.5 3.515 4.5 6C4.5 9.75 9 16.5 9 16.5C9 16.5 13.5 9.75 13.5 6C13.5 3.515 11.485 1.5 9 1.5Z"
                fill="currentColor"
              />
              <circle cx="9" cy="6" r="2" fill="white" />
            </svg>
            <div className="footer-map-addr-body">
              <p className="footer-map-addr-line1">Güneysöğüt, Antakya Samandağ Yolu</p>
              <p className="footer-map-addr-line2">31160 Hatay Merkez / Hatay</p>
              <a
                href="https://maps.google.com/?q=Doğrular+Seramik+Yapı+Hatay+Antakya"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-addr-link"
              >
                Google Haritalar&apos;da Aç
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </motion.div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <motion.div className="footer-bottom" {...fadeUp(0.28)}>
          <div className="footer-bottom-rule" aria-hidden="true" />

          <div className="footer-bottom-inner">

            {/* Architectural colophon — geographic anchor, typographic detail */}
            <p className="footer-colophon" aria-hidden="true">
              36.1766° K&thinsp;·&thinsp;36.1138° D&thinsp;·&thinsp;Hatay Antakya&thinsp;·&thinsp;Büyük Format Porselen&thinsp;·&thinsp;MMXXVI
            </p>

            <p className="footer-copyright" suppressHydrationWarning>
              © {CURRENT_YEAR} Doğrular Seramik
            </p>

            <nav
              className="footer-legal"
              aria-label="Yasal bağlantılar"
            >
              <Link href="/gizlilik" className="footer-legal-link">
                Gizlilik
              </Link>
              <Link href="/kvkk" className="footer-legal-link">
                KVKK
              </Link>
            </nav>

          </div>
        </motion.div>

      </div>
    </footer>
  )
}
