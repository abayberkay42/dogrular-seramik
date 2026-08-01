import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel'de tam Next.js sunucusu çalışır: /api/ornek-iste rotası (nodemailer)
  // bu sayede yayına girer. Statik dışa aktarma (output: 'export') açık olsaydı
  // rota sessizce build dışında kalır, form 404 verirdi.
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
