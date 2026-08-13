import { useState } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getArticles } from "../../api/articles";
import PaginationBar from "../../components/UI/PaginationBar";
import ArticleCard from "./components/ArticleCard";
import { ReactComponent as SearchIcon } from "../../assets/images/icons/ic_search.svg";
import { ReactComponent as Spinner } from "../../assets/images/ui/spinner.svg";

const PAGE_SIZE = 10;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 24px 0 64px;
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
  font-size: 24px;
`;

const WriteLink = styled(Link)`
  padding: 12px 24px;
  border-radius: 8px;
  background: var(--blue);
  color: #fff;
  font-weight: 600;
`;

const BestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: 1fr;
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
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--gray-100);

  input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
  }
`;

const Select = styled.select`
  min-width: 130px;
  padding: 12px 16px;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  background: #fff;
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

const Empty = styled.p`
  padding: 48px 0;
  color: var(--gray-400);
  text-align: center;
`;

function CommunityFeedPage() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
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

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
    setPage(1);
  };

  return (
    <Page>
      <section>
        <Header><Title>베스트 게시글</Title></Header>
        {bestQuery.data?.list?.length > 0 && (
          <BestGrid>
            {bestQuery.data.list.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </BestGrid>
        )}
      </section>

      <section>
        <Header>
          <Title>게시글</Title>
          <WriteLink to="/community/new">글쓰기</WriteLink>
        </Header>
        <Toolbar>
          <Search>
            <SearchIcon />
            <input value={keyword} onChange={handleKeywordChange} placeholder="검색할 키워드를 입력해 주세요" />
          </Search>
          <Select value={orderBy} onChange={handleOrderChange} aria-label="게시글 정렬">
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </Select>
        </Toolbar>

        {articlesQuery.isPending ? (
          <Center><Spinner width="56" /></Center>
        ) : articlesQuery.isError ? (
          <Empty>{articlesQuery.error.message}</Empty>
        ) : articlesQuery.data.list.length === 0 ? (
          <Empty>검색된 게시글이 없습니다.</Empty>
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
