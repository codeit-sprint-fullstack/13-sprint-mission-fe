"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({ error, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div
        className={`flex items-center rounded-lg border bg-[#f3f4f6] ${error ? "border-[#ef4444] bg-red-50" : "border-transparent"}`}
      >
        <input
          className="h-12 w-full flex-1 rounded-lg border-0 bg-transparent px-[18px] text-[#1f2937] outline-none"
          {...props}
          type={visible ? "text" : "password"}
        />
        <button
          className="mr-2 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full tex-gray-600"
          type="button"
          aria-label={visible ? "비밀번호 가리기" : "비밀번호 보기"}
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-[13px] font-semibold text-[#ef4444]">{error}</p>
      ) : null}
    </div>
  );
}
