import React, { useState } from "react";
import styles from "./Registration.module.css";
import { nanoid } from "nanoid/non-secure";
import { useValidation } from "@/hooks/useValidation";
import FormField from "@/components/SellItems/FormField";
import TagInput from "@/components/SellItems/TagInput";
import formStyles from "@/components/SellItems/FormField.module.css";

export default function RegistrationPage() {
  const [tagValue, setTagValue] = useState("");
  const [tagList, setTagList] = useState([]);
  const [formValues, setFormValues] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
  });

  const { errors, handleCheckValid } = useValidation({
    productName: { min: 1, max: 10 },
    productDescription: { min: 10, max: 100 },
    productPrice: {
      required: true,
      validate: (value) =>
        /^[0-9]+$/.test(value) ? "" : "숫자만 입력해주세요.",
    },
    productTags: { min: 1, max: 5 },
  });

  const isFormValid =
    formValues.productName.trim() !== "" &&
    formValues.productDescription.trim() !== "" &&
    formValues.productPrice.trim() !== "";

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleTagKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (tagValue.trim() === "" || tagValue.length > 5)
      return handleCheckValid(e);
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

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>상품 등록하기</h2>
        <button
          type="submit"
          form="registration-form"
          disabled={!isFormValid}
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
        <FormField
          label="상품명"
          htmlFor="product-name"
          error={errors.productName}
        >
          <input
            className={`${formStyles.input} ${errors.productName ? formStyles.inputError : ""}`}
            id="product-name"
            name="productName"
            value={formValues.productName}
            onChange={handleFormChange}
            onBlur={handleCheckValid}
            placeholder="상품명을 입력해주세요"
          />
        </FormField>

        <FormField
          label="상품 소개"
          htmlFor="product-description"
          error={errors.productDescription}
        >
          <textarea
            className={`${formStyles.textarea} ${errors.productDescription ? formStyles.inputError : ""}`}
            id="product-description"
            name="productDescription"
            value={formValues.productDescription}
            onChange={handleFormChange}
            onBlur={handleCheckValid}
            placeholder="상품 소개를 입력해주세요."
          />
        </FormField>

        <FormField
          label="판매가격"
          htmlFor="product-price"
          error={errors.productPrice}
        >
          <input
            className={`${formStyles.input} ${errors.productPrice ? formStyles.inputError : ""}`}
            id="product-price"
            name="productPrice"
            type="number"
            value={formValues.productPrice}
            onChange={handleFormChange}
            onBlur={handleCheckValid}
            placeholder="판매 가격을 입력해주세요"
          />
        </FormField>

        <TagInput
          tagValue={tagValue}
          tagList={tagList}
          error={errors.productTags}
          onChange={(e) => setTagValue(e.target.value)}
          onKeyDown={handleTagKeyDown}
          onDelete={handleTagDelete}
        />
      </form>
    </div>
  );
}
