import React from "react";
import ProductSection from "./ProductSection";

export default async function Homepage() {
  return (
    <main className=" bg-slate-100 min-h-screen w-full pt-[6rem] px-1 md:px-10 ">
      <ProductSection />
    </main>
  );
}
