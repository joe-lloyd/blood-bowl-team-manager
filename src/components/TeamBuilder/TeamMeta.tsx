import React from 'react';
import styled from 'styled-components';
import { doc, updateDoc } from 'firebase/firestore';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import { useUser } from '@/contexts/userContext';
import { db } from '@/services/firebase';

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
  align-items: center;
  padding: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #1d3860;
`;

const InputField = styled.input`
  width: 100px;
  padding: 5px;
  border: 1px solid #1d3860;
  border-radius: 4px;
  color: #1d3860;
`;

const TeamMeta: React.FC<{ uid: string }> = ({ uid }) => {
  const { state, dispatch } = useTeamBuilder();
  const user = useUser();

  const handleMetaChange = async (
    key: keyof typeof state,
    value: string | number
  ) => {
    if (!user) {
      console.error('User not found');
      return;
    }

    // Update context
    dispatch({ type: 'UPDATE_META', payload: { [key]: value } });

    // Firestore document reference
    const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);

    // Update Firestore
    await updateDoc(teamDocRef, {
      [key]: value,
    });
  };

  return (
    <BottomTableContainer>
      <BottomRow>
        <Label>Treasury:</Label>
        <InputField
          type="number"
          value={state.treasury}
          onChange={(e) =>
            handleMetaChange('treasury', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>Dedicated Fans:</Label>
        <InputField
          type="number"
          value={state.dedicatedFans}
          onChange={(e) =>
            handleMetaChange('dedicatedFans', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>Total Touchdowns:</Label>
        <InputField
          type="number"
          value={state.totalTouchdowns}
          onChange={(e) =>
            handleMetaChange('totalTouchdowns', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>Total Casualties:</Label>
        <InputField
          type="number"
          value={state.totalCasualties}
          onChange={(e) =>
            handleMetaChange('totalCasualties', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>League Points:</Label>
        <InputField
          type="number"
          value={state.leaguePoints}
          onChange={(e) =>
            handleMetaChange('leaguePoints', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>Team Re-Rolls:</Label>
        <InputField
          type="number"
          value={state.rerolls}
          onChange={(e) =>
            handleMetaChange('rerolls', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>Assistant Coaches:</Label>
        <InputField
          type="number"
          value={state.assistantCoaches}
          onChange={(e) =>
            handleMetaChange('assistantCoaches', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>Cheerleaders:</Label>
        <InputField
          type="number"
          value={state.cheerleaders}
          onChange={(e) =>
            handleMetaChange('cheerleaders', parseInt(e.target.value))
          }
        />
      </BottomRow>
      <BottomRow>
        <Label>Apothecary:</Label>
        <InputField
          type="checkbox"
          checked={state.apothecary}
          onChange={(e) =>
            handleMetaChange('apothecary', e.target.checked ? 'true' : 'false')
          }
        />
      </BottomRow>
    </BottomTableContainer>
  );
};

export default TeamMeta;
