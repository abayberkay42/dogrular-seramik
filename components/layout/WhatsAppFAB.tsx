'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const PHONE_RAW = '905373575667'
const PHONE_DISPLAY = '+90 537 357 56 67'
const WA_HREF   = `https://wa.me/${PHONE_RAW}?text=Merhaba%2C%20Doğrular%20Seramik%20hakkında%20bilgi%20almak%20istiyorum.`
const TEL_HREF  = `tel:+${PHONE_RAW}`

const WaIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const PhoneIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
)

const ACTIONS = [
  {
    key:   'phone',
    label: 'Bizi Ara',
    sub:   PHONE_DISPLAY,
    href:  TEL_HREF,
    color: '#1a1a1a',
    border: 'rgba(255,255,255,0.12)',
    iconColor: '#e5e5e5',
    icon:  PhoneIcon,
  },
  {
    key:   'whatsapp',
    label: 'WhatsApp',
    sub:   'Hemen mesaj gönder',
    href:  WA_HREF,
    color: '#25D366',
    border: 'transparent',
    iconColor: 'white',
    icon:  WaIcon,
  },
]

export function WhatsAppFAB() {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}
    >
      {/* Action buttons */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {ACTIONS.map((action, i) => (
              <motion.a
                key={action.key}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={action.label}
                initial={{ opacity: 0, x: 12, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.88 }}
                transition={{ duration: 0.22, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px 10px 12px',
                  borderRadius: '50px',
                  background: action.color,
                  border: `1px solid ${action.border}`,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span style={{ color: action.iconColor, display: 'flex', alignItems: 'center' }}>
                  {action.icon}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{
                    fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: action.key === 'phone' ? '#e5e5e5' : 'white',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                  }}>
                    {action.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontSize: '11px',
                    color: action.key === 'phone' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                  }}>
                    {action.sub}
                  </span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'İletişim menüsünü kapat' : 'İletişim menüsünü aç'}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4, type: 'spring', stiffness: 380, damping: 22 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: open ? '#1a1a1a' : '#25D366',
          border: open ? '1px solid rgba(255,255,255,0.12)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: open
            ? '0 4px 24px rgba(0,0,0,0.4)'
            : '0 4px 24px rgba(37,211,102,0.45)',
          position: 'relative',
        }}
      >
        {/* Pulse ring — only when closed */}
        {!open && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'rgba(37,211,102,0.28)',
              animation: 'ds-wa-ping 2.4s ease-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ color: '#e5e5e5', display: 'flex' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: 'flex' }}
            >
              {WaIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
