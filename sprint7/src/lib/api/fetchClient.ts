const BASE_URL = 'https://panda-market-api.vercel.app';

export const fetchClient = async (endpoint: string, options: RequestInit = {}) => {
  // 1. 브라우저 환경일 때만 localStorage에서 토큰 꺼내기
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
  }

  // 2. 기본 헤더 세팅
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 3. 토큰이 있다면 Authorization 헤더 추가
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 4. 순정 fetch 실행 (baseUrl + 우리가 넘긴 엔드포인트)
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 5. 공통 에러 처리 (선택 사항)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API 통신 에러가 발생했습니다.');
  }

  return response;
};