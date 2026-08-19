export default function Button({
  disabled,
  onClick,
  children,
}: {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`rounded-lg px-5.75 py-3 text-white font-semibold whitespace-nowrap ${disabled ? "bg-gray-400" : "bg-primary-100"} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
