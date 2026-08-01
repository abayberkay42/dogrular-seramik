import type { MetadataRoute } from 'next'
import { COLLECTIONS, PROJECTS } from '@/lib/data'
import { VITRIFIYE_CATEGORIES } from '@/lib/vitrifiye-data'
import { BLOG_YAZILARI } from '@/lib/blog-data'

export const dynamic = 'force-static'

const BASE_URL = 'https://www.dogrularseramik.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/koleksiyonlar`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/vitrifiye`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/kimyasal-urunler`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/banyo-mobilyalari`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/kataloglar`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/markalarimiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/projeler`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/hakkimizda`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/iletisim`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/ornek-iste`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = BLOG_YAZILARI.map((y) => ({
    url: `${BASE_URL}/blog/${y.slug}`,
    lastModified: new Date(y.tarih),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  const collectionRoutes: MetadataRoute.Sitemap = COLLECTIONS.map((col) => ({
    url: `${BASE_URL}/koleksiyonlar/${col.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const vitrifiyeRoutes: MetadataRoute.Sitemap = VITRIFIYE_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/vitrifiye/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${BASE_URL}/projeler/${project.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...collectionRoutes, ...vitrifiyeRoutes, ...projectRoutes]
}
