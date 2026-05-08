import Product from "../models/Product.js";
import { asyncHandler } from "./asyncHandler.js";

export const getProduct = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10, orderBy = "recent", keyword } = req.query;
  //pagination 계산
  const skip = (Number(page) - 1) * Number(pageSize);

  //일단 find하고 totalCount 찾기
  let list = Product.find();
  const totalCount = await Product.countDocuments();

  //keyword가 있으면 해당 keyword 포함하는 데이터 리턴
  if (keyword) {
    list = list.find({
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
    list = list.sort({ favoriteCount: -1 });
  } else {
    list = list.sort({ createdAt: -1 });
  }

  //pagination 적용
  list = await list.skip(skip).limit(Number(pageSize));

  res.status(200).json({ totalCount, list });
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
