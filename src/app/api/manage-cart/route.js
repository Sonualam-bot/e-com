import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();

    const token =
      request.cookies.get("accessToken")?.value ||
      request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.json(
        { error: "Invalid access token", details: error.message },
        { status: 401 }
      );
    }

    const { product, action } = await request.json();
    console.log("Received product:", product);
    console.log("Action:", action);

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingProductIndex = user.cart.findIndex(
      (item) => item._id.toString() === product._id.toString()
    );
    console.log("Existing product index:", existingProductIndex);

    if (existingProductIndex !== -1) {
      if (action === "increment") {
        user.cart[existingProductIndex].quantity += 1;
      } else if (action === "decrement") {
        user.cart[existingProductIndex].quantity -= 1;
        if (user.cart[existingProductIndex].quantity <= 0) {
          user.cart.splice(existingProductIndex, 1);
        }
      } else if (action === "remove") {
        user.cart.splice(existingProductIndex, 1);
      }
    } else {
      if (action === "add") {
        user.cart.push({ ...product, quantity: 1 });
      }
    }

    console.log("Updated cart:", user.cart);

    await user.save();

    return NextResponse.json({
      message: "Cart updated successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
