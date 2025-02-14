import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-left: 3px solid #1d3860;
  border-right: 3px solid #1d3860;
`;

export const MainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #e0f0ff;
  border: none;
`;

export const TableHeader = styled.th`
  background-color: #1d3860;
  color: white;
  padding: 10px;
  font-weight: bold;
  border: 1px solid #1d3860;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #d4e8ff;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #1d3860;
  text-align: center;
  padding: 10px;
`;
