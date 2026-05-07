import Product from "../models/Product.js";
import { asyncHandler } from "./asyncHandler.js";

export const getProduct = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10, orderBy = "recent", keyword } = req.query;
  //pagination 계산
  const skip = (Number(page) - 1) * Number(pageSize);

  //일단 find하기
  let result = Product.find();

  //keyword가 있으면 해당 keyword 포함하는 데이터 리턴
  if (keyword) {
    result = result.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });
  }

  //orderBy 있으면 orderBy에 따라 DESC 정렬
  if (orderBy === "favorite") {
    result = result.sort({ favoriteCount: -1 });
  } else {
    result = result.sort({ createdAt: -1 });
  }

  //pagination 적용
  result = await result.skip(skip).limit(Number(pageSize));

  res.status(200).json(result);
});

export const postProduct = asyncHandler(async (req, res) => {
  const result = await Product.create(req.body);
  res.status(201).json(result);
});

export const patchProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndUpdate(productId, req.body);
  res.status(200).json(result);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndDelete(productId);
  res.status(200).json(result);
});

export const getProductDetail = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const result = await Product.findById(productId);
  res.status(200).json(result);
});
