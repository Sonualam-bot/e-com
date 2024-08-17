"use client";

import { EcomContext } from "@/context/ecom-provider";
import { useContext } from "react";

export function useProducts() {
  const context = useContext(EcomContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within an EcomProvider");
  }

  const {
    addItemToCart,
    cartItems,
    setCartItems,
    removeItemFromCart,
    wishListItems,
    addToWishList,
    removeFromWishList,
    updateItemQuantity,
  } = context;
  return {
    addItemToCart,
    cartItems,
    setCartItems,
    removeItemFromCart,
    wishListItems,
    addToWishList,
    removeFromWishList,
    updateItemQuantity,
  };
}
