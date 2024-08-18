import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import AddToWishListButton from "./AddToWishListButton";
import { formatPrice } from "@/utils/helpers";
import ProductTitle from "./ProductTitle";

function ProductCard({ product }) {
  const hasDiscount = product.discount && product.discount > 0;
  const originalPrice = hasDiscount
    ? product.price / (1 - product.discount / 100)
    : product.price;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-80">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <AddToWishListButton product={product} />
        </div>
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4 pb-0 flex flex-col justify-between ">
        <ProductTitle id={product?._id} title={product?.title} />
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
