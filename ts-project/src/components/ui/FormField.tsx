import React from "react";
import Input from "./Input";
import { FormFieldProps } from "@/types/input";

export default function FormField({
  title,
  errorMsg,
  children,
  ...inputProps
}: FormFieldProps) {
  return (
    <section>
      <h2 className="text-secondary-800 font-bold text-[18px]/[26px] mb-[12px]">
        {title}
      </h2>
      <Input {...inputProps} />
      {children}
      {errorMsg && <p className="text-error">{errorMsg}</p>}
    </section>
  );
}
