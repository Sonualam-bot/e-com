"use client";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

function Cart() {
  const { cartItems } = useProducts();

  return (
    <Link href={"/cart"} className="relative">
      <FaCartShopping size={24} className="cursor-pointer" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartItems.length}
        </span>
      )}
    </Link>
  );
}

export default Cart;
