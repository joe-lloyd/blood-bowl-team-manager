import React from 'react';
import styled from 'styled-components';
import { Team } from '@/types/teams';

const TopTableContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  background-color: #e0f0ff;
  border-left: 3px solid #1d3860;
  padding: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
  margin: auto 0 auto 10px;
  color: #1d3860;
`;

const InputField = styled.input`
  border: 2px solid #1d3860;
  padding: 5px;
  font-size: 1rem;
  min-width: 200px;
`;

const BaseInfo: React.FC<{ teamData: Team }> = ({ teamData }) => {
  return (
    <TopTableContainer>
      <Label>TEAM NAME:</Label>
      <InputField type="text" />
      <Label>TEAM ROSTER:</Label>
      <InputField type="text" value={teamData.name} disabled={true} />
      <Label>COACH:</Label>
      <InputField type="text" />
    </TopTableContainer>
  );
};

export default BaseInfo;
