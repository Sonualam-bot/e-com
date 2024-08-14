"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import CardLoader from "./CardLoader";

export function ProductsList() {
  const { items, isLoading } = useProducts();

  if (isLoading) {
    return (
      <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 p-3 shadow-lg gap-y-3 gap-x-2">
        {[...Array(8)].map((_, index) => (
          <CardLoader key={index} />
        ))}
      </main>
    );
  }

  if (!items?.data?.products || items.data.products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <main className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 shadow-lg gap-y-3 gap-x-2  ">
      {items.data.products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </main>
  );
}
