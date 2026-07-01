"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ItemListSearch.module.css";

export default function ItemListSearch({ onSearch }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <Image src="/icon/search.svg" width={24} height={24} alt="검색" />
      <input
        className={`${styles.container} text-lg-regular`}
        type="search"
        placeholder="검색할 상품을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}
