import { useState } from "react";
import styled from "styled-components";
import { InputField } from "../../../components/UI/InputItem";
import Label from "../../../components/UI/Label";
import ErrorMessage from "../../../components/UI/ErrorMessage";
import eyeInvisibleIcon from "../../../assets/images/icons/eye-invisible.svg";
import eyeVisibleIcon from "../../../assets/images/icons/eye-visible.svg";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggleButton = styled.button`
  position: absolute;
  right: 24px;
`;

function PasswordInput({
  id,
  label,
  error,
  register = {},
  ...inputProps
}) {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? "text" : "password";

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputWrapper>
        <InputField
          type={type}
          {...inputProps}
          {...register}
        />
        <PasswordToggleButton
          type="button"
          onClick={() => setShowPassword(v => !v)}
          aria-label="비밀번호 보기"
          tabIndex={-1}
        >
          <img
            className="password-toggle-icon"
            src={showPassword ? eyeVisibleIcon : eyeInvisibleIcon}
            alt={
              showPassword
                ? "비밀번호 표시 상태 아이콘"
                : "비밀번호 숨김 상태 아이콘"
            }
          />
        </PasswordToggleButton>
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

export default PasswordInput;
