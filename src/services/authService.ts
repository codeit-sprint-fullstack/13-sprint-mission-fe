import { SignInFormData, SignUpFormData } from "@/schemas/authSchema";
import { cookieFetch, defaultFetch } from "./fetchClient";
import {
  AUTH_ENDPOINT,
  SIGNIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "@/constants/endpoint";

export const authService = {
  register: (data: SignUpFormData) =>
    defaultFetch(`${AUTH_ENDPOINT}${SIGNUP_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: SignInFormData) =>
    cookieFetch(`${AUTH_ENDPOINT}${SIGNIN_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  //TODO: logout api 구현시 주석 해제
  // logout: () =>
  //   cookieFetch(`${AUTH_ENDPOINT}${LOGOUT_ENDPOINT}`, {
  //     method: "DELETE",
  //   }),
};
