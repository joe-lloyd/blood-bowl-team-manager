import React from 'react';
import Parchment from '@/components/Parchment';
import TeamDetails from '@/components/TeamDetails';
import Hero from '@/components/Hero';
import AppBar from '@/components/AppBar';
import { getTeamData, fetchTeamsList } from '@/utils/teamUtils';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import TeamLinkList from '@/components/TeamLinkList';
import ContentContainer from '@/components/ContentContainer';
import { Team, TeamsList } from '@/types/teams';
import { GetStaticPaths, GetStaticProps } from 'next';

const SubHeading = styled.h3`
  background-color: #1d3860;
  color: #eaaa02;
  font-size: 1.5rem;
  font-style: italic;
  padding: 5px 15px;
  margin: 40px 0 20px 0;
`;

const TeamPage: React.FC<{ teams: TeamsList; teamData: Team }> = ({
  teams,
  teamData,
}) => {
  return (
    <>
      <Parchment />
      <AppBar />
      <Hero text={teamData.name} />
      <ContentContainer>
        <TeamDetails teamData={teamData} />
        <SubHeading>View other teams:</SubHeading>
        <TeamLinkList teams={teams} rootPath="teams" />
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
  const { teamId } = params as { teamId: string };
  const teams = await fetchTeamsList();
  const teamData = await getTeamData(teamId);
  return {
    props: {
      teams,
      teamData,
    },
  };
}) satisfies GetStaticProps<{ teamData: Team; teams: TeamsList }>;

export default TeamPage;
