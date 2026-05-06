import React from "react";

import { Link } from "react-router";

import styles from "@/pages/NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.empty}>
      <div className={styles.emptyTitle}>404</div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소가 잘못되었거나 삭제된 페이지입니다.</p>
      <p className={styles.buttonContainer}>
        <Link to='/' className={styles.button}>
          홈으로 돌아가기
        </Link>
      </p>
    </main>
  );
}
