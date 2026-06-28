"use client";
// 로그인/회원가입 유효성 검사랑 실패 모달 확인하고 있고, 가입 인증도 작업중입니다.
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./SignUpPage.module.css";
import { useMutation } from "@tanstack/react-query";

export default function SignUpPage() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [modalMessage, setModalMessage] = useState("");

  const { signUp } = useAuth();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) =>
      signUp(
        formData.nickname,
        formData.email,
        formData.password,
        formData.passwordConfirmation,
      ),
    onSuccess: () => router.push("/items"),
    onError: (error) => setModalMessage(error.message),
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          value.length > 0 && value.length < 8
            ? "비밀번호를 8자 이상 입력해주세요"
            : "",
      }));
    }
    if (name === "passwordConfirmation") {
      setErrors((prev) => ({
        ...prev,
        passwordConfirmation:
          value !== values.password ? "비밀번호가 일치하지 않아요" : "",
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    mutate({
      nickname: values.nickname,
      email: values.email,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    });
  }

  const isActive =
    values.email &&
    values.nickname &&
    values.password &&
    values.passwordConfirmation &&
    values.password.length >= 8;

  return (
    <main className={styles.account}>
      <Link href="/">
        <Image
          className={styles.accountLogo}
          src="/logo/logo-panda-market.svg"
          alt="판다마켓"
          width={198}
          height={66}
        />
      </Link>
      <div className={styles.accountContainer}>
        <form className={styles.accountContainerInner} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.accountLabel}>
            이메일
          </label>
          <input
            id="email"
            name="email"
            className={styles.accountInput}
            type="email"
            placeholder="이메일을 입력해주세요"
            value={values.email}
            onChange={handleChange}
          />

          <label htmlFor="nickname" className={styles.accountLabel}>
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            className={styles.accountInput}
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={values.nickname}
            onChange={handleChange}
          />

          <label htmlFor="password" className={styles.accountLabel}>
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            className={styles.accountInput}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}

          <label htmlFor="passwordConfirmation" className={styles.accountLabel}>
            비밀번호 확인
          </label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            className={styles.accountInput}
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={values.passwordConfirmation}
            onChange={handleChange}
          />
          {errors.passwordConfirmation && (
            <p className={styles.errorMessage}>{errors.passwordConfirmation}</p>
          )}

          <button
            className={styles.accountBtn}
            type="submit"
            disabled={!isActive || isPending}
          >
            회원가입
          </button>
        </form>

        <div className={styles.accountSocial}>
          <span className={styles.accountSocialTitle}>간편 로그인하기</span>
          <div className={styles.accountSocialIcon}>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              <Image
                src="/icon/social-google.svg"
                alt="구글 로그인"
                width={42}
                height={42}
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/icon/social-kakao.svg"
                alt="카카오 로그인"
                width={42}
                height={42}
              />
            </a>
          </div>
        </div>

        <div className={styles.accountInfo}>
          <span className={styles.accountInfoTitle}>이미 회원이신가요?</span>
          <Link href="/signin" className={styles.accountInfoTextBtn}>
            로그인
          </Link>
        </div>
      </div>

      {modalMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{modalMessage}</p>
            <button onClick={() => setModalMessage("")}>확인</button>
          </div>
        </div>
      )}
    </main>
  );
}
