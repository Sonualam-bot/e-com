import Image from "next/image";
import React from "react";

//assets
import AddToCartButton from "./AddToCartButton";
import AddToWishListButton from "./AddToWishListButton";
import { formatPrice, truncateText } from "@/utils/helpers";

function ProductCard({ product }) {
  //  original price before discount
  const hasDiscount = product.discount && product.discount > 0;
  const originalPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <main className="p-0 md:p-3 bg-violet-300 rounded-lg">
      <section className="flex flex-col items-start gap-2 bg-violet-200 p-3 rounded-lg relative h-full">
        <AddToWishListButton product={product} />
        <div className="relative w-full h-64 bg-white rounded-md overflow-hidden ">
          <Image
            src={product.image}
            layout="fill"
            objectFit="contain"
            className="rounded-md hover:scale-105 transition-transform ease-in-out object-cover "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={product.title}
          />
        </div>
        <div className="px-3 w-full">
          <h2 className="font-semibold h-12 overflow-hidden cursor-pointer hover:underline ">
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
        <AddToCartButton product={product} />
      </section>
    </main>
  );
}

export default ProductCard;
