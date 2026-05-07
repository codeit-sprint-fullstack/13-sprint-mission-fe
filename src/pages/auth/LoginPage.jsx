import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputBlock, Button } from "@/components";
import { lgLogo } from "@/assets/img";
import {
  icGoogle,
  icKakao,
  icBtnVisibilityOff,
  icBtnVisibilityOn,
} from "@/assets/icons";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [pwOpen, setPwOpen] = useState(false);
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={lgLogo} />
            <h1 className={styles.logoText}>판다마켓</h1>
          </div>
        </Link>

        <div className={styles.inputs}>
          <InputBlock
            title="이메일"
            errorMsg="잘못된 이메일 형식입니다."
            placeholder="이메일을 입력해주세요"
            className={styles.input}
          />
          <InputBlock
            title="비밀번호"
            errorMsg="비밀번호를 8자 이상 입력해주세요."
            type={pwOpen ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            className={styles.input}
            suffix={
              <img
                src={pwOpen ? icBtnVisibilityOn : icBtnVisibilityOff}
                className={styles.pwIcon}
                onClick={() => setPwOpen((prev) => !prev)}
              />
            }
          />
          <Button variant="rectangle" className={styles.btn}>
            로그인
          </Button>
        </div>
        <div className={styles.socialContainer}>
          <p className={styles.socialText}>간편 로그인하기</p>
          <div className={styles.socials}>
            <Link to="https://www.google.com/">
              <img src={icGoogle} className={styles.social} />
            </Link>
            <Link to="https://www.kakaocorp.com/">
              <img src={icKakao} className={styles.social} />
            </Link>
          </div>
        </div>
        <p className={styles.signup}>
          판다마켓이 처음이신가요?{" "}
          <Link className={styles.link} to="/signup">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
