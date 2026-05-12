import { useEffect, useState } from "react";
import { CardBox } from "./CardBox";
import { productApi } from "../api/productApi";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";

import searchIcon from "../assets/icons/ic_search.svg";
import dropDownIcon from "../assets/icons/ic_arrow_down.svg";
import dropDownMobileIcon from "../assets/icons/ic_sort.svg";

import Pagination from "./Pagination";
import usePageSize from "../hooks/usePageSize";

import "../styles/forSaleProductList.css";
import useDebounce from "../hooks/useDebounce";
import { BREAKPOINTS, DEBOUNCE_DELAY } from "../constants/common";
import { ORDER_BY, ORDER_OPTIONS } from "../constants/product";

function ForSaleProductList() {
  const [forSaleProducts, setForSaleProducts] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    orderBy: ORDER_BY.RECENT,
    search: "",
    searchTerm: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = usePageSize("forSale");
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE_MAX });

  const currentOrderByLabel = ORDER_OPTIONS.find(
    (option) => option.value === params.orderBy,
  )?.label;

  const handleDropdownOption = (value) => {
    setParams((prev) => ({
      ...prev,
      orderBy: value,
      page: 1,
    }));
    setIsOpen(false);
  };

  const updateParams = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  };

  useEffect(() => {
    const fetchForSaleProducts = async () => {
      const currentPage = Number(params.page) || 1;

      try {
        const data = await productApi.getProductList({
          page: currentPage,
          pageSize,
          orderBy: params.orderBy,
          searchTerm: params.searchTerm,
        });
        setForSaleProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error(`판매중인 상품 목록 조회 실패 ${error.message}`);
      }
    };
    fetchForSaleProducts();
  }, [params.page, params.orderBy, params.searchTerm, pageSize]);

  const debouncedSearch = useDebounce(params.search, DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedSearch !== params.searchTerm) {
      setParams((prev) => ({ ...prev, searchTerm: debouncedSearch, page: 1 }));
    }
  }, [debouncedSearch]);

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
              onChange={(e) => updateParams("search", e.target.value)}
            />
          </div>
          <Link
            to="/registeration"
            type="button"
            className="product-add-button"
          >
            상품 등록하기
          </Link>
          <div
            className="orderBy-dropdown-wrapper"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="orderBy-dropdown-value">{currentOrderByLabel}</div>
            <img
              src={isMobile ? dropDownMobileIcon : dropDownIcon}
              alt="드롭다운 아이콘"
            />

            {isOpen && (
              <ul className="dropdown-option">
                {ORDER_OPTIONS.map((option) => (
                  <li
                    className={option.className}
                    key={option.value}
                    onClick={() => handleDropdownOption(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="for-sale-product-grid">
        {forSaleProducts.length > 0 ? (
          forSaleProducts.map((forSaleProduct) => (
            <CardBox key={forSaleProduct._id} product={forSaleProduct} />
          ))
        ) : (
          <div className="for-sale-product-notfound">
            검색 결과가 없습니다😥 <br />
            다른 상품을 입력해 보세요!
          </div>
        )}
      </div>
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={params.page}
        onPageChange={(newPage) => {
          updateParams("page", newPage);
        }}
      />
    </section>
  );
}

export default ForSaleProductList;
