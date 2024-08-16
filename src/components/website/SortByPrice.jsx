import React from "react";

function SortByPrice({ handleSortChange }) {
  return (
    <select
      onChange={handleSortChange}
      className="m-auto sm:m-0 sm:ml-auto w-[80%] sm:w-1/5 px-3 py-2 rounded-lg bg-slate-200 outline-none"
    >
      <option value="">Sort by: Price</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}

export default SortByPrice;
