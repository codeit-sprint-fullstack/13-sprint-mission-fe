import { Link } from "react-router-dom";
import { useState } from "react";
import useResponsivePageSize from "../../hooks/useResponsivePageSize";
import ProductCard from "./ProductCard";
import Dropdown from "../common/Dropdown";
import Pagination from "../common/Pagination";
import SearchBar from "./SearchBar";
import styles from "./AllProducts.module.css";
import useProducts from "../../hooks/useProducts";

// 컴포넌트 외부 상수: 매 렌더마다 새로 만들지 않게.
// 드롭다운 옵션은 변하지 않으니 밖에 두는 게 효율적.
const SORT_OPTIONS = [{ value: "recent", label: "최신순" }];

export default function AllProducts() {
  // 커스텀 hook: 화면 너비에 따라 pageSize가 바뀜 (10/6/4).
  // 그냥 일반 변수처럼 쓰지만 내부적으론 state라서 너비 변경 시 리렌더됨.
  const pageSize = useResponsivePageSize();
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  // 한 줄로 fetch 끝. 자동으로 의존성 변경 시 재호출 + race condition 방어
  const {
    list: products,
    totalCount,
    isLoading,
    error,
  } = useProducts({
    page,
    pageSize,
    orderBy,
    keyword,
  });
  // 매 렌더마다 새로 계산. totalCount나 pageSize가 바뀌면 자동으로 갱신됨.
  // useState로 따로 관리할 필요 없음 (파생값이라 그냥 변수로).
  const totalPages = Math.ceil(totalCount / pageSize);

  // render 중 조정 - React가 알아서 즉시 새 값으로 다시 그림
  // effect보다 빠르고 React 공식 권장 패턴
  if (totalPages > 0 && page > totalPages) {
    setPage(totalPages);
  }

  // 정렬/검색 바뀌면 1페이지로 리셋.
  // 이유: 5페이지에서 검색했는데 결과가 2페이지뿐이면 빈 화면 보임.
  // useEffect 안에서 처리하지 않고 핸들러에서 명시적으로 처리하는 게 흐름이 명확.
  function handleSortChange(value) {
    setOrderBy(value);
    setPage(1);
  }

  function handleSearch(value) {
    setKeyword(value);
    setPage(1);
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>판매 중인 상품</h2>
        {/* SearchBar는 자식이 입력값을 관리하다가, Enter 시점에만 부모에게 알림 */}
        <SearchBar onSearch={handleSearch} />
        <Link to="/registration" className={styles.registerBtn}>
          상품 등록하기
        </Link>
        {/* Dropdown은 controlled component: 현재값(value)과 변경콜백(onChange)을 부모에서 관리 */}
        <Dropdown
          value={orderBy}
          onChange={handleSortChange}
          options={SORT_OPTIONS}
        />
      </div>
      {isLoading ? (
        <p className={styles.statusMessage}>불러오는 중...</p>
      ) : error ? (
        <p className={styles.statusMessage}>
          상품을 불러오지 못했어요. 잠시 후 다시 시도해주세요
        </p>
      ) : products.length === 0 ? (
        <p className={styles.statusMessage}>
          {keyword
            ? `'${keyword}'에 대한 검색 결과가 없습니다.`
            : "등록된 상품이 없습니다."}
        </p>
      ) : (
        <ul className={styles.grid}>
          {products.map((product) => (
            // key는 안정적인 ID 사용 (index 쓰면 정렬 바뀔 때 리렌더 꼬임)
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
