import React from "react";
import { ProductsList } from "./ProductList";

function Homepage() {
  return (
    <main className=" bg-slate-100 min-h-screen w-full pt-[8rem] px-10 ">
      <ProductsList />
    </main>
  );
}

export default Homepage;
