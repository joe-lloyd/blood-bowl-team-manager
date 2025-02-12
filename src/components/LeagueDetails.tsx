import { League } from '@/types/league';
import React from 'react';

const LeagueDetails: React.FC<{ league: League }> = ({ league }) => {
  return (
    <div>
      <h1>League Details</h1>
      <p>{league.id}</p>
      <p>{league.leagueName}</p>
      <p>{league.description}</p>
      <p>{league.createdBy}</p>
      <p>{league.createdAt}</p>
      {league.seasons.map((season) => (
        <div key={season.seasonId}>
          <h2>Season Details</h2>
          <p>{season.seasonId}</p>
          <p>{season.seasonName}</p>
          <p>{season.startDate}</p>
          <p>{season.endDate}</p>
          <h3>Teams</h3>
          <ul>
            {season.teams.map((team) => (
              <li key={team}>{team}</li>
            ))}
          </ul>
          <h3>Games</h3>
          <ul>
            {season.games.map((game) => (
              <li key={game.gameId}>
                <p>{game.gameId}</p>
                <p>{game.date}</p>
                <p>{game.homeTeam}</p>
                <p>{game.awayTeam}</p>
                <p>{game.homeScore}</p>
                <p>{game.awayScore}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LeagueDetails;
