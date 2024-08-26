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

const HomeHero = () => {
  return (
    <LogoContainer>
      <ShineWrapper>
        <Image
          src="/bb-logo.png"
          alt="blood bowl logo"
          layout="responsive"
          width={1441}
          height={289}
          sizes="(max-width: 600px) 100vw,
                     (max-width: 1024px) 80vw,
                     1441px"
          objectFit="contain"
          priority={true}
        />
      </ShineWrapper>
    </LogoContainer>
  );
};

export default HomeHero;
