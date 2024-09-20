import { HeroContainer } from '@/components/Shared/HeroContainer'
import { HomeHero } from '@/components/home/HomeHero'
import { Divider } from '@/components/Shared/Divider'
import { BentoGridSection } from '@/components/home/BentoGridSection'
import { InteractiveCodeSection } from '@/components/home/InteractiveCodeSection'
import { Integrations } from '@/components/home/Integrations'
import { Features } from '@/components/home/Features'
import { Testimonials } from '@/components/home/Testimonials'
import { Footer } from '@/components/Shared/Footer'

export default function Home() {
  return (
    <>
      <HeroContainer>
        <HomeHero />
      </HeroContainer>
      <Divider />
      <Testimonials />
      <Divider />
      <Footer />
    </>
  )
}
