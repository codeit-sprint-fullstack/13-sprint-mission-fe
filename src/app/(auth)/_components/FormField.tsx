"use client";

import Image from "next/image";
import React, { useState } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: "text" | "email" | "password";
  typetext: string;
  isPassword?: boolean;
  errorMessage?: string;
}

export default function FormField({
  id,
  type,
  typetext,
  isPassword = false,
  errorMessage,
  ...rest
}: FormFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div className="relative mb-3 flex flex-col gap-3">
      <label htmlFor={id} className="text-secondary-800 text-[18px] font-bold">
        {typetext}
      </label>
      <input
        id={id}
        type={isPasswordVisible ? "text" : type}
        className={`bg-cool-gray-100 h-14 rounded-xl border-none px-6 py-4 ${errorMessage ? "focus:outline-error-red" : "focus:outline-none"}`}
        {...rest}
      />
      {errorMessage && (
        <p className="text-error-red absolute top-25 left-5 text-[14px] font-[600]">
          {errorMessage}
        </p>
      )}
      {isPassword && (
        <button
          className="absolute right-5 bottom-4 cursor-pointer"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          type="button"
        >
          <Image
            src={
              !isPasswordVisible
                ? "/btn_visibility_off.svg"
                : "/btn_visibility_on.svg"
            }
            width={24}
            height={24}
            alt=""
          />
        </button>
      )}
    </div>
  );
}
