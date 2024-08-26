import { db } from '@/services/firebase';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';

const teamVersion = 1;

// Fetches and enriches team data
const getTeamData = async (teamId) => {
  const localData = localStorage.getItem(`team_${teamId}`);

  if (localData) {
    const parsedData = JSON.parse(localData);
    if (parsedData.version === teamVersion) {
      return parsedData.data;
    }
  }

  // If no local data or version mismatch, fetch from Firebase
  const teamDoc = await getDoc(doc(db, 'teamBlueprints', teamId));
  const team = teamDoc.exists() ? teamDoc.data() : null;

  if (!team) {
    throw new Error(`Team with ID ${teamId} not found`);
  }

  const playersWithBlueprints = await Promise.all(
    team.players.map(async (player) => {
      const playerDoc = await getDoc(player.position);
      const positionData = playerDoc.exists() ? playerDoc.data() : null;

      const specialRules = await Promise.all(
        positionData.specialRules.map(async (ruleRef) => {
          const ruleDoc = await getDoc(ruleRef);
          return ruleDoc.exists() ? ruleDoc.data() : null;
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
    `team_${teamId}`,
    JSON.stringify({ version: teamVersion, data: teamData })
  );

  return teamData;
};

// Fetches the list of teams and checks the meta version
const fetchTeamsList = async () => {
  const storedTeamList = JSON.parse(localStorage.getItem('teamList'));
  const storedMeta = JSON.parse(localStorage.getItem('meta'));

  if (storedTeamList && storedMeta) {
    const metaDoc = await getDoc(doc(db, 'meta', 'dataInfo'));
    const firestoreMeta = metaDoc.exists() ? metaDoc.data() : null;

    if (firestoreMeta && firestoreMeta.lastUpdated === storedMeta.lastUpdated) {
      return storedTeamList;
    } else {
      clearTeamDataFromLocalStorage();
    }
  }

  const teamsCollection = await getDocs(collection(db, 'teamBlueprints'));
  const fullTeamList = teamsCollection.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().name;
    return acc;
  }, {});

  const metaDoc = await getDoc(doc(db, 'meta', 'dataInfo'));
  const firestoreMeta = metaDoc.exists() ? metaDoc.data() : null;

  localStorage.setItem('teamList', JSON.stringify(fullTeamList));
  if (firestoreMeta) {
    localStorage.setItem('meta', JSON.stringify(firestoreMeta));
  }

  return fullTeamList;
};

// Clears specific team-related data from localStorage
const clearTeamDataFromLocalStorage = () => {
  const keysToRemove = ['teamList', 'meta'];
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('team_') || keysToRemove.includes(key)) {
      localStorage.removeItem(key);
    }
  });
};

export { getTeamData, fetchTeamsList, clearTeamDataFromLocalStorage };
