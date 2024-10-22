import { HeroContainer } from '@/components/shared/HeroContainer'
import { HomeHero } from '@/components/home/HomeHero'
import { Divider } from '@/components/shared/Divider'
import { Features } from '@/components/home/Features'
import { Footer } from '@/components/shared/Footer'
import { use, useContext, useEffect } from 'react'
import { UserContext } from '@app/context/userContext'
import { useHome } from '@app/hooks/useHome'

export default function IcConnectPage() {

  const userContext = useContext(UserContext);
  const { user, setUser } = userContext; 
  const { getProfile } = useHome();

  useEffect(() => {
    const retrieveProfile = async () => {
      try {
        const result = await getProfile();

        if ('ok' in result && 'User' in result.ok) {
          console.log(result.ok.User);
          setUser(result.ok.User);
        }
      } catch (e) {
        console.error(e);
      }
    }
    retrieveProfile();
  }
    , []);
  return (
    <>
      <HeroContainer>
        <HomeHero />
      </HeroContainer>
      <Divider />
      <Features />
      <Divider />
      <Footer />
    </>
  )
}
