export default function AuthTextField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor={name}
        className="text-[18px] font-bold leading-[26px] text-gray-800"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`h-[56px] w-full rounded-xl border bg-gray-100 px-6 text-[16px] leading-[26px] text-gray-800 outline-none placeholder:text-gray-400 ${
          error ? "border-[#F74747]" : "border-transparent"
        }`}
      />

      {error && (
        <p className="pl-4 text-[14px] font-semibold leading-6 text-[#F74747]">
          {error}
        </p>
      )}
    </div>
  );
}
