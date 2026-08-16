import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";
import Spinner from "../../assets/images/ui/spinner.svg?react";

export type ButtonAppearance = "primary" | "secondary";

export interface ButtonStyleProps {
  $pill?: boolean;
  $appearance?: ButtonAppearance;
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  children: ReactNode;
  isPending?: boolean;
}

export const buttonStyle = css<ButtonStyleProps>`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: #ffffff;
  border-radius: ${({ $pill }) => ($pill ? "999px" : "8px")};
  min-height: 48px;
  padding: 12px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  line-height: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[1]};
  }

  &:active {
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

      &:hover {
        color: ${theme.colors.white};
      }

      &:active {
        background-color: ${theme.colors.blue[2]};
        color: ${theme.colors.white};
      }

      &:disabled {
        color: ${theme.colors.gray[0]};
        background-color: ${theme.colors.white};
        border-color: ${theme.colors.gray[0]};
      }
    `}
`;

function BaseButton({ isPending = false, children, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {isPending ? <Spinner /> : children}
    </button>
  );
}

const Button = styled(BaseButton)<ButtonStyleProps>`
  ${buttonStyle}
`;

export default Button;
