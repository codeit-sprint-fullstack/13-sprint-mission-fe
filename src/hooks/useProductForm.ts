import { useCallback, useMemo, useState } from "react";
import useProductFormValidation, {
  isProductFormValid,
} from "./useProductFormValidation";
import type { ProductFormValues } from "../types/models";

const EMPTY_PRODUCT: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  tags: [],
  images: [],
};

export default function useProductForm(initialValue: Partial<ProductFormValues> = {}) {
  const [values, setValues] = useState<ProductFormValues>({
    ...EMPTY_PRODUCT,
    ...initialValue,
  });
  const { errors, clearErrors, validateField, validateForm } =
    useProductFormValidation();

  const changeField = useCallback(
    <K extends keyof ProductFormValues>(name: K, value: ProductFormValues[K]) => {
      setValues((previous) => ({ ...previous, [name]: value }));

      if (name !== "images") {
        validateField(name, value);
      }
    },
    [validateField]
  );

  const resetForm = useCallback(
    (nextValue: Partial<ProductFormValues>) => {
      setValues({ ...EMPTY_PRODUCT, ...nextValue });
      clearErrors();
    },
    [clearErrors]
  );

  const isValid = useMemo(() => isProductFormValid(values), [values]);

  return {
    values,
    errors,
    isValid,
    changeField,
    resetForm,
    validate: () => validateForm(values),
  };
}
