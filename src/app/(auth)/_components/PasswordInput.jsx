'use client';

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function PasswordInput({
  label,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2 w-full md:gap-4">
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
        className={`w-full h-14 px-6 rounded-xl text-lg bg-gray-100 text-gray-800 placeholder-gray-400 outline-none ${error ? 'border-2 border-error' : 'border-2 border-transparent'}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-6 top-1/2 -translate-y-1/2"
      >
        {showPassword ? <AiOutlineEye size={24} /> : <AiOutlineEyeInvisible size={24} />}
      </button>
      </div>
           {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
