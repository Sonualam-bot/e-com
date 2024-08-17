import React from "react";
import { formatPrice, truncateText } from "@/utils/helpers";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

function CartTable({ item, handleQuantityChange, removeItemFromCart }) {
  return (
    <div key={item.id} className="border-b p-4 flex flex-col md:flex-row">
      <div className="md:grid md:grid-cols-6 flex flex-col flex-wrap gap-4 w-full">
        <div className="col-span-2 flex items-center">
          <Image
            src={item.image}
            alt={item.title}
            width={40}
            height={40}
            className="mr-4"
          />
          <span className="text-sm md:text-base hidden md:block ">
            {truncateText(item.title, 30)}
          </span>
          <span className="text-sm md:text-base block md:hidden ">
            {item.title}
          </span>
        </div>
        <div className="w-[80%] flex md:block items-start md:items-center justify-between gap-5 md:gap-0 m-auto ">
          <span className="md:hidden font-semibold">Price:</span>
          <span className="text-sm md:text-base ml-auto ">
            {formatPrice(item.price.toFixed(2))}
          </span>
        </div>
        <div className="w-[80%] m-auto flex items-start gap-5 md:gap-0 ">
          <span className="md:hidden font-semibold">Quantity:</span>
          <div className="flex items-center justify-between w-24 md:w-28 ml-auto ">
            <button
              onClick={() => handleQuantityChange(item, -1)}
              className="bg-gray-200 px-2 py-1 rounded-l text-sm"
              disabled={item.quantity === 1}
            >
              -
            </button>
            <span className="px-2 text-center w-8 md:w-10 text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item, 1)}
              className="bg-gray-200 px-2 py-1 rounded-r text-sm"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-[80%] flex md:block items-start md:items-center justify-between gap-5 md:gap-0 m-auto">
          <span className="md:hidden font-semibold">Total:</span>
          <span className="text-sm md:text-base">
            {formatPrice((item.price * item.quantity).toFixed(2))}
          </span>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <MdDelete
            size={24}
            onClick={() => removeItemFromCart(item.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-4 md:hidden flex justify-end">
        <MdDelete
          size={24}
          onClick={() => removeItemFromCart(item.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CartTable;
