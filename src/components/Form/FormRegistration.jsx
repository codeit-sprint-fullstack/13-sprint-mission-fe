import React, { useState } from "react";
import SectionTitle from "../SectionTitle.jsx";
import Button from "../Button/Button.jsx";
import styles from "../../css/FormRegistration.module.css";
import useValidate from "../../hooks/useValidateRegistration.js";
import useSubmit from "../../hooks/useSubmitRegistration.js";
import FormAlertText from "./FormAlertText.jsx";
import closeIcon from "../../assets/icon/close.svg";

const FormRegistration = () => {
  const {
    name,
    description,
    price,
    tag,
    isTooShort,
    isTooLong,
    isNumber,
    isVeryShort,
    isEmptyName,
    isEmptyDesc,
    isEmptyPirce,
    handleChangeName,
    handleChangeDesc,
    handleChangePrice,
    handleChangeTag,
  } = useValidate();

  const [tags, setTags] = useState([]);

  const { handleSubmit } = useSubmit({
    name,
    description,
    price,
    tag,
    isTooShort,
    isTooLong,
    isNumber,
    isVeryShort,
  });

  // 태그 추가
  const handleKeyPressTag = (e) => {
    // Enter누를 때마다 tags배열에 tag가 추가
    if (!isVeryShort && e.key === "Enter") {
      e.preventDefault();
      setTags([...tags, tag]);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <SectionTitle title="상품 등록하기">
        <Button
          size="small-40"
          type="submit"
          disabled={!name || !description || !price}
        >
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
            <FormAlertText>10글자 이내로 입력해주세요</FormAlertText>
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
          {isTooLong && <FormAlertText>10글자 이상 입력해주세요</FormAlertText>}
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
          {isNumber && <FormAlertText>숫자로 입력해주세요</FormAlertText>}
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
            onKeyPress={handleKeyPressTag}
            className={`${styles.input} ${isVeryShort && styles.alert}`}
          ></input>
          {isVeryShort && (
            <FormAlertText>5글자 이내로 입력해주세요</FormAlertText>
          )}
          <div className={styles.container}>
            {tags.map((tag, i) => (
              <p key={i} className={`${styles.tag} text-lg-regular`}>
                # {tag}
                <img src={closeIcon} />
              </p>
            ))}
          </div>
        </section>
      </div>
    </form>
  );
};

export default FormRegistration;
