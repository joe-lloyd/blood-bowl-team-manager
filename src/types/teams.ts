export interface TraitsAndSkills {
  id: string;
  name: string;
  description: string;
}

export interface PlayerPosition {
  name: string;
  cost: number;
  stats: {
    ma: number;
    st: number;
    ag: number;
    pa: number;
    av: number;
  };
  traitsAndSkills: TraitsAndSkills[];
  primary: string;
  secondary: string;
}

export interface Player {
  id: string;
  quantity: number;
  position: PlayerPosition;
}

export interface TeamSpecialRules {
  name: string;
  description: string;
}

export interface Team {
  name: string;
  players: Player[];
  rerollCost: number;
  tier: string;
  teamSpecialRules: TeamSpecialRules[];
  apothecary: boolean;
}

export type TeamsList = { [key: string]: string };
