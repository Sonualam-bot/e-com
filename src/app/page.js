import Link from "next/link";
import Image from "next/image";
import getProducts from "@/utils/api";

export default async function Home() {
  const products = await getProducts();

  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <main className="flex min-h-screen flex-col w-full pt-20 px-4 bg-slate-100 ">
      <h1 className="text-4xl font-bold mb-8"></h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {randomProducts.map((product, index) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className={`relative overflow-hidden rounded-lg shadow-lg 
                            ${index === 0 ? "col-span-2 row-span-2" : ""} 
                            ${index === 3 ? "col-span-2" : ""}`}
          >
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
            <div className="absolute inset-0 bg-slate-400 bg-opacity-50 opacity-0 hover:opacity-100 transition-all duration-300 flex items-end justify-center group">
              <h2 className="text-white text-center text-xl font-semibold p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {product.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/product" className="mt-8 text-blue-600 hover:text-blue-800">
        See all products
      </Link>
    </main>
  );
}
