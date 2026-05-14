import { useEffect, useState } from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import { productApi } from "../../api/productApi";
import "../../styles/marketItems.css";
import Pagination from "../Pagination/Pagination";
import usePageSize from "../../hooks/usePageSize";
import { useMediaQuery } from "react-responsive";

function MarketItems() {
  const [marketProducts, setMarketProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const pageSize = usePageSize("forSale");
  const isMobileView = useMediaQuery({ maxWidth: 767 });

  const handleSortOption = (value) => {
    setSortOrder(value);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchMarketProducts = async () => {
      try {
        const data = await productApi.getProductList(
          currentPage,
          pageSize,
          sortOrder,
          debouncedSearch,
        );
        setMarketProducts(data.list);
        setTotalItems(data.totalCount);
      } catch (error) {
        console.error(`판매중인 상품 목록 조회 실패: ${error.message}`);
      }
    };
    fetchMarketProducts();
  }, [currentPage, sortOrder, debouncedSearch, pageSize]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  return (
    <section className="market-items-section">
      <div className="market-header">
        <h2 className="market-title">판매 중인 상품</h2>
        <div className="market-controls">
          <div className="search-input-wrapper">
            <img src="/ic_search.svg" alt="검색 아이콘" />
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="search-input"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <a href="#" type="button" className="btn-add-product">
            상품 등록하기
          </a>
          <div
            className="sort-dropdown-wrapper"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="sort-dropdown-current">
              {sortOrder === "recent" ? "최신순" : "좋아요순"}
            </div>
            <img
              src={isMobileView ? "/ic_sort.svg" : "/ic_arrow_down.svg"}
              alt="정렬 드롭다운"
            />
            {isDropdownOpen && (
              <ul className="sort-options-list">
                <li
                  className="sort-option"
                  onClick={() => handleSortOption("recent")}
                >
                  최신순
                </li>
                <li
                  className="sort-option"
                  onClick={() => handleSortOption("favorite")}
                >
                  좋아요순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="market-items-grid">
        {marketProducts.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        totalCount={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default MarketItems;