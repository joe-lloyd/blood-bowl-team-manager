import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Team } from '@/types/teams';
import Select from '@/components/TeamBuilder/Select';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import { customPlayer } from '@/utils/playerUtils';
import { PlayerDataToSave } from '@/types/userData';

const initialPlayerDataToSave: PlayerDataToSave = {
  positionId: '',
  spp: 0,
  playerName: '',
  number: 0,
  missNextGame: false,
  nigglingInjury: false,
  tempRetirement: false,
  statAdjust: {
    ma: 0,
    st: 0,
    ag: 0,
    pa: 0,
    av: 0,
  },
  skills: [],
};

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-left: 3px solid #1d3860;
  border-right: 3px solid #1d3860;
`;

const MainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #e0f0ff;
  margin-bottom: 20px;
  border: none;
`;

const TableHeader = styled.th`
  background-color: #1d3860;
  color: white;
  padding: 10px;
  font-weight: bold;
  border: 1px solid #1d3860;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #1d3860;
  text-align: center;
  padding: 10px;
`;

const NameCell = styled(TableCell)`
  min-width: 200px;
`;

const PositionCell = styled(TableCell)`
  min-width: 200px;
  padding: 0;
`;

const SkillsCell = styled(TableCell)`
  min-width: 400px;
`;

const PlayerList: React.FC<{ teamData: Team }> = ({ teamData }) => {
  const { state, dispatch } = useTeamBuilder();

  const handlePositionChange = useCallback(
    (index: number, positionId: string) => {
      const selectedPosition = teamData.players.find(
        (player) => player.id === positionId
      );

      if (selectedPosition) {
        const player = customPlayer(teamData, {
          ...initialPlayerDataToSave,
          positionId: selectedPosition.id,
        });

        dispatch({
          type: 'ADD_PLAYER',
          payload: { index, player },
        });
      }
    },
    [dispatch, teamData]
  );

  return (
    <TableWrapper>
      <MainTable>
        <thead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Position</TableHeader>
            <TableHeader>MA</TableHeader>
            <TableHeader>ST</TableHeader>
            <TableHeader>AG</TableHeader>
            <TableHeader>PA</TableHeader>
            <TableHeader>AV</TableHeader>
            <TableHeader>Skills</TableHeader>
            <TableHeader>Hiring Fee</TableHeader>
            <TableHeader>Unspent SPP</TableHeader>
            <TableHeader>Miss Next Game</TableHeader>
            <TableHeader>Niggling Injury</TableHeader>
            <TableHeader>Temp Retirement</TableHeader>
            <TableHeader>Current Value</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 16 }, (_, index) => {
            const player = state.players[index];
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <NameCell>{player?.playerName || ''}</NameCell>
                <PositionCell>
                  <Select
                    onChange={(e) =>
                      handlePositionChange(index, e.target.value)
                    }
                    options={[
                      { value: '', label: 'Select a player' },
                      ...teamData.players.map((playerBlueprint) => ({
                        value: playerBlueprint.id,
                        label: playerBlueprint.position.name,
                      })),
                    ]}
                    value={player?.positionId || ''}
                  />
                </PositionCell>
                <TableCell>{player?.stats.ma || ''}</TableCell>
                <TableCell>{player?.stats.st || ''}</TableCell>
                <TableCell>{player?.stats.ag || ''}</TableCell>
                <TableCell>{player?.stats.pa || ''}</TableCell>
                <TableCell>{player?.stats.av || ''}</TableCell>
                <SkillsCell>
                  {player ? player.traitsAndSkills.join(', ') : ''}
                </SkillsCell>
                <TableCell>{player?.cost || ''}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </MainTable>
    </TableWrapper>
  );
};

export default PlayerList;
