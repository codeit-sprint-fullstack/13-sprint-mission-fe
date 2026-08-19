"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import togglePasswordIcon from "@/assets/icons/btn_visibility_off.png";
import togglePasswordShowIcon from "@/assets/icons/btn_visibility_on.png";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ type, ...props }, ref) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="bg-cool-gray-100 flex h-14 w-full max-w-160 items-center gap-2.5 rounded-xl px-6 py-4">
      <input
        {...props}
        ref={ref}
        type={inputType}
        className="text-secondary-800 w-full text-lg font-normal outline-none"
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer"
        >
          <Image
            src={showPassword ? togglePasswordShowIcon : togglePasswordIcon}
            alt="비밀번호 확인 아이콘"
          />
        </button>
      )}
    </div>
  );
});

export default Input;
