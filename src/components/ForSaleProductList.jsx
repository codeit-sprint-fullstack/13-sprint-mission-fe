import { useEffect, useState } from "react";
import { CardBox } from "./CardBox";
import { productApi } from "../api/productApi";
import searchIcon from "../assets/icons/ic_search.svg";
import dropDownIcon from "../assets/icons/ic_arrow_down.svg";
import "../styles/components/forSaleProductList.css";
import Pagination from "./Pagination";
import usePageSize from "../hooks/usePageSize";
import dropDownMobileIcon from "../assets/icons/ic_sort.svg";
import { useMediaQuery } from "react-responsive";

function ForSaleProductList() {
  const [forSaleProducts, setForSaleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = usePageSize("forSale");
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleDropdownOption = (value) => {
    setOrderBy(value);
    setIsOpen(false);
    setPage(1);
  };

  useEffect(() => {
    const fetchForSaleProducts = async () => {
      try {
        const data = await productApi.getProductList(
          page,
          pageSize,
          orderBy,
          searchTerm,
        );
        setForSaleProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error(`판매중인 상품 목록 조회 실패 ${error.message}`);
      }
    };
    fetchForSaleProducts();
  }, [page, orderBy, searchTerm, pageSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(keyword);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <section className="for-sale-product-section">
      <div className="for-sale-header">
        <h2 className="for-sale-product-title">판매 중인 상품</h2>
        <div className="for-sale-header-right-section">
          <div className="search-bar-wrapper">
            <img src={searchIcon} alt="검색 아이콘" />
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="search-bar"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <a href="#" type="button" className="product-add-button">
            상품 등록하기
          </a>
          <div
            className="orderBy-dropdown-wrapper"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="orderBy-dropdown-value">
              {orderBy === "recent" ? "최신순" : "좋아요순"}
            </div>
            <img
              src={isMobile ? dropDownMobileIcon : dropDownIcon}
              alt="드롭다운 아이콘"
            />

            {isOpen && (
              <ul className="dropdown-option">
                <li
                  className="dropdown-up"
                  onClick={() => handleDropdownOption("recent")}
                >
                  최신순
                </li>
                <li
                  className="dropdown-down"
                  onClick={() => handleDropdownOption("favorite")}
                >
                  좋아요순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="for-sale-product-grid">
        {forSaleProducts.map((forSaleProduct) => (
          <CardBox key={forSaleProduct.id} product={forSaleProduct} />
        ))}
      </div>
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  );
}

export default ForSaleProductList;
