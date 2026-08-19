import { useState, useCallback, type ChangeEvent, type FocusEvent } from "react";

type ProductFormField = "name" | "description" | "price";
// 폼 필드 + 태그 입력까지 아우르는 에러 메시지 맵 (Record 유틸리티 타입)
type ProductFormErrors = Record<ProductFormField | "tag", string>;

interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

const VALIDATION_RULES: Record<ProductFormField | "tag", ValidationRule> = {
  name: {
    validate: (v) => v.length >= 1 && v.length <= 10,
    message: "상품명은 1자 이상 10자 이내로 입력해주세요.",
  },
  description: {
    validate: (v) => v.length >= 10 && v.length <= 100,
    message: "상품 소개는 10자 이상 100자 이내로 입력해주세요.",
  },
  price: {
    validate: (v) => v !== "" && !isNaN(Number(v)) && Number(v) > 0,
    message: "올바른 가격을 입력해주세요. (숫자만 가능)",
  },
  tag: {
    validate: (v) => v.length >= 1 && v.length <= 5,
    message: "태그는 5글자 이내로 입력해주세요.",
  },
};

export function useProductForm() {
  const [form, setForm] = useState<Record<ProductFormField, string>>({
    name: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState<ProductFormErrors>({
    name: "",
    description: "",
    price: "",
    tag: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const field = name as ProductFormField;
    setForm((prev) => ({ ...prev, [field]: value }));

    if (value === "") {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else {
      const rule = VALIDATION_RULES[field];
      setErrors((prev) => ({
        ...prev,
        [field]: rule && !rule.validate(value) ? rule.message : "",
      }));
    }
  }, []);

  const handleTagInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);

    if (value === "") {
      setErrors((prev) => ({ ...prev, tag: "" }));
    } else {
      const rule = VALIDATION_RULES.tag;
      setErrors((prev) => ({
        ...prev,
        tag: !rule.validate(value) ? rule.message : "",
      }));
    }
  }, []);

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      e.preventDefault();

      const trimmed = tagInput.trim();
      if (!VALIDATION_RULES.tag.validate(trimmed)) return;

      if (tags.includes(trimmed)) {
        setErrors((prev) => ({ ...prev, tag: "이미 추가된 태그입니다." }));
        return;
      }

      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
      setErrors((prev) => ({ ...prev, tag: "" }));
    },
    [tagInput, tags]
  );

  const removeTag = useCallback((tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  }, []);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      const field = name as ProductFormField;
      const value = form[field] ?? "";
      const rule = VALIDATION_RULES[field];
      if (!rule) return;
      setErrors((prev) => ({
        ...prev,
        [field]: !rule.validate(value) ? rule.message : "",
      }));
    },
    [form]
  );

  const isFormValid =
    form.name !== "" &&
    form.description !== "" &&
    form.price !== "" &&
    errors.name === "" &&
    errors.description === "" &&
    errors.price === "";

  return {
    form,
    errors,
    tags,
    tagInput,
    isFormValid,
    handleChange,
    handleBlur,
    handleTagInputChange,
    handleTagKeyDown,
    removeTag,
  };
}
