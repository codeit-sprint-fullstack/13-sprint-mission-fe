const variants = {
  rectangle:
    "rounded-[8px] px-[23px] py-[8px] text-[16px] font-semibold text-secondary-100 bg-primary-100",
  circle: "rounded-full border border-secondary-200 p-[12px]",
};

export default function Button({ variant, disabled, children, className, ...buttonProps }) {
  return (
    <button
      {...buttonProps}
      className={`
        text-center
        cursor-pointer
        whitespace-nowrap
        ${variants[variant]}
        ${
          disabled
            ? "bg-secondary-400 text-secondary-100 cursor-not-allowed"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
