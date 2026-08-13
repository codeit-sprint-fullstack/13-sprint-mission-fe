import { useCallback, useState } from "react";

const validators = {
  name(value) {
    const length = value.trim().length;
    return length >= 1 && length <= 10
      ? ""
      : "상품명은 1자 이상 10자 이내로 입력해 주세요.";
  },
  description(value) {
    const length = value.trim().length;
    return length >= 10 && length <= 100
      ? ""
      : "상품 소개는 10자 이상 100자 이내로 입력해 주세요.";
  },
  price(value) {
    return /^\d+$/.test(String(value)) ? "" : "판매 가격은 숫자로 입력해 주세요.";
  },
  tags(value) {
    if (!value?.length) return "태그를 한 개 이상 입력해 주세요.";
    return value.every((tag) => tag.trim().length >= 1 && tag.trim().length <= 5)
      ? ""
      : "태그는 각각 5글자 이내로 입력해 주세요.";
  },
};

export default function useProductFormValidation() {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    const message = validators[name]?.(value) ?? "";
    setErrors((previous) => ({ ...previous, [name]: message }));
    return !message;
  }, []);

  const validateForm = useCallback((values) => {
    const nextErrors = Object.fromEntries(
      Object.entries(validators).map(([name, validate]) => [name, validate(values[name])])
    );
    setErrors(nextErrors);
    return Object.values(nextErrors).every((message) => !message);
  }, []);

  return { errors, validateField, validateForm };
}
