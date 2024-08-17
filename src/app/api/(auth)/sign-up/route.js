import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";
import { User } from "@/model/user-model";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { username, email, password } = await request.json();

    if ([username, email, password].some((field) => field?.trim() === "")) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json(
        { error: "User with email already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const createdNewUser = await User.findById(user._id).select("-password ");

    if (!createdNewUser) {
      return NextResponse.json(
        { error: "Something went wrong while registering the user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully", user: createdNewUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
