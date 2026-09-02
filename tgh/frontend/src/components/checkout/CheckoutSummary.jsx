import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTag, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";

import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../context/CheckoutContext";

const CheckoutSummary = () => {
  const navigate = useNavigate();

  const { cart } = useCart();

  const {
    selectedAddress,
    paymentMethod,
    placeOrder,
    loading,
  } = useCheckout();

  const [couponCode, setCouponCode] = useState("");

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    console.log("========== ORDER REQUEST ==========");
    console.log({
      addressId: selectedAddress._id,
      paymentMethod,
      couponCode,
    });

    try {
      const response = await placeOrder({
        addressId: selectedAddress._id,
        paymentMethod,
        couponCode,
      });

      console.log("========== ORDER SUCCESS ==========");
      console.log(response);

      toast.success(
        response?.message || "Order Placed Successfully!"
      );

      navigate("/order-success", {
        state: {
          order: response?.data || response,
        },
      });
    } catch (error) {
      console.log("========== ORDER ERROR ==========");
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to place order."
      );
    }
  };

  return (
    <div className="sticky top-24 rounded-2xl bg-white shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaShoppingBag
          className="text-[#6B1028]"
          size={22}
        />

        <h2 className="text-2xl font-semibold text-[#6B1028]">
          Order Summary
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{cart?.totalItems || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{cart?.subtotal || 0}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- ₹{cart?.totalDiscount || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span className="text-green-600 font-medium">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-[#6B1028]">
            ₹{cart?.totalAmount || 0}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <label className="flex items-center gap-2 mb-2 font-medium">
          <FaTag />
          Coupon Code
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Coupon"
            value={couponCode}
            onChange={(e) =>
              setCouponCode(e.target.value)
            }
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-[#6B1028]"
          />

          <button
            type="button"
            className="rounded-xl border border-[#6B1028] px-5 text-[#6B1028] hover:bg-[#6B1028] hover:text-white transition"
          >
            Apply
          </button>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-[#6B1028] py-4 text-white font-semibold hover:bg-[#54101f] transition disabled:opacity-60"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutSummary;