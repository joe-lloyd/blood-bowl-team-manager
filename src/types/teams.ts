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
  specialRules: Array<{ name: string }>;
  primary: string;
  secondary: string;
}

export interface Player {
  quantity: number;
  position: PlayerPosition;
}

export interface Team {
  name: string;
  players: Player[];
  rerollCost: number;
  tier: string;
  specialRules: string[];
  apothecary: boolean;
}
