export type User = {
  id: string;
  email: string;
  nickname: string;
  image?: string | null;
};

export type AuthResult = {
  user: User;
  accessToken: string;
};
