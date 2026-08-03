import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE_URL = 'https://www.dogrularseramik.com'

/**
 * Vercel'de yapılan derlemelerde `VERCEL` ortam değişkeni tanımlıdır;
 * kendi sunucumuzda (VPS) tanımlı değildir. Vercel dağıtımı yalnızca test
 * ortamı olarak kullanıldığından oradaki kopya içeriğin indekslenmemesi
 * gerekir — aynı içerik iki adreste görünürse asıl site zarar görür.
 *
 * DİKKAT: Burada "Disallow: /" YAZILMAZ. Taramayı engellersek Google
 * sayfaya hiç bakmaz, dolayısıyla next.config.ts'teki `X-Robots-Tag:
 * noindex` başlığını da göremez ve önceden indekslenmiş sayfalar sonuçlarda
 * kalmaya devam eder. Doğru yöntem: taramaya izin ver, noindex başlığıyla
 * dışarıda bırak. Sitemap ve host satırları ise verilmez — test ortamının
 * kendini asıl site gibi tanıtmasını istemiyoruz.
 */
const testOrtami = Boolean(process.env.VERCEL)

export default function robots(): MetadataRoute.Robots {
  if (testOrtami) {
    return {
      rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
