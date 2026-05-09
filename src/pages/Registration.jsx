import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button/Default";
import styles from ".././css/Registration.module.css";
import useValidateRegistration from "../hooks/useValidateRegistration";

const registration = () => {
  const {
    name,
    description,
    price,
    tag,
    isTooShort,
    isTooLong,
    isNumber,
    isVeryShort,
    handleChangeName,
    handleChangedesc,
    handleChangeprice,
    handleChangetag,
  } = useValidateRegistration();

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <SectionTitle title="상품 등록하기">
          <Button>등록</Button>
        </SectionTitle>
        <form className={styles.form} action="/submit" method="POST">
          <section className={styles.section}>
            <label htmlFor="name">상품명</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={handleChangeName}
              className={`${styles.input} ${isTooShort && styles.alert}`}
              required
            ></input>
            {isTooShort && (
              <p className={`${styles.alert} text-md-semibold`}>
                10글자 이내로 입력해주세요
              </p>
            )}
          </section>
          <section className={styles.section}>
            <label htmlFor="description">상품 소개</label>
            <textarea
              id="description"
              name="description"
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={handleChangedesc}
              className={styles.textarea}
            ></textarea>
            {isTooLong && (
              <p className={`${styles.alert} text-md-semibold`}>
                10글자 이상 입력해주세요
              </p>
            )}
          </section>
          <section className={styles.section}>
            <label htmlFor="price">판매 가격</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={handleChangeprice}
              className={styles.input}
              required
            ></input>
            {isNumber && (
              <p className={`${styles.alert} text-md-semibold`}>
                숫자로 입력해주세요
              </p>
            )}
          </section>
          <section className={styles.section}>
            <label htmlFor="tag">태그</label>
            <input
              type="text"
              id="tag"
              name="tag"
              placeholder="태그를 입력해주세요"
              value={tag}
              onChange={handleChangetag}
              className={styles.input}
            ></input>
            {isVeryShort && (
              <p className={`${styles.alert} text-md-semibold`}>
                5글자 이내로 입력해주세요
              </p>
            )}
          </section>
        </form>
      </div>
    </div>
  );
};

export default registration;
