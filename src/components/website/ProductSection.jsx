"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Search from "./Search";
import SortByDiscount from "./SortByDiscount";
import SortByCategory from "./SortByCategory";
import SortByBrand from "./SortByBrand";
import SortByPrice from "./SortByPrice";

function ProductSection({ products }) {
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [noProductsMessage, setNoProductsMessage] = useState("");

  useEffect(() => {
    let filteredArray = [...products];

    if (selectedCategory) {
      filteredArray = filteredArray.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedBrand) {
      filteredArray = filteredArray.filter(
        (product) => product.brand === selectedBrand
      );
    }

    if (filteredArray.length === 0) {
      if (selectedCategory && selectedBrand) {
        setNoProductsMessage(
          `No products found in the category "${selectedCategory}" for the brand "${selectedBrand}".`
        );
      } else if (selectedCategory) {
        setNoProductsMessage(
          `No products found in the category "${selectedCategory}".`
        );
      } else if (selectedBrand) {
        setNoProductsMessage(
          `No products found for the brand "${selectedBrand}".`
        );
      } else {
        setNoProductsMessage("");
      }
    } else {
      setNoProductsMessage("");
    }

    switch (sortCriteria) {
      case "price":
        filteredArray.sort((a, b) =>
          sortOrder === "asc"
            ? (a.price || 0) - (b.price || 0)
            : (b.price || 0) - (a.price || 0)
        );
        break;
      case "discount":
        filteredArray.sort((a, b) =>
          sortOrder === "asc"
            ? (a.discount || 0) - (b.discount || 0)
            : (b.discount || 0) - (a.discount || 0)
        );
        break;
    }

    setSortedProducts(filteredArray);
  }, [sortCriteria, sortOrder, selectedCategory, selectedBrand, products]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value.includes("-")) {
      const [criteria, order] = value.split("-");
      setSortCriteria(criteria);
      setSortOrder(order);
    } else if (e.target.name === "category") {
      setSelectedCategory(value);
    } else if (e.target.name === "brand") {
      setSelectedBrand(value);
    }
  };

  const categoryList = [
    ...new Set(products.map((product) => product.category)),
  ];
  const brandList = [...new Set(products.map((product) => product.brand))];

  return (
    <main>
      <div className="w-full mb-4 flex flex-col items-start gap-5">
        <div className="w-full block sm:hidden">
          <Search products={products} />
        </div>

        <div className="w-full flex flex-wrap items-center gap-4">
          <SortByDiscount handleSortChange={handleSortChange} />
          <SortByCategory
            handleSortChange={handleSortChange}
            categoryList={categoryList}
          />
          <SortByBrand
            handleSortChange={handleSortChange}
            brandList={brandList}
          />
          <SortByPrice handleSortChange={handleSortChange} />
        </div>
      </div>

      {noProductsMessage ? (
        <div className="text-center text-xl text-gray-600 my-8">
          {noProductsMessage}
        </div>
      ) : (
        <ProductList products={sortedProducts} />
      )}
    </main>
  );
}

export default ProductSection;
