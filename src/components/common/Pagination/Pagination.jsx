import React from "react";

import styles from "@/components/common/Pagination/Pagination.module.css";
import getPaginationInfo from "@/utils/getPaginationInfo";

export default function Pagination({
  products,
  pageSize,
  currentPage,
  onChangePage,
}) {
  const {
    totalPages,
    startPage,
    groupRange,
    prevGroup,
    prevStartPage,
    nextStartPage,
  } = getPaginationInfo(currentPage, products.totalCount, pageSize); // 페이지네이션 데이터
  const pages =
    Array.from({ length: Math.max(0, groupRange) }, (_, i) => startPage + i) ??
    0; // 페이지네이션 넘버링

  /**
   * 이전 페이지 그룹으로 이동하는 핸들러
   * 현재 페이지 그룹의 시작 페이지 - 1로 이동
   */
  function handlePrevGroup() {
    if (prevGroup < 1) return;
    onChangePage(prevStartPage);
  }

  /**
   * 다음 페이지 그룹으로 이동하는 핸들러
   * 현재 페이지 그룹의 마지막 페이지 + 1로 이동
   */
  function handleNextGroup() {
    if (nextStartPage > totalPages) return;
    onChangePage(nextStartPage);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.container}>
        <li className={styles.controls}>
          <button
            type='button'
            aria-label='이전 상품페이지로 가기 버튼'
            aria-current='page'
            className={`${styles.arrowBtn} ${prevGroup < 1 ? styles.disabled : ""}`}
            onClick={handlePrevGroup}
          ></button>
        </li>
        {pages.map((id) => (
          <li key={id}>
            <button
              type='button'
              aria-label={`${id} 페이지 버튼`}
              aria-current='page'
              className={`${styles.numberBtn} ${id === currentPage ? styles.active : ""}`}
              onClick={() => onChangePage(id)}
            >
              {id}
            </button>
          </li>
        ))}
        <li className={styles.controls}>
          <button
            type='button'
            aria-label='다음 상품페이지로 가기 버튼'
            aria-current='page'
            className={`${styles.arrowBtn} ${styles.rightArrow} ${nextStartPage > totalPages ? styles.disabled : ""}`}
            onClick={handleNextGroup}
          ></button>
        </li>
      </ul>
    </nav>
  );
}
