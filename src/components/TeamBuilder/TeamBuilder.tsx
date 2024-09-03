import React, { useEffect } from 'react';
import BaseInfo from './BaseInfo';
import PlayerList from './PlayerList';
import TeamMeta from './TeamMeta';
import styled from 'styled-components';
import { Team } from '@/types/teams';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import { createNewTeam } from '@/utils/playerUtils';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useUser } from '@/contexts/userContext';

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

const TeamBuilder: React.FC<{ teamData: Team }> = ({ teamData }) => {
  console.log('FIRESTORE', db);
  const user = useUser();
  const { state, dispatch } = useTeamBuilder();

  useEffect(() => {
    const initializeTeam = async () => {
      try {
        if (!user) {
          console.error('User not found');
          return;
        }

        let uniqueTeamInstanceId = localStorage.getItem('uniqueTeamInstanceId');

        if (!uniqueTeamInstanceId) {
          const newTeam = createNewTeam(teamData.id, teamData.name);
          uniqueTeamInstanceId = newTeam.id;

          console.log('Attempting to save new team:', newTeam);
          console.log(
            'Saving to Firestore path:',
            `users/${user.id}/teams/${uniqueTeamInstanceId}`
          );

          await setDoc(
            doc(db, 'users', user.id, 'teams', uniqueTeamInstanceId),
            newTeam
          );

          localStorage.setItem('uniqueTeamInstanceId', uniqueTeamInstanceId);
          dispatch({ type: 'UPDATE_META', payload: newTeam });
        } else {
          console.log('Loading existing team:', uniqueTeamInstanceId);
          const teamDoc = await getDoc(
            doc(db, 'users', user.id, 'teams', uniqueTeamInstanceId)
          );
          if (teamDoc.exists()) {
            console.log('Existing team found:', teamDoc.data());
            dispatch({ type: 'UPDATE_META', payload: teamDoc.data() });
          } else {
            console.warn('No existing team found, resetting local storage.');
            localStorage.removeItem('uniqueTeamInstanceId');
          }
        }
      } catch (error) {
        console.error('Error during Firestore operation:', error);
      }
    };

    initializeTeam();
  }, [user, teamData.id, teamData.name, dispatch]);

  return (
    <TeamBuilderContainer>
      <TopTableContainer>
        <StyledHeading>Team Draft List</StyledHeading>
        <BaseInfo teamData={teamData} />
      </TopTableContainer>
      <PlayerList teamData={teamData} />
      <TeamMeta teamData={teamData} />
    </TeamBuilderContainer>
  );
};

export default TeamBuilder;
