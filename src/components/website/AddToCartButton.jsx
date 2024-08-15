"use client";

import { useProducts } from "@/hooks/useProducts";
import React from "react";
import toast from "react-hot-toast";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

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
      className={`
        w-full py-2 px-4 rounded-md 
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
          <MdRemoveShoppingCart className="mr-2" size={20} />
          Remove from Cart
        </>
      ) : (
        <>
          <MdAddShoppingCart className="mr-2" size={20} />
          Add to Cart
        </>
      )}
    </button>
  );
}

export default AddToCartButton;
