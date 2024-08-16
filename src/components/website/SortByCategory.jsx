import React from "react";

function SortByCategory({ handleSortChange, categoryList }) {
  return (
    <select
      name="category"
      onChange={handleSortChange}
      className="m-auto sm:m-0 sm:ml-auto w-[80%] sm:w-1/5 px-3 py-2 rounded-lg bg-slate-200 outline-none"
    >
      <option value="">Filter by: Category</option>
      {categoryList.map((category) => (
        <option key={category} value={category}>
          Category: {category}
        </option>
      ))}
    </select>
  );
}

export default SortByCategory;
