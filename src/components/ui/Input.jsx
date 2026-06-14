export default function Input({
  prefix,
  suffix,
  multiline = false,
  className,
  ...props
}) {
  return (
    <div
      className={`flex items-stretch bg-secondary-100 rounded-xl py-[15px] px-[16px] ${className}`}
    >
      {prefix}
      {multiline ? (
        <textarea
          {...props}
          className="flex-1 border-none outline-none bg-none resize-none placeholder:text-secondary-400"
        />
      ) : (
        <input
          {...props}
          className="flex-1 border-none outline-none bg-none placeholder:text-secondary-400"
        />
      )}
      {suffix}
    </div>
  );
}
