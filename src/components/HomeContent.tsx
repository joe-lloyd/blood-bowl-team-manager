import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
  grid-gap: 20px;
`;

const Card = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background-color: #922d26;
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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
      opacity: ${({ disabled }) => (disabled ? 0.85 : 0.7)};
    }
    img {
      transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.1)')};
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

const HomeContent = ({ userContent }) => {
  const user = useUser();

  const handleDisabledClick = (e) => {
    e.preventDefault();
  };

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

        <Link href={!!user ? '/create-team' : '/login'}>
          <Card>
            <Image
              src="/create-team.webp"
              layout="fill"
              objectFit="cover"
              alt="Create Team"
            />
            <Overlay>
              <CardTitle>
                {!!user ? 'Create a Team' : 'Become a Coach'}
              </CardTitle>
            </Overlay>
          </Card>
        </Link>

        {!!user && (
          <>
            <Link href="/create-league" onClick={handleDisabledClick}>
              <Card disabled>
                <Image
                  src="/coming-soon.webp"
                  layout="fill"
                  objectFit="cover"
                  alt="Coming Soon"
                />
                <Overlay>
                  <CardTitle>Coming Soon: Join a League</CardTitle>
                </Overlay>
              </Card>
            </Link>

            <Link href="/tournaments" onClick={handleDisabledClick}>
              <Card disabled>
                <Image
                  src="/coming-soon.webp"
                  layout="fill"
                  objectFit="cover"
                  alt="Coming Soon"
                />
                <Overlay>
                  <CardTitle>Coming Soon: Join a Tournament</CardTitle>
                </Overlay>
              </Card>
            </Link>
          </>
        )}

        {!!user && userContent?.teams?.length > 0 && (
          <Link href="/my-teams">
            <Card>
              <Overlay>
                <CardTitle>See Your Teams</CardTitle>
              </Overlay>
            </Card>
          </Link>
        )}

        {!!user && userContent?.leagues?.length > 0 && (
          <Link href="/my-leagues" onClick={handleDisabledClick}>
            <Card disabled>
              <Image
                src="/coming-soon.webp"
                layout="fill"
                objectFit="cover"
                alt="Coming Soon"
              />
              <Overlay>
                <CardTitle>Coming Soon: See Your Leagues</CardTitle>
              </Overlay>
            </Card>
          </Link>
        )}

        {!!user && userContent?.tournaments?.length > 0 && (
          <Link href="/my-tournaments" onClick={handleDisabledClick}>
            <Card disabled>
              <Image
                src="/coming-soon.webp"
                layout="fill"
                objectFit="cover"
                alt="Coming Soon"
              />
              <Overlay>
                <CardTitle>Coming Soon: See Your Tournaments</CardTitle>
              </Overlay>
            </Card>
          </Link>
        )}
      </Grid>
    </Container>
  );
};

export default HomeContent;
