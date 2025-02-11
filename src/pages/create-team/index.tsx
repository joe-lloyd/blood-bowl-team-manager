import React from 'react';
import { fetchTeamsList } from '@/utils/teamUtils';
import Parchment from '@/components/Parchment';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import TeamLinkList from '@/components/TeamLinkList';
import ContentContainer from '@/components/ContentContainer';
import { TeamsList } from '@/types/teams';
import { v4 as uuidv4 } from 'uuid';
import MinHeightContainer from '@/components/MinHeightContainer';

const TeamsPage: React.FC<{ teams: TeamsList }> = ({ teams }) => {
  const uniqueTeamId = uuidv4();
  return (
    <>
      <Parchment />
      <AppBar />
      <MinHeightContainer>
        <Hero text={'Create Team'} />
        <ContentContainer>
          <TeamLinkList
            teams={teams}
            rootPath="create-team"
            uid={uniqueTeamId}
          />
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
