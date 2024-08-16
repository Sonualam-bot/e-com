import { formatPrice } from "@/utils/helpers";
import { displayRazorpay } from "@/utils/payment";

function CartSummary({
  subtotal,
  cartItems,
  discountCoupons,
  appliedDiscount,
  couponInput,
  selectedCoupon,
  handleCouponInputChange,
  handleCouponSelection,
  removeCoupon,
  applyDiscount,
  discountAmount,
  total,
  setShowModal,
}) {
  const handlePayment = () => {
    displayRazorpay(Math.round(total), setShowModal);
  };

  return (
    <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Cart Summary</h2>
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
                value={appliedDiscount ? appliedDiscount.code : couponInput}
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
          onClick={handlePayment}
        >
          {cartItems.length > 0 ? "Proceed to Checkout" : "Cart is Empty"}
        </button>
        {cartItems.length === 0 && (
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            Add items to your cart to checkout
          </p>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
