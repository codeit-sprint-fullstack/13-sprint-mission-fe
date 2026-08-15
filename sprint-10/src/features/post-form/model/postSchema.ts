import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "제목을 입력해주세요.")
    .max(10, "제목은 10글자 이하로 입력해주세요."),
  content: z
    .string()
    .trim()
    .min(10, "내용은 10글자 이상 입력해주세요.")
    .max(100, "내용은 100글자 이하로 입력해주세요."),
});

export type PostValues = z.infer<typeof postSchema>;
