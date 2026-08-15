"use client";

import { clsx } from "clsx";
import Image from "next/image";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { useState } from "react";

import FormLabel from "@/components/common/Form/FormLabel";
import { useInputValidation } from "@/hooks/useValidators";
import type {
  FieldActiveCondition,
  FieldStatusUpdate,
  FieldValidator,
} from "@/types/form";

import IcVisibilityOff from "@/app/assets/ic_visibility_off.svg";
import IcVisibilityOn from "@/app/assets/ic_visibility_on.svg";

interface InputBasicProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "defaultValue"
> {
  label?: string;
  className?: string;
  defaultValue?: string;
  size?: "sm" | "md";
  onActive: (statusUpdate: FieldStatusUpdate) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  validators: FieldValidator;
  active: FieldActiveCondition;
}

export default function InputBasic({
  type = "text",
  label = "",
  className = "",
  defaultValue = "",
  size = "md",
  onActive,
  onChange,
  ...props
}: InputBasicProps) {
  const [input, setInput] = useState(defaultValue);
  const [showPassword, setShowPassword] = useState(false);

  // 유효성 검사 커스텀 훅: 에러 메시지와 검증 함수를 반환
  const { error, handleValidation } = useInputValidation({
    name: props.name ?? "",
    onActive,
    validators: props.validators,
    active: props.active,
  });

  /**
   * 인풋 값 변경 핸들러: 유효성 검사 통과 시에만 상태 업데이트
   * @param {string} value - 입력된 문자열
   */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    handleValidation(e.target.value);
    setInput(e.target.value);
    onChange?.(e);
  }

  return (
    <label
      className={clsx(
        error ? "[&_input]:border [&_input]:border-error-red" : "",
      )}
    >
      {label && <FormLabel label={label} size={size} />}

      <figure className='relative'>
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={clsx(
            "flex items-start w-full h-[56px] px-[24px] py-[16px] gap-[10px] rounded-[12px] leading-[calc(26/16)] text-secondary-800 bg-cool-gray-100 placeholder:text-secondary-400",
            className,
          )}
          {...props}
          value={input}
          onChange={handleChange}
        />

        {/* 비밀번호 인풋 예외 처리 */}
        {type === "password" && (
          <div className='absolute top-[16px] right-[24px] cursor-pointer'>
            {showPassword ? (
              <Image
                src={IcVisibilityOn}
                width={24}
                height={24}
                priority
                alt='비밀번호 보기'
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <Image
                src={IcVisibilityOff}
                width={24}
                height={24}
                priority
                alt='비밀번호 보지않기'
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
        )}
      </figure>

      {error && (
        <span className='inline-block ml-[16px] mt-[8px] text-[14px] font-semibold leading-[calc(24/14)] text-error-red'>
          {error}
        </span>
      )}
    </label>
  );
}
