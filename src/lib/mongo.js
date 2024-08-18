import mongoose from "mongoose";
import productData from "../utils/contants";
import { Product } from "@/model/product-model";

export async function dbConnect() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    // seedDb();
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("MONGODB connection FAILED", error);
    process.exit(1);
  }
}

function seedDb() {
  for (let product of productData) {
    const newProduct = new Product({
      ...product,
      quantity: 1,
    });

    newProduct.save();

    console.log(newProduct);
  }
}
