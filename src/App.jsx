import { useState, useEffect, useCallback } from 'react';
import { getProductList } from './services/ProductService';
import { usePageSize } from './hooks/usePageSize';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import './App.css';

const BEST_SIZE = 4;

export default function App() {
  const pageSize = usePageSize();

  const [bestList, setBestList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [loading, setLoading] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  useEffect(() => {
    getProductList({ page: 1, pageSize: BEST_SIZE, orderBy: 'favorite' })
      .then((data) => setBestList(data.list ?? []))
      .catch(console.error);
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProductList({ page: currentPage, pageSize, keyword, orderBy })
      .then((data) => {
        setProductList(data.list ?? []);
        setTotalCount(data.totalCount ?? 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage, pageSize, keyword, orderBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">🐼 판다마켓</a>
          <nav>
            <a href="#">자유게시판</a>
            <a href="/" className="active">중고마켓</a>
          </nav>
          <button className="btn-login">로그인</button>
        </div>
      </header>

      <main>
        <section className="section container">
          <div className="section-header">
            <h2>🏆 베스트 상품</h2>
          </div>
          <ul className="best-list">
            {bestList.map((product) => (
              <ProductCard key={product.id} product={product} isBest />
            ))}
          </ul>
        </section>

        <section className="section container">
          <div className="section-header">
            <h2>판매 중인 상품</h2>
            <div className="section-controls">
              <div className="search-wrap">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="검색할 상품을 입력해주세요"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <button className="btn-register">+ 상품 등록하기</button>
              <select
                className="sort-select"
                value={orderBy}
                onChange={(e) => { setOrderBy(e.target.value); setCurrentPage(1); }}
              >
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
            </div>
          </div>

          {loading ? (
            <ul className="product-list"><li className="empty">불러오는 중...</li></ul>
          ) : productList.length === 0 ? (
            <ul className="product-list"><li className="empty">검색 결과가 없습니다.</li></ul>
          ) : (
            <ul className="product-list">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
    </>
  );
}
