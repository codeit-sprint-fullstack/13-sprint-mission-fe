import React from "react";
import styled, { css } from "styled-components";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

export const inputStyle = css`
  padding: 16px 24px;
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

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

export const InputField = styled.input`
  ${inputStyle}
`;

function InputItem({
  id,
  label,
  error,
  register = {},
  ...inputProps
}) {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputField
        id={id}
        $error={!!error} // 비표준 속성이기 때문에 `$`를 붙인 이름으로 styled-components에서만 사용
        {...inputProps}
        {...register}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default InputItem;
