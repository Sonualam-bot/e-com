//assets
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Link from "next/link";
import getProducts from "@/utils/api";
import Search from "./Search";

async function Navbar() {
  const products = await getProducts();
  const isloggedIn = true;

  return (
    <main className=" w-full px-4 py-4 bg-slate-600 text-white  flex items-center justify-between shadow-lg fixed z-30">
      <Link href={"/"} className=" text-bold text-3xl ">
        Profile.fyi
      </Link>

      <div className="w-1/2  hidden sm:block ">
        <Search products={products} />
      </div>

      <div className="  flex items-center gap-4 ">
        <Cart />
        <Wishlist />
        {isloggedIn ? (
          <MdAccountCircle size={24} className="cursor-pointer  " />
        ) : (
          <IoMdLogOut size={24} className="cursor-pointer  " />
        )}
      </div>
    </main>
  );
}

export default Navbar;
