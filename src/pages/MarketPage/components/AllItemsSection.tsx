import { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct, getProducts } from "../../../api/products";
import ItemCard from "./ItemCard";
import DropdownMenu from "../../../components/UI/DropdownMenu";
import PaginationBar from "../../../components/UI/PaginationBar";
import SearchIcon from "../../../assets/images/icons/ic_search.svg?react";
import Spinner from "../../../assets/images/ui/spinner.svg?react";
import styled from "styled-components";
import useResponsivePageSize from "../../../hooks/useResponsivePageSize";
import type { SortOrder } from "../../../types/models";

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
  const [orderBy, setOrderBy] = useState<SortOrder>("recent");
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

  const prefetchProduct = (productId: number) => queryClient.prefetchQuery({
    queryKey: ["products", String(productId)],
    queryFn: () => getProduct(productId),
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    /*
      검색어와 함께 없는 페이지를 요청하는 경우가 있으므로 무조건 1 페이지로 옮긴다
    */
    setPage(1);
  };

  const handleSort = (nextOrderBy: SortOrder) => {
    setOrderBy(nextOrderBy);
    setPage(1);
  };

  return (
    <div className="allItemsContainer">
      <div className="allItemsToolbar">
        <h2 className="sectionTitle">판매 중인 상품</h2>
        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={keyword}
            onChange={handleSearch}
          />
        </div>
        <Link to="/registration" className="loginLink button">
          상품 등록하기
        </Link>
        <DropdownMenu value={orderBy} onSortSelection={handleSort} />
      </div>

      {!data && isFetching && ( // 처음 로딩할 때만 스피너 보여주기
        <SpinnerContainer>
          <StyledSpinner />
        </SpinnerContainer>
      )}
      {data && (
        <>
          {data.list.length > 0 ? (
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
          ) : (
            <p className="emptyItemsMessage">
              {keyword ? "검색 결과가 없습니다." : "등록된 상품이 없습니다."}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default AllItemsSection;
