import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { CustomPlayer, CustomTeam, TeamDataToSave } from '@/types/userData';
import { Team } from '@/types/teams';
import { combineBaseDataWithUserData } from '@/utils/playerUtils';

type ActionType =
  | { type: 'SET_TEAM_NAME'; payload: string }
  | { type: 'SET_COACH_NAME'; payload: string }
  | { type: 'ADD_PLAYER'; payload: { player: CustomPlayer; index: number } }
  | { type: 'REMOVE_PLAYER'; payload: number }
  | {
      type: 'UPDATE_PLAYER';
      payload: { index: number; player: CustomPlayer };
    }
  | { type: 'UPDATE_META'; payload: Partial<CustomTeam> }
  | {
      type: 'LOAD_TEAM_INTO_STATE';
      payload: Partial<{ coachData: TeamDataToSave; teamData: Team }>;
    }
  | { type: 'INITIALIZE_TEAM'; payload: CustomTeam };

const teamReducer = (state: CustomTeam, action: ActionType): CustomTeam => {
  switch (action.type) {
    case 'SET_TEAM_NAME':
      return { ...state, customTeamName: action.payload };
    case 'SET_COACH_NAME':
      return { ...state, coachName: action.payload };
    case 'ADD_PLAYER': {
      const newPlayers = [...state.players];
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
      return { ...state, players: updatedPlayers };
    }
    case 'UPDATE_META':
      return { ...state, ...action.payload };
    case 'LOAD_TEAM_INTO_STATE': {
      const { coachData, teamData } = action.payload;
      if (!coachData || !teamData) {
        console.error('No coach or team data found');
        return state;
      }
      const mergedPlayers = coachData.players.map((savedPlayerData, index) => {
        if (!savedPlayerData) {
          return null;
        }
        return combineBaseDataWithUserData(teamData, savedPlayerData);
      });

      return {
        ...state,
        players: mergedPlayers,
        teamId: teamData.teamId,
        teamName: teamData.name,
        customTeamName: coachData?.teamName,
        coachName: coachData?.coachName,
        treasury: coachData?.treasury,
        dedicatedFans: coachData?.dedicatedFans,
        totalTouchdowns: coachData?.totalTouchdowns,
        totalCasualties: coachData?.totalCasualties,
        leaguePoints: coachData?.leaguePoints,
        rerolls: coachData?.rerolls || teamData.rerollCost,
        rerollCost: teamData.rerollCost,
        assistantCoaches: coachData?.assistantCoaches,
        cheerleaders: coachData?.cheerleaders,
        apothecary: coachData?.apothecary || teamData.apothecary,
      };
    }
    case 'INITIALIZE_TEAM':
      return { ...action.payload };
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

const TeamBuilderProvider: React.FC<{
  children: ReactNode;
  initialTeamState?: CustomTeam;
}> = ({ children, initialTeamState }) => {
  const [state, dispatch] = useReducer(
    teamReducer,
    initialTeamState || {
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
    }
  );

  useEffect(() => {
    if (initialTeamState) {
      dispatch({ type: 'INITIALIZE_TEAM', payload: initialTeamState });
    }
  }, [initialTeamState]);

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
