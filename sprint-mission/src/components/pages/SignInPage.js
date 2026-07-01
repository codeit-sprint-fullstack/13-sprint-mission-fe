"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./SignInPage.module.css";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function SignInPage() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [modalMessage, setModalMessage] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => signIn(formData.email, formData.password),
    onSuccess: () => router.push("/items"),
    onError: () => {
      setErrors({
        email: "이메일을 확인해 주세요.",
        password: "비밀번호를 확인해 주세요.",
      });
      setModalMessage("로그인이 실패하였습니다.");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ email: values.email, password: values.password });
  }

  const isActive = values.email && values.password;

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
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}

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

          <button
            className={styles.accountBtn}
            type="submit"
            disabled={!isActive || isPending}
          >
            로그인
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
          <span className={styles.accountInfoTitle}>
            판다마켓이 처음이신가요?
          </span>
          <Link href="/signup" className={styles.accountInfoTextBtn}>
            회원가입
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
