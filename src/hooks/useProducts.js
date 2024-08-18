"use client";

import { EcomContext } from "@/context/ecom-provider";
import { useContext } from "react";

export function useProducts() {
  const context = useContext(EcomContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within an EcomProvider");
  }

  const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,

    cartItems,
    setCartItems,

    wishListItems,
    addToWishlist,
    removeFromWishlist,

    products,
  } = context;
  return {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,

    cartItems,
    setCartItems,

    wishListItems,
    addToWishlist,
    removeFromWishlist,

    products,
  };
}
