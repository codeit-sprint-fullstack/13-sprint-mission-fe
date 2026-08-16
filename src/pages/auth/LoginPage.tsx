import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  AuthContainer,
  LogoHomeLink,
  Form,
  AuthSwitch,
  SubmitButton,
} from "./AuthStyles";
import logo from "../../assets/images/logo/logo.svg";
import textLogo from "../../assets/images/logo/text_logo.svg";
import InputItem from "../../components/UI/InputItem";
import SocialLogin from "./components/SocialLogin";
import PasswordInput from "./components/PasswordInput";
import { useAuth } from "../../contexts/AuthContext";
import SimpleModal from "../../components/UI/SimpleModal";
import type { SignInInput } from "../../types/models";

function LoginPage() {
  const { user, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInInput>({ mode: "onChange", reValidateMode: "onChange" });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: SignInInput) => {
    try {
      await signin(data);
      navigate(location.state?.from ?? "/items", { replace: true });
    } catch (error) {
      setError("email", { type: "server", message: "이메일을 확인해 주세요." });
      setError("password", { type: "server", message: "비밀번호를 확인해 주세요." });
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
    }
  };

  if (user) {
    return <Navigate to="/items" />;
  }

  return (
    <>
      <AuthContainer>
        <LogoHomeLink to="/" aria-label="홈으로 이동">
          <img className="logoMark" src={logo} alt="" />
          <img className="logoText" src={textLogo} alt="판다마켓" />
        </LogoHomeLink>

        <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <InputItem
            id="email"
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            error={errors.email?.message}
            register={register("email", {
              required: "이메일을 입력해 주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "잘못된 이메일 형식입니다",
              },
            })}
          />

          <PasswordInput
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            error={errors.password?.message}
            register={register("password", {
              required: "비밀번호를 입력해 주세요",
              minLength: {
                value: 8,
                message: "비밀번호를 8자 이상 입력해 주세요",
              },
              onChange: () => trigger("password"),
            })}
          />

          <SubmitButton type="submit" disabled={!isValid || isSubmitting} isPending={isSubmitting}>
            로그인
          </SubmitButton>
        </Form>

        <SocialLogin />

        <AuthSwitch>
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </AuthSwitch>
      </AuthContainer>
      <SimpleModal
        isOpen={!!errorMessage}
        text={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </>
  );
}

export default LoginPage;
