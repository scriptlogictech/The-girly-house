import { useState } from "react";
import { updateOrderStatus } from "../../services/orderService";

const OrderDetailsModal = ({
  order,
  onClose,
  onUpdated,
}) => {
  const [status, setStatus] = useState(
    order.orderStatus
  );

  const [loading, setLoading] =
    useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateOrderStatus(
        order._id,
        status
      );

      alert("Order status updated.");

      onUpdated();

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to update status."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl relative">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">
              Order Details
            </h2>

            <p className="text-gray-500 mt-1">
              {order.orderNumber}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <div className="p-6 space-y-8">

          {/* Top Grid */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* Customer */}

            <div className="border rounded-xl p-5">

              <h3 className="text-lg font-bold mb-4">
                Customer Information
              </h3>

              <div className="space-y-2">

                <p>

                  <strong>Name :</strong>{" "}

                  {order.user?.name}

                </p>

                <p>

                  <strong>Email :</strong>{" "}

                  {order.user?.email}

                </p>

                <p>

                  <strong>Phone :</strong>{" "}

                  {order.user?.phone}

                </p>

              </div>

            </div>

            {/* Payment */}

            <div className="border rounded-xl p-5">

              <h3 className="text-lg font-bold mb-4">
                Payment
              </h3>

              <div className="space-y-2">

                <p>

                  <strong>Method :</strong>{" "}

                  {order.paymentMethod}

                </p>

                <p>

                  <strong>Status :</strong>{" "}

                  {order.paymentStatus}

                </p>

                <p>

                  <strong>Total :</strong>{" "}

                  ₹{order.totalAmount}

                </p>

              </div>

            </div>

          </div>

          {/* Shipping */}

          <div className="border rounded-xl p-5">

            <h3 className="text-lg font-bold mb-4">
              Shipping Address
            </h3>

            <div className="space-y-2">

              <p>

                {order.shippingAddress?.fullName}

              </p>

              <p>

                {order.shippingAddress?.house},{" "}

                {order.shippingAddress?.street}

              </p>

              <p>

                {order.shippingAddress?.landmark}

              </p>

              <p>

                {order.shippingAddress?.city},{" "}

                {order.shippingAddress?.state}

              </p>

              <p>

                {order.shippingAddress?.pincode}

              </p>

              <p>

                {order.shippingAddress?.phone}

              </p>

            </div>

          </div>

          {/* Products */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              Ordered Products
            </h3>

            <div className="space-y-4">

              {order.items.map(
                (item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4 flex gap-5"
                  >

                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-24 h-24 rounded-lg object-cover border"
                    />

                    <div className="flex-1">

                      <h4 className="font-bold text-lg">
                        {item.productName}
                      </h4>

                      <div className="grid grid-cols-2 gap-2 mt-3">

                        <p>

                          <strong>Color :</strong>{" "}

                          {item.color}

                        </p>

                        <p>

                          <strong>Size :</strong>{" "}

                          {item.size}

                        </p>

                        <p>

                          <strong>Qty :</strong>{" "}

                          {item.quantity}

                        </p>

                        <p>

                          <strong>Price :</strong>{" "}

                          ₹{item.discountPrice}

                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


                    {/* Order Summary */}

          <div className="border rounded-xl p-5">

            <h3 className="text-xl font-bold mb-5">
              Order Summary
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ₹{order.discount}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingCharge}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold text-pink-600">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>

            </div>

          </div>

          {/* Update Status */}

          <div className="border rounded-xl p-5">

            <h3 className="text-xl font-bold mb-5">
              Update Order Status
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="border rounded-lg p-3"
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg px-6 py-3 disabled:opacity-50"
              >
                {loading
                  ? "Updating..."
                  : "Update Status"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetailsModal;