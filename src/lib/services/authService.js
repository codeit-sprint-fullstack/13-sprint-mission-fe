import { clearServerSideTokens } from "@/lib/actions/auth";
import { defaultFetch } from "@/lib/services/fetchClient";

export const authService = {
  /** 쿠키 인증을 사용하는 로그인
   * - accessToken은 응답 바디에, refreshToken은 Set-Cookie 헤더로만 내려오므로 직접 파싱
   */
  signin: async (email, password) => {
    const res = await fetch(`${process.env.API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(errorBody?.message ?? "로그인에 실패했습니다");
    }

    const { accessToken, ...user } = (await res.json()).data;

    const setCookies = res.headers.getSetCookie();
    const refreshTokenCookie = setCookies.find((c) =>
      c.startsWith("refreshToken="),
    );
    const refreshToken = refreshTokenCookie?.split(";")[0].split("=")[1];

    return { user, accessToken, refreshToken };
  },

  /** 회원가입 */
  signup: async (email, nickname, password, passwordConfirmation) => {
    const { data: user } = await defaultFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        nickname,
        passwordConfirmation,
      }),
      cache: "no-store",
    });

    return { user };
  },

  // 로그아웃
  signout: () => clearServerSideTokens(),
};
