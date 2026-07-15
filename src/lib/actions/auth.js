/** Authorization Server Actions */

"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/authService";

/** accessToken/refreshToken 쿠키 조회 */
export async function getServerSideToken(type = "accessToken") {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

/** 현재 로그인한 사용자의 ID 조회 */
export async function getCurrentUserId() {
  const token =
    (await getServerSideToken("accessToken")) ??
    (await getServerSideToken("refreshToken"));

  if (!token) return null;

  try {
    return jwtDecode(token).userId ?? null;
  } catch {
    return null;
  }
}

/** 로그인/회원가입 성공 시 accessToken, refreshToken을 httpOnly 쿠키로 발급 */
export async function setServerSideTokens(accessToken, refreshToken) {
  const cookieStore = await cookies();

  // 토큰 디코딩 및 만료 시간 계산
  const accessTokenData = jwtDecode(accessToken);
  const refreshTokenData = jwtDecode(refreshToken);

  const accessTokenExpiresIn =
    accessTokenData.exp - Math.floor(Date.now() / 1000);
  const refreshTokenExpiresIn =
    refreshTokenData.exp - Math.floor(Date.now() / 1000);

  // 쿠키 설정
  cookieStore.set("accessToken", accessToken, {
    path: "/",
    maxAge: accessTokenExpiresIn,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  cookieStore.set("refreshToken", refreshToken, {
    path: "/",
    maxAge: refreshTokenExpiresIn,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}

/** accessToken 갱신 시 쿠키만 교체 */
export async function updateAccessToken(accessToken) {
  const cookieStore = await cookies();

  // 토큰 디코딩 및 만료 시간 계산
  const accessTokenData = jwtDecode(accessToken);

  const accessTokenExpiresIn =
    accessTokenData.exp - Math.floor(Date.now() / 1000);

  // 액세스 토큰만 갱신
  cookieStore.set("accessToken", accessToken, {
    path: "/",
    maxAge: accessTokenExpiresIn,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}

/** 로그아웃 시 인증 쿠키 제거 */
export async function clearServerSideTokens() {
  const cookieStore = await cookies();

  // 액세스 토큰 삭제
  cookieStore.delete("accessToken");

  // 리프레시 토큰 삭제
  cookieStore.delete("refreshToken");

  return { success: true };
}

/** 로그인 액션 */
export async function signinAction(formData) {
  const { email, password } = formData;
  const { user, accessToken, refreshToken } = await authService.signin(
    email,
    password,
  );

  if (!accessToken || !refreshToken) {
    return { success: false, error: "토큰 저장 실패" };
  }

  await setServerSideTokens(accessToken, refreshToken);
  return { success: true, userData: user };
}

/** 회원가입 액션 */
export async function signupAction(formData) {
  const { email, nickname, password, passwordConfirmation } = formData;
  const { user } = await authService.signup(
    email,
    nickname,
    password,
    passwordConfirmation,
  );

  return { success: true, userData: user };
}

/** 인증 상태를 확인
 * - 토큰 검사만, 갱신은 하지 않음 */
export async function checkAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // accessToken이 있으면 인증됨
  return !!accessToken;
}

/** 인증 상태 확인
 * - accessToken 또는 refreshToken 중 하나라도 있으면 통과 */
export async function checkAuthWithRefresh() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // accessToken 또는 refreshToken 중 하나라도 있으면 인증됨
  return !!(accessToken || refreshToken);
}
