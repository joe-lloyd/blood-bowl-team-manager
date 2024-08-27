import React from 'react';
import styled from 'styled-components';

const TopTableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e0f0ff;
  border: 3px solid #1d3860;
  padding: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
  margin-right: 10px;
  color: #1d3860;
`;

const InputField = styled.input`
  border: 2px solid #1d3860;
  padding: 5px;
  font-size: 1rem;
  width: 200px;
`;

const TopTableRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const BaseInfo: React.FC = () => {
  return (
    <TopTableContainer>
      <TopTableRow>
        <Label>Team Name:</Label>
        <InputField type="text" />
      </TopTableRow>
      <TopTableRow>
        <Label>Team Roster:</Label>
        <InputField type="text" />
      </TopTableRow>
      <TopTableRow>
        <Label>Coach:</Label>
        <InputField type="text" />
      </TopTableRow>
    </TopTableContainer>
  );
};

export default BaseInfo;
