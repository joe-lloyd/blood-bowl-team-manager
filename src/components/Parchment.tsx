import styled from 'styled-components';

const Parchment = styled.div<{ $intensity?: 'low' | 'high' }>`
  position: ${({ $intensity }) =>
    $intensity === 'low' ? 'absolute' : 'fixed'};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: none;
  margin: 0;
  box-shadow: ${({ $intensity = 'high' }) =>
    $intensity === 'low'
      ? '1px 1.5px 10px black, 0 0 15px #8a4d0f inset'
      : '2px 3px 20px black, 0 0 60px #8a4d0f inset'};
  background: #fffef0;
  filter: url(#wavy2);
  z-index: -1;
`;

export default Parchment;
