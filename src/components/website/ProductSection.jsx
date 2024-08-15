"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Search from "./Search";

function ProductSection({ products }) {
  const [sortOrder, setSortOrder] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    let sortedArray = [...products];

    if (sortOrder === "lowToHigh") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      sortedArray.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sortedArray);
  }, [sortOrder]);

  return (
    <main>
      <div className="w-full mb-4 flex flex-col items-start gap-5">
        <div className="w-full block sm:hidden">
          <Search products={products} />
        </div>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="m-auto sm:m-0 sm:ml-auto w-[80%] sm:w-1/5 px-3 py-2 rounded-lg bg-slate-200 outline-none"
        >
          <option value="">Sort by Price:</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      <ProductList products={sortedProducts} />
    </main>
  );
}

export default ProductSection;
