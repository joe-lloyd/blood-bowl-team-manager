interface CustomPlayer {
  positionId: string;
  positionName: string;
  playerName: string;
  cost: number;
  stats: {
    ma: string;
    st: string;
    ag: string;
    pa: string;
    av: string;
  };
  traitsAndSkills: string[];
  primary: string;
  secondary: string;
  spp: number;
  number: number;
  missNextGame: boolean;
  nigglingInjury: boolean;
  tempRetirement: boolean;
  currentValue: number;
}

interface CustomTeam {
  id: string;
  teamId: string;
  teamName: string;
  coachName: string;
  players: CustomPlayer[];
  treasury: number;
  dedicatedFans: number;
  totalTouchdowns: number;
  totalCasualties: number;
  leaguePoints: number;
  rerolls: number;
  assistantCoaches: number;
  cheerleaders: number;
  apothecary: boolean;
}

interface TeamDataToSave {
  teamId: string;
  teamName: string;
  coachName: string;
  players: (PlayerDataToSave | undefined)[];
  treasury: number;
  dedicatedFans: number;
  totalTouchdowns: number;
  totalCasualties: number;
  leaguePoints: number;
  rerolls: number;
  assistantCoaches: number;
  cheerleaders: number;
  apothecary: boolean;
}

interface PlayerDataToSave {
  positionId: string;
  spp: number;
  playerName: string;
  number: number;
  missNextGame: boolean;
  nigglingInjury: boolean;
  tempRetirement: boolean;
  currentValue?: number;
  statAdjust: StatAdjust;
  skills: string[];
}

interface StatAdjust {
  ma: number;
  st: number;
  ag: number;
  pa: number;
  av: number;
}

export type {
  CustomTeam,
  CustomPlayer,
  TeamDataToSave,
  PlayerDataToSave,
  StatAdjust,
};
