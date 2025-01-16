import { CustomTeam } from '@/types/userData';
import { Team } from '@/types/teams';

type ValidationResult = { success: true } | { success: false; error: string };

const validatePositionLimit = (
  state: CustomTeam,
  positionId: string,
  teamData: Team
): ValidationResult => {
  const position = teamData.players.find((p) => p.id === positionId);
  if (!position) return { success: false, error: 'Invalid position ID' };

  const positionMax = parseInt(position.quantity.split('-')[1]);

  const count = state.players.filter(
    (player) => player?.positionId === positionId
  ).length;
  if (count >= positionMax) {
    return {
      success: false,
      error: `Position limit reached for ${position.id}`,
    };
  }

  return { success: true };
};

const validateTreasury = (
  state: CustomTeam,
  positionId: string,
  teamData: Team
): ValidationResult => {
  const position = teamData.players.find((p) => p.id === positionId);
  if (!position) return { success: false, error: 'Invalid position ID' };

  if (state.treasury < position.position.cost) {
    return { success: false, error: 'Not enough gold in treasury' };
  }

  return { success: true };
};
