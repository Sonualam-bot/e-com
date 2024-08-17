import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";
import { User } from "@/model/user-model";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while generating the access token",
      },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const { accessToken } = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        user: loggedInUser,
        accessToken,
      },
      { status: 200 }
    );

    // Set the access token as a cookie
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
