"use client";

import logoutUser from "@/utils/logout";
import Link from "next/link";
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

function AuthIcon({ token }) {
  async function handleLogout() {
    await logoutUser();
  }

  return (
    <main>
      {!token?.value ? (
        <Link href={"/sign-in"}>
          <MdAccountCircle size={24} className="cursor-pointer  " />
        </Link>
      ) : (
        <div onClick={() => handleLogout()}>
          <IoMdLogOut size={24} className="cursor-pointer  " />
        </div>
      )}
    </main>
  );
}

export default AuthIcon;
