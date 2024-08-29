import { db } from '@/services/firebase';
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { Player, Team, TeamSpecialRules, TraitsAndSkills } from '@/types/teams';

const getTeamData = async (teamId: string): Promise<Team> => {
  const teamDoc = await getDoc(doc(db, 'teamBlueprints', teamId));
  const team = teamDoc.exists() ? teamDoc.data() : null;

  if (!team) {
    throw new Error(`Team with ID ${teamId} not found`);
  }

  const teamSpecialRules: TeamSpecialRules[] = await Promise.all(
    team.teamSpecialRules.map(async (ruleRef: DocumentReference) => {
      const ruleDoc = await getDoc(ruleRef);
      return ruleDoc.exists() ? ruleDoc.data() : null;
    })
  );

  const playersWithBlueprints: Player[] = await Promise.all(
    team.players.map(
      async (player: { position: DocumentReference; quantity: number }) => {
        const playerDoc = await getDoc(player.position as DocumentReference);
        const positionData = playerDoc.exists() ? playerDoc.data() : null;

        if (!positionData) {
          throw new Error(
            `Player position not found for ${player.position.path}`
          );
        }

        const traitsAndSkills: TraitsAndSkills[] = await Promise.all(
          positionData.traitsAndSkills.map(
            async (ruleRef: DocumentReference) => {
              const ruleDoc = await getDoc(ruleRef);
              return ruleDoc.exists()
                ? { id: ruleDoc.id, ...ruleDoc.data() }
                : null;
            }
          )
        );

        return {
          id: playerDoc.id,
          ...player,
          position: {
            ...positionData,
            traitsAndSkills,
          },
        };
      }
    )
  );

  return {
    name: team.name,
    rerollCost: team.rerollCost,
    tier: team.tier,
    apothecary: team.apothecary,
    teamSpecialRules,
    players: playersWithBlueprints,
  };
};

const fetchTeamsList = async (): Promise<{ [key: string]: string }> => {
  const teamsCollection = await getDocs(collection(db, 'teamBlueprints'));

  return teamsCollection.docs.reduce(
    (acc, doc) => {
      acc[doc.id] = doc.data().name as string;
      return acc;
    },
    {} as { [key: string]: string }
  );
};

export { getTeamData, fetchTeamsList };
