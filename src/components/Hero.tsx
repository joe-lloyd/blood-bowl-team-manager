import styled from 'styled-components';

const StyledH1 = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #eaaa02;
  margin: 0;
  padding: 20px;
  font-style: italic;
  transform: rotate(-5deg);
  position: relative;
  top: 20px;
`;

const HeroContainer = styled.div`
  text-align: left;
  position: relative;
  margin-bottom: 160px;
  width: 100%;
  height: 100px;
  background-color: #922d26;

  svg {
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

const Hero = ({ text }) => {
  return (
    <HeroContainer>
      <StyledH1>{text.toUpperCase()}</StyledH1>
      <svg
        viewBox="0 0 300 150"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <polygon points="0,0 300,0 0,150" style={{ fill: '#922d26' }} />
      </svg>
    </HeroContainer>
  );
};

export default Hero;
