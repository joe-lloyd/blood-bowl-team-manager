import React, { useEffect, useState } from 'react';
import { fetchTeamsList, getTeamData } from '@/utils/teamUtils';
import Hero from '@/components/Hero';
import Parchment from '@/components/Parchment';
import TeamDetails from '@/components/TeamDetails';
import styled from 'styled-components';
import AppBar from '@/components/AppBar';

const Container = styled.div`
  //padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #922d26;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #701d1a;
  }
`;

const TeamsPage = () => {
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const initializeTeamsList = async () => {
      try {
        const teamList = await fetchTeamsList();
        setTeams(teamList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    initializeTeamsList();
  }, []);

  const handleTeamClick = async (teamId) => {
    try {
      const teamData = await getTeamData(teamId, teams[teamId]);
      setTeamData(teamData);
    } catch (error) {
      console.error(`Error fetching team data for ${teamId}:`, error);
    }
  };

  return (
    <Container>
      <Parchment />
      <AppBar />
      <Hero text={'Blood Bowl Teams'} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(teams).map(([teamId, teamName]) => (
          <Button key={teamId} onClick={() => handleTeamClick(teamId)}>
            {teamName}
          </Button>
        ))
      )}
      {teamData && <TeamDetails teamData={teamData} />}
    </Container>
  );
};

export default TeamsPage;
