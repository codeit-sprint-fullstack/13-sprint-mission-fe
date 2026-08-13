import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  padding: 24px 16px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 16px 24px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 16px;
  }
`;
export const SectionTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 28px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
