import Image from 'next/image'
import { MARKA_LOGOLARI } from '@/lib/marka-data'

function Sirasi({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className="lm-track" aria-hidden={ariaHidden || undefined}>
      {MARKA_LOGOLARI.map((l) => (
        <li key={l.slug} className={`lm-item${l.dikey ? ' lm-item--dikey' : ''}`}>
          <Image
            src={`/images/markalar/${l.slug}.webp`}
            alt={ariaHidden ? '' : l.ad}
            title={l.ad}
            width={240}
            height={72}
            unoptimized
            className="lm-logo"
          />
        </li>
      ))}
    </ul>
  )
}

export function LogoMarquee() {
  return (
    <section className="lm" aria-label="Çalıştığımız markalar">
      <div className="lm-head">
        <p className="lm-label">Çalıştığımız Markalar</p>
      </div>

      {/* İki özdeş şerit yan yana kayar; ilki bitince ikincisi tam yerine
          geçtiği için döngü kesintisiz görünür. */}
      <div className="lm-viewport">
        <div className="lm-rail">
          <Sirasi />
          <Sirasi ariaHidden />
        </div>
      </div>
    </section>
  )
}
