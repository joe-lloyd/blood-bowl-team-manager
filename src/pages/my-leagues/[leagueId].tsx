import React, { useEffect, useState } from 'react';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { useUser } from '@/contexts/userContext';
import Parchment from '@/components/ComponentWarehouse/Parchment';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import ContentContainer from '@/components/ComponentWarehouse/ContentContainer';
import MinHeightContainer from '@/components/ComponentWarehouse/MinHeightContainer';
import { GetServerSideProps } from 'next';
import { League } from '@/types/league';
import LeagueDetails from '@/components/LeagueDetails';
import { doc } from '@firebase/firestore';

const MyLeaguesPage: React.FC<{ leagueId: string }> = ({ leagueId }) => {
  const user = useUser();
  const [league, setLeague] = useState<League | null>(null);

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const leagueRef = doc(db, `users/${user.uid}/leagues/${leagueId}`);

      // Real-time listener
      const unsubscribe = onSnapshot(
        leagueRef,
        (snapshot) => {
          const leagueSnapshot: League = {
            ...(snapshot.data() as League),
            id: snapshot.id,
          };

          setLeague(leagueSnapshot);
        },
        (error) => {
          console.error('Error fetching real-time updates:', error);
        }
      );

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
          {league ? (
            <LeagueDetails league={league} />
          ) : (
            <p>Loading your leagues...</p>
          )}
        </ContentContainer>
        <Footer />
      </MinHeightContainer>
    </>
  );
};

export default MyLeaguesPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { leagueId } = params as { leagueId: string };

  return {
    props: {
      leagueId,
    },
  };
};
