const BASE_URL = 'http://localhost:3000';

export const fetchClient = async (endpoint: string, options: RequestInit = {}) => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });


  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API 통신 에러가 발생했습니다.');
  }

  return response;
};