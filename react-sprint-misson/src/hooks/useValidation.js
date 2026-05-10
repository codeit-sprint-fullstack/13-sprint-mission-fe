import { useState } from "react";

export function useValidation(rules) {
  const [errors, setErrors] = useState({});

  function getErrorMsg(rule, value) {
    if (value.trim() === "" && rule.required) return "필수 항목입니다.";
    if (rule.min && value.length < rule.min)
      return `${rule.min}자 이상 입력해주세요.`;
    if (rule.max && value.length > rule.max)
      return `${rule.max}자 이내로 입력해주세요.`;
    if (rule.validate) return rule.validate(value) ?? "";
    return "";
  }

  function handleCheckValid(e) {
    const { name, value } = e.target;
    const rule = rules[name];
    if (!rule) return;

    if (value.trim() === "") {
      clearError(name);
      return;
    }

    const errorMsg = getErrorMsg(rule, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  function validateAll(values) {
    let newErrors = {};
    let isValid = true;

    for (const name in rules) {
      const rule = rules[name];
      const value = String(values[name] ?? "");
      const errorMsg = getErrorMsg(rule, value);

      if (errorMsg) isValid = false;
      newErrors[name] = errorMsg;
    }

    setErrors(newErrors);
    return isValid;
  }

  function clearError(name) {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return { errors, handleCheckValid, setErrors, validateAll, clearError };
}
