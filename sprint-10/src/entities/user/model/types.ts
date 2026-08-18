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

// /auth/signIn 응답: accessToken만 내려오고 유저 정보는 별도로 /users/me를 호출해야 한다.
export type LoginResponse = {
  accessToken: string;
};
