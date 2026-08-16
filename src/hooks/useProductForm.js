import { useCallback, useMemo, useState } from "react";
import useProductFormValidation, {
  isProductFormValid,
} from "./useProductFormValidation";

const EMPTY_PRODUCT = {
  name: "",
  description: "",
  price: "",
  tags: [],
  images: [],
};

export default function useProductForm(initialValue = EMPTY_PRODUCT) {
  const [values, setValues] = useState({ ...EMPTY_PRODUCT, ...initialValue });
  const { errors, clearErrors, validateField, validateForm } =
    useProductFormValidation();

  const changeField = useCallback(
    (name, value) => {
      setValues((previous) => ({ ...previous, [name]: value }));

      if (name !== "images") {
        validateField(name, value);
      }
    },
    [validateField]
  );

  const resetForm = useCallback(
    (nextValue) => {
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
