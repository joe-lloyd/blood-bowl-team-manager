import { db } from '@/services/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import {
  Player,
  PlayerPosition,
  Team,
  TeamSpecialRules,
  TraitsAndSkills,
} from '@/types/teams';

const teamVersion = 1;

const getTeamData: Promise<Team> = async (teamId: string) => {
  const teamDoc = await getDoc(doc(db, 'teamBlueprints', teamId));
  const team = teamDoc.exists() ? teamDoc.data() : null;

  if (!team) {
    throw new Error(`Team with ID ${teamId} not found`);
  }

  const teamSpecialRules: Promise<TeamSpecialRules[]> = await Promise.all(
    team.teamSpecialRules.map(async (ruleRef: string) => {
      const ruleDoc = await getDoc(ruleRef);
      return ruleDoc.exists() ? ruleDoc.data() : null;
    })
  );

  const playersWithBlueprints: Promise<Team['players'][]> = await Promise.all(
    team.players.map(async (player: Player) => {
      const playerDoc = await getDoc(player.position);
      const positionData = playerDoc.exists() ? playerDoc.data() : null;

      const traitsAndSkills: Promise<TraitsAndSkills[]> = await Promise.all(
        positionData.traitsAndSkills.map(
          async (ruleRef: PlayerPosition['traitsAndSkills']) => {
            const ruleDoc = await getDoc(ruleRef);
            return ruleDoc.exists() ? ruleDoc.data() : null;
          }
        )
      );

      return {
        ...player,
        position: {
          ...positionData,
          traitsAndSkills,
        },
      };
    })
  );

  return {
    ...team,
    teamSpecialRules,
    players: playersWithBlueprints,
  };
};

const fetchTeamsList = async (isServerSide = false) => {
  const teamsCollection = await getDocs(collection(db, 'teamBlueprints'));
  const fullTeamList = teamsCollection.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().name;
    return acc;
  }, {});

  return fullTeamList;
};

export { getTeamData, fetchTeamsList };
