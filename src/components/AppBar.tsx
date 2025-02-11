import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, logout } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUser } from '@/contexts/userContext';

const AppBar = styled.div`
  width: 100%;
  background-color: #1d3860;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #eaaa02;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #eaaa02;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.p`
  margin-left: 20px;
  color: #eaaa02;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AppBarComponent = () => {
  const router = useRouter();
  const user = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AppBar>
      <Link href={'/'}>
        <Logo>Blood Bowl Manager</Logo>
      </Link>
      <NavLinks>
        {user ? (
          <NavLink onClick={handleLogout}>Logout</NavLink>
        ) : (
          <Link href="/login" passHref>
            <NavLink>Login</NavLink>
          </Link>
        )}
      </NavLinks>
    </AppBar>
  );
};

export default AppBarComponent;
