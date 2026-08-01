import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ShowroomGallery } from '@/components/sections/ShowroomGallery'

export const metadata: Metadata = {
  title: "Hakkımızda — Hatay Antakya Seramik",
  description:
    "Hatay Antakya Güneysöğüt'te seramik, vitrifiye, banyo mobilyası ve yapı kimyasalları satan Doğrular Seramik & Yapı hakkında. Seramiği biliriz, mimariyi düşünürüz.",
  alternates: { canonical: '/hakkimizda' },
  openGraph: {
    title: "Hakkımızda — Doğrular Seramik",
    description: "Seramiği biliriz. Mimariyi düşünürüz.",
    type: "website",
    locale: "tr_TR",
    siteName: "Doğrular Seramik",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda — Doğrular Seramik",
    description: "Seramiği biliriz. Mimariyi düşünürüz.",
  },
}

const VALUES = [
  {
    num: "01",
    heading: "Malzeme Dürüstlüğü",
    body: "Porselen ne ise odur. Rengi, dokusu, ağırlığı hiçbiri gizlenmez. Ürünlerimiz, malzemenin gerçekliğini ortaya koyacak şekilde tasarlanır.",
  },
  {
    num: "02",
    heading: "Mimari Hassasiyet",
    body: "Her koleksiyon, mimari kararların ağırlığıyla geliştirilir. Yüzeyler, mekânın bütünlüğünü güçlendirecek biçimde kurgulanır.",
  },
  {
    num: "03",
    heading: "Uzun Vadeli Kalite",
    body: "1200 derecede sinterleşen porselen, ışığı ve zamanı onlarca yıl aynı biçimde taşır. Kalite, kısa vadeli bir pazarlama söylemi değil, teknik bir gerçektir.",
  },
  {
    num: "04",
    heading: "Profesyonel Ortaklık",
    body: "Mimarlarla ve tasarımcılarla iş birlikleri kurarız; ürün satmayız. Projenizin teknik gereksinimlerini anlayan bir ekiple çalışırsınız.",
  },
  {
    num: "05",
    heading: "Yerel Kök, Küresel Vizyon",
    body: "Türk seramik mirasından besleniriz; çağdaş mimari dili konuşuruz. Anadolu taş zenginliği, uluslararası standartlarda üretilir.",
  },
  {
    num: "06",
    heading: "Tasarım Sürekliliği",
    body: "Koleksiyonlarımız, birbirleriyle ve zamanla uyum içindedir. Bugün seçtiğiniz yüzey, on yıl sonra aynı özgünlüğü taşır.",
  },
]

export default function HakkimizdaPage() {
  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="ab-hero"
        aria-label="Hakkımızda sayfası başlığı"
      >
        <div className="ab-hero-inner">
          <p className="ab-hero-label pg-animate-in" aria-hidden="true">
            Hakkımızda
          </p>
          <h1 className="ab-hero-heading pg-animate-in pg-animate-in--d1">
            Seramiği biliriz.<br />
            Mimariyi<br />
            düşünürüz.
          </h1>
          <p className="ab-hero-sub pg-animate-in pg-animate-in--d2">
            Doğrular Seramik, büyük format porselen yüzeyleri mimari bir malzeme olarak
            sunan bir Türk seramik markasıdır.
          </p>
        </div>
      </section>

      {/* ── Showroom Gallery ────────────────────────────────────────── */}
      <ShowroomGallery />

      {/* ── Manifesto ───────────────────────────────────────────────── */}
      <section className="ab-manifesto" aria-label="Marka manifestosu">
        <div className="ab-values-inner">
          <div className="ab-manifesto-grid">
            <div className="ab-manifesto-number" aria-hidden="true">—</div>
            <blockquote className="ab-manifesto-quote">
              <p>
                Bir mekânı kalıcı kılan şey yüzeyidir. Zemin, duvar, her yüzey —
                mimari karakterin en doğrudan ifadesidir.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────── */}
      <section className="ab-values" aria-label="Değerlerimiz">
        <div className="ab-values-inner">
          <p className="ab-section-label" aria-hidden="true">
            İlkelerimiz
          </p>
          <dl className="ab-values-grid">
            {VALUES.map((v) => (
              <div key={v.num} className="ab-value-item">
                <dt>
                  <span className="ab-value-number" aria-hidden="true">{v.num}</span>
                  <span className="ab-value-heading">{v.heading}</span>
                </dt>
                <dd className="ab-value-body">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Story ───────────────────────────────────────────────────── */}
      <section className="ab-story" aria-label="Markamızın hikâyesi">
        <div className="ab-story-inner">
          <div className="ab-story-body">
            <h2 className="ab-story-heading">
              Aynı soruyu<br />sormaya devam ediyoruz.
            </h2>
            <div>
              <p className="ab-story-text">
                Doğrular Seramik, seramiğin bir malzeme olarak ciddiye alındığı günden beri
                aynı soruyu sormaya devam ediyor: Bir mekânın karakterini en kalıcı biçimde
                ne belirler? Cevap her seferinde aynı: zemini, duvarı, her yüzeyi.
              </p>
              <p className="ab-story-text">
                Bu soruyu rehber alarak geliştirilen koleksiyonlarımız, yüzeyin mimari
                karar ağırlığıyla ele alındığı bir tasarım süreci sonucunda ortaya çıkar.
                Her renk, her doku, her boyut — mimarın karar çantasına koymaya değer
                seçenekler olarak tasarlanır.
              </p>
              <p className="ab-story-text">
                Türkiye zengin seramik üretim coğrafyasından beslenir, çağdaş Avrupa
                mimari dilini konuşuruz. Koleksiyonlarımız, hem B2B hem bireysel projeler
                için teknik ve estetik gereksinimler gözetilerek üretilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="ab-cta-section" aria-label="İletişim daveti">
        <div className="ab-values-inner">
          <div className="ab-cta-inner">
            <h2 className="ab-cta-heading">
              Projenizi birlikte konuşalım.
            </h2>
            <div className="ab-cta-actions">
              <Link href="/iletisim" className="ab-cta-primary">
                İletişime Geç
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/koleksiyonlar" className="ab-cta-link">
                Koleksiyonları İncele
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
