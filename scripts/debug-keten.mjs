import https from 'https'

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchHtml(res.headers.location).then(resolve)
        return
      }
      if (res.statusCode !== 200) { res.resume(); resolve(null); return }
      let html = ''
      res.setEncoding('utf8')
      res.on('data', c => { html += c })
      res.on('end', () => resolve(html))
      res.on('error', () => resolve(null))
    }).on('error', () => resolve(null))
  })
}

const html = await fetchHtml('https://etiliseramik.com/series/keten/')

// "keten" içeren tüm href'leri bul
const allHrefs = [...html.matchAll(/href="([^"]*keten[^"]*)"/gi)].map(m => m[1])
console.log('keten içeren hrefs:', allHrefs.slice(0, 10))

// urunler img'leri
const imgs = [...html.matchAll(/src="([^"]*\/media\/urunler\/[^"]+\.jpg)"/g)].map(m => m[1])
console.log('\nurunler imgs:', imgs.slice(0, 3))

// HTML'de "product" geçen yerleri bul
const productIdx = html.indexOf('/product/')
if (productIdx >= 0) {
  console.log('\n/product/ bulundu:', html.substring(productIdx - 50, productIdx + 100))
} else {
  console.log('\n/product/ bulunamadı')
}

// img'lerin etrafındaki 200 char'ı göster
const imgIdx = html.indexOf('/media/urunler/')
if (imgIdx >= 0) {
  console.log('\nImg etrafı:', html.substring(imgIdx - 200, imgIdx + 100))
}
