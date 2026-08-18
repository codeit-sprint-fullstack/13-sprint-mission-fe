import type { User } from "./user";

export interface SigninPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
}

export interface AuthContextValue {
  user: User | null;
  signup: (data: SignupPayload) => Promise<void>;
  signin: (data: SigninPayload) => Promise<void>;
  signout: () => Promise<void>;
}
