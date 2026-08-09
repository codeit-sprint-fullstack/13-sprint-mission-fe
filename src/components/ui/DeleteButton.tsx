export default function DeleteButton({
  className,
  ...buttonProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...buttonProps}
      className={`${className} w-[20px] h-[20px] rounded-full bg-secondary-400 text-secondary-100 flex items-center justify-center cursor-pointer`}
    >
      ×
    </button>
  );
}
