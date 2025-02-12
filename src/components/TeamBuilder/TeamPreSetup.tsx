import React, { useState } from 'react';
import styled from 'styled-components';
import { GameVariant } from '@/types/teams';
import { createNewTeam } from '@/utils/playerUtils';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useUser } from '@/contexts/userContext';
import { uuidv4 } from '@firebase/util';

const TopTableContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  background-color: #e0f0ff;
  border-left: 3px solid #1d3860;
  border-right: 3px solid #1d3860;
  border-bottom: 3px solid #1d3860;
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

const PillContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PillButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  border: 2px solid #1d3860;
  background-color: ${({ selected }) => (selected ? '#1d3860' : '#e0f0ff')};
  color: ${({ selected }) => (selected ? '#e0f0ff' : '#1d3860')};
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #1d3860;
    color: #e0f0ff;
  }
`;

const TeamPreSetup: React.FC<{ teamName: string }> = ({ teamName }) => {
  const user = useUser();
  const [teamBaseDetails, setTeamBaseDetails] = useState({
    variant: GameVariant.CLASSIC,
    teamName: '',
    customTeamName: '',
    coachName: '',
    startingTreasury: 1000000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamBaseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleGameTypeChange = (variant: GameVariant) => {
    setTeamBaseDetails((prevDetails) => ({
      ...prevDetails,
      variant,
    }));
  };

  const handleSubmitTeam = async () => {
    if (!user) {
      console.error('User not found');
      return;
    }
    const uid = uuidv4();
    const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);
    const teamBlueprintData = createNewTeam({
      ...teamBaseDetails,
      teamId: uid,
    });
    await setDoc(teamDocRef, teamBlueprintData);
  };

  return (
    <>
      <TopTableContainer>
        <Label>GAME TYPE:</Label>
        <PillContainer>
          {Object.values(GameVariant).map((variant) => (
            <PillButton
              key={variant}
              selected={teamBaseDetails.variant === variant}
              onClick={() => handleGameTypeChange(variant)}
            >
              {variant}
            </PillButton>
          ))}
        </PillContainer>
        <Label>TEAM NAME:</Label>
        <InputField
          type="text"
          name="customTeamName"
          value={teamBaseDetails.customTeamName}
          onChange={handleInputChange}
        />
        <Label>TEAM ROSTER:</Label>
        <InputField
          type="text"
          name="teamName"
          value={teamName}
          disabled={true}
        />
        <Label>COACH:</Label>
        <InputField
          type="text"
          name="coachName"
          value={teamBaseDetails.coachName}
          onChange={handleInputChange}
        />
        <Label>STARTING TREASURY:</Label>
        <InputField
          type="number"
          name="startingTreasury"
          value={teamBaseDetails.startingTreasury}
          onChange={handleInputChange}
        />
      </TopTableContainer>
    </>
  );
};

export default TeamPreSetup;
