import { FaEye } from "react-icons/fa";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderTable = ({
  orders = [],
  loading,
  onView,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        Loading Orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        No Orders Found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Order
            </th>

            <th className="px-4 py-3 text-left">
              Customer
            </th>

            <th className="px-4 py-3 text-left">
              Date
            </th>

            <th className="px-4 py-3 text-left">
              Total
            </th>

            <th className="px-4 py-3 text-left">
              Payment
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order._id}
              className="border-t hover:bg-pink-50 transition"
            >

              <td className="px-4 py-4">

                <div className="font-semibold">
                  {order.orderNumber}
                </div>

                <div className="text-xs text-gray-500">
                  {order.items.length} Item(s)
                </div>

              </td>

              <td className="px-4 py-4">

                <div className="font-medium">
                  {order.user?.name}
                </div>

                <div className="text-xs text-gray-500">
                  {order.user?.email}
                </div>

              </td>

              <td className="px-4 py-4">

                {new Date(
                  order.createdAt
                ).toLocaleDateString()}

              </td>

              <td className="px-4 py-4 font-semibold">

                ₹{order.totalAmount}

              </td>

              <td className="px-4 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>

              </td>

              <td className="px-4 py-4">

                <OrderStatusBadge
                  status={order.orderStatus}
                />

              </td>

              <td className="px-4 py-4">

                <div className="flex justify-center">

                  <button
                    onClick={() => onView(order)}
                    className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-lg"
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
  );
};

export default OrderTable;