"use client";

import { authService, getToken } from "@/lib/authService";
import type { User } from "@/lib/types";
import { userService } from "@/lib/userService";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createContext, type ReactNode, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  isAuthLoading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // 프로필은 캐시에 눌러 담지 않고 매번 서버에서 받는다.
  // staleTime 짧게 잡아 서버에서 닉네임/권한이 바뀌면 곧 반영되게 한다.
  const { data: user = null, isLoading } = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: () => (getToken() ? userService.getMe() : Promise.resolve(null)),
    retry: false,
    staleTime: 30 * 1000,
  });

  const logout = () => {
    authService.logout();
    queryClient.setQueryData(["me"], null);
  };

  const refreshUser = async () => {
    await queryClient.invalidateQueries({ queryKey: ["me"] });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthLoading: isLoading, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
