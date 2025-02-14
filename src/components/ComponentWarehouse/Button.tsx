import styled from 'styled-components';

export const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: #1d3860;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #092540;
  }

  &:active {
    background-color: #1d3860;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #f9f9f9;
    color: #d4e8ff;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled(Button)`
  background-color: #922d26;

  &:hover {
    background-color: #701d1a;
  }

  &:active {
    background-color: #922d26;
  }
`;

export const RemoveButton = styled.button`
  background-color: #922d26;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
`;

export const InlineLink = styled.span`
  padding: 10px 20px;
  display: inline-block;
  margin: 10px;
  background-color: #922d26;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #701d1a;
  }
`;
