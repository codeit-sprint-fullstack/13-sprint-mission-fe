import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <section className={styles.section}>
      <div className={styles["logo-box"]}>
        <Link to="/">
          <img src="/img/login/logo.png" alt="판다마켓 로고" />
        </Link>
      </div>

      <div className={styles["main-box"]}>
        <div className={styles["type-box"]}>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            id="email"
            className={styles.input}
          />

          <label htmlFor="password">비밀번호</label>
          <div className={styles["input-pw"]}>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              id="password"
              className={styles.input}
            />
            <img
              src="/img/login/btn_eye.svg"
              alt="비밀번호 보기"
              className={styles.eyes}
            />
          </div>
        </div>

        <button type="button" className={styles.button}>
          로그인
        </button>

        <div className={styles["easy-log"]}>
          <div className={styles["easy-box"]}>
            <span>간편 로그인하기</span>

            <div className={styles["sns-icons"]}>
              <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                <img src="/img/login/구글-아이콘.png" alt="구글" />
              </a>

              <a
                href="https://www.kakaocorp.com/page/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/login/카카오-아이콘.png" alt="카카오" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles["last-box"]}>
          <p>
            판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
