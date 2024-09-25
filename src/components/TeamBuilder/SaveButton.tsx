import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import { createNewTeam } from '@/utils/playerUtils';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

/**
 * SaveButton
 * @description A button that saves the current team to the user's account. Fixed in the screen when a user is making a new team. uses save Icon and is also accessible via keyboard and has aria label.
 * Shows a loading spinner when saving.
 *
 */
const StyledSaveButton = styled.button`
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  position: fixed;
  bottom: 5rem;
  right: 5rem;
`;

const SaveButton = () => {
  // const saveTeam = useCallback(() => {
  //   try {
  //     if (!user) {
  //       console.error('User not found');
  //       return;
  //     }
  //     dispatch({ type: 'UPDATE_META', payload: teamDoc.data() });
  //   } catch (error) {
  //     console.error('Error during Firestore operation:', error);
  //   }
  // }, [user, dispatch]);

  return <StyledSaveButton>Save</StyledSaveButton>;
};

export default SaveButton;
