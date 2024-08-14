import React from "react";
import { useProducts } from "@/hooks/useProducts";

//icon
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
    <div onClick={handleClick}>
      {isInWishList ? (
        <FaHeart
          size={30}
          className="absolute top-6 right-5 z-20 cursor-pointer text-red-500"
        />
      ) : (
        <FaRegHeart
          size={30}
          className="absolute top-6 right-5 z-20 cursor-pointer"
        />
      )}
    </div>
  );
}

export default AddToWishListButton;
