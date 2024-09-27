import React from 'react';
import { GetServerSideProps } from 'next';
import { getTeamData } from '@/utils/teamUtils';
import Hero from '@/components/Hero';
import Parchment from '@/components/Parchment';
import TeamDetails from '@/components/TeamDetails';
import AppBar from '@/components/AppBar';
import ContentContainer from '@/components/ContentContainer';
import { Team } from '@/types/teams';
import TeamBuilder from '@/components/TeamBuilder/TeamBuilder';
import { TeamBuilderProvider } from '@/contexts/teamBuilder';

const TeamPage: React.FC<{ teamData: Team; uid: string }> = ({
  teamData,
  uid,
}) => {
  return (
    <TeamBuilderProvider>
      <Parchment />
      <AppBar />
      <Hero text={teamData.name} />
      <ContentContainer>
        <TeamDetails teamData={teamData} />
      </ContentContainer>
      <TeamBuilder teamData={teamData} uid={uid} />
    </TeamBuilderProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { teamId, uid } = params as { teamId: string; uid: string };

  const teamData = await getTeamData(teamId);

  if (!teamData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      teamData: { ...teamData, teamId },
      uid,
    },
  };
};

export default TeamPage;
