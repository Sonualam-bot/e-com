"use client";

import { formatPrice } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

function Search({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const results = products?.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        product.price.toString().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-20 " ref={searchRef}>
      <form className="relative">
        <input
          type="text"
          placeholder="Search by title, price, brand, model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          className="w-full p-3 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <FaSearch className="text-gray-400" />
        </button>
      </form>

      {showResults && searchTerm && filteredProducts.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="p-4 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out border-b border-gray-200 last:border-b-0"
            >
              <h3 className="font-semibold text-gray-900">{product.title}</h3>
              <p className="text-sm text-gray-600">
                {product.brand} - {product.model}
              </p>
              <p className="text-sm font-bold text-blue-600">
                {formatPrice(product.price)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
