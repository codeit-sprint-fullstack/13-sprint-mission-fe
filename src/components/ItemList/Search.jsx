import React, { useState } from "react";
import styles from "../../css/ListSearch.module.css";
import searchIcon from "../../assets/icon/search.svg";

const ListSearch = ({ onSearch }) => {
  const [text, setText] = useState("");
  // 누르면 검색을 진행할 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <img src={searchIcon} />
      <input
        className={`${styles.container} text-lg-regular`}
        type="search"
        placeholder="검색할 상품을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default ListSearch;
