import React, { useEffect, useState } from 'react'

import { ProposalDetails } from '@app/components/proposal/ProposalDetail'
import { useParams } from 'next/navigation'
import { useProposal } from '@app/hooks/useProposal';
import { Proposal } from '@app/declarations/proposal/proposal.did';
import Swal from 'sweetalert2';

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
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error al obtener la propuesta',
                });
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
