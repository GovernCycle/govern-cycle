import AuthLayout from '@app/pages/auth/layout'
import React, { use, useEffect, useState } from 'react'

import { ProposalDetails } from '@app/components/proposal/ProposalDetail'
import { useParams } from 'next/navigation'
import { useProposal } from '@app/hooks/useProposal';
import { Proposal } from '@app/declarations/proposal/proposal.did';

export default function () {
    const params = useParams<{ slug: string }>();
    const { getProposal } = useProposal();
    const [proposal, setProposal] = useState<Proposal>();

    useEffect(() => {
        const retrieveProposal = async () => {
            try {
                const proposalId = BigInt(params.slug);
                const result = await getProposal(proposalId);
                if ('ok' in result && 'Proposal' in result.ok) {
                    setProposal(result.ok.Proposal);
                    console.log('Proposal:', result.ok.Proposal);
                }
            } catch (error) {
                console.error('Error retrieving proposal:', error);
            }
        }
        retrieveProposal();
    }, [params.slug]);
    return (
        <>
            <AuthLayout>
                {proposal && (<ProposalDetails proposal={proposal} proposalId={BigInt(params.slug)} />)}
            </AuthLayout>
        </>
    )
}
