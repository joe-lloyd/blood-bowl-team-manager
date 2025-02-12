import { GameVariant, Team, TeamId } from '@/types/teams';
import {
  CustomPlayer,
  CustomTeam,
  PlayerDataToSave,
  TeamDataToSave,
} from '@/types/userData';
import generateRandomName from '@/utils/randomNameGenerator/randomNameGenerator';

const createNewTeam = ({
  teamId,
  customTeamName,
  coachName,
  startingTreasury,
  variant,
}: {
  teamId: TeamId;
  customTeamName: string;
  coachName: string;
  startingTreasury: number;
  variant: GameVariant;
}): TeamDataToSave => {
  const numberOfPlayers = {
    classic: 16,
    sevens: 11,
  }[variant];

  return {
    teamId: teamId,
    variant: variant,
    teamName: customTeamName,
    coachName: coachName,
    players: Array(numberOfPlayers).fill(null) as PlayerDataToSave[],
    startingTreasury: startingTreasury,
    treasury: startingTreasury,
    dedicatedFans: 0,
    totalTouchdowns: 0,
    totalCasualties: 0,
    leaguePoints: 0,
    rerolls: 0,
    assistantCoaches: 0,
    cheerleaders: 0,
    apothecary: false,
    teamValue: 0,
  };
};

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
const combineBasePlayerDataWithUserPlayerData = (
  teamBluePrint: Team,
  userCustomPlayerData: PlayerDataToSave
): CustomPlayer | null => {
  if (!userCustomPlayerData) return null;

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
      av: `${parseInt(playerBlueprint.stats.av) + userCustomPlayerData.statAdjust.av}+`, // @TODO av is backwards
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

/**
 * This function does the opposite of combineBaseDataWithUserData. It takes a player CustomPlayer data
 * and strips it back to blueprint data and PlayerDataToSave. This is to get the data ready to be saved
 */
const stripUserDataFromPlayer = (
  teamBluePrint: Team,
  player: CustomPlayer
): PlayerDataToSave => {
  const playerBlueprint = teamBluePrint.players.find(
    ({ id }) => id === player.positionId
  )?.position;

  if (!playerBlueprint) {
    throw 'playerBlueprint not found';
  }

  return {
    positionId: player.positionId,
    playerName: player.playerName,
    number: player.number,
    missNextGame: player.missNextGame,
    nigglingInjury: player.nigglingInjury,
    tempRetirement: player.tempRetirement,
    statAdjust: {
      ma: parseInt(player.stats.ma) - parseInt(playerBlueprint.stats.ma),
      st: parseInt(player.stats.st) - parseInt(playerBlueprint.stats.st),
      ag: parseInt(player.stats.ag) - parseInt(playerBlueprint.stats.ag),
      pa: parseInt(player.stats.pa) - parseInt(playerBlueprint.stats.pa),
      av: parseInt(player.stats.av) - parseInt(playerBlueprint.stats.av), // @TODO av is backwards
    },
    skills: [],
    spp: player.spp,
  };
};

const combineBaseTeamDataWithUserTeamData = (
  teamBluePrint: Team,
  userCustomTeamData: TeamDataToSave
): CustomTeam => {
  const players = userCustomTeamData.players.map((playerData) => {
    if (!playerData) return null; // @TODO check if this breaks everything
    return combineBasePlayerDataWithUserPlayerData(teamBluePrint, playerData);
  });

  return {
    id: '',
    variant: userCustomTeamData.variant,
    teamName: userCustomTeamData.teamName,
    customTeamName: userCustomTeamData.teamName,
    rerollCost: teamBluePrint.rerollCost,
    teamId: userCustomTeamData.teamId,
    coachName: userCustomTeamData.coachName,
    players: players,
    treasury: userCustomTeamData.treasury,
    startingTreasury: userCustomTeamData.startingTreasury,
    dedicatedFans: userCustomTeamData.dedicatedFans,
    totalTouchdowns: userCustomTeamData.totalTouchdowns,
    totalCasualties: userCustomTeamData.totalCasualties,
    leaguePoints: userCustomTeamData.leaguePoints,
    rerolls: userCustomTeamData.rerolls,
    assistantCoaches: userCustomTeamData.assistantCoaches,
    cheerleaders: userCustomTeamData.cheerleaders,
    apothecary: userCustomTeamData.apothecary,
    teamValue: userCustomTeamData.teamValue,
  };
};

export {
  createNewPlayer,
  createNewTeam,
  combineBasePlayerDataWithUserPlayerData,
  combineBaseTeamDataWithUserTeamData,
  stripUserDataFromPlayer,
};
