export enum GameVariant {
  CLASSIC = 'classic',
  SEVENS = 'sevens',
  // GUTTER_BOWL = 'gutter_bowl',
  // STREET_BOWL = 'street-bowl',
  // DEATH_BOWL = 'death-bowl',
  // DEATH_BOWL_7S = 'death-bowl-7s',
}

export interface TraitsAndSkills {
  id: string;
  name: string;
  description: string;
}

export interface PlayerPosition {
  name: string;
  cost: number;
  stats: {
    ma: string;
    st: string;
    ag: string;
    pa: string;
    av: string;
  };
  traitsAndSkills: TraitsAndSkills[];
  primary: string;
  secondary: string;
}

export interface Player {
  id: string;
  quantity: string;
  position: PlayerPosition;
}

export interface TeamSpecialRules {
  name: string;
  description: string;
}

export interface Team {
  teamId: string;
  name: string;
  players: Player[];
  rerollCost: number;
  tier: string;
  teamSpecialRules: TeamSpecialRules[];
  apothecary: boolean;
}

export type TeamsList = { [key: string]: string };
