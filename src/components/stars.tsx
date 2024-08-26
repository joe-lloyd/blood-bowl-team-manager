import styled from 'styled-components';

const StyledStar = styled.div`
  position: relative;
  background-image: url('/star.svg');
  background-repeat: no-repeat;
  display: block;
  width: 20px;
  height: 20px;

  &:before,
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    background-image: url('/star.svg');
    background-size: contain;
    width: 16px;
    height: 16px;
    margin: 0 2px;
    scale: 0.8;
  }

  &:before {
    right: 14px;
  }

  &:after {
    left: 14px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 6px;
`;

const Stars = () => {
  return (
    <Container>
      <StyledStar />
    </Container>
  );
};

export default Stars;
