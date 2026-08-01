import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/config'
import { KataloglarClient } from './KataloglarClient'

export const metadata: Metadata = {
  title: 'Ürün Katalogları',
  description: 'Etili Seramik ürün kataloglarını inceleyin. Yeni seriler ve genel koleksiyon kataloglarını PDF olarak görüntüleyin.',
  alternates: { canonical: `${BASE_URL}/kataloglar` },
  openGraph: {
    title: 'Ürün Katalogları — Doğrular Seramik',
    description: 'Etili Seramik ürün kataloglarını inceleyin.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Doğrular Seramik',
  },
}

export default function KataloglarPage() {
  return <KataloglarClient />
}

