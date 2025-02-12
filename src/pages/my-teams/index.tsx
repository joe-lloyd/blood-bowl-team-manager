import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useUser } from '@/contexts/userContext';
import Parchment from '@/components/ComponentWarehouse/Parchment';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import TextBorderBox from '@/components/TextBorderBox';
import ContentContainer from '@/components/ComponentWarehouse/ContentContainer';
import MyTeamsList from '@/components/MyTeamsList';
import MinHeightContainer from '@/components/ComponentWarehouse/MinHeightContainer';

const TeamsPage: React.FC = () => {
  const user = useUser();
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const teamsCollection = collection(db, `users/${user.uid}/teams`);

      // Real-time listener
      const unsubscribe = onSnapshot(
        teamsCollection,
        (snapshot) => {
          const teamsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTeams(teamsList);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching real-time updates:', error);
          setLoading(false);
        }
      );

      // Clean up listener on component unmount
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <>
      <Parchment />
      <AppBar />
      <MinHeightContainer>
        <Hero text={'My Teams'} />
        <ContentContainer>
          <TextBorderBox
            title="Team Overview"
            body="These are your teams. You can view, edit, and delete them here."
          />
          {loading ? (
            <p>Loading your teams...</p>
          ) : teams.length > 0 ? (
            <MyTeamsList teams={teams} />
          ) : (
            <p>You have no teams yet. Create one to get started!</p>
          )}
        </ContentContainer>
        <Footer />
      </MinHeightContainer>
    </>
  );
};

export default TeamsPage;
