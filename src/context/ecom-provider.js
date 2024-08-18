"use client";
import getProductsFromDb from "@/utils/getproductapi";
import getUserFromDb from "@/utils/getUser";
import manageCart from "@/utils/manageCart";
import manageWishlist from "@/utils/manageWishlist";
import { createContext, useState, useCallback, useEffect } from "react";

export const EcomContext = createContext({});

export default function EcomProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loggedInuser, setLoggedInuser] = useState();

  const updateCart = useCallback(async (product, action) => {
    const updatedCart = await manageCart(product, action);
    if (updatedCart) {
      setCartItems(updatedCart);
    }
  }, []);

  const addToWishlist = useCallback(async (product) => {
    const updatedWishlist = await manageWishlist(product, "add");
    if (updatedWishlist) {
      setWishListItems(updatedWishlist);
    }
  }, []);

  const removeFromWishlist = useCallback(async (product) => {
    const updatedWishlist = await manageWishlist(product, "remove");
    if (updatedWishlist) {
      setWishListItems(updatedWishlist);
    }
  }, []);

  const addToCart = useCallback(
    (product) => {
      updateCart(product, "add");
    },
    [updateCart]
  );

  const removeFromCart = useCallback(
    (product) => {
      updateCart(product, "remove");
    },
    [updateCart]
  );

  const incrementQuantity = useCallback(
    (product) => {
      updateCart(product, "increment");
    },
    [updateCart]
  );

  const decrementQuantity = useCallback(
    (product) => {
      updateCart(product, "decrement");
    },
    [updateCart]
  );

  useEffect(() => {
    async function handleGetUserData() {
      const user = await getUserFromDb();
      setCartItems(user?.cart);
      setWishListItems(user?.wishlist);
      setLoggedInuser(user);
    }
    handleGetUserData();
  }, []);

  useEffect(() => {
    async function handleGetAllProducts() {
      const products = await getProductsFromDb();
      setProducts(products);
    }

    handleGetAllProducts();
  }, []);

  const value = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    addToWishlist,
    removeFromWishlist,
    wishListItems,
    products,
    loggedInuser,
  };

  return <EcomContext.Provider value={value}>{children}</EcomContext.Provider>;
}
