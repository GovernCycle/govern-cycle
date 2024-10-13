import { HeroContainer } from '@/components/shared/HeroContainer'
import { ContactHero } from '@/components/contact/ContactHero'
import { PopularLinks } from '@/components/contact/PopularLinks'
import { Faq } from '@/components/shared/Faq'
import { Divider } from '@/components/shared/Divider'
import { Footer } from '@/components/shared/Footer'
import { BentoGridSection } from '@/components/home/BentoGridSection'
import SearchBar from '@app/components/forms/searchBar'
import { ProposalCard } from '../../components/ProposalCard'

export const metadata = {
  title: 'Propuestas',
  description:
    "Need assistance or have questions? Contact Nebula's team for prompt support and information.",
}

export default function Propuestas() {
  return (
    <>
      <HeroContainer
        className='overflow-visible overflow-x-clip'
        bgGradientClassName='inset-x-0 bottom-0 -top-32 opacity-80 sm:opacity-100'
      >
        {/* <ContactHero /> */}
      </HeroContainer>
      <SearchBar />
      <ProposalCard />
      <Divider />
      <ProposalCard />
      <Divider />
      <ProposalCard />
      <Footer />
    </>
  )
}