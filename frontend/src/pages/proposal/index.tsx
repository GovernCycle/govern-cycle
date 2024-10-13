import { HeroContainer } from '@/components/shared/HeroContainer'
import { Divider } from '@/components/shared/Divider'
import { Footer } from '@/components/shared/Footer'
import SearchBar from '@app/components/forms/searchBar'
import { ProposalCard } from '../../components/ProposalCard'
import AuthLayout from '@app/pages/auth/layout'


export const metadata = {
  title: 'Propuestas',
  description:
    "Need assistance or have questions? Contact Nebula's team for prompt support and information.",
}

export default function Propuestas() {
  return (
    <>
            <AuthLayout>

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
      </AuthLayout>
    </>
  )
}