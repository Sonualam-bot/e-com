import { Product } from "@/model/product-model";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { params } = context;

  const getProductDetails = await Product.findById(params.id);

  return NextResponse.json({
    id: params.id,
    details: getProductDetails,
  });
}
