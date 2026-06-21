import { z } from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요.")
    .max(10, "제목은 10글자 이하로 입력해주세요."),
  content: z
    .string()
    .min(10, "내용은 10글자 이상 입력해주세요.")
    .max(100, "내용은 100글자 이하로 입력해주세요."),
});
