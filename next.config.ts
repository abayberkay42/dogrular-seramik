import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel'de tam Next.js sunucusu çalışır: /api/ornek-iste rotası (nodemailer)
  // bu sayede yayına girer. Statik dışa aktarma (output: 'export') açık olsaydı
  // rota sessizce build dışında kalır, form 404 verirdi.
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Vercel dağıtımı test ortamıdır (asıl site kendi sunucumuzda çalışır).
  // `VERCEL` değişkeni yalnızca Vercel'de tanımlı olduğundan bu başlık
  // kendi sunucumuzda eklenmez. Arama motorlarının test kopyasını
  // indekslemesini engeller — bkz. app/robots.ts
  async headers() {
    if (!process.env.VERCEL) return []
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default nextConfig
