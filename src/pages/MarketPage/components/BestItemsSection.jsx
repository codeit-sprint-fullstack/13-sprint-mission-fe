import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { getProducts } from '../../../api/products';
import Spinner from '../../../assets/images/ui/spinner.svg?react';

const PAGE_SIZE = 4;
const BEST_MIN_FAVORITE_COUNT = 1;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/**
 * 베스트 상품은 무조건 데이터를 4개 불러온 다음, 각각의 화면에 맞게 개수를 다르게 해서 보여줍니다.
 * 데스크톱에서는 최대 4개, 태블릿 화면에서는 2개, 모바일 화면에서는 1개만 노출합니다.
 * 화면 크기가 중간에 달라지더라도 데이터를 추가로 불러오지 않아도 되도록 했습니다.
 */
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);

    & > :nth-child(n + 3) {
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

const Title = styled.h2`
  color: #111827;
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
`;

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

function BestItemsSection() {
  const { data, isFetching } = useQuery({
    queryKey: ['products', 'best'],
    queryFn: () =>
      getProducts({
        orderBy: 'favorite',
        page: 1,
        pageSize: PAGE_SIZE,
      }),
    refetchInterval: 60 * 1000, // 1분마다 데이터를 새로 받아온다
  });

  // 처음 로딩할 때만 스피너 보여주기
  if (!data && isFetching) {
    return (
      <SpinnerContainer>
        <StyledSpinner />
      </SpinnerContainer>
    );
  }

  // 베스트 아이템이 없다면 아무것도 보여주지 않습니다.
  if (!data || data.list.length === 0) return null;

  const items = data.list.filter(
    (item) => (item.favoriteCount ?? 0) >= BEST_MIN_FAVORITE_COUNT
  );

  if (items.length === 0) return null;

  return (
    <Container>
      <Title>베스트 상품</Title>
      <Content>
        {items.map((item) => (
          <Link key={item.id} to={`/items/${item.id}`}>
            <ItemCard item={item} featured />
          </Link>
        ))}
      </Content>
    </Container>
  );
}

export default BestItemsSection;
