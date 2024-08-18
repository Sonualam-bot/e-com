import mongoose, { Schema } from "mongoose";

const productItemSchema = new Schema({
  id: Number,
  title: String,
  image: String,
  price: Number,
  description: String,
  brand: String,
  model: String,
  color: String,
  category: String,
  discount: Number,
  quantity: Number,
});

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productItemSchema);
