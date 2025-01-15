import styled from 'styled-components';

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1440px) {
    max-width: 1024px;
    padding: 16px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 8px;
  }
`;

export default ContentContainer;
