import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Product from "./Product.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    const newProduct = await Product.create({ name, description, price, tags });
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "상품 등록에 실패했습니다.", error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const { offset = 0, limit = 10, search, orderBy = "recent" } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .sort(orderBy === "recent" ? { createdAt: -1 } : {})
      .skip(Number(offset))
      .limit(Number(limit))
      .select("id name price createdAt");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "목록 조회 중 오류가 발생했습니다." });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "상세 조회 중 오류가 발생했습니다." });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "수정할 상품이 없습니다." });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "삭제할 상품이 없습니다." });
    res.status(200).json({ message: "상품이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "삭제 중 오류가 발생했습니다." });
  }
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(" MongoDB Connected 성공.");
    app.listen(PORT, () =>
      console.log(` 서버가 포트 ${PORT}에서 작동 중입니다.`),
    );
  })
  .catch((err) => console.error(" DB 연결 에러:", err));
