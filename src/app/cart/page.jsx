"use client";
import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { discountCoupons, formatPrice, truncateText } from "@/utils/helpers";
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
    <main className="bg-slate-100 min-h-screen w-full py-16 px-4 md:py-24 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Your Cart
        </h1>
        {cartItems?.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <p className="text-xl text-gray-600">Your Cart is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* product table */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white shadow-md rounded-lg overflow-hidden text-center">
                <div className="hidden md:grid grid-cols-6 bg-gray-200 p-4 font-bold ">
                  <div className="col-span-2">Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total</div>
                  <div>Action</div>
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b p-4 flex flex-col md:flex-row"
                  >
                    <div className="md:grid md:grid-cols-6 flex flex-col flex-wrap gap-4 w-full">
                      <div className="col-span-2 flex items-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="mr-4"
                        />
                        <span className="text-sm md:text-base hidden md:block ">
                          {truncateText(item.title, 30)}
                        </span>
                        <span className="text-sm md:text-base block md:hidden ">
                          {item.title}
                        </span>
                      </div>
                      <div className="w-[80%] flex md:block items-start md:items-center justify-between gap-5 md:gap-0 m-auto ">
                        <span className="md:hidden font-semibold">Price:</span>
                        <span className="text-sm md:text-base ml-auto ">
                          {formatPrice(item.price.toFixed(2))}
                        </span>
                      </div>
                      <div className="w-[80%] m-auto flex items-start gap-5 md:gap-0 ">
                        <span className="md:hidden font-semibold">
                          Quantity:
                        </span>
                        <div className="flex items-center justify-between w-24 md:w-28 ml-auto ">
                          <button
                            onClick={() => handleQuantityChange(item, -1)}
                            className="bg-gray-200 px-2 py-1 rounded-l text-sm"
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span className="px-2 text-center w-8 md:w-10 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            className="bg-gray-200 px-2 py-1 rounded-r text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[80%] flex md:block items-start md:items-center justify-between gap-5 md:gap-0 m-auto">
                        <span className="md:hidden font-semibold">Total:</span>
                        <span className="text-sm md:text-base">
                          {formatPrice((item.price * item.quantity).toFixed(2))}
                        </span>
                      </div>
                      <div className="hidden md:flex items-center justify-center">
                        <MdDelete
                          size={24}
                          onClick={() => removeItemFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="mt-4 md:hidden flex justify-end">
                      <MdDelete
                        size={24}
                        onClick={() => removeItemFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  Cart Summary
                </h2>
                <div className="flex justify-between mb-4">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal.toFixed(2))}</span>
                </div>

                {/* Discount Section */}
                {cartItems.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Available Coupons</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {discountCoupons.map((coupon) => (
                        <button
                          key={coupon.code}
                          onClick={() => handleCouponSelection(coupon)}
                          className={`px-2 py-1 rounded text-xs md:text-sm ${
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
                        value={
                          appliedDiscount ? appliedDiscount.code : couponInput
                        }
                        onChange={handleCouponInputChange}
                        className="border rounded px-2 py-1 w-full text-sm md:text-base outline-none "
                        placeholder="Enter coupon code"
                        readOnly={!!appliedDiscount}
                      />
                      {appliedDiscount ? (
                        <button
                          onClick={removeCoupon}
                          className="px-2 md:px-4 py-1 rounded outline-none bg-red-500 text-white hover:bg-red-600 text-sm md:text-base"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={applyDiscount}
                          disabled={!selectedCoupon && !couponInput}
                          className={`px-2 md:px-4 py-1 rounded outline-none text-sm md:text-base ${
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
                )}

                {appliedDiscount && cartItems?.length > 0 && (
                  <div className="flex justify-between mb-4 text-green-600 text-sm md:text-base">
                    <span>Discount ({appliedDiscount.code}):</span>
                    <span>-{formatPrice(discountAmount.toFixed(2))}</span>
                  </div>
                )}

                <div className="flex justify-between mb-4 font-bold text-sm md:text-base">
                  <span>Total:</span>
                  <span>{formatPrice(total.toFixed(2))}</span>
                </div>

                <button
                  className={`w-full py-2 rounded-lg transition duration-300 outline-none text-sm md:text-base ${
                    cartItems.length > 0
                      ? "bg-slate-500 text-white hover:bg-slate-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={cartItems.length === 0}
                >
                  {cartItems.length > 0
                    ? "Proceed to Checkout"
                    : "Cart is Empty"}
                </button>
                {cartItems.length === 0 && (
                  <p className="text-xs md:text-sm text-gray-500 mt-2">
                    Add items to your cart to checkout
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default UserCart;
