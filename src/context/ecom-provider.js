"use client";
import { createContext, useEffect, useState, useCallback } from "react";

export const EcomContext = createContext({});

export default function EcomProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItemToCart = useCallback((item) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      //meaning that the item already exists in the cart will increase the quantity or else add item and add quantity key
      if (existingItemIndex > -1) {
        const newCartItems = [...prevCartItems];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + 1,
        };
        return newCartItems;
      }
      return [...prevCartItems, { ...item, quantity: 1 }];
    });
  }, []);

  const addToWishList = useCallback((item) => {
    setWishListItems((prevWishList) => {
      if (prevWishList.some((wishItem) => wishItem.id === item.id)) {
        return prevWishList;
      }
      return [...prevWishList, item];
    });
  }, []);

  const removeFromWishList = useCallback((itemId) => {
    setWishListItems((prevWishList) =>
      prevWishList.filter((item) => item.id !== itemId)
    );
  }, []);

  const removeItemFromCart = useCallback((itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  }, []);

  const updateItemQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const value = {
    items,
    isLoading,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    addToWishList,
    removeFromWishList,
    wishListItems,
    updateItemQuantity,
  };

  return <EcomContext.Provider value={value}>{children}</EcomContext.Provider>;
}
