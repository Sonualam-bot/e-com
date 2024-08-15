import ProductCard from "./ProductCard";
import CardLoader from "./CardLoader";

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.in/api/products");
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export default async function ProductList() {
  const products = await getProducts();

  console.log(products);

  if (products?.length === 0) {
    return (
      <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 p-3 shadow-lg gap-y-3 gap-x-2">
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
    <main className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-3 shadow-lg gap-y-4 gap-x-6 bg-slate-200 rounded-lg ">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </main>
  );
}
