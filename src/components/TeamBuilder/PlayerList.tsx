import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Team } from '@/types/teams';
import Select from '@/components/TeamBuilder/Select';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import {
  combineBasePlayerDataWithUserPlayerData,
  createNewPlayer,
} from '@/utils/playerUtils';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useUser } from '@/contexts/userContext';
import { validatePositionLimit, validateTreasury } from '@/utils/validations';
import { payForPlayer } from '@/utils/accountant';
import PlayerManagementPopup from './PlayerManagementPopup';

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
  border: none;
`;

const TableHeader = styled.th`
  background-color: #1d3860;
  color: white;
  padding: 10px;
  font-weight: bold;
  border: 1px solid #1d3860;
`;

const TableRow = styled.tr<{ $hasPlayer: boolean }>`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    cursor: ${({ $hasPlayer }) => ($hasPlayer ? 'pointer' : 'default')};
    background-color: ${({ $hasPlayer }) =>
      $hasPlayer ? '#d4e8ff' : 'currentBackgroundColor'};
  }
`;

const TableCell = styled.td`
  border: 1px solid #1d3860;
  text-align: center;
  padding: 10px;
`;

const NameCell = styled(TableCell)`
  min-width: 200px;
  cursor: pointer;
`;

const PositionCell = styled(TableCell)`
  min-width: 200px;
  padding: 0;
`;

const SkillsCell = styled(TableCell)`
  min-width: 400px;
`;

const PlayerList: React.FC<{ teamData: Team; uid: string }> = ({
  teamData,
  uid,
}) => {
  const user = useUser();
  const { state, dispatch } = useTeamBuilder();
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(
    null
  );

  const handlePositionChange = useCallback(
    async (index: number, positionId: string) => {
      try {
        if (!user) {
          console.error('User not found');
          return;
        }

        const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);
        const teamSnapshot = await getDoc(teamDocRef);
        const teamDataFromFirebase = teamSnapshot.data();

        if (!teamDataFromFirebase) {
          console.error('Team not found');
          return;
        }

        const selectedPosition = teamData.players.find(
          (player) => player.id === positionId
        );

        if (selectedPosition) {
          if (!validatePositionLimit(state, selectedPosition).success) {
            console.error('Too many players in this position');
            return;
          }

          if (!validateTreasury(state, selectedPosition).success) {
            console.error('Not enough gold in treasury');
            return;
          }

          const newPlayer = createNewPlayer(selectedPosition.id, index);
          const players = [...teamDataFromFirebase.players];
          players.splice(index, 1, newPlayer);
          const player = combineBasePlayerDataWithUserPlayerData(
            teamData,
            newPlayer
          );

          dispatch({
            type: 'ADD_PLAYER',
            payload: { index, player },
          });

          const { teamValue, treasury } = payForPlayer(state, selectedPosition);

          dispatch({ type: 'UPDATE_META', payload: { teamValue, treasury } });

          await updateDoc(teamDocRef, { teamValue, treasury, players });
        }
      } catch (error) {
        console.error('Error adding player:', error);
      }
    },
    [dispatch, teamData, uid, user, state]
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
          {state.players.map((player, index) => {
            return (
              <TableRow
                key={index}
                onClick={() => player && setSelectedPlayerIndex(index)}
                $hasPlayer={!!player}
              >
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
                    disabled={!!player}
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
                <TableCell>{player?.spp || 0}</TableCell>
                <TableCell>{player?.missNextGame ? 'yes' : 'no'}</TableCell>
                <TableCell>{player?.nigglingInjury ? 'yes' : 'no'}</TableCell>
                <TableCell>{player?.tempRetirement ? 'yes' : 'no'}</TableCell>
                <TableCell>{player?.currentValue || ''}</TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </MainTable>
      {selectedPlayerIndex !== null && state.players[selectedPlayerIndex] && (
        <PlayerManagementPopup
          team={teamData}
          player={state.players[selectedPlayerIndex]}
          index={selectedPlayerIndex}
          onClose={() => setSelectedPlayerIndex(null)}
          uid={uid}
        />
      )}
    </TableWrapper>
  );
};

export default PlayerList;
