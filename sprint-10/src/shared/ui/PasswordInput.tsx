import Image from "next/image";
import type { ChangeEvent, FocusEvent } from "react";
import EyeOffImg from "@/assets/png/img_visibility_off.png";
import EyeOnImg from "@/assets/png/img_visibility_on.png";

type PasswordInputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  show: boolean;
  onToggle: () => void;
};

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  show,
  onToggle,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"}
      >
        <Image
          src={show ? EyeOnImg : EyeOffImg}
          alt={show ? "비밀번호 숨기기" : "비밀번호 표시"}
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}
