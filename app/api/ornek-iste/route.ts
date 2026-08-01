import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, role, collection, address, notes } = body

    // Basic validation
    if (!name || !email || !role || !collection || !address) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const ROLE_LABELS: Record<string, string> = {
      'mimar':     'Mimar',
      'ic-mimar':  'İç Mimar / Tasarımcı',
      'musteri':   'Bireysel Müşteri',
      'yuklenici': 'Yüklenici / Müteahhit',
      'diger':     'Diğer',
    }

    const html = `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7">

        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a;padding:28px 32px">
            <p style="margin:0;color:#ffffff;font-size:18px;font-weight:600;letter-spacing:-0.02em">Doğrular Seramik</p>
            <p style="margin:4px 0 0;color:#71717a;font-size:12px;letter-spacing:0.08em;text-transform:uppercase">Yeni Örnek Talebi</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="0" cellspacing="0">

              <tr>
                <td style="padding-bottom:20px;border-bottom:1px solid #f0f0f0">
                  <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">Ad Soyad</p>
                  <p style="margin:0;font-size:15px;color:#0a0a0a;font-weight:500">${name}</p>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #f0f0f0">
                  <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">E-posta</p>
                  <p style="margin:0;font-size:15px;color:#0a0a0a">
                    <a href="mailto:${email}" style="color:#2563eb;text-decoration:none">${email}</a>
                  </p>
                </td>
              </tr>

              ${phone ? `
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #f0f0f0">
                  <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">Telefon</p>
                  <p style="margin:0;font-size:15px;color:#0a0a0a">
                    <a href="tel:${phone}" style="color:#2563eb;text-decoration:none">${phone}</a>
                  </p>
                </td>
              </tr>` : ''}

              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #f0f0f0">
                  <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">Meslek</p>
                  <p style="margin:0;font-size:15px;color:#0a0a0a">${ROLE_LABELS[role] ?? role}</p>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #f0f0f0">
                  <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">Koleksiyon</p>
                  <p style="margin:0;font-size:15px;color:#0a0a0a;font-weight:500">${collection}</p>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #f0f0f0">
                  <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">Teslimat Adresi</p>
                  <p style="margin:0;font-size:15px;color:#0a0a0a;white-space:pre-line">${address}</p>
                </td>
              </tr>

              ${notes ? `
              <tr>
                <td style="padding:16px 0">
                  <p style="margin:0 0 4px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em">Notlar</p>
                  <p style="margin:0;font-size:15px;color:#0a0a0a;white-space:pre-line">${notes}</p>
                </td>
              </tr>` : ''}

            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;background:#fafafa;border-top:1px solid #f0f0f0">
            <p style="margin:0;font-size:11px;color:#a1a1aa">
              dogrularseramik.com — Örnek Talep Formu
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    await transporter.sendMail({
      from: `"Doğrular Seramik Web" <${process.env.GMAIL_USER}>`,
      to: 'dogrularseramikk@gmail.com',
      replyTo: email,
      subject: `Örnek Talebi — ${name}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[ornek-iste] mail error:', err)
    return NextResponse.json({ error: 'Mail gönderilemedi.' }, { status: 500 })
  }
}
