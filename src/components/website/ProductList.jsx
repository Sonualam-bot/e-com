import ProductCard from "./ProductCard";
import CardLoader from "./CardLoader";

export default function ProductList({ products }) {
  if (products?.length === 0) {
    return (
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-3 shadow-lg gap-y-5 gap-x-8">
        {[...Array(8)].map((_, index) => (
          <CardLoader key={index} />
        ))}
      </main>
    );
  }

  if (!products || products.length === 0) {
    return <p className="mt-20">No products found.</p>;
  }

  return (
    <main className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-3 shadow-lg gap-y-5 gap-x-8 bg-slate-200 rounded-lg ">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </main>
  );
}
