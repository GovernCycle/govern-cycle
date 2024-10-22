import { HeroContainer } from '@/components/shared/HeroContainer'
import { HomeHero } from '@/components/home/HomeHero'
import { Divider } from '@/components/shared/Divider'
import { Mision } from '@/components/home/Mision'
import { Footer } from '@/components/shared/Footer'
import { InvestorTestimonials } from '@app/components/pricing/InvestorTestimonials'

export default function IcConnectPage() {
  return (
    <>
      <HeroContainer>
        <HomeHero />
      </HeroContainer>
      <Divider />
      <Mision />
      <Divider />
      <InvestorTestimonials />
      <Divider />
      <Footer />
    </>
  )
}
