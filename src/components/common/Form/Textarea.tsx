import { clsx } from "clsx";
import type { ChangeEvent, TextareaHTMLAttributes } from "react";

import FormLabel from "@/components/common/Form/FormLabel";
import { useInputValidation } from "@/hooks/useValidators";
import type {
  FieldActiveCondition,
  FieldStatusUpdate,
  FieldValidator,
} from "@/types/form";

interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> {
  label?: string;
  onActive: (statusUpdate: FieldStatusUpdate) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validators: FieldValidator;
  active: FieldActiveCondition;
}

export default function Textarea({
  label = "",
  className = "",
  onActive,
  onChange,
  ...props
}: TextareaProps) {
  const { error, handleValidation } = useInputValidation({
    name: props.name ?? "",
    onActive,
    validators: props.validators,
    active: props.active,
  });

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
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
        <span className='inline-block ml-[16px] mt-[8px] text-[14px] font-semibold leading-[calc(24/14)] text-error-red'>
          {error}
        </span>
      )}
    </label>
  );
}
