//assets
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

function Navbar() {
  const isloggedIn = true;

  return (
    <main className=" w-full px-4 py-3 bg-slate-600 text-white  flex items-center justify-between shadow-lg fixed z-20">
      <h2 className=" text-bold text-3xl ">Profile.fyi</h2>

      <div className=" relative w-1/3 overflow-hidden  hidden sm:block ">
        <input
          type="text"
          placeholder="Search product by name or price"
          className=" w-full  pl-8 py-2 outline-none  text-[#000000] rounded-lg "
        />

        <FaSearch
          size={18}
          className=" text-slate-400 absolute left-2 top-[12px] z-20 "
        />
        <button className=" bg-slate-700 border-slate-950 outline-none px-2 py-2 rounded-tr-md rounded-br-md  absolute top-0 right-0 z-20 ">
          Search
        </button>
      </div>

      <div className="  flex items-center gap-4 ">
        <FaCartShopping size={24} className="cursor-pointer  " />
        <FaHeart size={24} className="cursor-pointer  " />
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
