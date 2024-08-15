import React from "react";
import ProductList from "./ProductList";

function Homepage() {
  return (
    <main className=" bg-slate-100 min-h-screen w-full pt-[8rem] px-1 md:px-10 ">
      <ProductList />
    </main>
  );
}

export default Homepage;
