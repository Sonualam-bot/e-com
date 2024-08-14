"use client";
import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { discountCoupons } from "@/utils/helpers";
import toast from "react-hot-toast";

function UserCart() {
  const { cartItems, updateItemQuantity, removeItemFromCart } = useProducts();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [couponInput, setCouponInput] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const calculateDiscount = () => {
    if (!appliedDiscount) return 0;
    if (appliedDiscount.type === "fixed") {
      return Math.min(appliedDiscount.value, subtotal);
    } else if (appliedDiscount.type === "percentage") {
      return (subtotal * appliedDiscount.value) / 100;
    }
    return 0;
  };

  const discountAmount = calculateDiscount();
  const total = subtotal - discountAmount;

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  const handleCouponSelection = (coupon) => {
    if (!appliedDiscount) {
      setSelectedCoupon(coupon);
      setCouponInput(coupon.code);
    }
  };

  const handleCouponInputChange = (e) => {
    setCouponInput(e.target.value);
    setSelectedCoupon(null);
  };

  const applyDiscount = () => {
    if (selectedCoupon) {
      setAppliedDiscount(selectedCoupon);
      setSelectedCoupon(null);
    } else {
      const coupon = discountCoupons.find((c) => c.code === couponInput);
      if (coupon) {
        setAppliedDiscount(coupon);
      } else {
        toast.error("Invalid coupon code");
      }
    }
  };

  const removeCoupon = () => {
    setAppliedDiscount(null);
    setSelectedCoupon(null);
    setCouponInput("");
  };

  return (
    <main className="bg-slate-100 min-h-screen w-full py-[8rem] px-4 md:px-10 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* product table */}
          <div className="w-full lg:w-2/3">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left w-32">Quantity</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={50}
                          height={50}
                          className="mr-4"
                        />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-between w-28">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="bg-gray-200 px-2 py-1 rounded-l"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-2 text-center w-10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          className="bg-gray-200 px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <MdDelete
                        size={30}
                        onClick={() => removeItemFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer m-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Discount Section */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Available Coupons</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {discountCoupons.map((coupon) => (
                    <button
                      key={coupon.code}
                      onClick={() => handleCouponSelection(coupon)}
                      className={`px-2 py-1 rounded text-sm ${
                        selectedCoupon === coupon
                          ? "bg-blue-500 text-white"
                          : appliedDiscount
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      disabled={!!appliedDiscount}
                    >
                      {coupon.code}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={appliedDiscount ? appliedDiscount.code : couponInput}
                    onChange={handleCouponInputChange}
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Enter coupon code"
                    readOnly={!!appliedDiscount}
                  />
                  {appliedDiscount ? (
                    <button
                      onClick={removeCoupon}
                      className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={applyDiscount}
                      disabled={!selectedCoupon && !couponInput}
                      className={`px-4 py-1 rounded ${
                        selectedCoupon || couponInput
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>

              {appliedDiscount && (
                <div className="flex justify-between mb-4 text-green-600">
                  <span>Discount ({appliedDiscount.code}):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between mb-4 font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className={`w-full py-2 rounded-lg transition duration-300 ${
                  cartItems.length > 0
                    ? "bg-slate-500 text-white hover:bg-slate-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={cartItems.length === 0}
              >
                {cartItems.length > 0 ? "Proceed to Checkout" : "Cart is Empty"}
              </button>
              {cartItems.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Add items to your cart to checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserCart;
