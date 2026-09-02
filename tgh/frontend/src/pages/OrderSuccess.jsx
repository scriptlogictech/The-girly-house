import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaTruck } from "react-icons/fa";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = state?.order;

  if (!order) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFF9FA] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8"
      >
        {/* Success Icon */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
            }}
          >
            <FaCheckCircle
              size={90}
              className="text-green-500"
            />
          </motion.div>
        </div>

        {/* Heading */}

        <h1 className="mt-6 text-center text-4xl font-bold text-[#6B1028]">
          Order Placed!
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Thank you for shopping with
          <span className="font-semibold text-[#6B1028]">
            {" "}
            The Girly House
          </span>
        </p>

        {/* Order Card */}

        <div className="mt-10 rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">
              Order Number
            </span>

            <span className="font-semibold">
              {order.orderNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Payment
            </span>

            <span>{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Order Status
            </span>

            <span className="text-green-600 font-semibold">
              {order.orderStatus}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Total Amount
            </span>

            <span className="font-bold text-[#6B1028]">
              ₹{order.totalAmount}
            </span>
          </div>
        </div>

        {/* Delivery */}

        <div className="mt-8 rounded-2xl bg-[#FFF3F6] p-5 flex items-center gap-4">
          <FaTruck
            className="text-[#6B1028]"
            size={30}
          />

          <div>
            <h3 className="font-semibold">
              Estimated Delivery
            </h3>

            <p className="text-sm text-gray-600">
              Within 4–7 business days
            </p>
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 rounded-xl bg-[#6B1028] py-3 text-white font-semibold hover:bg-[#551021] transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="flex-1 rounded-xl border border-[#6B1028] py-3 text-[#6B1028] font-semibold hover:bg-[#6B1028] hover:text-white transition flex items-center justify-center gap-2"
          >
            <FaShoppingBag />
            My Orders
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;