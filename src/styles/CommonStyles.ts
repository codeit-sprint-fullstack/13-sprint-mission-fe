import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 24px 0;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 16px 0;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 16px 0;
  }
`;
export const SectionTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: 20px;
    line-height: 32px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
