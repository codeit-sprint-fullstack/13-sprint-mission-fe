import { useState, useEffect } from "react";
import "./App.css";
import { useAsync } from "./hooks/useAsync";
import { getProducts } from "./api/api";
import { useWindowSize } from "./hooks/useWindowSize";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const windowWidth = useWindowSize();
  let pageSize = 10;
  if (windowWidth <= 767) {
    pageSize = 4;
  } else if (windowWidth <= 1199) {
    pageSize = 6;
  }
  useEffect(() => {
    setPage(1);
  }, [keyword, orderBy, pageSize]);

  const {
    data: bestData,
    pending: bestPending,
    error: bestError,
  } = useAsync(() => getProducts("?orderBy=favorite&pageSize=4"), []);
  const {
    data: allData,
    pending: allPending,
    error: allError,
  } = useAsync(
    () =>
      getProducts(
        `?orderBy=${orderBy}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
      ),
    [orderBy, keyword, page, pageSize],
  );
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
  let endPage = Math.min(
    startPage + PAGE_GROUP_SIZE - 1,
    totalPages === 0 ? 1 : totalPages,
  );

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />

      <main className="container">
        <section style={{ marginBottom: "60px" }}>
          <h2>베스트 상품</h2>
          {bestError ? (
            <p>베스트 상품을 불러오는데 실패했습니다.</p>
          ) : bestPending ? (
            <p>열심히 베스트 상품을 가져오는 중... 🏃‍♂️</p>
          ) : (
            <div className="best-grid">
              {bestProducts.map((product) => (
                <div key={product.id} className="card-placeholder">
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </section>
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: 0 }}>판매 중인 상품</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <form
                onSubmit={handleSearch}
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="text"
                  placeholder="검색할 상품을 입력해주세요"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{
                    width: "325px",
                    height: "42px",
                    padding: "8px",
                    marginRight: "8px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    cursor: "pointer",
                    display: "flex'",
                    height: "42px",
                    padding: "12px 23px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "8px",
                    background: "var(--Primary-100, #3692FF)",
                    color: "#ffffff",
                  }}
                >
                  상품 등록하기
                </button>
              </form>
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                style={{
                  height: "42px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
            </div>
          </div>
          {allError ? (
            <p>판매 중인 상품을 불러오는데 실패했습니다.</p>
          ) : allPending ? (
            <p>열심히 판매 중인 상품을 가져오는 중... 🏃‍♂️</p>
          ) : (
            <>
              <div className="all-grid">
                {allProducts.map((product) => (
                  <div key={product.id} className="card-placeholder">
                    {product.name}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "30px",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  style={{
                    padding: "8px 12px",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    backgroundColor: "#ffffff",
                    boarder: "1px solid #ccc",
                    borderRadius: "50%",
                  }}
                >
                  &lt;
                </button>

                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    style={{
                      padding: "8px 14px",
                      cursor: "pointer",
                      borderRadius: "50%",
                      border:
                        page === num ? "2px solid #374151" : "1px solid #ccc",
                      fontWeight: page === num ? "bold" : "normal",
                      backgroundColor: page === num ? "#3692FF" : "white",
                      color: "#374151",
                    }}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages || totalPages === 0}
                  style={{
                    padding: "8px 12px",
                    cursor:
                      page === totalPages || totalPages === 0
                        ? "not-allowed"
                        : "pointer",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                  }}
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </section>
        <div className="pagination">page</div>
      </main>

      <Footer />
    </>
  );
}

export default App;
