import React from 'react';
import styled from 'styled-components';

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
  height?: string;
}

// Wrapper for the select and custom arrow
const SelectWrapper = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width || '100%'};
`;

// The styled select element
const StyledSelect = styled.select<{ height?: string }>`
  width: 100%;
  height: ${(props) => props.height || '40px'};
  padding-right: 30px;
  appearance: none;
  background-color: #e0f0ff;
  border: 1px solid #1d3860;
  border-radius: 4px;
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
      <Arrow viewBox="0 0 260 245" xmlns="http://www.w3.org/2000/svg">
        <path d="m56,237 74-228 74,228L10,96h240" />
      </Arrow>
    </SelectWrapper>
  );
};

export default Select;
