import React from 'react';
import BaseInfo from './BaseInfo';
import PlayerList from './PlayerList';
import TeamMeta from './TeamMeta';

const TeamBuilder: React.FC = () => {
  return (
    <div>
      <BaseInfo />
      <PlayerList />
      <TeamMeta />
    </div>
  );
};

export default TeamBuilder;
