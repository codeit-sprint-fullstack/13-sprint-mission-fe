import { cn } from "@/lib/cn";
import React from "react";

export function Input({ value, onChange, className, placeholder, error }) {
  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl py-4 px-6 text-gray-400 bg-gray-100",
          className,
          error ? "border-error border-2" : "",
        )}
      />
      {/* {error && <p className="text-error mt-2">{error}</p>} */}
    </div>
  );
}

export function TextArea({ value, onChange, placeholder, error, className }) {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full min-h-[282px] rounded-xl py-4 px-6 text-gray-400 bg-gray-100",
          className,
          error ? "border-error border-2" : "",
        )}
      />
      {/* {error && <p className="text-error mt-2">{error}</p>} */}
    </div>
  );
}
