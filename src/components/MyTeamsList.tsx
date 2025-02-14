import { useState } from 'react';
import styled from 'styled-components';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { CustomTeam } from '@/types/userData';
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

const TeamHeader = styled.div`
  display: inline-flex;
  justify-content: start;
  align-items: center;
`;

const TeamId = styled.span`
  margin: 0 1rem;
  font-size: 0.8rem;
  color: #eaaa02;
  background-color: #922d26;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
`;

const TeamName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const TeamInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const TeamInfo = styled.div`
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

const MyTeamsList = ({ teams }: { teams: CustomTeam[] }) => {
  const user = useUser();
  const [modalTeam, setModalTeam] = useState<CustomTeam | null>(null);

  const handleDelete = async (team: CustomTeam) => {
    const db = getFirestore();
    try {
      await deleteDoc(doc(db, `users/${user!.uid}/teams/${team.id}`));
      setModalTeam(null);
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete the team. Please try again.');
    }
  };

  return (
    <>
      <StyledList>
        {teams.map((team) => (
          <StyledListItem key={team.id}>
            <TeamHeader>
              <TeamName>{team.customTeamName || team.teamName}</TeamName>
              <TeamId>{team.teamId}</TeamId>
              <TeamId>{team.variant}</TeamId>
            </TeamHeader>
            <TeamInfoGrid>
              <TeamInfo>
                <InfoLabel>Players</InfoLabel>
                <InfoValue>
                  {team.players.filter(Boolean).length}/{team.players.length}
                </InfoValue>
              </TeamInfo>
              <TeamInfo>
                <InfoLabel>Team Value</InfoLabel>
                <InfoValue>{team.teamValue} GP</InfoValue>
              </TeamInfo>
              <TeamInfo>
                <InfoLabel>Treasury</InfoLabel>
                <InfoValue>{team.treasury} GP</InfoValue>
              </TeamInfo>
              <TeamInfo>
                <InfoLabel>Total Touchdowns</InfoLabel>
                <InfoValue>{team.totalTouchdowns}</InfoValue>
              </TeamInfo>
              <TeamInfo>
                <InfoLabel>Total Casualties</InfoLabel>
                <InfoValue>{team.totalCasualties}</InfoValue>
              </TeamInfo>
              <TeamInfo>
                <InfoLabel>Dedicated Fans</InfoLabel>
                <InfoValue>{team.dedicatedFans}</InfoValue>
              </TeamInfo>
            </TeamInfoGrid>
            <ActionButtons>
              <Link href={`/create-team/${team.teamId}/${team.id}`}>
                <Button>Edit</Button>
              </Link>
              <DangerButton onClick={() => setModalTeam(team)}>
                Delete
              </DangerButton>
            </ActionButtons>
          </StyledListItem>
        ))}
      </StyledList>

      {modalTeam && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>
              Are you sure you want to delete "
              {modalTeam.customTeamName || modalTeam.teamName}"?
            </ModalTitle>
            <ModalActions>
              <Button onClick={() => setModalTeam(null)}>Cancel</Button>
              <DangerButton onClick={() => handleDelete(modalTeam)}>
                Delete
              </DangerButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default MyTeamsList;
