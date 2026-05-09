import React, { useState } from "react";

import FormLabel from "@/components/common/formControls/FormLabel";
import styles from "@/components/common/formControls/InputBasic.module.css";
import { useInputValidation } from "@/hooks/useValidators";

export default function InputBasic({
  label = "",
  className = "",
  onActive,
  ...props
}) {
  const [input, setInput] = useState("");
  
  // 유효성 검사 커스텀 훅: 에러 메시지와 검증 함수를 반환
  const { error, handleValidation } = useInputValidation({
    name: props.name,
    onActive,
    validators: props.validators,
    active: props.active,
  });

  /**
   * 인풋 값 변경 핸들러: 유효성 검사 통과 시에만 상태 업데이트
   * @param {string} value - 입력된 문자열
   */
  function handleChange(value) {
    // 검증을 통과한 경우에만 화면에 입력값을 반영
    const isPassed = handleValidation(value);

    if (!isPassed) return;

    if (isPassed) {
      setInput(value);
    }
  }

  return (
    <label className={error ? styles.error : ""}>
      {label && <FormLabel label={label} />}
      <input
        className={`${styles.input} ${className}`}
        {...props}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {error && <span className={styles.message}>{error}</span>}
    </label>
  );
}
