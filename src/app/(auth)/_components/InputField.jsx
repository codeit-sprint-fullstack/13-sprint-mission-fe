'use client';

export default function InputField({ label, id, type = 'text', placeholder, value, onChange, onBlur, error }) {
  return (
    <div className="flex flex-col gap-2 w-full md:gap-4">
      <label htmlFor={id} className="font-bold text-gray-800">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full h-14 px-6 rounded-xl text-lg bg-gray-100 text-gray-800 placeholder-gray-400 outline-none ${error ? 'border-2 border-error' : 'border-2 border-transparent'}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}