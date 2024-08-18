"use client";

import { useState } from "react";

export function useCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async (product) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      setLoading(false);
      return data.cart;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { addToCart, loading, error };
}
