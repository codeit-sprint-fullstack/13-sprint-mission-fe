import { useState } from "react";

function useRegisterForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = values.tag.trim();

      if (newTag) {
        if (newTag.length > 5) {
          setErrors({ ...errors, tag: "5글자 이내로 입력해주세요" });
          return;
        }

        if (!tags.includes(newTag)) {
          setTags([...tags, newTag]);
          setValues({ ...values, tag: "" });
          setErrors({ ...errors, tag: "" });
        }
      }
    }
  };

  const handleRemoveTag = (removeIdx) => {
    setTags(tags.filter((_, idx) => idx !== removeIdx));
  };

  const handleValidate = () => {
    const newErrors = {};

    if (!values.name || values.name.length > 10) {
      newErrors.name = "10자 이내로 입력해주세요";
    }

    if (
      !values.intro ||
      values.intro.length < 10 ||
      values.intro.length > 100
    ) {
      newErrors.intro = "10자 이상, 100자 이내로 적어주세요";
    }

    if (isNaN(Number(values.price)) || values.price <= 0) {
      newErrors.price = "숫자로 입력해주세요";
    }

    setErrors({ ...newErrors });
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    const requiredFields = {
      name: values.name,
      intro: values.intro,
      price: values.price,
    };
    const allFieldsFilled = Object.values(requiredFields).every(
      (val) => val.trim() !== "",
    );

    const hasNoErrors = Object.values(errors).every((error) => !error);

    return allFieldsFilled && hasNoErrors;
  };

  return {
    values,
    errors,
    tags,
    handleChange,
    handleKeyDown,
    handleRemoveTag,
    handleValidate,
    isDisabled: !isFormValid(),
  };
}

export default useRegisterForm;
