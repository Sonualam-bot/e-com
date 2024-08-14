"use client";

import { createContext, useEffect, useState } from "react";

export const EcomContext = createContext({});

export default function EcomProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/products`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const value = {
    items,
    isLoading,
  };

  return <EcomContext.Provider value={value}>{children}</EcomContext.Provider>;
}
