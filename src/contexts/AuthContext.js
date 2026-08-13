import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn as requestSignIn, signUp as requestSignUp, getMe } from "../api/auth";
import { clearTokens, getTokens, setTokens } from "../utils/authToken";

const AuthContext = createContext({
  user: null,
  signup: ({ email, nickname, password, passwordConfirmation }) => { },
  signin: ({ email, password }) => { },
  signout: () => { },
  isLoading: false,
});

/**
 * 소셜 로그인을 한 경우, 백엔드에서는 인증 토큰을 쿼리 스트링에 담아서 리다이렉트해 줍니다.
 * 쿼리 스트링으로 받은 Access Token과 Refresh Token을 로컬스토리지에 저장하고
 * 쿼리 스트링을 지운 주소로 이동한다.
 */
function useTokensFromParams() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('at') && searchParams.has('rt')) {
      setTokens({ accessToken: searchParams.get('at'), refreshToken: searchParams.get('rt') });
      const newPath = location.pathname; // 현재 경로에서 쿼리 파라미터를 제외한 경로만 사용
      navigate(newPath, { replace: true }); // 새 경로로 이동
    }
  }, [location.pathname, location.search, navigate]);
}

export const AuthProvider = ({ children }) => {
  useTokensFromParams();

  const queryClient = useQueryClient();
  const hasAccessToken = Boolean(getTokens().accessToken);
  const { data: user, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await getMe();
      return user;
    },
    retry: 2,
    enabled: hasAccessToken,
  });

  const signupMutation = useMutation({
    mutationFn: requestSignUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
  const signinMutation = useMutation({
    mutationFn: requestSignIn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
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
    queryClient.removeQueries({ queryKey: ["me"] });
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout, isLoading: hasAccessToken && isPending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
