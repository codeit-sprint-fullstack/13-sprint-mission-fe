import { useState, useEffect } from "react";
import "./App.css";
import { useAsync } from "./hooks/useAsync";
import { getProducts } from "./api/api";
import { useWindowSize } from "./hooks/useWindowSize";
import Header from "./components/header";
import Footer from "./components/footer";
import ProductAdd from "./ProductAdd";

function App() {
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  
  // 🟢 화면 전환을 제어하는 스위치
  const [showAddPage, setShowAddPage] = useState(false);

  const windowWidth = useWindowSize();
  let pageSize = 10;
  if (windowWidth <= 767) { pageSize = 4; } 
  else if (windowWidth <= 1199) { pageSize = 6; }

  useEffect(() => { setPage(1); }, [keyword, orderBy, pageSize]);

  // 데이터 로딩 로직 (기존과 동일)
  const { data: bestData, pending: bestPending, error: bestError } = useAsync(() => getProducts("?orderBy=favorite&pageSize=4"), []);
  const { data: allData, pending: allPending, error: allError } = useAsync(() => getProducts(`?orderBy=${orderBy}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`), [orderBy, keyword, page, pageSize]);

  const bestProducts = bestData?.list || [];
  const allProducts = allData?.list || [];
  const totalCount = allData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(inputValue);
  };

  const PAGE_GROUP_SIZE = 5;
  const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
  let startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  let endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages === 0 ? 1 : totalPages);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) { pageNumbers.push(i); }

  return (
    <>
      {/* 1️⃣ 헤더는 항상 보여줌 */}
      <Header />

      {/* 2️⃣ 스위치 상태에 따라 본문만 교체 */}
      {showAddPage ? (
        /* 등록 페이지가 켜졌을 때 */
        <ProductAdd onBack={() => setShowAddPage(false)} />
      ) : (
        /* 등록 페이지가 꺼졌을 때 (기존 목록 화면) */
        <main className="container">
          <section style={{ marginBottom: "60px" }}>
            <h2>베스트 상품</h2>
            {/* ... 베스트 상품 리스트 로직 ... */}
            <div className="best-grid">
              {bestProducts.map((p) => <div key={p.id} className="card-placeholder">{p.name}</div>)}
            </div>
          </section>

          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0 }}>판매 중인 상품</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="검색할 상품을 입력해주세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ width: "325px", height: "42px", padding: "8px", borderRadius: "8px", border: "1px solid #ccc", marginRight: "8px" }}
                  />
                </form>
                
                {/* 🔵 클릭 시 등록 페이지 스위치 ON */}
                <button
                  type="button"
                  onClick={() => setShowAddPage(true)}
                  style={{ cursor: "pointer", display: "flex", height: "42px", padding: "12px 23px", justifyContent: "center", alignItems: "center", borderRadius: "8px", background: "#3692FF", color: "#ffffff", border: "none" }}
                >
                  상품 등록하기
                </button>
              </div>
            </div>
            {/* ... 판매 상품 리스트 및 페이지네이션 로직 ... */}
            <div className="all-grid">
              {allProducts.map((p) => <div key={p.id} className="card-placeholder">{p.name}</div>)}
            </div>
          </section>
        </main>
      )}

      {/* 3️⃣ 풋터도 항상 보여줌 */}
      <Footer />
    </>
  );
}

export default App;