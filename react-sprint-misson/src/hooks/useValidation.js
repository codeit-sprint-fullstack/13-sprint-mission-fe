import { useState } from "react";

export function useValidation(rules) {
  const [errors, setErrors] = useState({});

  function handleCheckValid(e) {
    const { name, value } = e.target;
    const rule = rules[name];
    if (!rule) return;

    let errorMsg = "";

    if (value.trim() === "") {
      clearError(name);
      return;
    }

    if (rule.min && value.length < rule.min) {
      errorMsg = `${rule.min}자 이상 입력해주세요.`;
    }

    if (rule.max && value.length > rule.max) {
      errorMsg = `${rule.max}자 이내로 입력해주세요.`;
    }

    if (rule.validate) {
      errorMsg = rule.validate(value) ?? "";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  function clearError(name) {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return { errors, handleCheckValid, setErrors };
}
