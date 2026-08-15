import Image from "next/image";
import { forwardRef, type InputHTMLAttributes } from "react";
import EyeOffImg from "@/assets/png/img_visibility_off.png";
import EyeOnImg from "@/assets/png/img_visibility_on.png";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  show: boolean;
  onToggle: () => void;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ show, onToggle, ...rest }, ref) => {
    return (
      <div className="relative">
        <input ref={ref} type={show ? "text" : "password"} {...rest} />
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
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
