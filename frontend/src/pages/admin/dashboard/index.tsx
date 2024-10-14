import React from 'react'
import { HeroContainer } from '@/components/shared/HeroContainer'
import { PricingHero } from '@/components/pricing/PricingHero'
import { PricingTable } from '@/components/pricing/PricingTable'
import { Faq } from '@/components/shared/Faq'
import { Divider } from '@/components/shared/Divider'
import { Footer } from '@/components/shared/Footer'
import ListingUsers from '@app/components/dashboard/ListingUsers'
import DashboardHeader from '@app/components/dashboard/DashboardHeader'

const index = () => {
    return (
        <>
            <HeroContainer
                starField={false}
                bgGradientClassName='opacity-60 lg:opacity-90 xl:opacity-100'
            >
            </HeroContainer>
            <DashboardHeader />
            <ListingUsers />
            <Footer />
        </>
    )
}

export default index