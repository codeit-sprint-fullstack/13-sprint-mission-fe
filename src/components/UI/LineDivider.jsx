import styled from "styled-components";

const LineDivider = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: var(--gray-200);
  margin: ${({ $margin }) => $margin || "16px 0"};
`;

export default LineDivider;
