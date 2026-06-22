"use client";
import clsx from "clsx";

export default function TextField({
  title = "",
  placeholder = "",
  className = "",
  variant = "input", // 'input','textarea','comment'
  isError = false,
  errorMessage = "",
  value = "",
  onChange = () => {},
}) {
  if (variant === "input")
    return (
      <div className={clsx(className)}>
        <span
          className={clsx(
            "block mb-3 text-700-14 md:text-700-18 text-secondary-gray-800",
          )}
        >
          {title}
        </span>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className={clsx(
            "h-14 w-full px-6 py-4 text-400-16 placeholder:text-secondary-gray-400 bg-secondary-gray-100 rounded-xl",
            isError && "border-[1.3px] border-error-red",
          )}
        />
        <span
          className={clsx(
            "text-400-12 text-error-red ",
            isError ? "block" : "hidden",
          )}
        >
          {errorMessage}
        </span>
      </div>
    );
  if (variant === "textarea") {
    return (
      <div className={clsx(className)}>
        <span
          className={clsx(
            "block mb-3 text-700-14 md:text-700-18 text-secondary-gray-800",
          )}
        >
          {title}
        </span>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "h-70.5 w-full resize-none px-6 py-4 block text-400-16 placeholder:text-secondary-gray-400 bg-secondary-gray-100 rounded-xl",
            isError && "border-[1.3px] border-error-red",
          )}
        />
        <span
          className={clsx(
            "text-400-12 text-error-red ",
            isError ? "block" : "hidden",
          )}
        >
          {errorMessage}
        </span>
      </div>
    );
  }
  if (variant === "comment") {
    return (
      <div className={clsx(className)}>
        <span
          className={clsx("block mb-2.25 text-600-16 text-secondary-gray-900")}
        >
          {title}
        </span>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "h-26 w-full resize-none px-6 py-4 block text-400-16 placeholder:text-secondary-gray-400 bg-secondary-gray-100 rounded-xl",
            isError && "border-[1.3px] border-error-red",
          )}
        />
        <span
          className={clsx(
            "text-400-12 text-error-red ",
            isError ? "block" : "hidden",
          )}
        >
          {errorMessage}
        </span>
      </div>
    );
  }
  if (variant === "editComment") {
    return (
      <div className={clsx(className)}>
        <span
          className={clsx("block mb-2.25 text-600-16 text-secondary-gray-900")}
        >
          {title}
        </span>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "h-14 w-full resize-none px-6 py-4 block text-400-14 text-secondary-gray-800 placeholder:text-secondary-gray-400 bg-secondary-gray-100 rounded-xl",
            isError && "border-[1.3px] border-error-red",
          )}
        />
        <span
          className={clsx(
            "text-400-12 text-error-red ",
            isError ? "block" : "hidden",
          )}
        >
          {errorMessage}
        </span>
      </div>
    );
  }
}
