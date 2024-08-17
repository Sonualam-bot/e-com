//assets

import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Link from "next/link";
import getProducts from "@/utils/api";
import Search from "./Search";

import { cookies } from "next/headers";
import AuthIcon from "./AuthIcon";

async function Navbar() {
  const products = await getProducts();

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  return (
    <main className=" w-full px-4 py-4 bg-slate-600 text-white  flex items-center justify-between shadow-lg fixed z-30">
      <Link href={"/"} className=" text-bold text-3xl ">
        <span className="hidden sm:block">Profile.</span>
        <span>fyi</span>
      </Link>

      <div className="w-1/2  hidden sm:block ">
        <Search products={products} />
      </div>

      <div className="  flex items-center gap-4 ">
        <Link
          href={"/product"}
          className="text-white hover:text-gray-300 transition-colors duration-200 font-semibold text-[14px] md:text-[18px]  px-2 py-1 md:px-3 md:py-2 rounded-md bg-slate-700 hover:bg-slate-800"
        >
          See All Products
        </Link>
        <Cart />
        <Wishlist />
        <AuthIcon token={token} />
      </div>
    </main>
  );
}

export default Navbar;
