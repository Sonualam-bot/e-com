import toast from "react-hot-toast";

export default async function userLogin(formData) {
  try {
    const response = await fetch(`/api/sign-in`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.error || "An error occurred during login");
    }

    toast.success(data.message || "User Log-in Successfull");
    window.location.href = "/";
    return data;
  } catch (error) {
    toast.error(error.message || "Something went wrong while user login");
  }
}
