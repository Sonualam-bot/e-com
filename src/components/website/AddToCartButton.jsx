"use client";

import { useProducts } from "@/hooks/useProducts";
import React from "react";
import toast from "react-hot-toast";

function AddToCartButton({ product }) {
  const { addItemToCart, cartItems, removeItemFromCart } = useProducts();

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      removeItemFromCart(product.id);
      toast.success("Removed from Cart");
    } else {
      addItemToCart(product);
      toast.success("Added to Cart");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-4 rounded-md w-full text-slate-950 font-bold mt-auto ${
        isInCart
          ? "bg-red-400 hover:bg-red-500 hover:text-white "
          : "bg-violet-400 hover:bg-violet-500 hover:text-white "
      }`}
    >
      {isInCart ? "Remove from Cart" : "Add To Cart"}
    </button>
  );
}

export default AddToCartButton;
