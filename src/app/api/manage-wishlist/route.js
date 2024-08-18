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

    const existingProductIndex = user.wishlist.findIndex(
      (item) => item.id === product.id
    );

    if (action === "add" && existingProductIndex === -1) {
      user.wishlist.push(product);
    } else if (action === "remove" && existingProductIndex !== -1) {
      user.wishlist.splice(existingProductIndex, 1);
    }

    console.log("Updated wishlist:", user.wishlist);

    await user.save();

    return NextResponse.json({
      message: "Wishlist updated successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Manage wishlist error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
