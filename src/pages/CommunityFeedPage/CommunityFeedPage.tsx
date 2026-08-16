import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getArticles } from "../../api/articles";
import PaginationBar from "../../components/UI/PaginationBar";
import DropdownMenu from "../../components/UI/DropdownMenu";
import ArticleCard from "./components/ArticleCard";
import SearchIcon from "../../assets/images/icons/ic_search.svg?react";
import Spinner from "../../assets/images/ui/spinner.svg?react";
import emptyImage from "../../assets/images/ui/empty-comments.svg";
import type { SortOrder } from "../../types/models";

const PAGE_SIZE = 10;
const BEST_MIN_FAVORITE_COUNT = 1;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 24px 0 64px;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    gap: 40px;
    padding-top: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: var(--gray-900);
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
`;

const WriteLink = styled(Link)`
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 24px;
  border-radius: 8px;
  background: var(--blue);
  color: #fff;
  font-weight: 600;
  line-height: 24px;

  &:hover {
    background: var(--blue-hover);
  }
`;

const BestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > :nth-child(3) {
      display: none;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: 1fr;

    & > :nth-child(n + 2) {
      display: none;
    }
  }
`;

const Toolbar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const Search = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 8px 16px;
  border-radius: 12px;
  background: var(--gray-100);

  &:focus-within {
    box-shadow: inset 0 0 0 1px var(--blue);
  }

  input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
  }
`;

const List = styled.div`
  display: grid;
  gap: 16px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const Empty = styled.div`
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 48px 0 80px;
  text-align: center;

  img {
    width: 188px;
    height: 152px;
  }

  p {
    color: var(--gray-400);
    font-size: 16px;
    line-height: 26px;
  }

  ${WriteLink} {
    min-width: 196px;
  }
`;

function CommunityFeedPage() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<SortOrder>("recent");
  const [keyword, setKeyword] = useState("");

  const bestQuery = useQuery({
    queryKey: ["articles", "best"],
    queryFn: () => getArticles({ orderBy: "favorite", pageSize: 3 }),
    staleTime: 60_000,
  });

  const articlesQuery = useQuery({
    queryKey: ["articles", { page, orderBy, keyword }],
    queryFn: () => getArticles({ page, pageSize: PAGE_SIZE, orderBy, keyword }),
    placeholderData: keepPreviousData,
  });
  const bestArticles = (bestQuery.data?.list ?? []).filter(
    (article) => (article.favoriteCount ?? 0) >= BEST_MIN_FAVORITE_COUNT
  );

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  const handleOrderChange = (nextOrderBy: SortOrder) => {
    setOrderBy(nextOrderBy);
    setPage(1);
  };

  return (
    <Page>
      {bestArticles.length > 0 && (
        <section>
          <Header><Title>베스트 게시글</Title></Header>
          <BestGrid>
            {bestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </BestGrid>
        </section>
      )}

      <section>
        <Header>
          <Title>게시글</Title>
          <WriteLink to="/community/new">게시글 등록하기</WriteLink>
        </Header>
        <Toolbar>
          <Search>
            <SearchIcon />
            <input value={keyword} onChange={handleKeywordChange} placeholder="검색할 키워드를 입력해 주세요" />
          </Search>
          <DropdownMenu value={orderBy} onSortSelection={handleOrderChange} />
        </Toolbar>

        {articlesQuery.isPending ? (
          <Center><Spinner width="56" /></Center>
        ) : articlesQuery.isError ? (
          <Empty><p>{articlesQuery.error.message}</p></Empty>
        ) : articlesQuery.data.list.length === 0 ? (
          <Empty>
            <img src={emptyImage} alt="" />
            <p>{keyword ? "검색 결과가 없습니다." : "아직 등록된 게시글이 없어요."}</p>
            {!keyword && <WriteLink to="/community/new">게시글 등록하러 가기</WriteLink>}
          </Empty>
        ) : (
          <>
            <List>
              {articlesQuery.data.list.map((article) => <ArticleCard key={article.id} article={article} />)}
            </List>
            <Center>
              <PaginationBar
                totalPageNum={Math.max(1, Math.ceil(articlesQuery.data.totalCount / PAGE_SIZE))}
                activePageNum={page}
                onPageChange={setPage}
              />
            </Center>
          </>
        )}
      </section>
    </Page>
  );
}

export default CommunityFeedPage;
