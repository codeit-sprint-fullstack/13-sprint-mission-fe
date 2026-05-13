import React, { useState } from "react";

import { Link } from "react-router";

import Button from "@/components/common/Button/Button";
import styles from "@/components/Product/ProductFilterBar.module.css";
import { SORT_OPTIONS } from "@/constants/constants";

export default function ProductFilterBar({
  title = undefined,
  setSearchKeyword,
  setOrder,
  onChangePage,
}) {
  const [inputValue, setInputValue] = useState(""); // 검색 인풋 텍스트
  const [order, setOrderLocal] = useState("recent"); // 필터 옵션 데이터
  const [showOptions, setShowOptions] = useState(false); // 필터 옵션 토글

  const currentLabel = SORT_OPTIONS.find((o) => o.value === order)?.label; // 현재 필터 옵션 텍스트

  // 입력 시 실시간 처리
  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);

    // 사용자가 검색어를 모두 지우면 즉시 전체 목록을 보여줌
    if (value.trim() === "") {
      setSearchKeyword("");
      return;
    }

    setSearchKeyword(inputValue.trim());
  }

  // 필터 셀렉트 박스 이벤트 핸들러
  function handleSelectSort(option) {
    setOrderLocal(option); // 지역 order 변수 업데이트
    setOrder(option); // 부모 order 변수 업데이트
    setShowOptions(!showOptions); // 필터 옵션 토글
    onChangePage(1); // 현재 페이지를 첫 페이지로
  }

  return (
    <article className={styles.productFilterBar}>
      {title && <h1 className={styles.title}>{title}</h1>}

      <div className={styles.searchBar}>
        <span className={styles.searchIc}></span>
        <input
          type='text'
          name='searchInput'
          placeholder='검색할 상품을 입력해주세요'
          className={styles.searchInput}
          value={inputValue}
          onChange={handleChange}
        />
      </div>

      <Link to='/registration' className={styles.searchBtn}>
        <Button type='button'>상품 등록하기</Button>
      </Link>

      <div className={styles.sortGroup}>
        <div
          className={styles.selectedOption}
          onClick={() => setShowOptions(!showOptions)}
        >
          <div className={styles.selectedValue}>{currentLabel}</div>
          <span className={styles.arrowBtn}></span>
          <span className={`${styles.sortBtn}`}></span>
        </div>

        {showOptions && (
          <ul className={styles.sortSelect}>
            <li>
              <button
                type='button'
                className={`${styles.option} ${styles.recent}`}
                onClick={() => handleSelectSort("recent")}
              >
                최신순
              </button>
            </li>
            <li>
              <button
                type='button'
                className={`${styles.option} ${styles.favorite}`}
                onClick={() => handleSelectSort("favorite")}
              >
                좋아요순
              </button>
            </li>
          </ul>
        )}
      </div>
    </article>
  );
}
