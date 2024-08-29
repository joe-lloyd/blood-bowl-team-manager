import React from 'react';
import BaseInfo from './BaseInfo';
import PlayerList from './PlayerList';
import TeamMeta from './TeamMeta';
import styled from 'styled-components';
import { Team } from '@/types/teams';

const TopTableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e0f0ff;
  border: 3px solid #1d3860;
`;

const TeamBuilderContainer = styled.div`
  padding: 40px;
`;

const StyledHeading = styled.h1`
  display: inline-block;
  font-size: 3.5rem;
  font-weight: 700;
  color: #eaaa02;
  margin: 0;
  padding: 20px;
  font-style: italic;
  position: relative;
  transform: rotate(-3deg) translateY(25%);
  transform-origin: bottom left;
`;

const TeamBuilder: React.FC<{ teamData: Team }> = ({ teamData }) => {
  return (
    <TeamBuilderContainer>
      <TopTableContainer>
        <StyledHeading>Team Draft List</StyledHeading>
        <BaseInfo teamData={teamData} />
      </TopTableContainer>
      <PlayerList teamData={teamData} />
      <TeamMeta teamData={teamData} />
    </TeamBuilderContainer>
  );
};

export default TeamBuilder;
