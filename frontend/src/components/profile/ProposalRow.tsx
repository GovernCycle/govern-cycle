export const ProposalRow = ({
    proposal,
    title
}: {
    proposal: Array<bigint>,
    title: string
}) => {
    return (
        <>
            <td className='whitespace-nowrap py-5 font-semibold pl-6 text-left text-sm text-gray-600'>
                {title}
            </td>
            <td className='px-4 py-5 text-center text-sm text-gray-600'>
                {proposal.length || 0}
            </td>
            <td className='px-4 py-5 text-center text-sm text-gray-600'>
                {proposal.map((id, index) => (
                    <div key={index}>{id.toString()}</div>
                ))}
            </td>
        </>
    )
}
