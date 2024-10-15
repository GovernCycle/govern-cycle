import React, { useEffect, useState } from 'react'

import { ProposalDetails } from '@app/components/proposal/ProposalDetail'
import { useParams } from 'next/navigation'
import { useProposal } from '@app/hooks/useProposal';
import { Proposal } from '@app/declarations/proposal/proposal.did';

export default function ViewProposal() {
    const params = useParams<{ slug?: string }>(); // Make slug optional
    const { getProposal } = useProposal();
    const [proposal, setProposal] = useState<Proposal>();

    useEffect(() => {
        const retrieveProposal = async () => {
            try {
                // Ensure params and slug exist before using them
                if (params && params.slug) {
                    const proposalId = BigInt(params.slug);
                    const result = await getProposal(proposalId);
                    if ('ok' in result && 'Proposal' in result.ok) {
                        setProposal(result.ok.Proposal);
                        console.log('Proposal:', result.ok.Proposal);
                    }
                }
            } catch (error) {
                console.error('Error retrieving proposal:', error);
            }
        }
        retrieveProposal();
    }, [params?.slug]); // Safely access params.slug

    const loadProposal = async () => {
        if (params && params.slug) { // Ensure params and slug are defined
            const proposalId = BigInt(params.slug);
            const result = await getProposal(proposalId);
            if ('ok' in result && 'Proposal' in result.ok) {
                setProposal(result.ok.Proposal);
            }
        }
    }

    return (
        <>
            {/* Ensure proposal exists before rendering ProposalDetails */}
            {proposal && params?.slug && (
                <ProposalDetails proposal={proposal} proposalId={BigInt(params.slug)} loadProposal={loadProposal} />
            )}
        </>
    )
}
