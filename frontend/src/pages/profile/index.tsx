import { HeroContainer } from '@/components/shared/HeroContainer'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import  ProfileDetails  from '@/components/profile/ProfileDetails'
import { Faq } from '@/components/shared/Faq'
import { Divider } from '@/components/shared/Divider'
import { Footer } from '@/components/shared/Footer'

export default function Profile() {
  // Datos de ejemplo para propuestas
  const activeProposals = [1, 2, 3]
  const expiredProposals = [4, 5]
  const completedProposals = [6, 7, 8]

  return (
    <>
      {/* Contenedor principal */}
      <HeroContainer
        starField={false}
        bgGradientClassName='opacity-60 lg:opacity-90 xl:opacity-100'
      >
        {/* ProfileHeader reemplaza a PricingHero */}
        <ProfileHeader username="John Doe" />
      </HeroContainer>

      <Divider />

      {/* ProfileDetails reemplaza a PricingTable */}
      <div className="container mx-auto px-4 py-12">
        <ProfileDetails 
          active={activeProposals} 
          expired={expiredProposals} 
          completed={completedProposals} 
        />
      </div>

      <Divider />

      {/* Mantienes las secciones de FAQ y Footer si son necesarias en la vista de perfil */}
      <Faq />
      <Divider />
      <Footer />
    </>
  )
}

