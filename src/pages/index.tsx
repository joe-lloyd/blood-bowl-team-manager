import React from 'react';
import styled from 'styled-components';
import Parchment from '@/components/Parchment';
import Hero from '@/components/Hero';

const Container = styled.div`
  padding: 20px;
`;

const HomePage = () => {
  return (
    <>
      <Parchment />
      <Container>
        <Hero text={'Blood Bowl Teams'} />
      </Container>
    </>
  );
};

export default HomePage;
