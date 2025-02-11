import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1<{ $angle: number }>`
  display: inline-block;
  font-size: 3.5rem;
  font-weight: 700;
  color: #eaaa02;
  margin: 0;
  padding: 20px;
  font-style: italic;
  position: relative;
  top: 96%; // magic number 👎
  transform: ${(props) => `rotate(${props.$angle}deg)`};
  transform-origin: bottom left;
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
    height: 150px;
    z-index: -1;
  }
`;

const Hero: React.FC<{ text: string }> = ({ text }) => {
  const [angle, setAngle] = useState(-5);

  useEffect(() => {
    const calculateAngle = () => {
      const outerSpace = 20 * 2 + 8 * 2; // Padding + border
      const svgWidth = window.innerWidth - outerSpace;
      const svgHeight = 100; // Fixed height from the SVG

      // Calculate the angle based on the fixed height and dynamic width
      const slope = svgHeight / svgWidth;
      const newAngle = -(Math.atan(slope) * (180 / Math.PI));

      if (newAngle !== angle) {
        setAngle(newAngle);
      }
    };

    calculateAngle(); // Initial calculation

    window.addEventListener('resize', calculateAngle); // Recalculate on window resize

    return () => {
      window.removeEventListener('resize', calculateAngle);
    };
  }, [angle]);

  return (
    <HeroContainer>
      <StyledH1 $angle={angle}>{text.toUpperCase()}</StyledH1>
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
