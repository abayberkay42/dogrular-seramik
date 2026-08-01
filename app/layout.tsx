import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { NavigationBar } from '@/components/navigation/NavigationBar'
import { Footer } from '@/components/footer/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'
import { BASE_URL } from '@/lib/config'
import './globals.css'

/* ── Yerel işletme yapılandırılmış verisi ──────────────────────────────────
   Google'ın yerel sonuçlarda ve Harita panelinde kullandığı temel kayıt.
   NAP (ad-adres-telefon) bilgileri iletişim sayfası ve footer ile birebir
   aynı olmalı; tutarsızlık yerel sıralamayı doğrudan zayıflatır.          */

const SOSYAL = [
  'https://www.instagram.com/dogrularseramik/',
  'https://pinterest.com/dogrularseramik',
  'https://linkedin.com/company/dogrularseramik',
]

const ADRES = {
  '@type': 'PostalAddress',
  streetAddress: 'Güneysöğüt, Antakya Samandağ Yolu',
  addressLocality: 'Antakya',
  addressRegion: 'Hatay',
  postalCode: '31160',
  addressCountry: 'TR',
}

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${BASE_URL}/#isletme`,
  name: 'Doğrular Seramik',
  alternateName: 'Doğrular Seramik & Yapı',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  image: `${BASE_URL}/images/hakkimizda-bg.webp`,
  description:
    'Hatay Antakya\'da seramik, vitrifiye, banyo mobilyası ve yapı kimyasalları satışı. Etili Seramik, Turkuaz Seramik · CeraStyle, VitrA, Balneom, KYK ve Matkim ürünleri showroomumuzda.',
  telephone: '+90-537-357-56-67',
  email: 'dogrularseramikk@gmail.com',
  address: ADRES,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.1766592,
    longitude: 36.1138471,
  },
  hasMap: 'https://maps.google.com/?q=Doğrular+Seramik+Yapı+Hatay+Antakya',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '15:00',
    },
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Hatay' },
    { '@type': 'City', name: 'Antakya' },
    { '@type': 'City', name: 'Defne' },
    { '@type': 'City', name: 'Samandağ' },
    { '@type': 'City', name: 'İskenderun' },
    { '@type': 'City', name: 'Kırıkhan' },
  ],
  knowsLanguage: 'tr-TR',
  sameAs: SOSYAL,
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#site`,
  url: BASE_URL,
  name: 'Doğrular Seramik',
  inLanguage: 'tr-TR',
  publisher: { '@id': `${BASE_URL}/#isletme` },
}

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  /* Alt sayfalar yalnızca kendi adını verir; marka adını şablon ekler. */
  title: {
    default: 'Hatay Antakya Seramik, Vitrifiye ve Banyo — Doğrular Seramik',
    template: '%s | Doğrular Seramik',
  },
  description:
    'Hatay Antakya\'da seramik, vitrifiye, banyo mobilyası ve yapı kimyasalları. Etili Seramik, Turkuaz Seramik · CeraStyle, VitrA, Balneom, KYK ve Matkim ürünleri Güneysöğüt showroomumuzda. ☎ 0537 357 56 67',
  keywords: [
    // yerel niyet
    'hatay seramik', 'antakya seramik', 'hatay seramik mağazası',
    'antakya banyo', 'hatay vitrifiye', 'hatay banyo dolabı',
    'defne seramik', 'samandağ seramik', 'iskenderun seramik',
    // ürün niyeti
    'porselen seramik', 'büyük format seramik', 'granit seramik',
    'lavabo', 'klozet', 'armatür', 'duş sistemleri',
    'banyo mobilyası', 'yapı kimyasalları', 'seramik yapıştırıcı', 'derz dolgu',
    // marka
    'Etili Seramik', 'Turkuaz Seramik', 'CeraStyle', 'VitrA', 'Balneom', 'KYK', 'Matkim',
  ],
  authors: [{ name: 'Doğrular Seramik' }],
  creator: 'Doğrular Seramik',
  publisher: 'Doğrular Seramik',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: '/' },
  category: 'Seramik ve Yapı Malzemeleri',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Doğrular Seramik',
    url: BASE_URL,
    title: 'Doğrular Seramik — Hatay Antakya Seramik, Vitrifiye ve Banyo',
    description:
      'Hatay Antakya Güneysöğüt\'te seramik, vitrifiye, banyo mobilyası ve yapı kimyasalları showroomu.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dogrularseramik',
  },
  /* Bazı yerel dizinler ve eski tarayıcılar hâlâ geo etiketlerini okuyor. */
  other: {
    'geo.region': 'TR-31',
    'geo.placename': 'Antakya, Hatay',
    'geo.position': '36.1766592;36.1138471',
    ICBM: '36.1766592, 36.1138471',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#141414',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-nav">
          İçeriğe geç
        </a>
        <NavigationBar />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <WhatsAppFAB />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </body>
    </html>
  )
}
