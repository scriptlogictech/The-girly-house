import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTag,
  FaShoppingBag,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../context/CheckoutContext";

const CheckoutSummary = () => {
  const navigate = useNavigate();

  const {
    cart,
    directCheckout,
    clearDirectCheckout,
  } = useCart();

  const {
    selectedAddress,
    paymentMethod,
    placeOrder,
    loading,
  } = useCheckout();

  const [couponCode, setCouponCode] =
    useState("");

  /*
  =====================================================
  DIRECT CHECKOUT DISPLAY
  =====================================================
  */

  const isDirectCheckout =
    !!directCheckout;

  /*
  =====================================================
  CALCULATE SUMMARY
  =====================================================
  */

  let itemsCount = 0;
  let subtotal = 0;
  let discount = 0;
  let totalAmount = 0;

  if (isDirectCheckout) {
    /*
      Prices are displayed here for the UI.
      Backend will calculate the final price
      again for security.
    */

    itemsCount =
      directCheckout.quantity || 0;

    /*
      Buy Now page only stores IDs/variant details.
      Therefore use 0 here until backend order
      calculation.

      We will improve this by fetching the
      product data if needed.
    */

    subtotal = 0;
    discount = 0;
    totalAmount = 0;
  } else {
    itemsCount =
      cart?.totalItems || 0;

    subtotal =
      cart?.subtotal || 0;

    discount =
      cart?.totalDiscount || 0;

    totalAmount =
      cart?.totalAmount || 0;
  }

  /*
  =====================================================
  PLACE ORDER
  =====================================================
  */

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error(
        "Please select a shipping address."
      );

      return;
    }

    if (!paymentMethod) {
      toast.error(
        "Please select a payment method."
      );

      return;
    }

    if (
      isDirectCheckout &&
      (!directCheckout?.productId ||
        !directCheckout?.color ||
        !directCheckout?.size ||
        !directCheckout?.quantity)
    ) {
      toast.error(
        "Invalid Buy Now item."
      );

      clearDirectCheckout();

      navigate("/shop");

      return;
    }

    try {
      const response = await placeOrder({
        addressId: selectedAddress._id,
        paymentMethod,
        couponCode,

        buyNowItem: isDirectCheckout
          ? directCheckout
          : undefined,
      });

      toast.success(
        response?.message ||
          "Order Placed Successfully!"
      );

      /*
        Clear direct checkout after successful
        order creation.
      */

      if (isDirectCheckout) {
        clearDirectCheckout();
      }

      navigate("/order-success", {
        state: {
          order:
            response?.data ||
            response,
        },
      });
    } catch (error) {
      console.error(
        "Order error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to place order."
      );
    }
  };

  return (
    <div className="sticky top-24 rounded-2xl bg-white shadow-md p-6">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-6">

        <FaShoppingBag
          className="text-[#6B1028]"
          size={22}
        />

        <h2 className="text-2xl font-semibold text-[#6B1028]">
          Order Summary
        </h2>

      </div>

      {/* BUY NOW INDICATOR */}

      {isDirectCheckout && (
        <div className="mb-5 rounded-xl bg-[#F9F4EC] border border-[#EADFD8] p-4">

          <p className="text-sm font-semibold text-[#6B1028]">
            Buy Now
          </p>

          <p className="text-xs text-gray-500 mt-1">
            You're purchasing only the selected
            product.
          </p>

        </div>
      )}

      {/* SUMMARY */}

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Items</span>

          <span>
            {itemsCount}
          </span>
        </div>

        {!isDirectCheckout && (
          <>
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>
                ₹{subtotal}
              </span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>

              <span>
                - ₹{discount}
              </span>
            </div>

            <div className="flex justify-between">

              <span>
                Shipping
              </span>

              <span className="text-green-600 font-medium">
                FREE
              </span>

            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">

              <span>
                Total
              </span>

              <span className="text-[#6B1028]">
                ₹{totalAmount}
              </span>

            </div>
          </>
        )}

        {isDirectCheckout && (
          <div className="rounded-xl bg-gray-50 p-4">

            <p className="text-sm text-gray-500">
              Product
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              Selected product
            </p>

            <div className="mt-3 text-sm space-y-1">

              <p>
                Color:{" "}
                <strong>
                  {directCheckout.color}
                </strong>
              </p>

              <p>
                Size:{" "}
                <strong>
                  {directCheckout.size}
                </strong>
              </p>

              <p>
                Quantity:{" "}
                <strong>
                  {directCheckout.quantity}
                </strong>
              </p>

            </div>

            <p className="text-xs text-gray-500 mt-4">
              Final price and shipping will be
              calculated securely when placing the
              order.
            </p>

          </div>
        )}

      </div>

      {/* COUPON */}

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
              setCouponCode(
                e.target.value
              )
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

      {/* PLACE ORDER */}

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-[#6B1028] py-4 text-white font-semibold hover:bg-[#54101f] transition disabled:opacity-60"
      >
        {loading
          ? "Placing Order..."
          : "Place Order"}
      </button>

    </div>
  );
};

export default CheckoutSummary;