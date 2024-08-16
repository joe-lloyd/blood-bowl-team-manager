import { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { db } from '@/services/firebase'; // Adjust the path based on your setup
import { collection, getDocs, getDoc } from 'firebase/firestore';
import Stars from '@/components/stars';
import Parchment from '@/components/Parchment';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const TableTitle = styled.h2`
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

const Hr = styled.hr`
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: 'Arial', sans-serif;
`;

const TableHeader = styled.th`
  background-color: #922d26; /* Dark Red */
  color: white;
  padding: 10px;
  font-weight: bold;
  border: 0px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const TableCell = styled.td`
  border: 0px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const CustomTableCell = styled.td`
  padding: 10px;
  font-weight: bold;
  text-align: left;
  border: 0px solid #ddd;
`;

const TableBottom = styled.div`
  position: relative;
  margin-bottom: 20px;
`;
const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, 'teamBlueprints'));
      const teamsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const team = doc.data();

          const playersWithBlueprints = await Promise.all(
            team.players.map(async (player) => {
              const playerDoc = await getDoc(player.position);
              const positionData = playerDoc.data();

              console.log(positionData.name);
              const specialRules = await Promise.all(
                positionData.specialRules.map(async (ruleRef) => {
                  const ruleDoc = await getDoc(ruleRef);
                  return ruleDoc.data();
                })
              );

              return {
                ...player,
                position: {
                  ...positionData,
                  specialRules,
                },
              };
            })
          );

          return {
            ...team,
            players: playersWithBlueprints,
          };
        })
      );

      setTeams(teamsData);
    };
    fetchTeams();
  }, []);

  return (
    <>
      <Parchment />
      <Container>
        <Title>Blood Bowl Teams</Title>
        {teams.map((team, index) => (
          <Fragment key={team.name}>
            <TableTitle>{team.name.toUpperCase()}</TableTitle>
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
                {team.players.map(({ quantity, position }) => {
                  console.log(position.name);
                  console.log(position.specialRules);
                  return (
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
                        {position.specialRules
                          .map(({ name }) => name)
                          .join(', ')}
                      </TableCell>
                      <TableCell>{position.primary}</TableCell>
                      <TableCell>{position.secondary}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <CustomTableCell colSpan={8}>
                    0-8 team re-rolls: {team.rerollCost} gold pieces each
                  </CustomTableCell>
                  <CustomTableCell colSpan={3}>
                    Tier: {team.tier}
                  </CustomTableCell>
                </TableRow>
                {/* Custom Row for Special Rules and Apothecary */}
                <TableRow>
                  <CustomTableCell colSpan={8}>
                    Special Rules: {team.specialRules.join(', ')}
                  </CustomTableCell>
                  <CustomTableCell colSpan={3}>
                    Apothecary: {team.apothecary ? 'YES' : 'NO'}
                  </CustomTableCell>
                </TableRow>
              </tbody>
            </Table>
            <TableBottom>
              <Hr />
              <Stars />
            </TableBottom>
          </Fragment>
        ))}
      </Container>
    </>
  );
};

export default HomePage;
