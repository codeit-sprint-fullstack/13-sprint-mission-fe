import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface InputStyleProps {
  $error?: boolean;
}

export interface InputItemProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

export const inputStyle = css<InputStyleProps>`
  min-height: 56px;
  padding: 15px 24px;
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  outline: none;
  border: 1px solid transparent;
  ${({ $error, theme }) => $error && css`border-color: ${theme.colors.red[0]};`}

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[0]};
  }

  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.blue[0]};
    outline: none;
  }
`;

export const InputField = styled.input<InputStyleProps>`
  ${inputStyle}
`;

function InputItem({
  id,
  label,
  error,
  register,
  ...inputProps
}: InputItemProps) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputField
        id={id}
        $error={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
        {...register}
      />
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </div>
  );
}

export default InputItem;
