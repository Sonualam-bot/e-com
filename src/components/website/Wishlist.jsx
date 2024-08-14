"use client";
import { useProducts } from "@/hooks/useProducts";
import { FaHeart } from "react-icons/fa";

function Wishlist() {
  const { wishListItems } = useProducts();

  return (
    <div className="relative">
      <FaHeart size={24} className="cursor-pointer  " />
      {wishListItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {wishListItems.length}
        </span>
      )}
    </div>
  );
}

export default Wishlist;
