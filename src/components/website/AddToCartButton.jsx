"use client";

import { useProducts } from "@/hooks/useProducts";
import React from "react";
import toast from "react-hot-toast";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

function AddToCartButton({ product, singleProduct }) {
  const { cartItems, addToCart, removeFromCart } = useProducts();

  const isInCart = cartItems?.some((item) => item.id === product?.id);

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(product);
      toast.success("Removed from Cart");
    } else {
      addToCart(product);
      toast.success("Added to Cart");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${singleProduct ? "w-full" : ""} py-2 px-2 rounded-md 
        font-semibold text-sm
        transition-all duration-300 ease-in-out
        flex items-center justify-center
        ${
          isInCart
            ? "bg-red-200 text-red-800 hover:bg-red-300"
            : "bg-green-500 text-white hover:bg-green-600"
        }
        transform hover:scale-105 focus:outline-none focus:ring-2 
        ${isInCart ? "focus:ring-red-400" : "focus:ring-green-400"}
        shadow-md hover:shadow-lg
      `}
    >
      {isInCart ? (
        <>
          <MdRemoveShoppingCart
            className={`${singleProduct ? "mr-2" : ""}`}
            size={20}
          />
          {singleProduct && "Remove from Cart"}
        </>
      ) : (
        <>
          <MdAddShoppingCart
            className={`${singleProduct ? "mr-2" : ""}`}
            size={20}
          />
          {singleProduct && "Add to Cart"}
        </>
      )}
    </button>
  );
}

export default AddToCartButton;
