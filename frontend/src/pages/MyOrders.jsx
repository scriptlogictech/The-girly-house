import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaShoppingBag,
  FaEye,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { getMyOrders } from "../services/orderService";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH CUSTOMER ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await getMyOrders();

      if (response?.success) {
        setOrders(response.data || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(
        "Fetch My Orders Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to load your orders."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] py-12">
        <div className="max-w-7xl mx-auto px-4">

          <div className="mb-10">
            <h1 className="text-4xl font-serif text-[#6B1028]">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Track and manage your previous orders.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-[#6B1028] border-t-transparent rounded-full mx-auto" />

            <p className="text-gray-500 mt-5">
              Loading your orders...
            </p>
          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // EMPTY ORDERS
  // ==========================================

  if (orders.length === 0) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] py-12">
        <div className="max-w-7xl mx-auto px-4">

          <div className="mb-10">
            <h1 className="text-4xl font-serif text-[#6B1028]">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Track and manage your previous orders.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-[#F9F4EC] flex items-center justify-center">
              <FaShoppingBag
                className="text-[#6B1028]"
                size={26}
              />
            </div>

            <h2 className="text-3xl font-semibold mt-6 mb-4">
              No Orders Found
            </h2>

            <p className="text-gray-500 mb-8">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition"
            >
              Start Shopping
            </Link>

          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // ORDERS
  // ==========================================

  return (
    <section className="min-h-screen bg-[#FFFDFC] py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}

        <div className="mb-10">

          <h1 className="text-4xl font-serif text-[#6B1028]">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track and manage your previous orders.
          </p>

        </div>

        {/* ORDERS */}

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >

              {/* ORDER HEADER */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <div>

                  <h2 className="text-xl font-semibold text-[#6B1028]">
                    Order #{order.orderNumber}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Placed on{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      order.orderStatus ===
                      "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus ===
                          "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.orderStatus ===
                          "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </div>

              </div>

              {/* ==================================
                  PRODUCTS
              ================================== */}

              <div className="space-y-4">

                {order.items?.map(
                  (item, index) => (

                    <div
                      key={`${order._id}-${index}`}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-[#FFFDFC] border border-gray-100"
                    >

                      {/* PRODUCT IMAGE */}

                      <div className="w-full sm:w-28 h-32 sm:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

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
                                "https://placehold.co/300x300?text=Product";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FaShoppingBag
                              size={30}
                            />
                          </div>
                        )}

                      </div>

                      {/* PRODUCT INFO */}

                      <div className="flex-1">

                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.productName}
                        </h3>

                        <div className="mt-2 text-sm text-gray-500 space-y-1">

                          <p>
                            Color:{" "}
                            <span className="font-medium text-gray-700">
                              {item.color}
                            </span>
                          </p>

                          <p>
                            Size:{" "}
                            <span className="font-medium text-gray-700">
                              {item.size}
                            </span>
                          </p>

                          <p>
                            Quantity:{" "}
                            <span className="font-medium text-gray-700">
                              {item.quantity}
                            </span>
                          </p>

                        </div>

                      </div>

                      {/* PRODUCT PRICE */}

                      <div className="sm:text-right">

                        <p className="text-sm text-gray-500">
                          Price
                        </p>

                        <p className="text-lg font-bold text-[#6B1028]">
                          ₹
                          {Number(
                            item.discountPrice ||
                              item.price ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        {item.price >
                          item.discountPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹
                            {Number(
                              item.price
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* ==================================
                  ORDER FOOTER
              ================================== */}

              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                {/* ITEMS */}

                <div>

                  <p className="text-sm text-gray-500">
                    {order.items?.length || 0}{" "}
                    {order.items?.length === 1
                      ? "Item"
                      : "Items"}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Payment:{" "}
                    <span
                      className={`font-medium ${
                        order.paymentStatus ===
                        "Paid"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </p>

                </div>

                {/* TOTAL */}

                <div>

                  <p className="text-sm text-gray-500">
                    Order Total
                  </p>

                  <h3 className="text-2xl font-bold text-[#6B1028]">
                    ₹
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </h3>

                </div>

                {/* VIEW DETAILS */}

                <Link
                  to={`/orders/${order._id}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#6B1028] hover:bg-[#541020] text-white px-6 py-3 rounded-lg transition"
                >
                  <FaEye />

                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default MyOrders;