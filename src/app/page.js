import Link from "next/link";
import Image from "next/image";
import getProducts from "@/utils/api";

export default async function Home() {
  const products = await getProducts();

  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <main className="flex min-h-screen flex-col w-full pt-20 px-4 bg-slate-100">
      <h1 className="text-4xl font-bold mb-8"></h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] mb-12">
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
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover "
            />
            <div className="absolute inset-0 bg-slate-400 bg-opacity-50 opacity-0 hover:opacity-100 transition-all duration-300 flex items-end justify-center group">
              <h2 className="text-white text-center text-xl font-semibold p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {product.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8 mb-12">
        <Link
          href="/product"
          className="
            relative 
            inline-flex 
            items-center 
            justify-center 
            px-8 py-3 
            overflow-hidden 
            font-medium 
            text-indigo-600 
            transition 
            duration-300 
            ease-out 
            border-2 
            border-indigo-600 
            rounded-full 
            shadow-md 
            group
          "
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-600 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-indigo-600 transition-all duration-300 transform group-hover:translate-x-full ease">
            See All Products
          </span>
          <span className="relative invisible">See All Products</span>
        </Link>
      </div>
    </main>
  );
}
