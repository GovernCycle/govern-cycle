import React from 'react';

interface ProposalDetails {
  active: number[];
  expired: number[];
  completed: number[];
}

const ProfileDetails: React.FC<ProposalDetails> = ({ active, expired, completed }) => {
  return (
    <div className='mt-8 space-y-8'>
      <section>
        <h2 className='text-lg font-semibold text-violet-100'>Active Proposals</h2>
        <ul className='mt-2 text-sm text-zinc-300'>
          {active.length ? (
            active.map((id) => <li key={id}>Proposal ID: {id}</li>)
          ) : (
            <li>No active proposals.</li>
          )}
        </ul>
      </section>

      <section>
        <h2 className='text-lg font-semibold text-violet-100'>Expired Proposals</h2>
        <ul className='mt-2 text-sm text-zinc-300'>
          {expired.length ? (
            expired.map((id) => <li key={id}>Proposal ID: {id}</li>)
          ) : (
            <li>No expired proposals.</li>
          )}
        </ul>
      </section>

      <section>
        <h2 className='text-lg font-semibold text-violet-100'>Completed Proposals</h2>
        <ul className='mt-2 text-sm text-zinc-300'>
          {completed.length ? (
            completed.map((id) => <li key={id}>Proposal ID: {id}</li>)
          ) : (
            <li>No completed proposals.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default ProfileDetails;
