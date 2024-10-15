import { HeroContainer } from '@/components/shared/HeroContainer'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileDetails } from '@/components/profile/ProfileDetails'
import { Divider } from '@/components/shared/Divider'
import { Footer } from '@/components/shared/Footer'

export default function Profile() {

    return (
        <>
            <HeroContainer
                starField={false}
                bgGradientClassName='opacity-60 lg:opacity-90 xl:opacity-100'
            >
                <ProfileHeader />
            </HeroContainer>
            <ProfileDetails proposals={[]} />
            <Footer />
        </>
    )
}

