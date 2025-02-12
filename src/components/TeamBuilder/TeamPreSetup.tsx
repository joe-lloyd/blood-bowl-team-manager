import React, { useState } from 'react';
import styled from 'styled-components';
import { GameVariant, Team } from '@/types/teams';
import { createNewTeam } from '@/utils/playerUtils';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useUser } from '@/contexts/userContext';
import { uuidv4 } from '@firebase/util';
import { useRouter } from 'next/router';

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

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: 2px solid #1d3860;
  background-color: #1d3860;
  color: #e0f0ff;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1d3860;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-left: 10px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const TeamPreSetup: React.FC<{ teamData: Team }> = ({ teamData }) => {
  console.log('teamData:', teamData);
  const user = useUser();
  const router = useRouter();
  const [teamBaseDetails, setTeamBaseDetails] = useState({
    variant: GameVariant.CLASSIC,
    teamId: teamData.teamId,
    teamName: teamData.name,
    customTeamName: '',
    coachName: '',
    startingTreasury: 1000000,
  });
  const [loading, setLoading] = useState(false);

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

    // @TODO dont change treasury if user has already changed it
    if (variant === GameVariant.CLASSIC) {
      setTeamBaseDetails((prevDetails) => ({
        ...prevDetails,
        startingTreasury: 1000000,
      }));
    } else if (variant === GameVariant.SEVENS) {
      setTeamBaseDetails((prevDetails) => ({
        ...prevDetails,
        startingTreasury: 600000,
      }));
    }
  };

  const handleSubmitTeam = async () => {
    if (!user) {
      console.error('User not found');
      return;
    }
    setLoading(true);
    const uid = uuidv4();
    const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);
    const teamBlueprintData = createNewTeam(teamBaseDetails);
    await setDoc(teamDocRef, teamBlueprintData);
    router.push(`/create-team/${teamData.teamId}/${uid}`);
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
              disabled={loading}
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
          disabled={loading}
        />
        <Label>TEAM ROSTER:</Label>
        <InputField
          type="text"
          name="teamName"
          value={teamBaseDetails.teamName}
          disabled={true}
        />
        <Label>COACH:</Label>
        <InputField
          type="text"
          name="coachName"
          value={teamBaseDetails.coachName}
          onChange={handleInputChange}
          disabled={loading}
        />
        <Label>STARTING TREASURY:</Label>
        <InputField
          type="number"
          name="startingTreasury"
          value={teamBaseDetails.startingTreasury}
          onChange={handleInputChange}
          disabled={loading}
        />
      </TopTableContainer>
      <SubmitButton onClick={handleSubmitTeam} disabled={loading}>
        {loading ? (
          <>
            Creating Team
            <Loader />
          </>
        ) : (
          'Create Team'
        )}
      </SubmitButton>
    </>
  );
};

export default TeamPreSetup;
