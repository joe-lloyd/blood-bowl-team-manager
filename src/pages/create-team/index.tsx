import React from 'react';
import { fetchTeamsList } from '@/utils/teamUtils';
import Parchment from '@/components/ComponentWarehouse/Parchment';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import TeamLinkList from '@/components/TeamLinkList';
import ContentContainer from '@/components/ComponentWarehouse/ContentContainer';
import { TeamsList } from '@/types/teams';
import MinHeightContainer from '@/components/ComponentWarehouse/MinHeightContainer';

const TeamsPage: React.FC<{ teams: TeamsList }> = ({ teams }) => {
  return (
    <>
      <Parchment />
      <AppBar />
      <MinHeightContainer>
        <Hero text={'Create Team'} />
        <ContentContainer>
          <TeamLinkList teams={teams} rootPath="create-team" />
        </ContentContainer>
        <Footer />
      </MinHeightContainer>
    </>
  );
};

export const getStaticProps = async () => {
  const teams = await fetchTeamsList();

  return {
    props: {
      teams,
    },
  };
};

export default TeamsPage;
