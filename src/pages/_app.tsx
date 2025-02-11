import React from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import { UserProvider } from '@/contexts/userContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
