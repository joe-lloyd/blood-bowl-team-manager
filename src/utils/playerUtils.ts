import { Team } from '@/types/teams';
import { CustomPlayer, PlayerDataToSave } from '@/types/userData';

/**
 * This function takes the blueprint data for a player ( base skills, MA, ST etc ) type and adds the
 * user data like name, number and niggle injury so that the data saved in the context is a full
 * player easily accessible.
 *
 * @param teamBluePrint
 * @param userCustomPlayerData
 */
const customPlayer = (
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
    cost: playerBlueprint.cost,
    stats: {
      ma: playerBlueprint.stats.ma + userCustomPlayerData.statAdjust.ma,
      st: playerBlueprint.stats.st + userCustomPlayerData.statAdjust.st,
      ag: playerBlueprint.stats.ag + userCustomPlayerData.statAdjust.ag,
      pa: playerBlueprint.stats.pa + userCustomPlayerData.statAdjust.pa,
      av: playerBlueprint.stats.av + userCustomPlayerData.statAdjust.av,
    },
    traitsAndSkills: [
      ...playerBlueprint.traitsAndSkills.map(({ name }) => name),
      ...userCustomPlayerData.skills,
    ],
    primary: playerBlueprint.primary,
    secondary: playerBlueprint.secondary,
    spp: userCustomPlayerData.spp,
    playerName: userCustomPlayerData.playerName,
    number: userCustomPlayerData.number,
    missNextGame: userCustomPlayerData.missNextGame,
    nigglingInjury: userCustomPlayerData.nigglingInjury,
    tempRetirement: userCustomPlayerData.tempRetirement,

    // @TODO current value need a separate function to calculate
    currentValue: playerBlueprint.cost,
  };
};

export { customPlayer };
