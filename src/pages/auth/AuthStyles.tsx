import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";

export const AuthContainer = styled.main`
  width: 100%;
  max-width: none;
  margin: 0 auto;
  padding: 80px max(16px, calc((100% - 640px) / 2)) 231px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding-top: 190px;
    padding-bottom: 325px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    padding-top: 231px;
    padding-bottom: 284px;
  }
`;

export const LogoHomeLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 24px;

  .logoMark {
    width: 56px;
    height: 58px;
  }

  .logoText {
    width: 141px;
    height: auto;
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-bottom: 40px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AuthSwitch = styled.div`
  font-weight: 500;
  font-size: 15px;
  text-align: center;

  a {
    color: #3182f6;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: var(--blue);
  color: #ffffff;
  padding: 14.5px 33.5px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #1967d6;
  }

  &:focus {
    background-color: #1251aa;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: default;
  }
`;
