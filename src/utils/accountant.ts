import { CustomTeam } from '@/types/userData';
import { Player } from '@/types/teams';

const payForPlayer = (team: CustomTeam, player: Player) => {
  const newTreasury = team.treasury - player.position.cost;
  const newTeamValue = team.teamValue + player.position.cost;
  return { treasury: newTreasury, teamValue: newTeamValue };
};

export { payForPlayer };
