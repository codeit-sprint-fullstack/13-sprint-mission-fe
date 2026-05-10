import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tags: [String],
  },
  {
    timestamps: true,
  },
);

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Product", productSchema);
