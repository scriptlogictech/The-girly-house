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
    createRazorpayPayment,
    verifyRazorpayPayment,
    loading,
  } = useCheckout();

  const [couponCode, setCouponCode] =
    useState("");

  const [paymentProcessing, setPaymentProcessing] =
    useState(false);

  // ==========================================
  // DIRECT CHECKOUT
  // ==========================================

  const isDirectCheckout =
    !!directCheckout;

  // ==========================================
  // CART SUMMARY
  // ==========================================

  let itemsCount = 0;
  let subtotal = 0;
  let discount = 0;
  let totalAmount = 0;

  if (!isDirectCheckout) {
    itemsCount =
      cart?.totalItems || 0;

    subtotal =
      cart?.subtotal || 0;

    discount =
      cart?.totalDiscount || 0;

    totalAmount =
      cart?.totalAmount || 0;
  } else {
    itemsCount =
      directCheckout?.quantity || 0;
  }

  // ==========================================
  // COMPLETE ORDER SUCCESS
  // ==========================================

  const handleOrderSuccess = (response) => {
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
  };

  // ==========================================
  // COD ORDER
  // ==========================================

  const handleCODOrder = async () => {
    try {
      const response = await placeOrder({
        addressId: selectedAddress._id,
        paymentMethod: "COD",
        couponCode,

        buyNowItem: isDirectCheckout
          ? directCheckout
          : undefined,
      });

      toast.success(
        response?.message ||
          "Order Placed Successfully!"
      );

      handleOrderSuccess(response);
    } catch (error) {
      console.error(
        "COD Order Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to place order."
      );
    }
  };

  // ==========================================
  // RAZORPAY PAYMENT
  // ==========================================

  const handleRazorpayPayment = async () => {
    try {
      setPaymentProcessing(true);

      /*
      ==========================================
      STEP 1
      Create Razorpay order on backend
      ==========================================
      */

      const response =
        await createRazorpayPayment({
          addressId:
            selectedAddress._id,

          couponCode,

          buyNowItem: isDirectCheckout
            ? directCheckout
            : undefined,
        });

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to create payment order."
        );
      }

      const paymentData =
        response.data;

      /*
      ==========================================
      CHECK RAZORPAY SCRIPT
      ==========================================
      */

      if (
        !window.Razorpay
      ) {
        toast.error(
          "Razorpay is not loaded. Please refresh the page and try again."
        );

        return;
      }

      /*
      ==========================================
      STEP 2
      Razorpay Checkout Options
      ==========================================
      */

      const options = {
        key:
          paymentData.keyId,

        amount:
          paymentData.amount,

        currency:
          paymentData.currency || "INR",

        name:
          "The Girly House",

        description:
          "Fashion Order",

        order_id:
          paymentData.razorpayOrderId,

        handler:
          async function (
            razorpayResponse
          ) {
            try {
              setPaymentProcessing(true);

              /*
              ==================================
              STEP 3
              Verify Payment On Backend
              ==================================
              */

              const verificationResponse =
                await verifyRazorpayPayment({
                  razorpayOrderId:
                    razorpayResponse.razorpay_order_id,

                  razorpayPaymentId:
                    razorpayResponse.razorpay_payment_id,

                  razorpaySignature:
                    razorpayResponse.razorpay_signature,
                });

              if (
                !verificationResponse?.success
              ) {
                throw new Error(
                  verificationResponse?.message ||
                    "Payment verification failed."
                );
              }

              toast.success(
                "Payment successful! Your order has been placed."
              );

              handleOrderSuccess(
                verificationResponse
              );
            } catch (error) {
              console.error(
                "Payment Verification Error:",
                error
              );

              toast.error(
                error?.response?.data?.message ||
                  error?.message ||
                  "Payment verification failed."
              );
            } finally {
              setPaymentProcessing(false);
            }
          },

        /*
        ========================================
        CUSTOMER INFORMATION
        ========================================
        */

        prefill: {
          name:
            selectedAddress?.fullName ||
            "",

          contact:
            selectedAddress?.phone ||
            "",
        },

        /*
        ========================================
        BRANDING
        ========================================
        */

        theme: {
          color: "#6B1028",
        },

        /*
        ========================================
        MODAL
        ========================================
        */

        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);

            toast.info(
              "Payment was cancelled."
            );
          },
        },
      };

      /*
      ==========================================
      STEP 4
      Open Razorpay
      ==========================================
      */

      const razorpay =
        new window.Razorpay(
          options
        );

      /*
      ==========================================
      PAYMENT FAILURE
      ==========================================
      */

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay Payment Failed:",
            response
          );

          setPaymentProcessing(false);

          toast.error(
            response?.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay Order Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to start Razorpay payment."
      );
    } finally {
      /*
        We don't immediately consider the whole
        process finished here because the Razorpay
        popup may still be open.

        The handler / modal callbacks will update
        paymentProcessing.
      */

      setPaymentProcessing(false);
    }
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {
    /*
    ==========================================
    ADDRESS VALIDATION
    ==========================================
    */

    if (!selectedAddress) {
      toast.error(
        "Please select a shipping address."
      );

      return;
    }

    /*
    ==========================================
    PAYMENT METHOD VALIDATION
    ==========================================
    */

    if (!paymentMethod) {
      toast.error(
        "Please select a payment method."
      );

      return;
    }

    /*
    ==========================================
    BUY NOW VALIDATION
    ==========================================
    */

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

    /*
    ==========================================
    PAYMENT METHOD
    ==========================================
    */

    if (
      paymentMethod === "RAZORPAY"
    ) {
      await handleRazorpayPayment();

      return;
    }

    /*
    ==========================================
    COD
    ==========================================
    */

    if (
      paymentMethod === "COD"
    ) {
      await handleCODOrder();

      return;
    }

    /*
    ==========================================
    OTHER METHODS
    ==========================================
    */

    toast.info(
      "This payment method is not available yet."
    );
  };

  // ==========================================
  // BUTTON TEXT
  // ==========================================

  const isProcessing =
    loading ||
    paymentProcessing;

  const getButtonText = () => {
    if (paymentProcessing) {
      return paymentMethod === "RAZORPAY"
        ? "Opening Payment..."
        : "Processing...";
    }

    if (loading) {
      return "Processing...";
    }

    if (
      paymentMethod === "RAZORPAY"
    ) {
      return "Pay with Razorpay";
    }

    return "Place Order";
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="sticky top-24 rounded-2xl bg-white shadow-md p-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex items-center gap-3 mb-6">

        <FaShoppingBag
          className="text-[#6B1028]"
          size={22}
        />

        <h2 className="text-2xl font-semibold text-[#6B1028]">
          Order Summary
        </h2>

      </div>

      {/* ======================================
          BUY NOW INDICATOR
      ====================================== */}

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

      {/* ======================================
          SUMMARY
      ====================================== */}

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>
            Items
          </span>

          <span>
            {itemsCount}
          </span>

        </div>

        {!isDirectCheckout && (
          <>
            <div className="flex justify-between">

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>

            <div className="flex justify-between text-green-600">

              <span>
                Discount
              </span>

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

        {/* ====================================
            BUY NOW PRODUCT INFO
        ==================================== */}

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
              calculated securely by the server.
            </p>

          </div>
        )}

      </div>

      {/* ======================================
          COUPON
      ====================================== */}

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
            disabled={isProcessing}
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-[#6B1028] disabled:bg-gray-100"
          />

          <button
            type="button"
            disabled={isProcessing}
            className="rounded-xl border border-[#6B1028] px-5 text-[#6B1028] hover:bg-[#6B1028] hover:text-white transition disabled:opacity-50"
          >
            Apply
          </button>

        </div>

      </div>

      {/* ======================================
          PAYMENT BUTTON
      ====================================== */}

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={isProcessing}
        className="mt-8 w-full rounded-xl bg-[#6B1028] py-4 text-white font-semibold hover:bg-[#54101f] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {getButtonText()}
      </button>

    </div>
  );
};

export default CheckoutSummary;