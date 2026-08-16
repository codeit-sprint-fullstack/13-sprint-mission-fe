import styled from "styled-components";

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
  margin-bottom: 12px;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: 16px;
  }
`;

export default Label;
