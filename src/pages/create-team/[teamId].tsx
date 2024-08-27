import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getTeamData, fetchTeamsList } from '@/utils/teamUtils';
import Hero from '@/components/Hero';
import Parchment from '@/components/Parchment';
import TeamDetails from '@/components/TeamDetails';
import AppBar from '@/components/AppBar';
import ContentContainer from '@/components/ContentContainer';
import { Team } from '@/types/teams';

const TeamPage: React.FC<{ teamData: Team }> = ({ teamData }) => {
  return (
    <>
      <Parchment />
      <AppBar />
      <Hero text={teamData.name} />
      <ContentContainer>
        <TeamDetails teamData={teamData} />
      </ContentContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = await fetchTeamsList(true);

  const paths = Object.keys(teams).map((teamId) => ({
    params: { teamId },
  }));

  return {
    paths,
    fallback: false, // Return 404 if the teamId does not exist
  };
};

export const getStaticProps = (async ({ params }) => {
  const { teamId } = params as { teamId: string };
  const teamData = await getTeamData(teamId);

  return {
    props: {
      teamData,
    },
  };
}) satisfies GetStaticProps<{ teamData: Team }>;
export default TeamPage;
