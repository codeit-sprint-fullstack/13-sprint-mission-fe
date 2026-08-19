import { z } from "zod";

export const registerPostSchema = z.object({
  title: z.string().min(1, "게시글의 제목은 1자 이상이어야 합니다"),
  content: z.string().min(5, "게시글 내용은 5자 이상이어야 합니다"),
});

export type RegisterPostFormData = z.infer<typeof registerPostSchema>;

export const editPostSchema = registerPostSchema.partial();

export type EditPostFormData = z.infer<typeof editPostSchema>;
