import React from "react";
import ProductSection from "./ProductSection";
import getProducts from "@/utils/api";

export default async function Homepage() {
  const products = await getProducts();
  return (
    <main className=" bg-slate-100 min-h-screen w-full pt-[6rem] px-1 md:px-10 ">
      <ProductSection products={products} />
    </main>
  );
}
