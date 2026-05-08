import React, { useState } from "react";
import { Link } from "react-router-dom";

import { InputBlock, Button, Social } from "@/components";
import { useForm } from "@/hooks";
import { validateEmail, validatePassword } from "@/utils";
import { lgLogo } from "@/assets/img";
import { icBtnVisibilityOff, icBtnVisibilityOn } from "@/assets/icons";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [data, setData] = useState({
    email: "",
    pw: "",
  });
  const [pwOpen, setPwOpen] = useState(false);

  const { validationResults, isValidated } = useForm({
    data,
    validationFns: [validateEmail, validatePassword],
  });
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
            errorMsg={
              data.email && !validationResults.email
                ? "잘못된 이메일 형식입니다."
                : ""
            }
            placeholder="이메일을 입력해주세요"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            className={styles.input}
          />
          <InputBlock
            title="비밀번호"
            errorMsg={
              data.pw && !validationResults.pw
                ? "비밀번호를 8자 이상 입력해주세요."
                : ""
            }
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
          <Button
            variant="rectangle"
            disabled={!isValidated || !data.email || !data.pw}
            className={styles.btn}
          >
            로그인
          </Button>
        </div>
        <Social />
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
