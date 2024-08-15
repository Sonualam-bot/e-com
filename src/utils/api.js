export default async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.in/api/products");
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
