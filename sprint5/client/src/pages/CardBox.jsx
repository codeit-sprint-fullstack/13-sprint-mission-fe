import React from "react";
import heartIcon from "../images/social/facebook-logo.svg";
import "../styles/cardBox.css";
import defaultImg from "../images/default.svg";

export function CardBox({ product }) {
  const { images, title, name, price, favoriteCount = 0 } = product;

  const displayImage = images && images.length > 0 ? images[0] : defaultImg;
  const displayTitle = title || name || "이름 없는 상품";

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <img src={displayImage} alt={displayTitle} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-product-name">{displayTitle}</h3>
        <p className="card-product-price">{price?.toLocaleString() || 0}원</p>
        <div className="card-footer">
          <img src={heartIcon} alt="좋아요" className="heart-icon" />
          <span>{favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}
