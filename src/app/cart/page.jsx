"use client";
import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { discountCoupons } from "@/utils/helpers";
import toast from "react-hot-toast";
import CartSummary from "@/components/website/CartSummary";
import CartTable from "@/components/website/CartTable";

function UserCart() {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    setCartItems,
    removeFromCart,
  } = useProducts();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const handleQuantityIncrement = (product) => {
    incrementQuantity(product);
    toast.success("Cart updated ");
  };
  const handleQuantityDecrement = (product) => {
    decrementQuantity(product);
    toast.success("Cart updated ");
  };

  const removeItemFromCart = (product) => {
    removeFromCart(product);
    toast.success("Cart Updated");
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">
            Congratulations on your purchase!
          </h2>
          <p className="mb-4">Thank you for shopping with us.</p>
          <button
            onClick={handleCloseModal}
            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-slate-100 min-h-screen w-full py-16 px-4 sm:py-28 md:px-6 lg:px-10">
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
                {cartItems.map((item, index) => (
                  <CartTable
                    key={index}
                    item={item}
                    handleQuantityIncrement={handleQuantityIncrement}
                    handleQuantityDecrement={handleQuantityDecrement}
                    removeItemFromCart={removeItemFromCart}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <CartSummary
              subtotal={subtotal}
              cartItems={cartItems}
              discountCoupons={discountCoupons}
              appliedDiscount={appliedDiscount}
              couponInput={couponInput}
              selectedCoupon={selectedCoupon}
              handleCouponInputChange={handleCouponInputChange}
              handleCouponSelection={handleCouponSelection}
              removeCoupon={removeCoupon}
              applyDiscount={applyDiscount}
              discountAmount={discountAmount}
              total={total}
              setShowModal={setShowModal}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default UserCart;
