"use server";

import { API } from "@/services/apiService";

export async function createArticle({ title, content }) {
  return API.post("/articles", { title, content });
}
