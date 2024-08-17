import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();

    // verify jwet
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
      return NextResponse.json(
        { error: "Invalid access token" },
        { status: 401 }
      );
    }

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "Invalid Access Token" },
        { status: 401 }
      );
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        $unset: {
          refresh_token: "",
        },
      },
      {
        new: true,
      }
    );

    const response = NextResponse.json(
      {
        message: "User logged out Successfully",
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
