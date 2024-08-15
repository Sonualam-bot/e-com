import React from "react";

import { truncateText } from "@/utils/helpers";
import Link from "next/link";

function ProductTitle({ title, id }) {
  return (
    <Link
      href={`product/${id}`}
      className="text-lg font-semibold mb-2 h-14 overflow-hidden hover:underline cursor-pointer "
    >
      {truncateText(title, 50)}
    </Link>
  );
}

export default ProductTitle;
