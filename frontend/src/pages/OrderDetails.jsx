import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaShoppingBag,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";

import { toast } from "react-toastify";

import {
  getOrderById,
  cancelOrder,
} from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  // ==========================================
  // FETCH ORDER
  // ==========================================

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const response = await getOrderById(id);

      if (response?.success) {
        setOrder(response.data);
      } else {
        throw new Error(
          response?.message ||
            "Order not found."
        );
      }
    } catch (error) {
      console.error(
        "Fetch Order Details Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load order details."
      );

      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ORDER
  // ==========================================

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async () => {
    if (!order?._id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);

      const response =
        await cancelOrder(order._id);

      toast.success(
        response?.message ||
          "Order cancelled successfully."
      );

      await fetchOrder();
    } catch (error) {
      console.error(
        "Cancel Order Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to cancel order."
      );
    } finally {
      setCancelling(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] py-12">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center gap-3 mb-8">
            <Link
              to="/orders"
              className="text-[#6B1028] hover:text-[#541020] transition"
            >
              <FaArrowLeft size={18} />
            </Link>

            <h1 className="text-4xl font-serif text-[#6B1028]">
              Order Details
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <div className="animate-spin h-10 w-10 border-4 border-[#6B1028] border-t-transparent rounded-full mx-auto" />

            <p className="text-gray-500 mt-5">
              Loading order details...
            </p>

          </div>

        </div>

      </section>
    );
  }

  // ==========================================
  // ORDER NOT FOUND
  // ==========================================

  if (!order) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] py-12">

        <div className="max-w-7xl mx-auto px-4">

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-[#F9F4EC] flex items-center justify-center">
              <FaBoxOpen
                className="text-[#6B1028]"
                size={28}
              />
            </div>

            <h1 className="text-3xl font-semibold mt-6">
              Order Not Found
            </h1>

            <p className="text-gray-500 mt-3 mb-8">
              We couldn't find the order you're
              looking for.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/orders")
              }
              className="bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition"
            >
              Back to My Orders
            </button>

          </div>

        </div>

      </section>
    );
  }

  // ==========================================
  // STATUS COLOR
  // ==========================================

  const getStatusClasses = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-purple-100 text-purple-700";

      case "Confirmed":
        return "bg-indigo-100 text-indigo-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ==========================================
  // STATUS ICON
  // ==========================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle />;

      case "Cancelled":
        return <FaTimesCircle />;

      case "Shipped":
        return <FaTruck />;

      case "Processing":
        return <FaBoxOpen />;

      default:
        return <FaClock />;
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  // ==========================================
  // CAN CANCEL
  // ==========================================

  const canCancel =
    ![
      "Shipped",
      "Delivered",
      "Cancelled",
    ].includes(order.orderStatus);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="min-h-screen bg-[#FFFDFC] py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div className="flex items-center gap-4">

            <Link
              to="/orders"
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#6B1028] hover:bg-[#F9F4EC] transition"
            >
              <FaArrowLeft />
            </Link>

            <div>

              <h1 className="text-3xl md:text-4xl font-serif text-[#6B1028]">
                Order Details
              </h1>

              <p className="text-gray-500 mt-1">
                Order #{order.orderNumber}
              </p>

            </div>

          </div>

          {/* ORDER STATUS */}

          <div
            className={`inline-flex self-start md:self-auto items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold ${getStatusClasses(
              order.orderStatus
            )}`}
          >
            {getStatusIcon(
              order.orderStatus
            )}

            {order.orderStatus}
          </div>

        </div>

        {/* ======================================
            ORDER BASIC INFORMATION
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* ORDER NUMBER */}

            <div>
              <p className="text-sm text-gray-400">
                Order Number
              </p>

              <p className="font-semibold text-gray-800 mt-1 break-all">
                {order.orderNumber}
              </p>
            </div>

            {/* ORDER DATE */}

            <div>
              <p className="text-sm text-gray-400">
                Order Date
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {formatDate(
                  order.createdAt
                )}
              </p>
            </div>

            {/* PAYMENT METHOD */}

            <div>
              <p className="text-sm text-gray-400">
                Payment Method
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {order.paymentMethod ===
                "RAZORPAY"
                  ? "Razorpay"
                  : "Cash on Delivery"}
              </p>
            </div>

            {/* PAYMENT STATUS */}

            <div>
              <p className="text-sm text-gray-400">
                Payment Status
              </p>

              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.paymentStatus ===
                  "Paid"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus ===
                      "Failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

          </div>

        </div>

        {/* ======================================
            MAIN GRID
        ====================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ====================================
              LEFT SIDE
          ==================================== */}

          <div className="lg:col-span-2 space-y-6">

            {/* ==================================
                PRODUCTS
            ================================== */}

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

              <div className="flex items-center gap-3 mb-6">

                <FaShoppingBag
                  className="text-[#6B1028]"
                  size={20}
                />

                <h2 className="text-2xl font-semibold text-[#6B1028]">
                  Ordered Items
                </h2>

              </div>

              <div className="space-y-5">

                {order.items?.map(
                  (item, index) => (

                    <div
                      key={`${order._id}-${index}`}
                      className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-[#FFFDFC] border border-gray-100"
                    >

                      {/* PRODUCT IMAGE */}

                      <div className="w-full sm:w-32 h-40 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={
                              item.productName ||
                              "Product"
                            }
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/400x400?text=Product";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FaShoppingBag
                              size={35}
                            />
                          </div>
                        )}

                      </div>

                      {/* PRODUCT DETAILS */}

                      <div className="flex-1">

                        <h3 className="text-xl font-semibold text-gray-800">
                          {item.productName}
                        </h3>

                        <div className="mt-3 space-y-2 text-sm text-gray-500">

                          <p>
                            Color:{" "}
                            <span className="font-medium text-gray-800">
                              {item.color}
                            </span>
                          </p>

                          <p>
                            Size:{" "}
                            <span className="font-medium text-gray-800">
                              {item.size}
                            </span>
                          </p>

                          <p>
                            Quantity:{" "}
                            <span className="font-medium text-gray-800">
                              {item.quantity}
                            </span>
                          </p>

                        </div>

                      </div>

                      {/* PRICE */}

                      <div className="sm:text-right">

                        <p className="text-sm text-gray-400">
                          Price
                        </p>

                        <p className="text-xl font-bold text-[#6B1028] mt-1">
                          ₹
                          {formatPrice(
                            item.discountPrice ||
                              item.price
                          )}
                        </p>

                        {Number(
                          item.price || 0
                        ) >
                          Number(
                            item.discountPrice ||
                              0
                          ) && (
                          <p className="text-sm text-gray-400 line-through mt-1">
                            ₹
                            {formatPrice(
                              item.price
                            )}
                          </p>
                        )}

                        <p className="text-xs text-gray-400 mt-2">
                          Qty: {item.quantity}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* ==================================
                SHIPPING ADDRESS
            ================================== */}

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

              <div className="flex items-center gap-3 mb-5">

                <FaMapMarkerAlt
                  className="text-[#6B1028]"
                  size={20}
                />

                <h2 className="text-2xl font-semibold text-[#6B1028]">
                  Shipping Address
                </h2>

              </div>

              {order.shippingAddress ? (
                <div className="bg-[#FFFDFC] border border-gray-100 rounded-xl p-5">

                  <h3 className="font-semibold text-gray-800 text-lg">
                    {
                      order.shippingAddress
                        .fullName
                    }
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {
                      order.shippingAddress
                        .house
                    }
                    ,{" "}
                    {
                      order.shippingAddress
                        .street
                    }
                  </p>

                  {order.shippingAddress
                    .landmark && (
                    <p className="text-gray-600">
                      Landmark:{" "}
                      {
                        order.shippingAddress
                          .landmark
                      }
                    </p>
                  )}

                  <p className="text-gray-600">
                    {
                      order.shippingAddress
                        .city
                    }
                    ,{" "}
                    {
                      order.shippingAddress
                        .state
                    }{" "}
                    -{" "}
                    {
                      order.shippingAddress
                        .pincode
                    }
                  </p>

                  <p className="text-gray-600">
                    {
                      order.shippingAddress
                        .country
                    }
                  </p>

                  <p className="text-gray-600 mt-3">
                    Phone:{" "}
                    {
                      order.shippingAddress
                        .phone
                    }
                  </p>

                </div>
              ) : (
                <p className="text-gray-500">
                  Shipping address not available.
                </p>
              )}

            </div>

          </div>

          {/* ====================================
              RIGHT SIDE
          ==================================== */}

          <div className="space-y-6">

            {/* ==================================
                ORDER SUMMARY
            ================================== */}

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 lg:sticky lg:top-24">

              <h2 className="text-2xl font-semibold text-[#6B1028] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                {/* SUBTOTAL */}

                <div className="flex justify-between text-gray-600">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹
                    {formatPrice(
                      order.subtotal
                    )}
                  </span>

                </div>

                {/* DISCOUNT */}

                <div className="flex justify-between text-green-600">

                  <span>
                    Discount
                  </span>

                  <span className="font-medium">
                    - ₹
                    {formatPrice(
                      order.discount
                    )}
                  </span>

                </div>

                {/* SHIPPING */}

                <div className="flex justify-between text-gray-600">

                  <span>
                    Shipping
                  </span>

                  <span className="font-medium">
                    {Number(
                      order.shippingCharge ||
                        0
                    ) === 0
                      ? "FREE"
                      : `₹${formatPrice(
                          order.shippingCharge
                        )}`}
                  </span>

                </div>

                <hr />

                {/* TOTAL */}

                <div className="flex justify-between items-center">

                  <span className="text-lg font-semibold text-gray-800">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#6B1028]">
                    ₹
                    {formatPrice(
                      order.totalAmount
                    )}
                  </span>

                </div>

              </div>

              {/* PAYMENT */}

              <div className="mt-6 pt-6 border-t border-gray-100">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-[#F9F4EC] flex items-center justify-center">
                    <FaMoneyBillWave
                      className="text-[#6B1028]"
                    />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Payment
                    </p>

                    <p className="font-semibold text-gray-800">
                      {order.paymentMethod ===
                      "RAZORPAY"
                        ? "Razorpay"
                        : "Cash on Delivery"}
                    </p>

                  </div>

                </div>

              </div>

              {/* CANCEL BUTTON */}

              {canCancel && (
                <button
                  type="button"
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="w-full mt-6 border border-red-500 text-red-600 hover:bg-red-50 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelling
                    ? "Cancelling..."
                    : "Cancel Order"}
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default OrderDetails;