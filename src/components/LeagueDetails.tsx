import { League } from '@/types/league';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '@/services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getTeamData } from '@/utils/teamUtils';
import { combineBaseTeamDataWithUserTeamData } from '@/utils/playerUtils';
import { CustomTeam, TeamDataToSave } from '@/types/userData';
import { roundRobin } from '@/utils/generateRoundRobin/roundRobin';
import { v4 as uuidv4 } from 'uuid';
import {
  MainTable,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from '@/components/ComponentWarehouse/Table';
import { Button } from '@/components/ComponentWarehouse/Button';
import {
  SeasonTitle,
  Subtitle,
  Title,
} from '@/components/ComponentWarehouse/Titles';

const LeagueDetailsWrapper = styled.div`
  padding: 20px;
  border: 2px solid #1d3860;
  background-color: #e0f0ff;
  margin-bottom: 2.5rem;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const LeagueDetails: React.FC<{ league: League }> = ({ league }) => {
  const [teams, setTeams] = useState<{
    [key: string]: CustomTeam[];
  }>(() =>
    league.seasons.reduce((acc, season) => {
      return { ...acc, [season.seasonId]: [] };
    }, {})
  );

  useEffect(() => {
    const fetchTeams = async () => {
      let combinedTeamsData: { [key: string]: CustomTeam[] } = {};
      for (const season of league.seasons) {
        combinedTeamsData[season.seasonId] = [];
        for (const teamRef of season.teams) {
          const teamDoc = await getDoc(doc(db, teamRef));
          if (teamDoc.exists()) {
            const data = teamDoc.data() as TeamDataToSave;
            const team = await getTeamData(data.teamId);
            const customTeam = combineBaseTeamDataWithUserTeamData(
              team,
              data,
              teamDoc.id
            );
            combinedTeamsData[season.seasonId].push(customTeam);
          }
        }
      }
      setTeams(combinedTeamsData);
    };

    fetchTeams();
  }, [league]);

  const handleGenerateMatches = async (seasonId: string) => {
    const season = league.seasons.find((s) => s.seasonId === seasonId);
    if (!season) return;

    const teamIds = season.teams;
    const matches = roundRobin(teamIds, 1);

    const newGames = matches.map((match) => ({
      gameId: uuidv4(),
      date: new Date().toISOString(),
      homeTeam: match.home,
      awayTeam: match.away,
      homeScore: 0,
      awayScore: 0,
      casualties: 0,
    }));

    const updatedSeason = {
      ...season,
      games: [...season.games, ...newGames],
    };

    const updatedSeasons = league.seasons.map((s) =>
      s.seasonId === seasonId ? updatedSeason : s
    );

    const leagueRef = doc(db, `users/${league.createdBy}/leagues/${league.id}`);
    await updateDoc(leagueRef, { seasons: updatedSeasons });
  };

  const creationDate = new Date(league.createdAt).toDateString();

  return (
    <>
      <LeagueDetailsWrapper>
        <Title>League Details</Title>
        <p>Name: {league.leagueName}</p>
        <p>Description: {league.description}</p>
        <p>Created At: {creationDate}</p>
        <p>Number of Seasons {league.seasons.length}</p>
      </LeagueDetailsWrapper>
      {league.seasons.map((season) => {
        const seasonStartDate = new Date(season.startDate).toDateString();
        const seasonEndDate = new Date(season.endDate).toDateString();
        return (
          <Section key={season.seasonId}>
            <SeasonTitle>{season.seasonName} Details</SeasonTitle>
            <p>Start Date: {seasonStartDate}</p>
            <p>End Date: {seasonEndDate}</p>
            <Subtitle>Teams</Subtitle>
            <TableWrapper>
              <MainTable>
                <thead>
                  <tr>
                    <TableHeader>Pos</TableHeader>
                    <TableHeader>Team</TableHeader>
                    <TableHeader>Games Played</TableHeader>
                    <TableHeader>Wins</TableHeader>
                    <TableHeader>Loss</TableHeader>
                    <TableHeader>Draws</TableHeader>
                    <TableHeader>Points</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {teams[season.seasonId].map((team, index) => (
                    <TableRow key={team.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{`${team.customTeamName} [${team.teamName}]`}</TableCell>
                      <TableCell>{''}</TableCell>
                      <TableCell>{''}</TableCell>
                      <TableCell>{''}</TableCell>
                      <TableCell>{''}</TableCell>
                      <TableCell>{''}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </MainTable>
            </TableWrapper>
            <Subtitle>Games</Subtitle>
            <Button
              onClick={() => handleGenerateMatches(season.seasonId)}
              disabled={season.games.length > 0}
            >
              Generate Matches
            </Button>
            <TableWrapper>
              <MainTable>
                <thead>
                  <tr>
                    <TableHeader>Game</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Home Team</TableHeader>
                    <TableHeader>Away Team</TableHeader>
                    <TableHeader>Home Score</TableHeader>
                    <TableHeader>Away Score</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {season.games.map((game, index) => {
                    const date = new Date(game.date).toDateString();
                    const homeTeam = teams[season.seasonId].find(({ id }) => {
                      return id === game.homeTeam.split('/')[3];
                    });
                    const awayTeam = teams[season.seasonId].find(({ id }) => {
                      return id === game.awayTeam.split('/')[3];
                    });
                    return (
                      <TableRow key={game.gameId}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{date}</TableCell>
                        <TableCell>{homeTeam?.customTeamName}</TableCell>
                        <TableCell>{awayTeam?.customTeamName}</TableCell>
                        <TableCell>{game.homeScore}</TableCell>
                        <TableCell>{game.awayScore}</TableCell>
                      </TableRow>
                    );
                  })}
                </tbody>
              </MainTable>
            </TableWrapper>
          </Section>
        );
      })}
    </>
  );
};

export default LeagueDetails;
