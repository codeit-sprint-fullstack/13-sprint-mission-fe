import React, { useEffect, useState } from "react";

import styles from "@/components/Product/ProductFilterBar.module.css";

export default function ProductFilterBar({
  title = undefined,
  setSearchKeyword,
  setOrder,
  onChangePage,
}) {
  const [inputValue, setInputValue] = useState(""); // 검색 인풋 텍스트
  const [sortOrder, setSortOrder] = useState("최신순"); // 필터 옵션 데이터
  const [showOptions, setShowOptions] = useState(false); // 필터 옵션 토글
  const [debouncedText, setDebouncedText] = useState(""); // 검색 인풋 타이핑 멈췄을 때의 값

  // 검색 실행 핸들러
  function handleSearch() {
    // 검색어 유효성 검사
    if (debouncedText.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    // 옵션 창이 열려있을 경우 닫기 처리
    if (showOptions) setShowOptions(!showOptions);

    // 검색 결과 반영
    setSearchKeyword(debouncedText);
    setInputValue("");
  }

  // 필터 셀렉트 박스 이벤트 핸들러
  function handleSelectSort(option) {
    if (option === "recent") setSortOrder("최신순");
    if (option === "favorite") setSortOrder("좋아요순");

    setOrder(option);
    setShowOptions(!showOptions);
    onChangePage(1);
  }

  // 검색 인풋 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(inputValue);
    }, 100); // 입력이 0.1초간 멈추면 업데이트

    return () => clearTimeout(timer); // 타이핑 중에는 이전 타이머를 취소
  }, [inputValue]);

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
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>

      <button
        type='button'
        className={styles.searchBtn}
        onClick={() => handleSearch()}
      >
        상품 등록하기
      </button>

      <div className={styles.sortGroup}>
        <div
          className={styles.selectedOption}
          onClick={() => setShowOptions(!showOptions)}
        >
          <div className={styles.selectedValue}>{sortOrder}</div>
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
