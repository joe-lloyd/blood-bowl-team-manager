import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useUser } from '@/contexts/userContext';
import Parchment from '@/components/Parchment';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import TextBorderBox from '@/components/TextBorderBox';
import ContentContainer from '@/components/ContentContainer';
import MyLeaguesList from '@/components/MyLeaguesList';
import MinHeightContainer from '@/components/MinHeightContainer';

const MyLeaguesPage: React.FC = () => {
  const user = useUser();
  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const leaguesCollection = collection(db, `users/${user.uid}/leagues`);

      // Real-time listener
      const unsubscribe = onSnapshot(
        leaguesCollection,
        (snapshot) => {
          const leaguesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLeagues(leaguesList);
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
        <Hero text={'My Leagues'} />
        <ContentContainer>
          <TextBorderBox
            title="League Overview"
            body="These are your leagues. You can view, edit, and delete them here."
          />
          {loading ? (
            <p>Loading your leagues...</p>
          ) : leagues.length > 0 ? (
            <MyLeaguesList leagues={leagues} />
          ) : (
            <p>You have no leagues yet. Create one to get started!</p>
          )}
        </ContentContainer>
        <Footer />
      </MinHeightContainer>
    </>
  );
};

export default MyLeaguesPage;
