"use client";

import { useProducts } from "@/hooks/useProducts";
import React from "react";
import toast from "react-hot-toast";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

function AddToWishlistBtnForDetailsPage({ product }) {
  const { addToWishlist, removeFromWishlist, wishListItems } = useProducts();

  const isInWishList = wishListItems?.some((item) => item.id === product?.id);

  const handleClick = () => {
    if (isInWishList) {
      removeFromWishlist(product);
      toast.success("Removed from Wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist");
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
          isInWishList
            ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
            : "bg-fuchsia-400 text-white hover:bg-fuchsia-600"
        }
        transform hover:scale-105 focus:outline-none focus:ring-2 
        ${isInWishList ? "focus:ring-purple-400" : "focus:ring-fuchsia-400"}
        shadow-md hover:shadow-lg
      `}
    >
      {isInWishList ? (
        <>
          <MdFavorite className="mr-2" size={20} />
          Remove from Wishlist
        </>
      ) : (
        <>
          <MdFavoriteBorder className="mr-2" size={20} />
          Add to Wishlist
        </>
      )}
    </button>
  );
}

export default AddToWishlistBtnForDetailsPage;
