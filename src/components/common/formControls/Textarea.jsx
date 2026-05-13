import React from "react";

import FormLabel from "@/components/common/formControls/FormLabel";

import { useInputValidation } from "@/hooks/useValidators";

import styles from "./Textarea.module.css";

export default function Textarea({
  label = "",
  className = "",
  onActive,
  ...props
}) {
  // 유효성 검사 커스텀 훅: 에러 메시지와 검증 함수를 반환
  const { error, handleValidation } = useInputValidation({
    name: props.name,
    onActive,
    validators: props.validators,
    active: props.active,
  });

  function handleChange(e) {
    handleValidation(e.target.value);
  }

  return (
    <label className={error ? styles.error : ""}>
      {label && <FormLabel label={label} />}
      <textarea
        className={`${styles.textarea} ${className}`}
        {...props}
        onChange={(e) => handleChange(e)}
      />
      {error && <span className={styles.message}>{error}</span>}
    </label>
  );
}
