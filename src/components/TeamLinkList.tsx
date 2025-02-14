import Link from 'next/link';
import React from 'react';
import { TeamsList } from '@/types/teams';
import { InlineLink } from '@/components/ComponentWarehouse/Button';

const TeamLinkList: React.FC<{
  teams: TeamsList;
  rootPath: string;
}> = ({ teams, rootPath }) => {
  return (
    <div>
      {Object.entries(teams).map(([teamId, teamName]) => (
        <Link href={`/${rootPath}/${teamId}`} key={teamId} passHref>
          <InlineLink>{teamName}</InlineLink>
        </Link>
      ))}
    </div>
  );
};

export default TeamLinkList;
