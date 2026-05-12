// [상단 메뉴바]

import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../images/logo/logo.svg";

const GNB = () => {
  const location = useLocation();
  const isItemsActive = location.pathname === "/items";
  const isBoardActive = location.pathname === "/board";

  return (
    <header className="main-header">
      <div
        className="wrapper"
        style={{ display: "flex", alignItems: "center", gap: "40px" }}
      >
        <Link to="/">
          <img src={logoImg} alt="판다마켓 로고" width="153" />
        </Link>

        <nav style={{ display: "flex", gap: "20px" }}>
          <Link
            to="/board"
            style={{
              color: isBoardActive ? "#3692FF" : "black",
              fontWeight: "bold",
            }}
          >
            자유게시판
          </Link>
          <Link
            to="/items"
            style={{
              color: isItemsActive ? "#3692FF" : "black",
              fontWeight: "bold",
            }}
          >
            중고마켓
          </Link>
        </nav>

        <div style={{ marginLeft: "auto" }}>
          <Link to="/login" id="loginLinkButton" className="button">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
};
export default GNB;
