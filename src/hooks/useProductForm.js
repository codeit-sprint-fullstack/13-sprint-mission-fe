import { useState } from "react";

function validate(field, value) {
  switch (field) {
    case "name":
      if (!value.trim()) return "상품명을 입력해 주세요.";
      if (value.trim().length > 10) return "상품명은 10자 이내로 입력해 주세요.";
      return "";
    case "description":
      if (!value.trim()) return "상품 소개를 입력해 주세요.";
      if (value.trim().length < 10) return "상품 소개는 10자 이상 입력해 주세요.";
      if (value.trim().length > 100) return "상품 소개는 100자 이내로 입력해 주세요.";
      return "";
    case "price":
      if (value === "" || value === null) return "판매 가격을 입력해 주세요.";
      if (isNaN(Number(value)) || Number(value) < 0) return "올바른 숫자를 입력해 주세요.";
      if (Number(value) > 2147483647) return "가격은 21억 4천만원 이하로 입력해 주세요.";
      return "";
    case "tagInput":
      if (value.trim().length > 5) return "태그는 5글자 이내로 입력해 주세요.";
      return "";
    default:
      return "";
  }
}

export function useProductForm(initial = {}) {
  const [values, setValues] = useState({
    name: initial.name ?? "",
    description: initial.description ?? "",
    price: initial.price ?? "",
    tagInput: "",
    tags: initial.tags ?? [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    tagInput: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tagInput: false,
  });

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }));
  };

  const addTag = () => {
    const err = validate("tagInput", values.tagInput);
    setErrors((prev) => ({ ...prev, tagInput: err }));
    setTouched((prev) => ({ ...prev, tagInput: true }));
    if (err) return;

    const trimmed = values.tagInput.trim();
    if (trimmed && !values.tags.includes(trimmed)) {
      setValues((prev) => ({ ...prev, tags: [...prev.tags, trimmed], tagInput: "" }));
      setErrors((prev) => ({ ...prev, tagInput: "" }));
    } else {
      setValues((prev) => ({ ...prev, tagInput: "" }));
    }
  };

  const removeTag = (tag) => {
    setValues((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const validateAll = () => {
    const newErrors = {
      name: validate("name", values.name),
      description: validate("description", values.description),
      price: validate("price", values.price),
      tagInput: "",
    };
    setErrors(newErrors);
    setTouched({ name: true, description: true, price: true, tagInput: true });
    return Object.values(newErrors).every((e) => e === "");
  };

  const isValid =
    !validate("name", values.name) &&
    !validate("description", values.description) &&
    !validate("price", values.price);

  return { values, errors, handleChange, handleBlur, addTag, removeTag, validateAll, isValid, setValues };
}
