import React, { useState } from 'react';
import styled from 'styled-components';
import { doc, updateDoc } from 'firebase/firestore'; // Firestore imports
import { db } from '@/services/firebase';
import { Team } from '@/types/teams';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import { useUser } from '@/contexts/userContext';
import { CustomTeam } from '@/types/userData';

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
    </TopTableContainer>
  );
};

export default BaseInfo;
