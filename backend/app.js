require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");

const app = express();

// 1. CORS 설정: 로컬과 배포 환경 모두 허용
app.use(
   cors({
      origin: [
         "http://localhost:5173",
         "https://panda-market-fullstack.onrender.com",
      ],
      credentials: true,
   })
);

app.use(express.json());

// 2. MongoDB 연결
mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => console.log(" MongoDB Connected (연결 성공!)"))
   .catch((err) => console.error(" DB 연결 에러:", err));

// [API 1] 상품 목록 조회 (검색, 정렬, 페이지네이션)
app.get("/products", async (req, res) => {
   try {
      const {
         page = 1,
         pageSize = 10,
         keyword = "",
         orderBy = "recent",
      } = req.query;

      const query = keyword
         ? {
              $or: [
                 { name: { $regex: keyword, $options: "i" } },
                 { description: { $regex: keyword, $options: "i" } },
              ],
           }
         : {};

      const sort =
         orderBy === "favorite" ? { favoriteCount: -1 } : { createdAt: -1 };
      const skip = (Number(page) - 1) * Number(pageSize);

      const totalCount = await Product.countDocuments(query);
      const list = await Product.find(query)
         .sort(sort)
         .skip(skip)
         .limit(Number(pageSize));

      res.json({ list, totalCount });
   } catch (err) {
      res.status(500).json({ message: "서버 에러", error: err.message });
   }
});

// [API 2] 상품 등록 (400 에러 해결 버전)
app.post("/products", async (req, res) => {
   try {
      // 구조 분해 할당을 통해 필요한 데이터만 추출 (ownerId 등 불필요한 데이터 제외)
      const { name, description, price, tags, images } = req.body;

      const newProduct = new Product({
         name,
         description,
         price,
         tags: tags || [],
         images: images || [],
      });

      await newProduct.save();
      console.log(" 상품 등록 성공:", newProduct._id);
      res.status(201).json(newProduct);
   } catch (err) {
      console.error(" 등록 실패 원인:", err.message);
      res.status(400).json({ message: "등록 실패", detail: err.message });
   }
});

// [API 3] 상품 상세 조회
app.get("/products/:id", async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (!product)
         return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      res.json(product);
   } catch (err) {
      res.status(500).json({ message: "상세 조회 실패" });
   }
});

// [API 4] 상품 수정
app.patch("/products/:id", async (req, res) => {
   try {
      const updatedProduct = await Product.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );
      res.json(updatedProduct);
   } catch (err) {
      res.status(400).json({ message: "수정 실패" });
   }
});

// [API 5] 상품 삭제
app.delete("/products/:id", async (req, res) => {
   try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "삭제 완료" });
   } catch (err) {
      res.status(500).json({ message: "삭제 실패" });
   }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
