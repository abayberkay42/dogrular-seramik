import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Site paylaşımlı hostingde (Hostinger/LiteSpeed) yayınlanıyor; sürekli
  // çalışan bir Node süreci yok. Bu yüzden tüm sayfalar statik HTML olarak
  // üretilir ve public_html'e yüklenir.
  //
  // Formların mail göndermesi public/form-gonder.php ile sağlanır — Node
  // API rotası bu modda çalışmayacağı için kaldırıldı.
  output: 'export',
  trailingSlash: true,
  images: {
    // Statik çıktıda /_next/image uç noktası bulunmaz; görseller olduğu gibi
    // servis edilir. Zaten tüm görseller WebP'ye çevrilmiş durumda.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  // NOT: Statik dışa aktarma modunda next.config'in headers() ayarı
  // çalışmaz — üretilen çıktı düz HTML dosyalarıdır, başlıkları web
  // sunucusu belirler. Vercel test ortamının noindex başlığı bu yüzden
  // vercel.json dosyasına taşındı.
}

export default nextConfig
