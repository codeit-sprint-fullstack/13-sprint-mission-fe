import { useCallback, useState } from "react";
import type { ProductFormValues } from "../types/models";

export const PRODUCT_PRICE_MIN = 1;
export const PRODUCT_PRICE_MAX = 2_147_483_647;

type ProductField = Exclude<keyof ProductFormValues, "images">;
type ProductErrors = Partial<Record<ProductField, string>>;
type ProductValidators = {
  [K in ProductField]: (value: ProductFormValues[K]) => string;
};

const PRODUCT_FIELDS: ProductField[] = ["name", "description", "price", "tags"];

export const productValidators: ProductValidators = {
  name(value: string) {
    const normalizedValue = String(value ?? "").trim();
    if (normalizedValue.length < 1 || normalizedValue.length > 10) {
      return "상품명은 1자 이상 10자 이내로 입력해 주세요.";
    }
    return /[\p{L}\p{N}]/u.test(normalizedValue)
      ? ""
      : "상품명에는 문자 또는 숫자가 포함되어야 해요.";
  },
  description(value: string) {
    const length = String(value ?? "").trim().length;
    return length >= 10 && length <= 100
      ? ""
      : "상품 소개는 10자 이상 100자 이내로 입력해 주세요.";
  },
  price(value: string) {
    const normalizedValue = String(value ?? "").trim();
    if (!/^\d+$/.test(normalizedValue)) {
      return "판매 가격은 숫자로 입력해 주세요.";
    }

    const numericValue = Number(normalizedValue);
    return Number.isSafeInteger(numericValue) &&
      numericValue >= PRODUCT_PRICE_MIN &&
      numericValue <= PRODUCT_PRICE_MAX
      ? ""
      : `판매 가격은 ${PRODUCT_PRICE_MIN.toLocaleString()}원 이상 ${PRODUCT_PRICE_MAX.toLocaleString()}원 이하로 입력해 주세요.`;
  },
  tags(value: string[]) {
    if (!value?.length) return "태그를 한 개 이상 입력해 주세요.";
    return value.every((tag) => tag.trim().length >= 1 && tag.trim().length <= 5)
      ? ""
      : "태그는 각각 5글자 이내로 입력해 주세요.";
  },
};

export function getProductFieldError<K extends ProductField>(
  name: K,
  value: ProductFormValues[K]
): string {
  return productValidators[name](value);
}

export function isProductFormValid(values: ProductFormValues): boolean {
  return PRODUCT_FIELDS.every(
    (name) => !getProductFieldError(name, values[name])
  );
}

export default function useProductFormValidation() {
  const [errors, setErrors] = useState<ProductErrors>({});

  const clearErrors = useCallback(() => setErrors({}), []);

  const validateField = useCallback(<K extends ProductField>(
    name: K,
    value: ProductFormValues[K]
  ): boolean => {
    const message = getProductFieldError(name, value);
    setErrors((previous) => ({ ...previous, [name]: message }));
    return !message;
  }, []);

  const validateForm = useCallback((values: ProductFormValues): boolean => {
    const nextErrors = PRODUCT_FIELDS.reduce<ProductErrors>((result, name) => {
      result[name] = getProductFieldError(name, values[name]);
      return result;
    }, {});
    setErrors(nextErrors);
    return Object.values(nextErrors).every((message) => !message);
  }, []);

  return { errors, clearErrors, validateField, validateForm };
}
