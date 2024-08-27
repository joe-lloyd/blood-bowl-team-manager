import { db } from '@/services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getUserContent = async (userId) => {
  const userContent = {
    teams: [],
    leagues: [],
    tournaments: [],
  };

  try {
    // Fetch user-specific teams
    const teamsQuery = query(
      collection(db, 'teams'),
      where('userId', '==', userId)
    );
    const teamsSnapshot = await getDocs(teamsQuery);
    userContent.teams = teamsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Add similar queries for leagues and tournaments if needed
    // const leaguesQuery = query(collection(db, 'leagues'), where('userId', '==', userId));
    // const leaguesSnapshot = await getDocs(leaguesQuery);
    // userContent.leagues = leaguesSnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));

    // const tournamentsQuery = query(collection(db, 'tournaments'), where('userId', '==', userId));
    // const tournamentsSnapshot = await getDocs(tournamentsQuery);
    // userContent.tournaments = tournamentsSnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
  } catch (error) {
    console.error('Error fetching user content:', error);
  }

  return userContent;
};
