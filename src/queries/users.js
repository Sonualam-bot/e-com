import { User } from "@/model/user-model";

export async function createUser(user) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
