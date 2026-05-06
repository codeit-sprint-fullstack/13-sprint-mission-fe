import { authAxios } from "@/apis";
const ENDPOINT = "/products";

export const getProduct = async (params) => {
  const res = await authAxios.get(`${ENDPOINT}?${new URLSearchParams(params)}`);
  return res.data;
};
