"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

export function ProductsList() {
  const { items } = useProducts();

  return (
    <main className=" grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-4 p-3 shadow-lg gap-y-3 gap-x-2  ">
      {items?.data?.products?.map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })}
    </main>
  );
}
