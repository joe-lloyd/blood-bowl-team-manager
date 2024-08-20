import React from 'react';
import styled from 'styled-components';
import Parchment from '@/components/Parchment';
import Image from 'next/image';
import HomeContent from '@/components/HomeContent';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #922d26;
  padding: 80px 0;
`;

const LogoContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <>
      <Parchment />
      <Container>
        <LogoContainer>
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
        </LogoContainer>
      </Container>
      <HomeContent isLoggedIn={false} userContent={{}} />
    </>
  );
};

export default HomePage;
