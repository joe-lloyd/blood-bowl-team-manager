import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { TeamsList } from '@/types/teams';

const LinkText = styled.span`
  padding: 10px 20px;
  display: inline-block;
  margin: 10px;
  background-color: #922d26;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #701d1a;
  }
`;

const TeamLinkList: React.FC<{
  teams: TeamsList;
  rootPath: string;
}> = ({ teams, rootPath }) => {
  return (
    <div>
      {Object.entries(teams).map(([teamId, teamName]) => (
        <Link href={`/${rootPath}/${teamId}`} key={teamId} passHref>
          <LinkText>{teamName}</LinkText>
        </Link>
      ))}
    </div>
  );
};

export default TeamLinkList;
