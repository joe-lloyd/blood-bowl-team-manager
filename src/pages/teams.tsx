import { useEffect, useState } from 'react';
import { collection, getDocs, query, select } from 'firebase/firestore';
import { db } from '@/services/firebase'; // Adjust the path based on your setup

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeamsList = async () => {
      try {
        // Fetch document IDs only
        const teamsCollection = await getDocs(
          query(collection(db, 'teamBlueprints'), select())
        );
        const firestoreTeamList = teamsCollection.docs.map((doc) => doc.id);

        // Check against local storage
        const storedTeamList = JSON.parse(localStorage.getItem('teamList'));

        if (
          !storedTeamList ||
          storedTeamList.length !== firestoreTeamList.length
        ) {
          // If the counts differ or no data in local storage, fetch full team names
          const teamsCollectionFull = await getDocs(
            collection(db, 'teamBlueprints')
          );
          const fullTeamList = teamsCollectionFull.docs.map(
            (doc) => doc.data().name
          );

          // Store the full team list in local storage
          localStorage.setItem('teamList', JSON.stringify(fullTeamList));
          setTeams(fullTeamList);
        } else {
          // If counts match, use the stored data
          setTeams(storedTeamList);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeamsList();
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsPage;
