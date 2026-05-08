const validators = {
  name(value) {
    if (!value.trim()) return "상품명을 입력해 주세요.";
    if (value.trim().length > 10) return "상품명은 10자 이내로 입력해 주세요.";
    return "";
  },
  description(value) {
    const length = value.trim().length;
    if (length < 10) return "상품 소개는 10자 이상 입력해 주세요.";
    if (length > 100) return "상품 소개는 100자 이내로 입력해 주세요.";
    return "";
  },
  price(value) {
    if (!value.trim()) return "판매 가격을 입력해 주세요.";
    if (!/^\d+$/.test(value.trim()))
      //완전 숫자만 표현하는 정규식 소수점도 막아줌.
      return "판매 가격은 숫자로만 입력해 주세요.";
    return "";
  },
  tags(tags) {
    const invalidTag = tags.find((tag) => tag.length > 5);
    if (invalidTag) return "태그는 5글자 이내로 입력해 주세요.";
    return "";
  },
  image(image) {
    if (!image) return "상품 이미지를 업로드해 주세요.";

    if (typeof image === "string") {
      const trimmedImage = image.trim();
      if (!trimmedImage) return "상품 이미지를 업로드해 주세요.";
      try {
        new URL(trimmedImage);
        return "";
      } catch {
        return "올바른 이미지 URL을 입력해 주세요.";
      }
    }

    const file = image;
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return "이미지 파일은 JPG, PNG, GIF만 가능합니다.";
    }
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return "이미지 파일 크기는 2MB 이내여야 합니다.";
    }
    return "";
  },
};

export default function useProductValidation(form) {
  const errors = {
    name: validators.name(form.name),
    description: validators.description(form.description),
    price: validators.price(form.price),
    tags: validators.tags(form.tags),
    image: validators.image(form.image),
  };

  const isValid = Object.values(errors).every((error) => !error);
  const isFilled =
    form.name.trim() &&
    form.description.trim() &&
    form.price.trim() &&
    form.tags.length > 0 &&
    form.image;

  return {
    errors,
    canSubmit: Boolean(isFilled && isValid),
  };
}
