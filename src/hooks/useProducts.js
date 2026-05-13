import { useEffect, useState } from "react";
import { getProducts } from "../api/products.js";

// 객체 params를 받아 상품 목록을 가져오는 hook.
// data: {list, totalCount} / isLoading: boolean / error: Error|null 반환.
export default function useProducts(params) {
  const [data, setData] = useState({ list: [], totalCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 객체 params를 의존성 배열에 직접 넣으면 매 렌더마다 새 객체로 인식돼 무한 루프.
  // JSON.stringify로 직렬화한 문자열을 의존성으로 사용.
  // 실무에선 useMemo로 params 객체 자체 안정화하는 게 더 정석.
  const key = JSON.stringify(params);

  useEffect(() => {
    // ⭐️ race condition 방어용 플래그
    // 컴포넌트가 unmount 되거나 의존성 바뀌어 effect 재실행되면 cancelled = true가 됨.
    // 이전 fetch의 응답이 늦게 도착해도 setData를 막아 화면이 덮어써지지 않게.
    let cancelled = false;

    // eslint-disable-next-line
    setIsLoading(true);
    setError(null);

    getProducts(params)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    //cleanup: 다음 effect 실행 전 또는 unmount 시 호출됨
    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { ...data, isLoading, error };
}
