import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { CustomPlayer, CustomTeam } from '@/types/userData';

type ActionType =
  | { type: 'SET_TEAM_NAME'; payload: string }
  | { type: 'SET_COACH_NAME'; payload: string }
  | { type: 'ADD_PLAYER'; payload: { player: CustomPlayer; index: number } }
  | { type: 'REMOVE_PLAYER'; payload: number }
  | {
      type: 'UPDATE_PLAYER';
      payload: { index: number; player: CustomPlayer };
    }
  | { type: 'UPDATE_META'; payload: Partial<CustomTeam> };

const teamReducer = (state: CustomTeam, action: ActionType): CustomTeam => {
  switch (action.type) {
    case 'SET_TEAM_NAME':
      return { ...state, teamName: action.payload };
    case 'SET_COACH_NAME':
      return { ...state, coachName: action.payload };
    case 'ADD_PLAYER': {
      const newPlayers = [...state.players];
      console.log(action.payload.index, action.payload.player);
      newPlayers[action.payload.index] = { ...action.payload.player };
      return { ...state, players: newPlayers };
    }
    case 'REMOVE_PLAYER': {
      const updatedPlayers = [...state.players];
      updatedPlayers[action.payload] = undefined;
      return { ...state, players: updatedPlayers };
    }
    case 'UPDATE_PLAYER': {
      const updatedPlayers = state.players.map((player, index) =>
        index === action.payload.index ? { ...action.payload.player } : player
      );
      console.log(updatedPlayers);
      const bruh = { ...state, players: updatedPlayers };
      console.log(bruh);
      return bruh;
    }
    case 'UPDATE_META':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const TeamBuilderContext = createContext<
  | {
      state: CustomTeam;
      dispatch: React.Dispatch<ActionType>;
    }
  | undefined
>(undefined);

const TeamBuilderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialTeamState: CustomTeam = {
    id: '',
    teamId: '',
    teamName: '',
    coachName: '',
    players: new Array(16),
    treasury: 0,
    dedicatedFans: 0,
    totalTouchdowns: 0,
    totalCasualties: 0,
    leaguePoints: 0,
    rerolls: 0,
    assistantCoaches: 0,
    cheerleaders: 0,
    apothecary: false,
  };

  const [state, dispatch] = useReducer(teamReducer, initialTeamState);

  return (
    <TeamBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamBuilderContext.Provider>
  );
};

const useTeamBuilder = () => {
  const context = useContext(TeamBuilderContext);
  if (!context) {
    throw new Error('useTeamBuilder must be used within a TeamBuilderProvider');
  }
  return context;
};

export { TeamBuilderProvider, useTeamBuilder };
