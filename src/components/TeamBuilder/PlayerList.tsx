import React from 'react';
import styled from 'styled-components';

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
  padding: 10px;
  text-align: center;
`;

const PlayerList: React.FC = () => {
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
        {Array.from({ length: 16 }, (_, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </tbody>
    </MainTable>
  );
};

export default PlayerList;
