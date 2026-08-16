import styled from "styled-components";

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.red[0]};
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  margin-top: 8px;
  display: block;
`;

export default ErrorMessage;
