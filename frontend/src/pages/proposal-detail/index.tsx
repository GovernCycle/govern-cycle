import AuthLayout from '@app/pages/auth/layout'
import React from 'react'

import { ProposalDetails } from '@app/components/proposal/ProposalDetail'

export default function () {
    return (
        <>
        <AuthLayout>
            <ProposalDetails />
        </AuthLayout>
        </>
    )
  }
