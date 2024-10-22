import { HeroContainer } from '@/components/shared/HeroContainer'
import { HomeHero } from '@/components/home/HomeHero'
import { Divider } from '@/components/shared/Divider'
import { Features } from '@/components/home/Features'
import { Footer } from '@/components/shared/Footer'
import { InvestorTestimonials } from '@app/components/pricing/InvestorTestimonials'

export default function IcConnectPage() {
  return (
    <>
      <HeroContainer>
        <HomeHero />
      </HeroContainer>
      <Divider />
      <Features />
      <Divider />
      <InvestorTestimonials />
      <Divider />
      <Footer />
    </>
  )
}
