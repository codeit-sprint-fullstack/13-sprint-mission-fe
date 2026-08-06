import { InputProps } from "@/types/input";

export default function Input({
  startAdornment,
  endAdornment,
  multiline = false,
  className,
  ...props
}: InputProps) {
  return (
    <div
      className={`flex flex-1 min-w-fit items-stretch bg-secondary-100 rounded-xl py-[15px] px-[16px] ${className}`}
    >
      {startAdornment}
      {multiline ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="flex-1 border-none outline-none bg-transparent resize-none placeholder:text-secondary-400"
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className="flex-1 border-none outline-none bg-transparent placeholder:text-secondary-400 max-tablet:placeholder:text-[14px]"
        />
      )}
      {endAdornment}
    </div>
  );
}
