import React from "react";

const sizeClasses = {
  large: "h-14 px-31 w-full py-4 text-xl font-semibold",
  small: "h-[42px] px-[23px] py-3",
};

const variantClasses = {
  primary: "bg-brand-blue text-white",
  gray: "bg-cool-gray-400 text-cool-gray-100 ",
  white: "bg-white border-cool-gray-300 border ",
  red: "bg-error-red text-cool-gray-100",
  redOutline: "bg-cool-gray-50 border border-error-red text-error-red",
};

const roundedClasses = {
  round: "rounded-[40px]",
  square: "rounded-[8px]",
};

type ButtonSize = keyof typeof sizeClasses;
type ButtonVariant = keyof typeof variantClasses;
type ButtonRounded = keyof typeof roundedClasses;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  className?: string;
}

export default function Button({
  children,
  size = "small",
  variant = "primary",
  rounded = "round",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${roundedClasses[rounded]} ${className} flex items-center justify-center gap-2.5`}
    >
      {children}
    </button>
  );
}
