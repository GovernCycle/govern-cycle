import { HeroContainer } from '@/components/shared/HeroContainer'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileDetails } from '@/components/profile/ProfileDetails'
import { Footer } from '@/components/shared/Footer'
import { useContext } from 'react'
import { UserContext } from '@app/context/userContext'

export default function Profile() {

    const { user, setUser } = useContext(UserContext)

    return (
        <>
            <HeroContainer
                starField={false}
                bgGradientClassName='opacity-60 lg:opacity-90 xl:opacity-100'
            >
                <ProfileHeader user={user} setUser={setUser}/>
            </HeroContainer>
            <ProfileDetails user={user} setUser={setUser}/>
            <Footer />
        </>
    )
}

