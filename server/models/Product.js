import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "물품 이름은 필수예요."],
      trim: true, // 앞뒤 공백 자동 제거
    },
    description: {
      type: String,
      required: [true, "물품 설명은 필수예요."],
      trim: true, // 앞뒤 공백 자동 제거
    },
    price: {
      type: Number,
      required: [true, "가격은 필수예요."],
      min: [0, "가격은 0 이상이어야 해요."],
    },
    favoriteCount: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  },
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
