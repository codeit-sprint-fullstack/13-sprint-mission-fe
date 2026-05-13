import styles from "./Pagination.module.css";

// 한 번에 보여줄 페이지 버튼 개수. 5로 고정 (현재 페이지 ± 2).
const VISIBLE_COUNT = 5;

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // 페이지가 1개 이하면 페이지네이션 자체가 의미 없음 → null 리턴.
  // React에서 null 리턴 = 아무것도 렌더 안 함.
  if (totalPages <= 1) return null;

  // 슬라이딩 윈도우 로직: 현재 페이지를 가운데 두고 양옆 2개씩 보이게.
  // 예: totalPages=40, currentPage=10 → [8, 9, 10, 11, 12]
  const half = Math.floor(VISIBLE_COUNT / 2); // 2

  // start: 현재 - 2. 단, 1보다 작아지지 않게 보호.
  let start = Math.max(1, currentPage - half);
  // end: start + 4. 단, totalPages 넘지 않게 보호.
  let end = Math.min(totalPages, start + VISIBLE_COUNT - 1);
  // 마지막 보정: 끝 쪽에서 윈도우가 5개 미만 되는 걸 방지.
  // 예: totalPages=40, currentPage=40이면 처음엔 start=38, end=40 (3개만).
  // 보정 후 start=36, end=40 (5개)이 됨.
  start = Math.max(1, end - VISIBLE_COUNT + 1);

  // start ~ end까지 정수 배열 만들기.
  // [start, start+1, ..., end]
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className={styles.pagination}>
      {/* 이전 버튼: 1페이지면 비활성화 (disabled 속성으로 클릭 + 키보드 모두 막힘) */}
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        ‹
      </button>
      {pages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            // 백틱 템플릿으로 두 클래스 합치기.
            // 현재 페이지면 active 클래스 추가, 아니면 빈 문자열.
            className={`${styles.page} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        );
      })}
      {/* 다음 버튼: 마지막 페이지면 비활성화 */}
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
}
