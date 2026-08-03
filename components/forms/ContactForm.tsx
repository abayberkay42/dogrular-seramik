'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const payload = {
      tip:     'iletisim',
      name:    fd.get('name')    as string,
      email:   fd.get('email')   as string,
      company: fd.get('company') as string,
      subject: fd.get('subject') as string,
      message: fd.get('message') as string,
      website: fd.get('website') as string,  // bot tuzağı — insan doldurmaz
    }

    try {
      // Site statik olarak yayınlandığı için mail gönderimi PHP betiğiyle
      // yapılır (bkz. public/form-gonder.php).
      const res = await fetch('/form-gonder.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Bir hata oluştu.')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Bir hata oluştu, lütfen tekrar deneyin.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="ds-form-success" role="status" aria-live="polite">
        <p className="ds-form-success-heading">Mesajınız iletildi.</p>
        <p className="ds-form-success-body">
          En kısa sürede size dönüş yapacağız.
        </p>
      </div>
    )
  }

  return (
    <form
      className="ds-form"
      onSubmit={handleSubmit}
      aria-label="İletişim formu"
      noValidate
    >
      {/* Bot tuzağı: ekran okuyuculardan ve klavyeden gizli. Doldurulursa
          sunucu gönderimi sessizce yok sayar. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
      />

      <div className="ds-form-row">
        <div className="ds-form-group">
          <label htmlFor="ct-name" className="ds-form-label">
            Ad Soyad
          </label>
          <input
            id="ct-name"
            name="name"
            type="text"
            className="ds-form-input"
            placeholder="Adınız ve soyadınız"
            required
            autoComplete="name"
          />
        </div>
        <div className="ds-form-group">
          <label htmlFor="ct-email" className="ds-form-label">
            E-posta
          </label>
          <input
            id="ct-email"
            name="email"
            type="email"
            className="ds-form-input"
            placeholder="ornek@sirket.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="ds-form-group">
        <label htmlFor="ct-company" className="ds-form-label">
          Şirket / Firma <span className="ds-form-optional">(isteğe bağlı)</span>
        </label>
        <input
          id="ct-company"
          name="company"
          type="text"
          className="ds-form-input"
          placeholder="Mimarlık bürosu veya firma adı"
          autoComplete="organization"
        />
      </div>

      <div className="ds-form-group">
        <label htmlFor="ct-subject" className="ds-form-label">
          Konu
        </label>
        <select
          id="ct-subject"
          name="subject"
          className="ds-form-select"
          required
          defaultValue=""
        >
          <option value="" disabled>Konu seçin</option>
          <option value="koleksiyon">Koleksiyon bilgisi</option>
          <option value="ornek">Örnek talebi</option>
          <option value="teknik">Teknik bilgi</option>
          <option value="diger">Diğer</option>
        </select>
      </div>

      <div className="ds-form-group">
        <label htmlFor="ct-message" className="ds-form-label">
          Mesaj
        </label>
        <textarea
          id="ct-message"
          name="message"
          className="ds-form-textarea"
          placeholder="Projeniz veya sorunuz hakkında kısa bir bilgi paylaşın…"
          required
          rows={5}
        />
      </div>

      {status === 'error' && (
        <p className="ds-form-error" role="alert">
          {errorMsg || 'Bir hata oluştu, lütfen tekrar deneyin.'}
        </p>
      )}

      <button
        type="submit"
        className="ds-form-submit"
        disabled={status === 'sending'}
        aria-busy={status === 'sending'}
      >
        {status === 'sending' ? 'Gönderiliyor…' : 'Mesaj Gönder'}
        {status !== 'sending' && <span aria-hidden="true">→</span>}
      </button>
    </form>
  )
}
