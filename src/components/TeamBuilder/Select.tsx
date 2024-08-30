import React from 'react';
import styled from 'styled-components';

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
  height?: string;
}

const SelectWrapper = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width || '100%'};
`;

const StyledSelect = styled.select<{ height?: string }>`
  width: 100%;
  height: ${(props) => props.height || '40px'};
  padding: 5px 30px 5px 10px;
  appearance: none;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 16px;
  color: #1d3860;
`;

const Arrow = styled.svg`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  fill: #1d3860;
  width: 16px;
  height: 16px;
`;

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  width,
  height,
}) => {
  return (
    <SelectWrapper width={width}>
      <StyledSelect value={value} onChange={onChange} height={height}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <Arrow viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 75 L 25 25 L 75 25 Z" />
      </Arrow>
    </SelectWrapper>
  );
};

export default Select;
