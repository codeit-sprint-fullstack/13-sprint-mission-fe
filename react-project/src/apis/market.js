import { authAxios } from "@/apis";
const ENDPOINT = "/products";

export const getProduct = async (params) => {
  const res = await authAxios.get(`${ENDPOINT}?${new URLSearchParams(params)}`);
  return res.data;
};
export const postProduct = async (data) => {
  const res = await authAxios.post(`${ENDPOINT}`, data);
  return res.data;
};
