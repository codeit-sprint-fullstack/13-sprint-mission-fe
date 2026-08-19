import z from "zod";

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;

const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요")
  .pipe(z.email("이메일 형식을 지켜주세요."));

const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(
    passwordRegex,
    "영문 대소문자, 숫자, 특수문자(!@#$%^&*)만 사용 가능합니다.",
  );

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: emailSchema,

    nickname: z
      .string()
      .min(1, "닉네임은 1자 이상이어야 합니다.")
      .max(20, "닉네임은 최대 20자까지 가능합니다."),

    password: passwordSchema,

    passwordConfirmation: z.string().min(1, "비밀번호 확인을 입력해 주세요"),
  })

  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
