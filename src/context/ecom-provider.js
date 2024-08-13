"use client";

import { createContext, useEffect, useState } from "react";

export const EcomContext = createContext({});

export default function EcomProvider({ children }) {
  const [items, setItems] = useState([]);

  async function getProducts(username) {
    const res = await fetch(`/api/products`);
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const value = {
    items,
  };

  return <EcomContext.Provider value={value}>{children}</EcomContext.Provider>;
}
