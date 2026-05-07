import React, { useState } from "react";
import styles from "./Registration.module.css";
import { nanoid } from "nanoid/non-secure";

export default function RegistrationPage() {
  const [tagValue, setTagValue] = useState("");
  const [tagList, setTagList] = useState([]);

  function handleTagKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (tagValue.trim() === "") return;
    setTagList((prev) => [
      ...prev,
      {
        id: nanoid(),
        value: tagValue.includes("#") ? tagValue : "#" + tagValue,
      },
    ]);
    setTagValue("");
  }

  function handleTagDelete(id) {
    setTagList((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>상품 등록하기</h2>
        <button
          type="submit"
          form="registration-form"
          className={styles.submitButton}
        >
          등록
        </button>
      </div>

      <form
        id="registration-form"
        className={styles.fieldContainer}
        onSubmit={handleSubmit}
      >
        <label className={styles.label} htmlFor="product-name">
          상품명
        </label>
        <input
          className={styles.input}
          id="product-name"
          name="productName"
          placeholder="상품명을 입력해주세요"
        />

        <label className={styles.label} htmlFor="product-description">
          상품 소개
        </label>
        <textarea
          className={styles.textarea}
          id="product-description"
          name="productDescription"
          placeholder="상품 소개를 입력해주세요."
        />

        <label className={styles.label} htmlFor="product-price">
          판매가격
        </label>
        <input
          className={styles.input}
          id="product-price"
          name="productPrice"
          type="number"
          placeholder="판매 가격을 입력해주세요"
        />

        <label className={styles.label} htmlFor="product-tags">
          태그
        </label>
        <input
          className={styles.input}
          id="product-tags"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="태그를 입력하세요"
        />

        {tagList.length > 0 && (
          <ul className={styles.tagList}>
            {tagList.map((t) => (
              <li key={t.id} className={styles.tagItem}>
                <p className={styles.tagValue}>{t.value}</p>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleTagDelete(t.id)}
                >
                  <img src="/images/icons/ic_X.svg" alt="태그 삭제" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
