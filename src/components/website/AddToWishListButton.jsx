"use client";

import React from "react";
import { useProducts } from "@/hooks/useProducts";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

function AddToWishListButton({ product }) {
  const { addToWishList, removeFromWishList, wishListItems } = useProducts();

  const isInWishList = wishListItems.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isInWishList) {
      removeFromWishList(product.id);
      toast.success("Removed from Wishlist");
    } else {
      addToWishList(product);
      toast.success("Added to Wishlist");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-2 right-2 z-20 p-2 rounded-full bg-slate-200 bg-opacity-70 hover:bg-opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-300"
      aria-label={isInWishList ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      {isInWishList ? (
        <FaHeart size={24} className="text-red-500" />
      ) : (
        <FaRegHeart
          size={24}
          className="text-gray-600 hover:text-red-500 transition-colors duration-300"
        />
      )}
    </button>
  );
}

export default AddToWishListButton;
