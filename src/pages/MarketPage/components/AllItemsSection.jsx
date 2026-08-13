import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct, getProducts } from "../../../api/products";
import ItemCard from "./ItemCard";
import DropdownMenu from "../../../components/UI/DropdownMenu";
import PaginationBar from "../../../components/UI/PaginationBar";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import { ReactComponent as Spinner } from "../../../assets/images/ui/spinner.svg";
import styled from "styled-components";
import useResponsivePageSize from "../../../hooks/useResponsivePageSize";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const StyledSpinner = styled(Spinner)`
  width: 64px;
  height: 64px;
  color: ${({ theme }) => theme.colors.gray[1]};
`;

function AllItemsSection() {
  const queryClient = useQueryClient();
  const pageSize = useResponsivePageSize();
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["products", page, pageSize, orderBy, keyword],
    queryFn: () =>
      getProducts({
        orderBy,
        page,
        pageSize,
        keyword,
      }),
    placeholderData: keepPreviousData, // 페이지 이동시 데이터 유지
    refetchInterval: 60 * 1000, // 1분마다 데이터를 새로 받아온다
  });

  useEffect(() => {
    if (!data || page * pageSize >= data.totalCount) return;
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["products", nextPage, pageSize, orderBy, keyword],
      queryFn: () => getProducts({ orderBy, page: nextPage, pageSize, keyword }),
    });
  }, [data, keyword, orderBy, page, pageSize, queryClient]);

  useEffect(() => setPage(1), [pageSize]);

  const prefetchProduct = (productId) => queryClient.prefetchQuery({
    queryKey: ["products", String(productId)],
    queryFn: () => getProduct(productId),
  });

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    /*
      검색어와 함께 없는 페이지를 요청하는 경우가 있으므로 무조건 1 페이지로 옮긴다
    */
    setPage(1);
  };

  return (
    <div className="allItemsContainer">
      <div className="allItemsSectionHeader">
        <h2 className="sectionTitle">판매 중인 상품</h2>
        <Link to="/registration" className="loginLink button">
          상품 등록하기
        </Link>
      </div>

      <div className="allItemsSectionHeader">
        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={handleSearch}
          />
        </div>
        <DropdownMenu onSortSelection={setOrderBy} />
      </div>

      {!data && isFetching && ( // 처음 로딩할 때만 스피너 보여주기
        <SpinnerContainer>
          <StyledSpinner />
        </SpinnerContainer>
      )}
      {data && (
        <>
          <div className="allItemsCardSection">
            {data.list.map((item) => (
              <Link
                key={`market-item-${item.id}`}
                to={`/items/${item.id}`}
                onMouseEnter={() => prefetchProduct(item.id)}
                onFocus={() => prefetchProduct(item.id)}
              >
                <ItemCard item={item} />
              </Link>
            ))}
          </div>

          <div className="paginationBarWrapper">
            <PaginationBar
              totalPageNum={Math.ceil(data.totalCount / pageSize)}
              activePageNum={page}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default AllItemsSection;
