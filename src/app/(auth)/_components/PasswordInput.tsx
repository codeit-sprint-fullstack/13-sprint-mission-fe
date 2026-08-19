"use client";

import { useState } from "react";
import type { ChangeEventHandler, FocusEventHandler } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
}

export default function PasswordInput({
  label,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex w-full flex-col gap-2 md:gap-4">
      <label htmlFor={id} className="font-bold text-gray-800">
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`h-14 w-full rounded-xl bg-gray-100 px-6 text-lg text-gray-800 placeholder-gray-400 outline-none ${error ? "border-error border-2" : "border-2 border-transparent"}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-6 -translate-y-1/2"
        >
          {showPassword ? <AiOutlineEye size={24} /> : <AiOutlineEyeInvisible size={24} />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}