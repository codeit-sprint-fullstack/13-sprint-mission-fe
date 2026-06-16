import { useState } from "react";

import { useInputValidation } from "@/hooks/useValidators";
import FormLabel from "@/components/common/FormLabel";
import { clsx } from "clsx";

export default function InputBasic({
  label = "",
  className = "",
  defaultValue = "",
  onActive,
  onChange,
  ...props
}) {
  const [input, setInput] = useState(defaultValue);

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
  function handleChange(e) {
    const isPassed = handleValidation(e.target.value);

    if (!isPassed) return;

    if (isPassed) {
      setInput(e.target.value);
      onChange?.(e);
    }
  }

  return (
    <label
      className={clsx(
        error ? "[&_input]:border [&_input]:border-error-red" : "",
      )}
    >
      {label && <FormLabel label={label} />}

      <input
        className={clsx(
          "flex items-start w-full h-[56px] px-[24px] py-[16px] gap-[10px] rounded-[12px] leading-[calc(26/16)] text-secondary-800 bg-cool-gray-100 placeholder:text-secondary-400",
          className,
        )}
        {...props}
        value={input}
        onChange={handleChange}
      />

      {error && (
        <span className='inline-block ml-[16px] mt-[8px] text-[14px] leading-[calc(24/14)] text-error-red'>
          {error}
        </span>
      )}
    </label>
  );
}
