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
          const existingTeam = teamSnapshot.data() as Team;
          console.log('Existing team loaded:', existingTeam);
          dispatch({ type: 'UPDATE_META', payload: existingTeam });
        } else {
          const newTeam = createNewTeam(teamData.teamId); // Using uid as teamId if necessary
          console.log('Creating new team:', newTeam);

          await setDoc(teamDocRef, newTeam);

          dispatch({ type: 'UPDATE_META', payload: newTeam });
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
      <PlayerList teamData={teamData} />
      <TeamMeta teamData={teamData} />
      <SaveButton />
    </TeamBuilderContainer>
  );
};

export default TeamBuilder;
