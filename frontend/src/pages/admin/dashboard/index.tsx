import React from 'react'
import { HeroContainer } from '@/components/shared/HeroContainer'
import { Footer } from '@/components/shared/Footer'
import ListingUsers from '@app/components/dashboard/ListingUsers'

const index = () => {
    return (
        <>
            <HeroContainer
                starField={true}
                bgGradientClassName='opacity-60 lg:opacity-90 xl:opacity-100'
            >
            </HeroContainer>
            <ListingUsers />
            <Footer />
        </>
    )
}

export default index