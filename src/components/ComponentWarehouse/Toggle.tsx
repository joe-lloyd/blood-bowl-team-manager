import styled from 'styled-components';
import React from 'react';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
`;

const ToggleLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
  color: #1d3860;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #1d3860;
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:before {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }
`;

const ToggleSwitch = styled.div`
  margin-left: 0.5rem;
  ${ToggleInput}:checked + ${Slider} {
    background-color: #922d26;
  }

  ${ToggleInput}:checked + ${Slider}:before {
    transform: translateX(26px);
  }
`;

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  console.log('Toggle rendering');
  const [isChecked, setIsChecked] = React.useState(checked);
  return (
    <ToggleWrapper>
      <ToggleLabel htmlFor={`${label}-toggle`}>
        <span>{label}</span>
        <ToggleSwitch>
          <ToggleInput
            id={`${label}-toggle`}
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              console.log('ToggleSwitch onChange');
              setIsChecked(!isChecked);
              onChange(!isChecked);
            }}
          />
          <Slider />
        </ToggleSwitch>
      </ToggleLabel>
    </ToggleWrapper>
  );
};

export default Toggle;
