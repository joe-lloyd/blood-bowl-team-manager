import React from 'react';
import styled from 'styled-components';
import Parchment from '@/components/Parchment';
import HomeContent from '@/components/HomeContent';
import AppBar from '@/components/AppBar';
import HomeHero from '@/components/HomeHero';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #922d26;
  padding: 80px 0;
`;

const HomePage = () => {
  return (
    <>
      <Parchment />
      <AppBar />
      <Container>
        <HomeHero />
      </Container>
      <HomeContent userContent={{}} />
    </>
  );
};

export default HomePage;
