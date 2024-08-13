"use client";

import { EcomContext } from "@/context/ecom-provider";
import { useContext } from "react";

export function useProducts() {
  const { items } = useContext(EcomContext);
  return { items };
}
