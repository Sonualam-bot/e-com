import Image from "next/image";
import React from "react";

//assets
import { FaRegHeart } from "react-icons/fa";

function ProductCard({ product }) {
  const USD_TO_INR_RATE = 83;

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return truncated.substr(0, lastSpaceIndex) + "...";
  };

  // to format price in Indian Rupees
  const formatPrice = (priceInUsd) => {
    const priceInInr = priceInUsd * USD_TO_INR_RATE;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(priceInInr);
  };

  //  original price before discount
  const hasDiscount = product.discount && product.discount > 0;
  const originalPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <main className="p-3 bg-violet-300 rounded-lg">
      <section className="flex flex-col items-start gap-2 bg-violet-200 p-3 rounded-lg relative h-full">
        <FaRegHeart
          size={30}
          className="absolute top-4 right-4 z-20 cursor-pointer"
        />
        <div className="relative w-full h-64 bg-white rounded-md ">
          <Image
            src={product.image}
            layout="fill"
            objectFit="contain"
            className="rounded-md hover:scale-105 transition-transform ease-in-out"
            alt={product.title}
          />
        </div>
        <div className="px-3 w-full">
          <h2 className="font-semibold h-12 overflow-hidden">
            {truncateText(product.title, 40)}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">{formatPrice(product.price)}</p>
              {hasDiscount && (
                <p className="text-sm line-through text-gray-500">
                  {formatPrice(originalPrice)}
                </p>
              )}
            </div>
            {hasDiscount && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </div>
        <button className="py-2 px-4 bg-violet-400 rounded-md w-full text-slate-950 font-bold mt-auto">
          Add To Cart
        </button>
      </section>
    </main>
  );
}

export default ProductCard;
