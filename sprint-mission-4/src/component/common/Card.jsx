import React from "react";
import "./card.css";
import imageError from "../../assets/image-none.png";
import Heart from "../../assets/heart.svg";

export default function Card({ title, price, favoriteCount, images }) {
  return (
    <div className="content-wrap">
      <img
        className="content-image"
        src={images?.[0] ? images[0] : imageError}
        alt={title}
        onError={(e) => {
          e.target.src = imageError;
        }}
      />
      <div className="content-title">{title}</div>
      <div className="content-price">{price}원</div>
      <div className="content-favorite">
        <img src={Heart} /> {favoriteCount}
      </div>
    </div>
  );
}
