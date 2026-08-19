import type { User } from "../types/user";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getMe(token: string): Promise<User | null> {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return res.json() as Promise<User>;
}
