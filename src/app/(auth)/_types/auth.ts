export interface AuthProps {
  type: "login" | "signup";
}

export type AuthFormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export type Errors = {
  emailErr?: string;
  nicknameErr?: string;
  passwordErr?: string;
  confirmErr?: string;
};
