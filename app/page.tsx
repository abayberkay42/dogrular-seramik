import { VideoScrollHero } from '@/components/hero/VideoScrollHero'
import { CollectionsPreviewSection } from '@/components/sections/CollectionsPreviewSection'
import { CinematicBridgeSection } from '@/components/sections/CinematicBridgeSection'
import { MaterialLabSection } from '@/components/sections/MaterialLabSection'

export default function HomePage() {
  return (
    <main>
      <VideoScrollHero />
      <CollectionsPreviewSection />
      <CinematicBridgeSection />
      <MaterialLabSection />
    </main>
  )
}
