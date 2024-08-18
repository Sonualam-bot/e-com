export const dynamic = "force-dynamic";

import { Product } from "@/model/product-model";
import { NextResponse } from "next/server";

export async function GET() {
  const getProducts = await Product.find({});

  return NextResponse.json(
    {
      message: "Product Fetched successfully",
      product: getProducts,
    },
    { status: 200 }
  );
}
