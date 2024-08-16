import React from "react";

function SortByBrand({ handleSortChange, brandList }) {
  return (
    <select
      name="brand"
      onChange={handleSortChange}
      className="m-auto sm:m-0 sm:ml-auto w-[80%] sm:w-1/5 px-3 py-2 rounded-lg bg-slate-200 outline-none"
    >
      <option value="">Filter by: Brand</option>
      {brandList.map((brand) => (
        <option key={brand} value={brand}>
          Brand: {brand}
        </option>
      ))}
    </select>
  );
}

export default SortByBrand;
