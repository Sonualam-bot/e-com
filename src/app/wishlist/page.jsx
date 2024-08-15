"use client";

import React from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/website/ProductCard";

function UserWishlist() {
  const { wishListItems } = useProducts();

  return (
    <main className="bg-slate-100 min-h-screen w-full py-16 px-4 md:py-24 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Your Wishlist
        </h1>
        {wishListItems.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <p className="text-xl text-gray-600">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishListItems.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default UserWishlist;
