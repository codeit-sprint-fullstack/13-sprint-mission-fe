import { useEffect, useState } from "react";
import "./Items.css";
import { BASE_URL } from "../../api.js";
import { useNavigate } from "react-router";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const LIMIT = 10;
  const totalPage = Math.ceil(totalCount / LIMIT);
  // const pages = Array.from({ length: totalPage }, (_, i) => i + 1); 페이지그룹써서 이제안씀
  const [pageGroup, setPageGroup] = useState(1);
  const viewPages = 5;
  const startPage = (pageGroup - 1) * viewPages + 1;
  const endPage = Math.min(startPage + viewPages - 1, totalPage);
  const presentPageGroup = Array.from(
    { length: Math.min(viewPages, endPage - startPage + 1) },
    (_, i) => startPage + i,
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `${BASE_URL}?keyword=${search}&sort=${sort}&page=${page}&limit=${LIMIT}`,
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalCount(data.totalCount); // 여기 마지막으로 수정함 이제 백에서 {products,totalCount} 이렇게 줌
    };
    fetchProducts();
  }, [page, search, sort]);

  return (
    <div>
      {/* 밑이 상단검색버튼영역 */}
      <div>
        <span>판매 중인 상품</span>
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
            setPageGroup(1);
          }}
        />
        <button onClick={() => navigate("/registration")}>상품 등록하기</button>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">기본순</option>
          <option value="recent">최신순</option>
        </select>
      </div>
      <div>
        {/* 상품목록 */}
        {products.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      {/* 밑이 페이지네이션 */}
      <div>
        <button
          onClick={() => {
            if (pageGroup !== 1) {
              setPageGroup((prev) => prev - 1);
              setPage(startPage - viewPages);
            }
          }}
        >
          {"<"}
        </button>
        {presentPageGroup.map((page) => (
          <button key={page} onClick={() => setPage(page)}>
            {page}
          </button>
        ))}
        <button
          onClick={() => {
            if (endPage < totalPage) {
              setPageGroup((prev) => prev + 1);
              setPage(startPage + viewPages);
            }
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
