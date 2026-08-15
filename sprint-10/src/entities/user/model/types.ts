export type User = {
  id: string;
  email: string;
  nickname: string;
  image?: string | null;
};

// 상품/게시글/댓글 응답에 함께 내려오는 공개용 작성자 정보
export type PublicUser = {
  id: string;
  nickname: string;
  image: string | null;
};

export type AuthResult = {
  user: User;
  accessToken: string;
};
