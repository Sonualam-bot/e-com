import toast from "react-hot-toast";

export default async function logoutUser() {
  try {
    const response = await fetch("/api/sign-out", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    const data = await response.json();
    console.log(data);

    toast.success(data.message);

    window.location.href = "/";
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to logout");
  }
}
