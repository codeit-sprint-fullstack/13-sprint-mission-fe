import styled, { css } from "styled-components";
import { ReactComponent as Spinner } from "../../assets/images/ui/spinner.svg";

export const buttonStyle = css`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: #ffffff;
  border-radius: ${({ $pill }) => ($pill ? "999px" : "8px")};
  padding: 14px 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[1]};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.blue[2]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[0]};
    cursor: default;
    pointer-events: none;
  }

  ${({ $appearance, theme }) =>
    $appearance === "secondary" &&
    css`
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.blue[0]};
      color: ${theme.colors.blue[0]};

      &:focus,
      &:hover,
      &:disabled {
        color: ${theme.colors.white};
      }
    `}
`;

function BaseButton({ isLoading, children, onClick, ...props }) {
  return (
    <button onClick={onClick} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

const Button = styled(BaseButton)`
  ${buttonStyle}
`;

export default Button;
