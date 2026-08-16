import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import type { SignUpInput } from "../../types/models";

const SignupPage = () => {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpInput>({ mode: "onChange", reValidateMode: "onChange" });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: SignUpInput) => {
    try {
      await signup(data);
      navigate("/items");
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
    }
  };

  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  useEffect(() => {
    if (password && passwordConfirmation) {
      trigger("passwordConfirmation");
    }
  }, [password, passwordConfirmation, trigger]);

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

        <Form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
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

          <InputItem
            id="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            error={errors.nickname?.message}
            register={register("nickname", {
              required: "닉네임을 입력해 주세요",
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
            })}
          />

          <PasswordInput
            id="passwordConfirmation"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
            error={errors.passwordConfirmation?.message}
            register={register("passwordConfirmation", {
              required: "비밀번호를 다시 한 번 입력해 주세요",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않아요.",
            })}
          />

          <SubmitButton type="submit" disabled={!isValid || isSubmitting} isPending={isSubmitting}>
            회원가입
          </SubmitButton>
        </Form>

        <SocialLogin />

        <AuthSwitch>
          이미 회원이신가요? <Link to="/signin">로그인</Link>
        </AuthSwitch>
      </AuthContainer>
      <SimpleModal
        isOpen={!!errorMessage}
        text={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </>
  );
};

export default SignupPage;
