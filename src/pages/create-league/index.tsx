import React from 'react';
import Parchment from '@/components/Parchment';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import ContentContainer from '@/components/ContentContainer';
import { v4 as uuidv4 } from 'uuid';
import MinHeightContainer from '@/components/MinHeightContainer';
import LeagueForm from '@/components/LeagueForm';

const CreateLeaguePage: React.FC = () => {
  const uniqueLeagueId = uuidv4();

  return (
    <>
      <Parchment />
      <AppBar />
      <MinHeightContainer>
        <Hero text={'Create League'} />
        <ContentContainer>
          <LeagueForm leagueId={uniqueLeagueId} />
        </ContentContainer>
        <Footer />
      </MinHeightContainer>
    </>
  );
};

export default CreateLeaguePage;
