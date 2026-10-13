

import { FaEye, FaShoppingBag } from "react-icons/fa";
import OrderStatusBadge from "./OrderStatusBadge";

const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OrderTable = ({
  orders = [],
  loading = false,
  onView,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B1028]" />

        <p className="mt-4 text-sm text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white px-4 py-12 text-center shadow-sm sm:py-16">
        <FaShoppingBag className="mx-auto text-4xl text-gray-300" />

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          No Orders Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Orders matching your search or selected status will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {/* Mobile Order Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => (
          <article
            key={order._id}
            className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            {/* Order Number and Date */}
            <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Order Number
                </p>

                <p className="mt-1 break-words font-bold text-gray-900">
                  {order.orderNumber || "—"}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs text-gray-500">Total</p>

                <p className="mt-1 text-lg font-bold text-[#6B1028]">
                  {formatPrice(order.totalAmount)}
                </p>
              </div>
            </div>

            {/* Customer */}
            <div className="py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Customer
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                {order.user?.name || "Guest Customer"}
              </p>

              {order.user?.email && (
                <p className="mt-1 break-all text-xs text-gray-500">
                  {order.user.email}
                </p>
              )}
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 py-3">
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Items</p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {order.items?.length || 0}{" "}
                  {(order.items?.length || 0) === 1 ? "Item" : "Items"}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Payment</p>

                <div className="mt-1">
                  <span
                    className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-xs font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "Failed"
                          ? "bg-red-100 text-red-700"
                          : order.paymentStatus === "Refunded"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status and Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
              <div className="min-w-0">
                <p className="mb-1 text-xs text-gray-500">
                  Order Status
                </p>

                <OrderStatusBadge status={order.orderStatus} />
              </div>

              <button
                type="button"
                onClick={() => onView?.(order)}
                aria-label={`View order ${order.orderNumber || ""}`}
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#520b1e]"
              >
                <FaEye />
                View Order
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Tablet and Desktop Table */}
      <div className="hidden min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-4 text-left font-semibold">
                  Order
                </th>

                <th className="px-4 py-4 text-left font-semibold">
                  Customer
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left font-semibold">
                  Date
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left font-semibold">
                  Total
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left font-semibold">
                  Payment
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left font-semibold">
                  Status
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="transition hover:bg-[#6B1028]/5"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900">
                      {order.orderNumber || "—"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {order.items?.length || 0} Item(s)
                    </p>
                  </td>

                  <td className="max-w-[220px] px-4 py-4">
                    <p className="break-words font-medium text-gray-800">
                      {order.user?.name || "Guest Customer"}
                    </p>

                    {order.user?.email && (
                      <p className="mt-1 break-all text-xs text-gray-500">
                        {order.user.email}
                      </p>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "Failed"
                            ? "bg-red-100 text-red-700"
                            : order.paymentStatus === "Refunded"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus || "Pending"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <OrderStatusBadge status={order.orderStatus} />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => onView?.(order)}
                        aria-label={`View order ${order.orderNumber || ""}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#6B1028] text-white transition hover:bg-[#520b1e]"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;