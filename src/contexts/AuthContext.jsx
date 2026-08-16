import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn as requestSignIn, signUp as requestSignUp, getMe } from "../api/auth";
import { clearTokens, getTokens, setTokens } from "../utils/authToken";

const AuthContext = createContext(null);

// OAuth 콜백의 토큰을 저장한 뒤 주소에서 쿼리 스트링을 제거한다.
function useTokensFromParams(onTokensReceived) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('at') && searchParams.has('rt')) {
      setTokens({ accessToken: searchParams.get('at'), refreshToken: searchParams.get('rt') });
      onTokensReceived();
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.search, navigate, onTokensReceived]);
}

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [hasAccessToken, setHasAccessToken] = useState(
    () => Boolean(getTokens().accessToken)
  );

  const handleTokensReceived = useCallback(() => setHasAccessToken(true), []);
  useTokensFromParams(handleTokensReceived);

  const { data: user, isPending, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    enabled: hasAccessToken,
  });

  useEffect(() => {
    if (!isError) return;
    clearTokens();
    setHasAccessToken(false);
    queryClient.removeQueries({ queryKey: ["me"] });
  }, [isError, queryClient]);

  const handleAuthSuccess = useCallback(
    ({ user: authenticatedUser }) => {
      setHasAccessToken(true);
      queryClient.setQueryData(["me"], authenticatedUser);
    },
    [queryClient]
  );

  const signupMutation = useMutation({
    mutationFn: requestSignUp,
    onSuccess: handleAuthSuccess,
  });
  const signinMutation = useMutation({
    mutationFn: requestSignIn,
    onSuccess: handleAuthSuccess,
  });

  const signup = useCallback(
    (formData) => signupMutation.mutateAsync(formData),
    [signupMutation]
  );

  const signin = useCallback(
    (formData) => signinMutation.mutateAsync(formData),
    [signinMutation]
  );

  const signout = useCallback(() => {
    clearTokens();
    setHasAccessToken(false);
    queryClient.removeQueries({ queryKey: ["me"] });
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user: hasAccessToken ? user ?? null : null,
        signup,
        signin,
        signout,
        isLoading: hasAccessToken && isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
}
