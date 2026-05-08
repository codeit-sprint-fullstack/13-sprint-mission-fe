import { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import { useValidation } from "@/hooks/useValidation";
import { useCreateProduct } from "@/hooks/useProducts";

const INITIAL_FORM = {
  productName: "",
  productDescription: "",
  productPrice: "",
};

export function useRegistrationForm() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [tagValue, setTagValue] = useState("");
  const [tagList, setTagList] = useState([]);
  const { createProduct } = useCreateProduct();

  const { errors, handleCheckValid } = useValidation({
    productName: { min: 1, max: 10 },
    productDescription: { min: 10, max: 100 },
    productPrice: {
      required: true,
      validate: (value) =>
        /^[0-9]+$/.test(value) ? "" : "숫자만 입력해주세요.",
    },
    productTags: { min: 1, max: 5 },
  });

  const isFormValid =
    formValues.productName.trim() !== "" &&
    formValues.productDescription.trim() !== "" &&
    formValues.productPrice.trim() !== "";

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleTagKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (tagValue.trim() === "" || tagValue.length > 5)
      return handleCheckValid(e);
    setTagList((prev) => [
      ...prev,
      {
        id: nanoid(),
        value: tagValue.includes("#") ? tagValue : "#" + tagValue,
      },
    ]);
    setTagValue("");
  }

  function handleTagDelete(id) {
    setTagList((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createProduct({
        name: formValues.productName,
        description: formValues.productDescription,
        price: Number(formValues.productPrice),
        tags: tagList.map((t) => t.value),
      });
      alert("상품이 등록되었습니다!");
      setFormValues(INITIAL_FORM);
      setTagList([]);
      setTagValue("");
    } catch {
      alert("등록에 실패했습니다.");
    }
  }

  return {
    formValues,
    tagValue,
    tagList,
    errors,
    isFormValid,
    handleFormChange,
    handleCheckValid,
    handleTagKeyDown,
    handleTagDelete,
    setTagValue,
    handleSubmit,
  };
}
