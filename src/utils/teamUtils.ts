import { db } from '@/services/firebase';
import { collection, getDoc, getDocs } from 'firebase/firestore';

export const getTeamData = async (teamName) => {
  const localData = localStorage.getItem(`team_${teamName}`);
  const teamVersion = 1; // Update this when you change the team data structure

  if (localData) {
    const parsedData = JSON.parse(localData);
    if (parsedData.version === teamVersion) {
      return parsedData.data;
    }
  }

  // If no local data or version mismatch, fetch from Firebase
  const querySnapshot = await getDocs(collection(db, 'teamBlueprints'));
  const teamDoc = querySnapshot.docs.find(
    (doc) => doc.data().name === teamName
  );
  const team = teamDoc.data();

  const playersWithBlueprints = await Promise.all(
    team.players.map(async (player) => {
      const playerDoc = await getDoc(player.position);
      const positionData = playerDoc.data();

      const specialRules = await Promise.all(
        positionData.specialRules.map(async (ruleRef) => {
          const ruleDoc = await getDoc(ruleRef);
          return ruleDoc.data();
        })
      );

      return {
        ...player,
        position: {
          ...positionData,
          specialRules,
        },
      };
    })
  );

  const teamData = {
    ...team,
    players: playersWithBlueprints,
  };

  // Save to local storage with version
  localStorage.setItem(
    `team_${teamName}`,
    JSON.stringify({ version: teamVersion, data: teamData })
  );

  return teamData;
};
