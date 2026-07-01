"use client";

import Image from "next/image";
import { useState } from "react";

export default function AuthPasswordField({
  label,
  name,
  placeholder,
  value,
  error,
  onChange,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor={name}
        className="text-[18px] font-bold leading-[26px] text-gray-800"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-[56px] w-full rounded-xl border bg-gray-100 px-6 pr-14 text-[16px] leading-[26px] text-gray-800 outline-none placeholder:text-gray-400 ${
            error ? "border-[#F74747]" : "border-transparent"
          }`}
        />

        <button
          type="button"
          onClick={() => setIsVisible((prevVisible) => !prevVisible)}
          aria-label={isVisible ? `${label} 숨기기` : `${label} 보기`}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <Image
            src={
              isVisible
                ? "/images/btn_visibility_on.svg"
                : "/images/btn_visibility_off.svg"
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>

      {error && (
        <p className="pl-4 text-[14px] font-semibold leading-6 text-[#F74747]">
          {error}
        </p>
      )}
    </div>
  );
}
