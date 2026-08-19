export interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AuthUser = Pick<User, "id" | "email" | "nickname" | "image">;

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}