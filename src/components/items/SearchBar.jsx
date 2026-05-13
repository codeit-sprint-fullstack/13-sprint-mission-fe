import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  // value는 "타이핑 중인 입력값" (자기 안에서 관리).
  // 부모에게는 Enter 누른 시점(submit)에만 onSearch로 알림.
  // 만약 매 키입력마다 부모 state를 바꿨다면 → API가 글자마다 호출돼서 낭비.
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    // 폼 안의 input에서 Enter 누르면 자동으로 submit 트리거됨.
    // preventDefault 안 하면 브라우저가 페이지 새로고침 시도 → React state 다 날아감.
    // 폼 다룰 때 거의 항상 첫 줄에 적는 패턴.
    e.preventDefault();
    const trimmed = value.trim(); // 양쪽 공백 제거
    if (!trimmed) return; // 정말 빈 문자열이면 무시
    // trim(): 양 끝 공백 제거. "  " 같은 의미 없는 검색 방지.
    // 빈 문자열은 getProducts에서 URL에 포함 안 시키니 안전.
    onSearch(value.trim());
  }

  return (
    // form으로 감싸면 input의 Enter 키가 자동으로 onSubmit 트리거.
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* controlled input 패턴: value와 onChange를 함께 사용.
          state가 input의 진짜 값이고, input은 그걸 화면에 표시할 뿐. */}
      <input
        type="text"
        className={styles.input}
        placeholder="검색할 상품을 입력해주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
