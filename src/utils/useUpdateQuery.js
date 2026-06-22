"use client";

import { useRouter, useSearchParams } from "next/navigation.js";
import { useCallback } from "react";

export default function useUpdateQuery() {
  const router = useRouter(); //라우트에 접근할 도구
  const searchParams = useSearchParams(); //현재 url params를 읽기전용으로 복사

  //useEffect안에서 쓰이는 함수를 안정적으로 만들어줌
  //매번 새로 만드는게 아닌 함수를 기억 해놓는 것 useMemo랑 같은 맥락
  //따라서 useEffect의 dependency로 들어가도 무한 렌더링 안시킴
  return useCallback(
    (key, value) => {
      //q(key)=찻잔(value)
      const params = new URLSearchParams(searchParams); //현재 url params를 접근가능한 새 객체로 저장

      if (value)
        params.set(key, value); //검색어가 있다면 그걸로 설정
      else params.delete(key); //검색어가 없을 때 빈값 제거 'q='

      //실제 라우트를 대체
      //이동이 아니라 대체기에 뒤로가기 히스토리 과부화x
      //값이 변할 때 상단으로 스크롤 되는 것 막기
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );
}
