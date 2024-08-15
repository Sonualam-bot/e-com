import Homepage from "@/components/website/Homepage";
import getProducts from "@/utils/api";
import React from "react";

async function Products() {
  const products = await getProducts();
  return (
    <main className="flex min-h-screen flex-col w-full  ">
      <Homepage products={products} />
    </main>
  );
}

export default Products;
