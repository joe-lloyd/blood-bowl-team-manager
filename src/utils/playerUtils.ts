import { Team } from '@/types/teams';
import {
  CustomPlayer,
  PlayerDataToSave,
  TeamDataToSave,
} from '@/types/userData';
import generateRandomName from '@/utils/randomNameGenerator/randomNameGenerator';
const createNewTeam = (teamId: string): TeamDataToSave => ({
  teamId: teamId,
  teamName: '',
  coachName: '',
  players: Array(16).fill(null) as PlayerDataToSave[],
  treasury: 1000000,
  dedicatedFans: 0,
  totalTouchdowns: 0,
  totalCasualties: 0,
  leaguePoints: 0,
  rerolls: 0,
  assistantCoaches: 0,
  cheerleaders: 0,
  apothecary: false,
});

const createNewPlayer = (
  positionId: string,
  index: number
): PlayerDataToSave => {
  return {
    positionId: positionId,
    spp: 0,
    playerName: generateRandomName(positionId),
    number: index + 1,
    missNextGame: false,
    nigglingInjury: false,
    tempRetirement: false,
    statAdjust: {
      ma: 0,
      st: 0,
      ag: 0,
      pa: 0,
      av: 0,
    },
    skills: [],
  };
};

/**
 * This function takes the blueprint data for a player ( base skills, MA, ST etc ) type and adds the
 * user data like name, number and niggle injury so that the data saved in the context is a full
 * player easily accessible.
 *
 * @param teamBluePrint
 * @param userCustomPlayerData
 */
const combineBaseDataWithUserData = (
  teamBluePrint: Team,
  userCustomPlayerData: PlayerDataToSave
): CustomPlayer => {
  const { positionId } = userCustomPlayerData;
  const playerBlueprint = teamBluePrint.players.find(
    ({ id }) => id === positionId
  )?.position;

  if (!playerBlueprint) {
    throw 'playerBlueprint not found';
  }

  return {
    positionId: positionId,
    positionName: playerBlueprint.name,
    playerName: userCustomPlayerData.playerName,
    cost: playerBlueprint.cost,
    stats: {
      ma: `${parseInt(playerBlueprint.stats.ma) + userCustomPlayerData.statAdjust.ma}`,
      st: `${parseInt(playerBlueprint.stats.st) + userCustomPlayerData.statAdjust.st}`,
      ag: `${parseInt(playerBlueprint.stats.ag) + userCustomPlayerData.statAdjust.ag}+`,
      pa: `${parseInt(playerBlueprint.stats.pa) + userCustomPlayerData.statAdjust.pa}+`,
      av: `${parseInt(playerBlueprint.stats.av) + userCustomPlayerData.statAdjust.av}+`,
    },
    traitsAndSkills: [
      ...playerBlueprint.traitsAndSkills.map(({ name }) => name),
      ...userCustomPlayerData.skills,
    ],
    primary: playerBlueprint.primary,
    secondary: playerBlueprint.secondary,
    spp: userCustomPlayerData.spp,
    number: userCustomPlayerData.number,
    missNextGame: userCustomPlayerData.missNextGame,
    nigglingInjury: userCustomPlayerData.nigglingInjury,
    tempRetirement: userCustomPlayerData.tempRetirement,

    // @TODO current value need a separate function to calculate
    currentValue: playerBlueprint.cost,
  };
};

export { createNewPlayer, createNewTeam, combineBaseDataWithUserData };
