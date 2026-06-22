export default function Input({
  prefix,
  suffix,
  multiline = false,
  className,
  ...props
}) {
  return (
    <div
      className={`flex flex-1 items-stretch bg-secondary-100 rounded-xl py-[15px] px-[16px] ${className}`}
    >
      {prefix}
      {multiline ? (
        <textarea
          {...props}
          className="flex-1 border-none outline-none bg-transparent resize-none placeholder:text-secondary-400"
        />
      ) : (
        <input
          {...props}
          className="flex-1 border-none outline-none bg-transparent placeholder:text-secondary-400 max-tablet:placeholder:text-[14px]"
        />
      )}
      {suffix}
    </div>
  );
}
