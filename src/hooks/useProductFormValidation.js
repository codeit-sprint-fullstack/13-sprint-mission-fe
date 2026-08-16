import { useCallback, useState } from "react";

export const PRODUCT_PRICE_MIN = 1;
export const PRODUCT_PRICE_MAX = 2_147_483_647;

export const productValidators = {
  name(value) {
    const normalizedValue = String(value ?? "").trim();
    if (normalizedValue.length < 1 || normalizedValue.length > 10) {
      return "상품명은 1자 이상 10자 이내로 입력해 주세요.";
    }
    return /[\p{L}\p{N}]/u.test(normalizedValue)
      ? ""
      : "상품명에는 문자 또는 숫자가 포함되어야 해요.";
  },
  description(value) {
    const length = String(value ?? "").trim().length;
    return length >= 10 && length <= 100
      ? ""
      : "상품 소개는 10자 이상 100자 이내로 입력해 주세요.";
  },
  price(value) {
    const normalizedValue = String(value ?? "").trim();
    if (!/^\d+$/.test(normalizedValue)) {
      return "판매 가격은 숫자로 입력해 주세요.";
    }

    const numericValue = Number(normalizedValue);
    return Number.isSafeInteger(numericValue) &&
      numericValue >= PRODUCT_PRICE_MIN &&
      numericValue <= PRODUCT_PRICE_MAX
      ? ""
      : `판매 가격은 ${PRODUCT_PRICE_MIN.toLocaleString()}원 이상 ${PRODUCT_PRICE_MAX.toLocaleString()}원 이하로 입력해 주세요.`;
  },
  tags(value) {
    if (!value?.length) return "태그를 한 개 이상 입력해 주세요.";
    return value.every((tag) => tag.trim().length >= 1 && tag.trim().length <= 5)
      ? ""
      : "태그는 각각 5글자 이내로 입력해 주세요.";
  },
};

export function getProductFieldError(name, value) {
  return productValidators[name]?.(value) ?? "";
}

export function isProductFormValid(values) {
  return Object.entries(productValidators).every(
    ([name, validate]) => !validate(values[name])
  );
}

export default function useProductFormValidation() {
  const [errors, setErrors] = useState({});

  const clearErrors = useCallback(() => setErrors({}), []);

  const validateField = useCallback((name, value) => {
    const message = getProductFieldError(name, value);
    setErrors((previous) => ({ ...previous, [name]: message }));
    return !message;
  }, []);

  const validateForm = useCallback((values) => {
    const nextErrors = Object.fromEntries(
      Object.entries(productValidators).map(([name, validate]) => [name, validate(values[name])])
    );
    setErrors(nextErrors);
    return Object.values(nextErrors).every((message) => !message);
  }, []);

  return { errors, clearErrors, validateField, validateForm };
}
