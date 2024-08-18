const { default: toast } = require("react-hot-toast");

export default async function manageWishlist(product, action) {
  try {
    const response = await fetch(`/api/manage-wishlist`, {
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
      toast.success(data.message || "Wishlist Updated Successfully");
    }
    return data.wishlist;
  } catch (error) {
    console.error("Failed to add product to wishlist:", error);
    toast.error("Failed to  Update wishlist");
  }
}
