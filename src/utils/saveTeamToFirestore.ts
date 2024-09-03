import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/services/firebase'; // Adjust based on your setup
import { CustomTeam } from '@/types/userData';
import { PlayerDataToSave } from '@/types/userData';

const saveTeamToFirestore = async (team: CustomTeam) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not logged in');
  }

  const userTeamsRef = collection(db, 'users', user.uid, 'savedTeams');
  const userTeamsSnapshot = await getDocs(userTeamsRef);

  if (userTeamsSnapshot.size >= 30) {
    throw new Error('You have reached the maximum number of saved teams');
  }

  // Extract only the necessary player data
  const playersToSave: PlayerDataToSave[] = team.players
    .map((player) => {
      if (!player) return null;
      return {
        positionId: player.positionId,
        spp: player.spp,
        playerName: player.playerName,
        number: player.number,
        missNextGame: player.missNextGame,
        nigglingInjury: player.nigglingInjury,
        tempRetirement: player.tempRetirement,
        currentValue: player.currentValue,
        statAdjust: player.statAdjust,
        skills: player.skills,
      };
    })
    .filter((player) => player !== null); // Remove any null values

  const teamToSave = {
    id: team.id,
    teamId: team.teamId,
    teamName: team.teamName,
    coachName: team.coachName,
    players: playersToSave,
    treasury: team.treasury,
    dedicatedFans: team.dedicatedFans,
    totalTouchdowns: team.totalTouchdowns,
    totalCasualties: team.totalCasualties,
    leaguePoints: team.leaguePoints,
    rerolls: team.rerolls,
    assistantCoaches: team.assistantCoaches,
    cheerleaders: team.cheerleaders,
    apothecary: team.apothecary,
  };

  const newTeamRef = doc(userTeamsRef);
  await setDoc(newTeamRef, teamToSave);

  console.log('Team saved successfully:', teamToSave);
};
