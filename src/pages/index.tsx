import React from 'react';
import Parchment from '@/components/ComponentWarehouse/Parchment';
import HomeContent from '@/components/HomeContent';
import AppBar from '@/components/AppBar';
import HomeHero from '@/components/HomeHero';
import Footer from '@/components/Footer';

export const getStaticProps = async () => {
  return {
    props: {
      publicContent: {},
    },
  };
};

const HomePage = () => {
  return (
    <>
      <Parchment />
      <AppBar />
      <HomeHero />
      <HomeContent userContent={{}} />
      <Footer />
    </>
  );
};

export default HomePage;
