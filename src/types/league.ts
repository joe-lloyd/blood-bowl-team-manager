import { TeamDataToSave } from '@/types/userData';

interface League {
  id: string;
  leagueName: string;
  description: string;
  createdBy: string;
  createdAt: string;
  seasons: Season[];
}

interface Season {
  seasonId: string;
  seasonName: string;
  startDate: string;
  endDate: string;
  teams: string[];
  games: Game[];
}

interface Game {
  gameId: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

export type { League, Season, Game };
