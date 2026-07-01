"use client";

import { useState } from "react";

export default function useForm(initialValues, initialErrors) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  function resetErrors() {
    setErrors(initialErrors);
  }

  return {
    values,
    errors,
    setErrors,
    handleChange,
    resetErrors,
  };
}
