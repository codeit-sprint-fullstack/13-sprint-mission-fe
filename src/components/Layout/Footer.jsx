import styled from "styled-components";
import facebookLogo from "../../assets/images/social/facebook-logo.svg";
import twitterLogo from "../../assets/images/social/twitter-logo.svg";
import youtubeLogo from "../../assets/images/social/youtube-logo.svg";
import instagramLogo from "../../assets/images/social/instagram-logo.svg";

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 32px max(32px, calc((100vw - 1200px) / 2));
  background: var(--gray-900);
  color: var(--gray-400);

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-wrap: wrap;
    padding: 32px;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 28px;
  color: var(--gray-200);
`;

const Social = styled.div`
  display: flex;
  gap: 12px;

  img { width: 20px; height: 20px; }
`;

const Copyright = styled.p`
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    order: 3;
    flex-basis: 100%;
  }
`;

function Footer() {
  const channels = [
    ["https://www.facebook.com/", facebookLogo, "페이스북"],
    ["https://twitter.com/", twitterLogo, "트위터"],
    ["https://www.youtube.com/", youtubeLogo, "유튜브"],
    ["https://www.instagram.com/", instagramLogo, "인스타그램"],
  ];

  return (
    <FooterContainer>
      <Copyright>©codeit - 2024</Copyright>
      <Menu><a href="/privacy">Privacy Policy</a><a href="/faq">FAQ</a></Menu>
      <Social>
        {channels.map(([url, icon, label]) => (
          <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}>
            <img src={icon} alt="" />
          </a>
        ))}
      </Social>
    </FooterContainer>
  );
}

export default Footer;
