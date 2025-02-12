import React from 'react';
import Parchment from '@/components/Parchment';
import TeamDetails from '@/components/TeamDetails';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import { getTeamData, fetchTeamsList } from '@/utils/teamUtils';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import ContentContainer from '@/components/ContentContainer';
import { Team, TeamId } from '@/types/teams';
import { GetStaticPaths, GetStaticProps } from 'next';
import TeamPreSetup from '@/components/TeamBuilder/TeamPreSetup';

const SubHeading = styled.h3`
  background-color: #1d3860;
  color: #eaaa02;
  font-size: 1.5rem;
  font-style: italic;
  padding: 5px 15px;
  margin: 40px 0 0 0;
`;

const TeamPage: React.FC<{ teamData: Team }> = ({ teamData }) => {
  return (
    <>
      <Parchment />
      <AppBar />
      <Hero text={teamData.name} />
      <ContentContainer>
        <TeamDetails teamData={teamData} />
        <SubHeading>Just a few things before we start:</SubHeading>
        <TeamPreSetup teamData={teamData} />
      </ContentContainer>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = await fetchTeamsList();
  const paths = Object.keys(teams).map((teamId) => ({
    params: { teamId },
  }));

  return { paths, fallback: false }; // fallback: false means any paths not returned by getStaticPaths will result in a 404 page
};

export const getStaticProps = (async ({ params }) => {
  const { teamId } = params as { teamId: TeamId };
  const teamData = await getTeamData(teamId);
  return {
    props: {
      teamData,
    },
  };
}) satisfies GetStaticProps<{ teamData: Team }>;

export default TeamPage;
