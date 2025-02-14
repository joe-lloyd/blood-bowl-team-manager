import { useState } from 'react';
import styled from 'styled-components';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { League, Season } from '@/types/league';
import { useUser } from '@/contexts/userContext';
import Link from 'next/link';
import { Button, DangerButton } from '@/components/ComponentWarehouse/Button';

const blueColor = '#1d3860';

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledListItem = styled.li`
  border: 2px solid ${blueColor};
  color: ${blueColor};
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const LeagueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeagueName = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  color: #eaaa02;
  font-style: italic;
`;

const LeagueInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const LeagueInfo = styled.div`
  background-color: #092540;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: #eaaa02;
`;

const InfoValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const MyLeaguesList = ({ leagues }: { leagues: League[] }) => {
  const user = useUser();
  const [modalLeague, setModalLeague] = useState<League | null>(null);

  const handleDelete = async (league: League) => {
    const db = getFirestore();
    try {
      await deleteDoc(doc(db, `users/${user!.uid}/leagues/${league.id}`));
      setModalLeague(null);
    } catch (error) {
      console.error('Error deleting league:', error);
      alert('Failed to delete the league. Please try again.');
    }
  };

  return (
    <>
      <StyledList>
        {leagues.map((league) => (
          <StyledListItem key={league.id}>
            <LeagueHeader>
              <LeagueName>{league.leagueName}</LeagueName>
            </LeagueHeader>
            {!!league.seasons.length &&
              league.seasons.map((season: Season) => (
                <LeagueInfoGrid>
                  <LeagueInfo>
                    <InfoLabel>Season</InfoLabel>
                    <InfoValue>{season.seasonName}</InfoValue>
                  </LeagueInfo>
                  <LeagueInfo>
                    <InfoLabel>Start Date</InfoLabel>
                    <InfoValue>{season.startDate}</InfoValue>
                  </LeagueInfo>
                  <LeagueInfo>
                    <InfoLabel>End Date</InfoLabel>
                    <InfoValue>{season.endDate}</InfoValue>
                  </LeagueInfo>
                </LeagueInfoGrid>
              ))}
            <ActionButtons>
              <Link href={`/my-leagues/${league.id}`}>
                <Button>Edit</Button>
              </Link>
              <DangerButton
                onClick={() => {
                  setModalLeague(league);
                }}
              >
                Delete
              </DangerButton>
            </ActionButtons>
          </StyledListItem>
        ))}
      </StyledList>
      {modalLeague && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>
              Are you sure you want to delete "{modalLeague.leagueName}"?
            </ModalTitle>
            <ModalActions>
              <Button onClick={() => setModalLeague(null)}>Cancel</Button>
              <DangerButton onClick={() => handleDelete(modalLeague)}>
                Delete
              </DangerButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default MyLeaguesList;
