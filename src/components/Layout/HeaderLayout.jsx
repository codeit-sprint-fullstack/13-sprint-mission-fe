import React from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import LinkButton from "../UI/LinkButton";
import defaultProfileImage from "../../assets/images/ui/ic_profile.svg";
import Logo from "../../assets/images/logo/logo.svg?react";
import TextLogo from "../../assets/images/logo/text_logo.svg?react";
import Footer from "./Footer";
import ToggleMenu from "../UI/ToggleMenu";

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
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
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
  line-height: 24px;
  border-radius: 8px;
  padding: 11px 23px;
`;

const ProfileMenu = styled(ToggleMenu)`
  & > button {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    padding: 2px 4px;
    color: #4b5563;
    font-size: 14px;
    font-weight: 500;
  }
`;

const ProfileInfo = styled.span`
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
  z-index: 100;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid var(--gray-200);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1520px;
  height: 70px;
  margin: 0 auto;
  padding: 9px 24px;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 9px 16px;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  ${({ $fullWidth }) =>
    !$fullWidth &&
    `
      max-width: 1200px;
      margin: 0 auto;
      padding: 14px 0;

      @media screen and (max-width: 1199px) {
        padding: 14px 24px;
      }

      @media screen and (max-width: 743px) {
        padding: 14px 16px;
      }
    `}
`;

function Header({ isHome }) {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuSelect = ({ value }) => {
    if (value !== "logout") return;
    signout();
    navigate("/signin", { replace: true });
  };

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
            {!isHome && (
              <>
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
              </>
            )}
          </HeaderMenu>
        </HeaderNav>

        {user ? (
          <ProfileMenu
            label={`${user.nickname} 사용자 메뉴`}
            options={[{ value: "logout", label: "로그아웃" }]}
            onSelect={handleProfileMenuSelect}
          >
            <ProfileInfo>
              <ProfileImage
                src={user.image ?? defaultProfileImage}
                alt=""
              />
              <Nickname>{user.nickname}</Nickname>
            </ProfileInfo>
          </ProfileMenu>
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
      <Header isHome={isHome} />
      <Main $fullWidth={isHome}>
        <Outlet />
      </Main>
      <Footer />
    </Container>
  );
}

export default HeaderLayout;
