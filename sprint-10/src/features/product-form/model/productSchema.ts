import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "상품명을 입력해주세요.")
    .max(10, "상품명은 10글자 이하로 입력해주세요."),
  description: z
    .string()
    .trim()
    .min(10, "상품 소개는 10글자 이상 입력해주세요.")
    .max(100, "상품 소개는 100글자 이하로 입력해주세요."),
  price: z
    .string()
    .trim()
    .min(1, "판매가격을 입력해주세요.")
    .regex(/^[0-9,]+$/, "숫자만 입력해주세요.")
    .refine((value) => Number(value.replace(/,/g, "")) >= 0, {
      message: "판매가격은 0 이상이어야 합니다.",
    }),
});

export type ProductValues = z.infer<typeof productSchema>;
