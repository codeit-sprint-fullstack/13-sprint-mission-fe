import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("잘못된 이메일입니다."),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
    password: z.string().min(8, "비밀번호를 8자 이상 입력해주세요"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email("잘못된 이메일입니다."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});
