import { defaultAxios } from "@/apis";
const ENDPOINT = "/auth";

export const signIn = async (email, password) => {
  const res = await defaultAxios.post(`${ENDPOINT}/signIn`, {
    email,
    password,
  });
  return res.data;
};
