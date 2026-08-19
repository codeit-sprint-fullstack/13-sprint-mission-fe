import { fetchInstance } from "@/lib/fetchInstance";
import type { User } from "@/types/user";

export async function getMe(): Promise<User> {
  return fetchInstance<User>("/users/me", {
    cache: "no-store",
  });
}