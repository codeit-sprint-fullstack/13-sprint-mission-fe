"use client";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Eye from "../../../public/svg/eye.svg";
import Eyeoff from "../../../public/svg/eyeoff.svg";
import { useState } from "react";

export function InputWithLabel({
  label,
  placeHolder,
  type = "text",
  value,
  onChange,
  error,
  className,
  ...rest
}) {
  return (
    <div>
      {label && (
        <div className="font-[Pretendard] text-[14px] font-bold tablet:text-[18px] ">
          {label}
        </div>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        className={cn(
          "w-full rounded-xl py-4 px-6 mt-2 tablet:mt-4 placeholder:text-gray-400 text-[16px] text-gray-800 bg-gray-100 focus:outline-none focus:border-[#3692FF] border border-gray-50",
          className,
          error ? "border-error border focus:ring-error" : "",
        )}
        {...rest}
      />
      {error && (
        <div className="pl-4 mt-2 text-sm font-semibold text-error">
          {error}
        </div>
      )}
    </div>
  );
}

export function PassWordWithLabel({
  label,
  placeHolder,
  value,
  onChange,
  error,
  className,
  ...rest
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label && (
        <div className="font-[Pretendard] text-[14px] font-bold tablet:text-[18px]">
          {label}
        </div>
      )}
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full rounded-xl py-4 px-6 pr-14 mt-2 tablet:mt-4 placeholder:text-gray-400 text-[16px] text-gray-800 bg-gray-100 focus:outline-none focus:border-[#3692FF] border border-gray-50",
            className,
            error ? "border-error border focus:ring-error" : "",
          )}
          {...rest}
        />

        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
          className="absolute right-6 top-1/2 mt-1 tablet:mt-2 -translate-y-1/2"
        >
          {visible ? (
            <Image
              src={Eye}
              width={24}
              height={24}
              alt=""
              className="w-6 h-6"
            />
          ) : (
            <Image
              src={Eyeoff}
              width={21}
              height={19}
              alt=""
              className="w-6 h-6"
            />
          )}
        </button>
      </div>
      {error && (
        <div className="pl-4 mt-2 text-sm font-semibold text-error">
          {error}
        </div>
      )}
    </div>
  );
}

export function TextAreaWithLabel({
  label,
  placeholder,
  value,
  onChange,
  error,
  className,
  ...rest
}) {
  return (
    <div>
      {label && (
        <div className="font-[Pretendard] text-[14px] font-bold tablet:text-[18px] ">
          {label}
        </div>
      )}

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={cn(
          "w-full h-32.25 rounded-xl py-4 px-6 mt-2 tablet:mt-4 placeholder:text-gray-400 placeholder:text-sm text-base/6 text-gray-800 bg-gray-100 focus:outline-none focus:border-[#3692FF] border border-gray-50",
          className,
          error ? "border-error border focus:ring-error" : "",
        )}
        {...rest}
      />
      {error && (
        <div className="pl-4 mt-2 text-sm font-semibold text-error">
          {error}
        </div>
      )}
    </div>
  );
}
