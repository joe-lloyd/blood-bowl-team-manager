import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const FooterText = styled.h1`
  display: inline-block;
  color: #eaaa02;
  margin: auto;
  padding: 20px;
`;

const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #1d3860;
  margin-top: 150px;

  svg {
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 150px;
    z-index: -1;
  }
`;

const FooterAccent = styled.div`
  background-color: #922d26;
  height: 20px;
`;

const StyledImage = styled(Image)`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <svg
          viewBox="0 0 300 150"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <polygon points="300,0 300,150 0,150" style={{ fill: '#1d3860' }} />
        </svg>
        <FooterText>Some text for the footer</FooterText>
        <StyledImage
          src="/BBLogoIcon.png"
          alt="logo"
          width={100}
          height={100}
        />
      </FooterContainer>
      <FooterAccent />
    </>
  );
};

export default Footer;
