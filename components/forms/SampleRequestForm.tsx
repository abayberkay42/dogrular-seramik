'use client'

import { useState, type FormEvent } from 'react'
import { ETILI_KATEGORILER } from '@/lib/etili-categories'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function SampleRequestForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const payload = {
      name:       fd.get('name')       as string,
      email:      fd.get('email')      as string,
      phone:      fd.get('phone')      as string,
      role:       fd.get('role')       as string,
      collection: fd.get('collection') as string,
      address:    fd.get('address')    as string,
      notes:      fd.get('notes')      as string,
    }

    try {
      // trailingSlash: true açık — sondaki eğik çizgi 308 yönlendirmesini önler.
      const res = await fetch('/api/ornek-iste/', {
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
        <p className="ds-form-success-heading">Örnek talebiniz alındı.</p>
        <p className="ds-form-success-body">
          Seçtiğiniz örnekler en kısa sürede adresinize gönderilecektir.
        </p>
      </div>
    )
  }

  return (
    <form
      className="ds-form"
      onSubmit={handleSubmit}
      aria-label="Örnek talep formu"
      noValidate
    >
      <div className="ds-form-row">
        <div className="ds-form-group">
          <label htmlFor="sr-name" className="ds-form-label">
            Ad Soyad
          </label>
          <input
            id="sr-name"
            name="name"
            type="text"
            className="ds-form-input"
            placeholder="Adınız ve soyadınız"
            required
            autoComplete="name"
          />
        </div>
        <div className="ds-form-group">
          <label htmlFor="sr-email" className="ds-form-label">
            E-posta
          </label>
          <input
            id="sr-email"
            name="email"
            type="email"
            className="ds-form-input"
            placeholder="ornek@sirket.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="ds-form-row">
        <div className="ds-form-group">
          <label htmlFor="sr-phone" className="ds-form-label">
            Telefon <span className="ds-form-optional">(isteğe bağlı)</span>
          </label>
          <input
            id="sr-phone"
            name="phone"
            type="tel"
            className="ds-form-input"
            placeholder="+90 5__ ___ __ __"
            autoComplete="tel"
          />
        </div>
        <div className="ds-form-group">
          <label htmlFor="sr-role" className="ds-form-label">
            Mesleğiniz
          </label>
          <select
            id="sr-role"
            name="role"
            className="ds-form-select"
            required
            defaultValue=""
          >
            <option value="" disabled>Seçin</option>
            <option value="mimar">Mimar</option>
            <option value="ic-mimar">İç Mimar / Tasarımcı</option>
            <option value="musteri">Bireysel Müşteri</option>
            <option value="yuklenici">Yüklenici / Müteahhit</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
      </div>

      <div className="ds-form-group">
        <label htmlFor="sr-collection" className="ds-form-label">
          Koleksiyon
        </label>
        <select
          id="sr-collection"
          name="collection"
          className="ds-form-select"
          required
          defaultValue=""
        >
          <option value="" disabled>Koleksiyon seçin</option>
          {ETILI_KATEGORILER.map((kat) => (
            <optgroup key={kat.slug} label={kat.isim}>
              {kat.seriler.map((seri) => (
                <option key={`${kat.slug}-${seri.isim}`} value={`${kat.isim} — ${seri.isim}`}>
                  {seri.isim}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Henüz karar veremedim">Henüz karar veremedim</option>
        </select>
      </div>

      <div className="ds-form-group">
        <label htmlFor="sr-address" className="ds-form-label">
          Teslimat Adresi
        </label>
        <textarea
          id="sr-address"
          name="address"
          className="ds-form-textarea"
          placeholder="Sokak, mahalle, ilçe, şehir…"
          required
          rows={3}
          autoComplete="street-address"
        />
      </div>

      <div className="ds-form-group">
        <label htmlFor="sr-notes" className="ds-form-label">
          Notlar <span className="ds-form-optional">(isteğe bağlı)</span>
        </label>
        <textarea
          id="sr-notes"
          name="notes"
          className="ds-form-textarea"
          placeholder="Projeniz veya özel tercihleriniz hakkında kısa bir not…"
          rows={3}
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
        {status === 'sending' ? 'Gönderiliyor…' : 'Örnek İste'}
        {status !== 'sending' && <span aria-hidden="true">→</span>}
      </button>
    </form>
  )
}
