import React, { useState } from 'react';
import styled from 'styled-components';
import { Team, PlayerPosition } from '@/types/teams';

const MainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #e0f0ff;
  border: 3px solid #1d3860;
  margin-bottom: 20px;
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
`;

const PositionDropdown = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #e0f0ff;
`;

const PlayerList: React.FC<{ teamData: Team }> = ({ teamData }) => {
  const [selectedPositions, setSelectedPositions] = useState<
    (PlayerPosition | null)[]
  >(Array(16).fill(null));

  const handlePositionChange = (index: number, positionName: string) => {
    const selectedPosition = teamData.players.find(
      (player) => player.position.name === positionName
    )?.position;

    const updatedPositions = [...selectedPositions];
    updatedPositions[index] = selectedPosition || null;
    setSelectedPositions(updatedPositions);
  };

  return (
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
          <TableHeader>MNG</TableHeader>
          <TableHeader>NI</TableHeader>
          <TableHeader>TR</TableHeader>
          <TableHeader>Current Value</TableHeader>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 16 }, (_, index) => {
          const position = selectedPositions[index];
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <PositionDropdown
                  onChange={(e) => handlePositionChange(index, e.target.value)}
                >
                  <option value="">Select Position</option>
                  {teamData.players.map((player) => (
                    <option
                      key={player.position.name}
                      value={player.position.name}
                    >
                      {player.position.name}
                    </option>
                  ))}
                </PositionDropdown>
              </TableCell>
              <TableCell>{position?.stats.ma || ''}</TableCell>
              <TableCell>{position?.stats.st || ''}</TableCell>
              <TableCell>{position?.stats.ag || ''}</TableCell>
              <TableCell>{position?.stats.pa || ''}</TableCell>
              <TableCell>{position?.stats.av || ''}</TableCell>
              <TableCell>
                {position
                  ? position.traitsAndSkills
                      .map((skill) => skill.name)
                      .join(', ')
                  : ''}
              </TableCell>
              <TableCell>{position?.cost || ''}</TableCell>
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
  );
};

export default PlayerList;
