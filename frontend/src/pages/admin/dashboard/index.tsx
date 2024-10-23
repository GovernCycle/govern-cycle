import React, { useContext } from 'react'
import { HeroContainer } from '@/components/shared/HeroContainer'
import { Footer } from '@/components/shared/Footer'
import ListingUsers from '@app/components/dashboard/ListingUsers'
import { UserContext } from '@app/context/userContext'
import { Alert } from '@mui/material'

const index = () => {
    const { user, setUser } = useContext(UserContext);

    const isTechnicalSeccretariat = user.role.some(role => 'TechnicalSecretariat' in role);
    const isApproved = 'Approved' in user.state;
    return (
        <>
            <HeroContainer
                starField={true}
                bgGradientClassName='opacity-60 lg:opacity-90 xl:opacity-100'
            >
            </HeroContainer>
            {isTechnicalSeccretariat && isApproved && (
                <ListingUsers />
            )}
            {(!isTechnicalSeccretariat || !isApproved) && (
                <Alert severity='error' className='z-[1000] absolute'>
                    You are not authorized to view this page
                </Alert>)}
            <Footer />
        </>
    )
}

export default index