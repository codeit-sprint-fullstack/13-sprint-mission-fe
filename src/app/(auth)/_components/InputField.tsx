"use client";

import type { ChangeEventHandler, FocusEventHandler } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
}

export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: InputFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2 md:gap-4">
      <label htmlFor={id} className="font-bold text-gray-800">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`h-14 w-full rounded-xl bg-gray-100 px-6 text-lg text-gray-800 placeholder-gray-400 outline-none ${error ? "border-error border-2" : "border-2 border-transparent"}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}