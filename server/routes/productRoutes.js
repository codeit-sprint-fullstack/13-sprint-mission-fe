import express from "express";
import {
  getProduct,
  getProductDetail,
  postProduct,
  patchProduct,
  deleteProduct,
} from "../controllers/index.js";

const productRouter = express.Router();
productRouter.post("/", postProduct);
productRouter.get("/", getProduct);
productRouter.get("/:productId", getProductDetail);
productRouter.patch("/:productId", patchProduct);
productRouter.delete("/:productId", deleteProduct);

export default productRouter;
