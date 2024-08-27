import React from 'react';
import styled from 'styled-components';

const blueColor = '#1d3860'; // Your chosen blue color

const TextContent = styled.div`
  border: 2px solid ${blueColor};
  padding: 20px;
  margin-bottom: 20px;
`;

const TextContentTitle = styled.h2`
  font-size: 2rem;
  color: ${blueColor};
  margin-bottom: 10px;
  border-bottom: 2px solid ${blueColor};
  padding-bottom: 5px;
`;

const TextContentBody = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  position: relative;
  padding-left: 20px;

  &:first-letter {
    font-size: 3rem;
    font-weight: bold;
    color: ${blueColor};
    float: left;
    margin-right: 10px;
    line-height: 1;
  }
`;

const TextBorderBox: React.FC<{ title: string; body: string }> = ({
  title,
  body,
}) => {
  return (
    <TextContent>
      <TextContentTitle>{title}</TextContentTitle>
      <TextContentBody>{body}</TextContentBody>
    </TextContent>
  );
};

export default TextBorderBox;
