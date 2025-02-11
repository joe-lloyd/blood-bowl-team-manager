import React from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const LogoContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const shineAnimation = keyframes`
  0% {
    left: -150%;
  }
  10% {
    left: 150%;
  }
  10.1% {
    left: -150%;
  }
`;

const ShineWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 150%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    transform: skewX(-25deg);
    animation: ${shineAnimation} 8s ease-in-out infinite;
  }

  mask-image: url('/bb-logo.png');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
`;

const TaglineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Tagline = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  margin: 0 10px;
  letter-spacing: 0.1rem;
  word-spacing: 0.2rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const StarIcon = styled.svg`
  width: 2rem;
  height: 2rem;
  fill: white;
  position: relative;
  top: -3px;
  margin: 0 5px;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
`;

const HeroContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #922d26;
  padding: 80px 0;
  margin-bottom: 100px;
  flex-direction: column;
`;

const HomeHero = () => {
  return (
    <HeroContainer>
      <LogoContainer>
        <ShineWrapper>
          <Image
            src="/bb-logo.png"
            alt="blood bowl logo"
            width={1441}
            height={289}
            sizes="(max-width: 600px) 100vw,
                     (max-width: 1024px) 80vw,
                     1441px"
            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            priority={true}
          />
        </ShineWrapper>
      </LogoContainer>
      <TaglineContainer>
        <StarIcon>
          <svg viewBox="0 0 260 245" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m56,237 74-228 74,228L10,96h240"
              style={{
                fill: '#fff',
              }}
            />
          </svg>
        </StarIcon>
        <Tagline>THE GAME OF FANTASY FOOTBALL</Tagline>
        <StarIcon>
          <svg viewBox="0 0 260 245" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m56,237 74-228 74,228L10,96h240"
              style={{
                fill: '#fff',
                filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))',
              }}
            />
          </svg>
        </StarIcon>
      </TaglineContainer>
    </HeroContainer>
  );
};

export default HomeHero;
