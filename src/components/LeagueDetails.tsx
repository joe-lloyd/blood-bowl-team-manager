import { League } from '@/types/league';
import React from 'react';

const LeagueDetails: React.FC<{ league: League }> = ({ league }) => {
  return (
    <div>
      <h1>League Details</h1>
      <p>{league.description}</p>
    </div>
  );
};

export default LeagueDetails;
