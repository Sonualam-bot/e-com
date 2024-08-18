const { default: toast } = require("react-hot-toast");

export default async function manageCart(product, action) {
  try {
    const response = await fetch(`/api/manage-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        product,
        action: action,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Cart Updated Successfully");
    }
    return data.cart;
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    toast.error("Failed to  Update Successfully");
  }
}
