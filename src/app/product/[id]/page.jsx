import AddToCartButton from "@/components/website/AddToCartButton";
import AddToWishlistBtnForDetailsPage from "@/components/website/AddToWishlistBtnForDetailsPage";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 pt-[75px] pb-8">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
            <Image
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="flex -mx-2 mb-4">
            <div className="w-1/2 px-2">
              <AddToCartButton product={product} />
            </div>
            <div className="w-1/2 px-2 ">
              <AddToWishlistBtnForDetailsPage product={product} />
            </div>
          </div>
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <div className="flex mb-4">
            <div className="mr-4">
              <span className="font-bold text-gray-700">Brand:</span>
              <span className="text-gray-600 ml-2">{product.brand}</span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Model:</span>
              <span className="text-gray-600 ml-2">{product.model}</span>
            </div>
          </div>
          <div className="flex mb-4">
            <div className="mr-4">
              <span className="font-bold text-gray-700">Color:</span>
              <span className="text-gray-600 ml-2">{product.color}</span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Category:</span>
              <span className="text-gray-600 ml-2">{product.category}</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-gray-700">Price:</span>
            <span className="text-gray-600 ml-2">
              {formatPrice(product.price)}
            </span>
            {product.discount > 0 && (
              <span className="text-red-500 ml-2">
                ({product.discount}% OFF)
              </span>
            )}
          </div>
          <div>
            <span className="font-bold text-gray-700">Description:</span>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
          </div>
          {product.popular && (
            <div className="mt-4 bg-yellow-100 text-yellow-800 text-xs font-medium p-2 rounded">
              Popular Item
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.in/api/products");
  const data = await res.json();

  return data?.products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const data = await res.json();
  return data?.product;
}
