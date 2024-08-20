import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const Container = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
`;

const Card = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background-color: #922d26;
  color: white;
  cursor: pointer;
  aspect-ratio: 16 / 9;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1d3860;
    opacity: 0.85;
    transition: opacity 0.3s;
  }

  img {
    transition: transform 0.3s;
  }

  &:hover {
    &:after {
      opacity: 0.7;
    }
    img {
      transform: scale(1.1);
    }
  }
`;

const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.h3`
  position: relative;
  z-index: 2;
  font-size: 3.5rem;
  margin: 0;
  padding: 20px;
  color: #eaaa02;
`;

const HomeContent = ({ isLoggedIn, userContent }) => {
  return (
    <Container>
      <Grid>
        <Link href="/teams">
          <Card>
            <Image
              src="/teams.webp"
              layout="fill"
              objectFit="cover"
              alt="Teams"
            />
            <Overlay>
              <CardTitle>See Teams</CardTitle>
            </Overlay>
          </Card>
        </Link>

        <Link href={isLoggedIn ? '/create-team' : '/login'}>
          <Card>
            <Image
              src="/create-team.webp"
              layout="fill"
              objectFit="cover"
              alt="Create Team"
            />
            <Overlay>
              <CardTitle>
                {isLoggedIn ? 'Create a Team' : 'Become a Coach'}
              </CardTitle>
            </Overlay>
          </Card>
        </Link>

        {isLoggedIn && (
          <>
            <Link href="/create-league">
              <Card>
                <Overlay>
                  <CardTitle>Join a League</CardTitle>
                </Overlay>
              </Card>
            </Link>

            <Link href="/tournaments">
              <Card>
                <Overlay>
                  <CardTitle>Join a Tournament</CardTitle>
                </Overlay>
              </Card>
            </Link>
          </>
        )}

        {isLoggedIn && userContent?.teams?.length > 0 && (
          <Link href="/my-teams">
            <Card>
              <Overlay>
                <CardTitle>See Your Teams</CardTitle>
              </Overlay>
            </Card>
          </Link>
        )}

        {isLoggedIn && userContent?.leagues?.length > 0 && (
          <Link href="/my-leagues">
            <Card>
              <Overlay>
                <CardTitle>See Your Leagues</CardTitle>
              </Overlay>
            </Card>
          </Link>
        )}

        {isLoggedIn && userContent?.tournaments?.length > 0 && (
          <Link href="/my-tournaments">
            <Card>
              <Overlay>
                <CardTitle>See Your Tournaments</CardTitle>
              </Overlay>
            </Card>
          </Link>
        )}
      </Grid>
    </Container>
  );
};

export default HomeContent;
