import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import LinkButton from "../UI/LinkButton";
import defaultProfileImage from "../../assets/images/ui/ic_profile.svg";
import { ReactComponent as Logo } from "../../assets/images/logo/logo.svg";
import { ReactComponent as TextLogo } from "../../assets/images/logo/text_logo.svg";
import Footer from "./Footer";

const fullWidthStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 14px 24px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 0;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
`;

const HeaderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLogo = styled(Logo)``;
const StyledTextLogo = styled(TextLogo)``;

const HeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #4b5563;
  gap: 47px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-right: 36px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    gap: 14px;
    font-size: 16px;

    ${StyledTextLogo} {
      display: none;
    }
  }
`;

const HeaderNavLink = styled(NavLink)`
  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

const LoginLink = styled(LinkButton)`
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  padding: 11px 23px;
`;

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

const Nickname = styled.span`
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    display: none;
  }
`;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${fullWidthStyle}
  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;
`;

const Main = styled.main`
  flex: 1;
  ${({ $fullWidth }) => !$fullWidth && fullWidthStyle}
`;

function Header() {
  const { user } = useAuth();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderNav>
          <HeaderMenu>
            <li>
              <HeaderLogoLink to="/" aria-label="홈으로 이동">
                <StyledLogo />
                <StyledTextLogo />
              </HeaderLogoLink>
            </li>
            <li>
              <HeaderNavLink to="/community">
                자유게시판
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink to="/items">
                중고마켓
              </HeaderNavLink>
            </li>
          </HeaderMenu>
        </HeaderNav>

        {user ? (
          <ProfileLink to="/my" aria-label="마이페이지로 이동">
            <ProfileImage
              src={user.image ?? defaultProfileImage}
              alt={`${user.nickname} 프로필 이미지`}
            />
            <Nickname>{user.nickname}</Nickname>
          </ProfileLink>
        ) : (
          <LoginLink to="/signin">로그인</LoginLink>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

function HeaderLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Container>
      <Header />
      <Main $fullWidth={isHome}>
        <Outlet />
      </Main>
      <Footer />
    </Container>
  );
}

export default HeaderLayout;
