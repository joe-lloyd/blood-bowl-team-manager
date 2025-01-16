import React from 'react';
import styled from 'styled-components';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import { useUser } from '@/contexts/userContext';

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

const BaseInfo: React.FC<{ uid: string }> = ({ uid }) => {
  const { state, dispatch } = useTeamBuilder(); // Use the context
  const user = useUser();

  // Handle team name change
  const handleTeamNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTeamName = e.target.value;

    if (!user) {
      console.error('User not found');
      return;
    }

    // Update context
    dispatch({ type: 'SET_TEAM_NAME', payload: newTeamName });

    // Firestore document reference
    const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);

    // Update Firestore
    await updateDoc(teamDocRef, {
      teamName: newTeamName,
    });
  };

  // Handle coach name change
  const handleCoachNameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCoachName = e.target.value;

    if (!user) {
      console.error('User not found');
      return;
    }

    // Update context
    dispatch({ type: 'SET_COACH_NAME', payload: newCoachName });

    // Firestore document reference
    const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);

    // Update Firestore
    await updateDoc(teamDocRef, {
      coachName: newCoachName,
    });
  };

  // Handle starting treasury change
  const handleStartingTreasuryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartingTreasury = parseInt(e.target.value, 10);

    if (!user) {
      console.error('User not found');
      return;
    }

    if (state.players.some(Boolean)) {
      console.error('Cannot modify starting treasury after players are added.');
      return;
    }

    // Update context
    dispatch({
      type: 'UPDATE_META',
      payload: {
        startingTreasury: newStartingTreasury,
        treasury: newStartingTreasury,
      },
    });

    // Firestore document reference
    const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);

    // Update Firestore
    await updateDoc(teamDocRef, {
      startingTreasury: newStartingTreasury,
      treasury: newStartingTreasury,
    });
  };

  return (
    <TopTableContainer>
      <Label>TEAM NAME:</Label>
      <InputField
        type="text"
        value={state.customTeamName || ''}
        onChange={handleTeamNameChange}
      />
      <Label>TEAM ROSTER:</Label>
      <InputField type="text" value={state.teamName} disabled={true} />
      <Label>COACH:</Label>
      <InputField
        type="text"
        value={state.coachName || ''}
        onChange={handleCoachNameChange}
      />
      <Label>STARTING TREASURY:</Label>
      <InputField
        type="number"
        value={state.startingTreasury || ''}
        onChange={handleStartingTreasuryChange}
        disabled={state.players.some((player) => player !== null)}
      />
    </TopTableContainer>
  );
};

export default BaseInfo;
