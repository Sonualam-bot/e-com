"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { truncateText } from "@/utils/helpers";

function ProductTitle({ title, id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`product/${id}`);
  };

  return (
    <h3
      onClick={handleClick}
      className="text-lg font-semibold mb-2 h-14 overflow-hidden hover:underline cursor-pointer "
    >
      {truncateText(title, 50)}
    </h3>
  );
}

export default ProductTitle;
