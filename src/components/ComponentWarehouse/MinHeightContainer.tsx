import styled from 'styled-components';

/**
 *  47.5px is the height of the app bar
 */
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 47.5px);
  justify-content: space-between;
`;

export default ContentContainer;
