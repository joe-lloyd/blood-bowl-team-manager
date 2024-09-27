import React, { useEffect } from 'react';
import BaseInfo from './BaseInfo';
import PlayerList from './PlayerList';
import TeamMeta from './TeamMeta';
import styled from 'styled-components';
import { Team } from '@/types/teams';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import { createNewTeam } from '@/utils/playerUtils';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import getDoc to check Firestore
import { db } from '@/services/firebase';
import { useUser } from '@/contexts/userContext';
import SaveButton from '@/components/TeamBuilder/SaveButton';
import { TeamDataToSave } from '@/types/userData';

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

const TeamBuilder: React.FC<{ teamData: Team; uid: string }> = ({
  teamData,
  uid,
}) => {
  const user = useUser();
  const { state, dispatch } = useTeamBuilder();

  useEffect(() => {
    const initializeTeam = async () => {
      try {
        if (!user) {
          console.error('User not found');
          return;
        }

        const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);
        const teamSnapshot = await getDoc(teamDocRef);

        if (teamSnapshot.exists()) {
          const coachData = teamSnapshot.data() as TeamDataToSave;
          console.log('Existing team loaded:', coachData);
          dispatch({
            type: 'LOAD_TEAM_INTO_STATE',
            payload: { coachData, teamData },
          });
        } else {
          const teamBlueprintData = createNewTeam(teamData.teamId);
          dispatch({ type: 'UPDATE_META', payload: teamBlueprintData });
          await setDoc(teamDocRef, teamBlueprintData);
        }
      } catch (error) {
        console.error('Error during Firestore operation:', error);
      }
    };

    initializeTeam();
  }, [user, uid]);

  return (
    <TeamBuilderContainer>
      <TopTableContainer>
        <StyledHeading>Team Draft List</StyledHeading>
        <BaseInfo teamData={teamData} />
      </TopTableContainer>
      <PlayerList teamData={teamData} uid={uid} />
      <TeamMeta teamData={teamData} />
      <SaveButton />
    </TeamBuilderContainer>
  );
};

export default TeamBuilder;
