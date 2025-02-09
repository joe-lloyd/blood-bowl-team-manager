import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomPlayer } from '@/types/userData';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useUser } from '@/contexts/userContext';
import { useTeamBuilder } from '@/contexts/teamBuilder';
import { stripUserDataFromPlayer } from '@/utils/playerUtils';
import { Team } from '@/types/teams';
import Parchment from '@/components/Parchment';
import Toggle from '@/components/ComponentWarehouse/Toggle';

const PopupContainerOuter = styled.div`
  position: fixed;
  padding: 30px;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  position: relative;
  max-width: 800px;
  padding: 30px;
`;

const PopupContainerInner = styled.div`
  padding: 20px;
  border: 2px solid #1d3860;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const Heading = styled.h2`
  display: inline-block;
  color: #eaaa02;
  font-style: italic;
  margin-right: 1rem;
  font-size: 2rem;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #1d3860;
  color: white;
  border: none;
  cursor: pointer;
`;

const Input = styled.input`
  margin: 5px;
  padding: 10px;
  border: 2px solid #1d3860;
`;

const HorizontalRule = styled.hr`
  border: 1px solid #1d3860;
  margin: 10px 0;
`;

const StatsBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const TitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatsLabel = styled.div`
  background-color: #922d26;
  color: white;
  padding: 10px;
  font-weight: bold;
  border: 0px solid #ddd;
  text-align: center;
`;

const StatsValue = styled.div`
  padding: 10px;
  font-weight: bold;
  border: 0px solid #ddd;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: inline-flex;
  align-items: right;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  justify-content: end;
`;

const PlayerManagementPopup: React.FC<{
  team: Team;
  player: CustomPlayer;
  index: number;
  onClose: () => void;
  uid: string;
}> = ({ team, player, index, onClose, uid }) => {
  const user = useUser();
  const { state, dispatch } = useTeamBuilder();
  const [playerName, setPlayerName] = useState(player.playerName);

  const handleUpdatePlayer = async (updates: Partial<CustomPlayer>) => {
    if (!user) {
      console.error('User not found');
      return;
    }

    console.log('Updating player', updates);
    const teamDocRef = doc(db, 'users', user.uid, 'teams', uid);
    const updatedPlayer = { ...player, ...updates };
    const updatedPlayers = [...state.players].map((player, mapIndex) => {
      if (!player) return null;
      if (index === mapIndex) {
        return stripUserDataFromPlayer(team, updatedPlayer);
      }
      return stripUserDataFromPlayer(team, player);
    });

    dispatch({
      type: 'UPDATE_PLAYER',
      payload: { index, player: updatedPlayer },
    });
    await updateDoc(teamDocRef, { players: updatedPlayers });
  };

  const handleRefund = () => {
    // Implement refund logic here
  };

  const handleFire = () => {
    // Implement fire logic here
  };

  const handleSpendSPP = (type: 'primary' | 'secondary' | 'characteristic') => {
    let sppCost = 0;
    let newSkills = [...player.traitsAndSkills];

    switch (type) {
      case 'primary':
        sppCost = player.spp >= 6 ? 6 : 8;
        newSkills.push('New Primary Skill');
        break;
      case 'secondary':
        sppCost = player.spp >= 12 ? 12 : 14;
        newSkills.push('New Secondary Skill');
        break;
      case 'characteristic':
        sppCost = 18;
        newSkills.push('New Characteristic');
        break;
      default:
        return;
    }

    if (player.spp >= sppCost) {
      handleUpdatePlayer({
        spp: player.spp - sppCost,
        traitsAndSkills: newSkills,
      });
    } else {
      console.error('Not enough SPP');
    }
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <PopupContainerOuter>
        <PopupContainer>
          <Parchment $intensity={'low'} />
          <PopupContainerInner>
            <TopWrapper>
              <TitleWrapper>
                <Heading>{player.positionName}</Heading>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onBlur={() => handleUpdatePlayer({ playerName })}
                />
              </TitleWrapper>

              <ButtonWrapper>
                <Button onClick={handleRefund}>Refund</Button>
                <Button onClick={handleFire}>Fire</Button>
              </ButtonWrapper>
            </TopWrapper>
            <HorizontalRule />

            <ToggleWrapper>
              <Toggle
                label="MNG"
                checked={player.missNextGame}
                onChange={(value) =>
                  handleUpdatePlayer({ missNextGame: value })
                }
              />

              <Toggle
                label="NGI"
                checked={player.nigglingInjury}
                onChange={(value) =>
                  handleUpdatePlayer({
                    nigglingInjury: value,
                  })
                }
              />
              <Toggle
                label={'Temp ret.'}
                checked={player.tempRetirement}
                onChange={(value) =>
                  handleUpdatePlayer({ tempRetirement: value })
                }
              />
            </ToggleWrapper>

            <StatsBlock>
              <StatsLabel>MA</StatsLabel>
              <StatsLabel>ST</StatsLabel>
              <StatsLabel>AG</StatsLabel>
              <StatsLabel>PA</StatsLabel>
              <StatsLabel>AV</StatsLabel>

              <StatsValue>{player.stats.ma}</StatsValue>
              <StatsValue>{player.stats.st}</StatsValue>
              <StatsValue>{player.stats.ag}</StatsValue>
              <StatsValue>{player.stats.pa}</StatsValue>
              <StatsValue>{player.stats.av}</StatsValue>
            </StatsBlock>

            <Button onClick={() => handleSpendSPP('primary')}>
              Spend SPP on Primary Skill
            </Button>
            <Button onClick={() => handleSpendSPP('secondary')}>
              Spend SPP on Secondary Skill
            </Button>
            <Button onClick={() => handleSpendSPP('characteristic')}>
              Spend SPP on Characteristic
            </Button>
            <Button onClick={onClose}>Close</Button>
          </PopupContainerInner>
        </PopupContainer>
      </PopupContainerOuter>
    </>
  );
};

export default PlayerManagementPopup;
