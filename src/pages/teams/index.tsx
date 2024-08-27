import React from 'react';
import styled from 'styled-components';
import { fetchTeamsList } from '@/utils/teamUtils';
import Parchment from '@/components/Parchment';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import TextBorderBox from '@/components/TextBorderBox';
import { TeamsList } from '@/types/teams';
import TeamLinkList from '@/components/TeamLinkList';
import ContentContainer from '@/components/ContentContainer';

const TeamsPage: React.FC<{ teams: TeamsList }> = ({ teams }) => {
  return (
    <>
      <>
        <Parchment />
        <AppBar />
        <Hero text={'Blood Bowl Teams'} />
        <ContentContainer>
          <TextBorderBox
            title="Pick Your Team"
            body="
              In the world of Blood Bowl, the choice of your team is as crucial
              as the strategies you employ on the field. Each team carries its
              own unique blend of strengths, weaknesses, and special rules,
              making your decision a significant one. From the brutal Black Orcs
              to the agile Elven Union, every team offers a distinct playstyle
              that can turn the tide of any match. So, dive deep into the
              details, understand the nuances of your chosen players, and
              prepare to lead them to glory on the pitch.
            "
          />
          <TeamLinkList teams={teams} rootPath="teams" />
        </ContentContainer>
      </>
      <Footer />
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
