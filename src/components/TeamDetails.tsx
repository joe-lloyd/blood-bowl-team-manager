import React from 'react';
import styled from 'styled-components';
import Stars from '@/components/stars';

export const Container = styled.div`
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Arial', sans-serif;
`;

export const TableTitle = styled.h2`
  text-align: center;
  margin-bottom: 1px;
  border-bottom: 5px solid #1d3860;
  color: #922d26;
  font-family: 'Arial', sans-serif;

  &:before {
    content: url('/triangle.svg');
    margin-right: 10px;
    width: 50px;
    height: 100%;
    display: inline-block;
    position: relative;
    top: 6px;
  }

  &:after {
    content: url('/triangle.svg');
    width: 50px;
    margin-left: 10px;
    height: 100%;
    display: inline-block;
    position: relative;
    top: 6px;
    transform: scale(-1, 1);
  }
`;

export const Hr = styled.hr`
  text-align: center;
  margin-top: 1px;
  border: 0 none;
  border-top: 5px solid #1d3860;

  &:before {
    content: url('/triangle.svg');
    margin-right: 30px;
    width: 50px;
    height: 100%;
    display: inline-block;
    position: relative;
    top: -6px;
    transform: scale(1, -1);
  }

  &:after {
    content: url('/triangle.svg');
    width: 50px;
    margin-left: 30px;
    height: 100%;
    display: inline-block;
    position: relative;
    top: -6px;
    transform: scale(-1, -1);
  }
`;

export const TableHeader = styled.th`
  background-color: #922d26;
  color: white;
  padding: 10px;
  font-weight: bold;
  border: 0px solid #ddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const TableCell = styled.td`
  border: 0px solid #ddd;
  padding: 10px;
  text-align: left;
`;

export const CustomTableCell = styled.td`
  padding: 10px;
  font-weight: bold;
  text-align: left;
  border: 0px solid #ddd;
`;

export const TableBottom = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const TeamDetails = ({ teamData }) => {
  if (!teamData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <TableTitle>{teamData.name.toUpperCase()}</TableTitle>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>QTY</TableHeader>
            <TableHeader>POSITIONS</TableHeader>
            <TableHeader>COST</TableHeader>
            <TableHeader>MA</TableHeader>
            <TableHeader>ST</TableHeader>
            <TableHeader>AG</TableHeader>
            <TableHeader>PA</TableHeader>
            <TableHeader>AV</TableHeader>
            <TableHeader>SKILLS & TRAITS</TableHeader>
            <TableHeader>PRIMARY</TableHeader>
            <TableHeader>SECONDARY</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {teamData.players.map(({ quantity, position }) => (
            <TableRow key={position.name}>
              <TableCell>{quantity}</TableCell>
              <TableCell>{position.name}</TableCell>
              <TableCell>{position.cost}</TableCell>
              <TableCell>{position.stats.ma}</TableCell>
              <TableCell>{position.stats.st}</TableCell>
              <TableCell>{position.stats.ag}</TableCell>
              <TableCell>{position.stats.pa}</TableCell>
              <TableCell>{position.stats.av}</TableCell>
              <TableCell>
                {position.specialRules.map((rule) => rule.name).join(', ')}
              </TableCell>
              <TableCell>{position.primary}</TableCell>
              <TableCell>{position.secondary}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <CustomTableCell colSpan={8}>
              0-8 team re-rolls: {teamData.rerollCost} gold pieces each
            </CustomTableCell>
            <CustomTableCell colSpan={3}>Tier: {teamData.tier}</CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell colSpan={8}>
              Special Rules: {teamData.specialRules.join(', ')}
            </CustomTableCell>
            <CustomTableCell colSpan={3}>
              Apothecary: {teamData.apothecary ? 'YES' : 'NO'}
            </CustomTableCell>
          </TableRow>
        </tbody>
      </Table>
      <TableBottom>
        <Hr />
        <Stars />
      </TableBottom>
    </Container>
  );
};

export default TeamDetails;
