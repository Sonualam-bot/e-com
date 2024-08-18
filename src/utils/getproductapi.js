export default async function getProductsFromDb() {
  try {
    const response = await fetch(`/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
