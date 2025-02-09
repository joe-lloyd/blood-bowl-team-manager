import { CustomTeam } from '@/types/userData';
import { Player, Team } from '@/types/teams';

type ValidationResult = { success: true } | { success: false; error: string };

const validatePositionLimit = (
  state: CustomTeam,
  position: Player
): ValidationResult => {
  const positionMax = parseInt(position.quantity.split('-')[1]);

  const count = state.players.filter(
    (player) => player?.positionId === position.id
  ).length;
  if (count >= positionMax) {
    return {
      success: false,
      // @TODO print this error, rething errors as values.
      error: `Position limit reached for ${position.id}`,
    };
  }

  return { success: true };
};

const validateTreasury = (
  state: CustomTeam,
  position: Player
): ValidationResult => {
  if (state.treasury < position.position.cost) {
    return { success: false, error: 'Not enough gold in treasury' };
  }

  return { success: true };
};

export { validatePositionLimit, validateTreasury };
