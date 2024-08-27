import React from 'react';
import styled from 'styled-components';

const BottomTableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background-color: #e0f0ff;
  border: 3px solid #1d3860;
  padding: 10px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #1d3860;
`;

const Value = styled.span`
  color: #1d3860;
`;

const TeamMeta: React.FC = () => {
  return (
    <BottomTableContainer>
      <BottomRow>
        <Label>Treasury:</Label>
        <Value>100,000 GP</Value>
      </BottomRow>
      <BottomRow>
        <Label>Dedicated Fans:</Label>
        <Value>3</Value>
      </BottomRow>
      <BottomRow>
        <Label>Total Touchdowns:</Label>
        <Value>0</Value>
      </BottomRow>
      <BottomRow>
        <Label>Total Casualties:</Label>
        <Value>0</Value>
      </BottomRow>
      <BottomRow>
        <Label>League Points:</Label>
        <Value>0</Value>
      </BottomRow>
      <BottomRow>
        <Label>Team Badge:</Label>
        <Value></Value>
      </BottomRow>
      <BottomRow>
        <Label>Team Re-Rolls:</Label>
        <Value>3</Value>
      </BottomRow>
      <BottomRow>
        <Label>Assistant Coaches:</Label>
        <Value>1</Value>
      </BottomRow>
      <BottomRow>
        <Label>Cheerleaders:</Label>
        <Value>0</Value>
      </BottomRow>
      <BottomRow>
        <Label>Apothecary:</Label>
        <Value>Yes</Value>
      </BottomRow>
      <BottomRow>
        <Label>Team Value:</Label>
        <Value>1,000,000 GP</Value>
      </BottomRow>
    </BottomTableContainer>
  );
};

export default TeamMeta;
