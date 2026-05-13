const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      tags: { type: [String], default: [] },
      images: { type: [String], default: [] },
      favoriteCount: { type: Number, default: 0 },
      ownerId: { type: Number, default: 1 },
   },
   {
      timestamps: true, // createdAt, updatedAt 자동 생성
   }
);

// 프론트엔드 호환성을 위해 _id를 id로 변환
ProductSchema.set("toJSON", {
   virtuals: true,
   transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
   },
});

module.exports = mongoose.model("Product", ProductSchema);
