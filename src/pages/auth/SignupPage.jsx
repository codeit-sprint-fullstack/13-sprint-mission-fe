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
import InputItem from "../../components/UI/InputItem";
import SocialLogin from "./components/SocialLogin";
import PasswordInput from "./components/PasswordInput";
import { useAuth } from "../../contexts/AuthContext";
import SimpleModal from "../../components/UI/SimpleModal";

const SignupPage = () => {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const {
    register, // 각 입력 필드를 폼에 등록하고 유효성 검사 규칙을 설정하는 함수
    handleSubmit, // 폼 제출을 처리하는 함수
    watch, //  폼 필드의 변경을 감지하는 함수
    trigger, // 폼의 유효성 검사를 트리거하는 함수
    formState: { errors, isValid }, // 폼의 상태를 나타내는 객체
  } = useForm({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await signup(data);
      navigate("/items");
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      }
    }
  };

  // 실시간으로 입력값을 감지해야 하는 경우, 폼의 현재 상태를 가져오는 getValues보다 watch 함수를 사용하는 것이 더 적합해요.
  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  // 비밀번호가 변경될 때마다 비밀번호 확인 필드의 유효성을 검사
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
        <LogoHomeLink href="/" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </LogoHomeLink>

        <Form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
          <InputItem
            id="email"
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            error={errors.email?.message}
            register={register("email", {
              // required에 boolean 값을 넣어줄 수도 있지만, 대신 오류 메세지 문자열을 넣어놓으면 해당 필드를 필수 항목으로 설정함과 동시에 폼 제출 시 입력값이 없을 경우 해당 메시지가 표시돼요.
              required: "이메일을 입력해 주세요",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
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
                value === password || "비밀번호가 일치하지 않습니다",
            })}
          />

          <SubmitButton type="submit" disabled={!isValid}>
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
