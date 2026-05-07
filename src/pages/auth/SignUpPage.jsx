import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputBlock, Button, Social } from "@/components";
import { lgLogo } from "@/assets/img";
import { icBtnVisibilityOff, icBtnVisibilityOn } from "@/assets/icons";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  const [data, setData] = useState({
    email: "",
    nickname: "",
    pw: "",
    checkPw: "",
  });
  const [pwOpen, setPwOpen] = useState(false);
  const [pwCheckOpen, setPwCheckOpen] = useState(false);
  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
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
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <InputBlock
            title="닉네임"
            errorMsg="잘못된 닉네임 형식입니다."
            placeholder="닉네임을 입력해주세요"
            className={styles.input}
            value={data.nickname}
            onChange={(e) =>
              setData((prev) => ({ ...prev, nickname: e.target.value }))
            }
          />
          <InputBlock
            title="비밀번호"
            errorMsg="비밀번호를 8자 이상 입력해주세요."
            type={pwOpen ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            value={data.pw}
            onChange={(e) =>
              setData((prev) => ({ ...prev, pw: e.target.value }))
            }
            className={styles.input}
            suffix={
              <img
                src={pwOpen ? icBtnVisibilityOn : icBtnVisibilityOff}
                className={styles.pwIcon}
                onClick={() => setPwOpen((prev) => !prev)}
              />
            }
          />
          <InputBlock
            title="비밀번호 확인"
            errorMsg="비밀번호가 일치하지 않습니다."
            type={pwCheckOpen ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={data.pwCheck}
            onChange={(e) =>
              setData((prev) => ({ ...prev, pwCheck: e.target.value }))
            }
            className={styles.input}
            suffix={
              <img
                src={pwCheckOpen ? icBtnVisibilityOn : icBtnVisibilityOff}
                className={styles.pwIcon}
                onClick={() => setPwCheckOpen((prev) => !prev)}
              />
            }
          />
          <Button variant="rectangle" disabled={true} className={styles.btn}>
            회원가입
          </Button>
        </div>
        <Social />
        <p className={styles.login}>
          이미 회원이신가요?
          <Link className={styles.link} to="/login">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
