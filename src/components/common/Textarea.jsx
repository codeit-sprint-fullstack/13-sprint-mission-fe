import { clsx } from "clsx";

import FormLabel from "@/components/common/FormLabel";
import { useInputValidation } from "@/hooks/useValidators";

export default function Textarea({
  label = "",
  className = "",
  onActive,
  onChange,
  ...props
}) {
  const { error, handleValidation } = useInputValidation({
    name: props.name,
    onActive,
    validators: props.validators,
    active: props.active,
  });

  function handleChange(e) {
    handleValidation(e.target.value);
    onChange?.(e);
  }

  return (
    <label>
      {label && <FormLabel label={label} />}

      <textarea
        className={clsx(
          "flex items-start w-full h-[282px] px-[24px] py-[16px] rounded-[12px] border-none bg-cool-gray-100 placeholder:leading-[calc(26/16)] placeholder:text-secondary-400",
          error ? "border border-error-red" : "",
          className,
        )}
        {...props}
        onChange={handleChange}
      />

      {error && (
        <span className='inline-block ml-[16px] mt-[8px] text-[14px] leading-[calc(24/14)] text-error-red'>
          {error}
        </span>
      )}
    </label>
  );
}
