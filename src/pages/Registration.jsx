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
    handleChangeDesc,
    handleChangePrice,
    handleChangeTag,
  } = useValidateRegistration();
  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      alert("입력을 완료해주세요");
      return;
    }
    if (isTooShort) {
      alert("상품명은 10글자 이내로 입력해주세요");
      return;
    }
    if (isTooLong) {
      alert("상품 소개는 10글자 이상 입력해주세요");
      return;
    }
    if (isNumber) {
      alert("상품 가격은 숫자로 입력해주세요");
      return;
    }
    console.log("제출");
  };

  // 태그 추가
  const handleKeyDownTag = (e) => {
    // Enter누를 때마다 tags배열에 tag가 추가
    if (!isVeryShort && e.key === "Enter") setTags([...tags, tag]);
  };

  return (
    <div className="container">
      <form className={styles.wrapper} onSubmit={handleSubmit} method="POST">
        <SectionTitle title="상품 등록하기">
          <Button size="small-40" type="submit">
            등록
          </Button>
        </SectionTitle>
        <div className={styles.form}>
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
            ></input>
            {isTooShort && (
              <p className={`${styles.alertText} text-md-semibold`}>
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
              onChange={handleChangeDesc}
              className={`${styles.textarea} ${isTooLong && styles.alert}`}
            ></textarea>
            {isTooLong && (
              <p className={`${styles.alertText} text-md-semibold`}>
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
              onChange={handleChangePrice}
              className={`${styles.input} ${isNumber && styles.alert}`}
            ></input>
            {isNumber && (
              <p className={`${styles.alertText} text-md-semibold`}>
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
              onChange={handleChangeTag}
              onKeyDown={handleKeyDownTag}
              className={`${styles.input} ${isVeryShort && styles.alert}`}
            ></input>
            {isVeryShort && (
              <p className={`${styles.alertText} text-md-semibold`}>
                5글자 이내로 입력해주세요
              </p>
            )}
            {tags.map((tag, i) => (
              <p key={i} className={`${styles.tag} text-lg-regular`}>
                {tag}
              </p>
            ))}
          </section>
        </div>
      </form>
    </div>
  );
};

export default registration;
