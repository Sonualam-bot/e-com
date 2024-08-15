import React from "react";
import ProductSection from "./ProductSection";

export default function Homepage({ products }) {
  return (
    <main className=" bg-slate-100 min-h-screen w-full pt-[8rem] px-1 md:px-10 ">
      <ProductSection products={products} />
    </main>
  );
}
