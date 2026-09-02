import { FaMoneyBillWave, FaCreditCard, FaUniversity } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { motion } from "framer-motion";

import { useCheckout } from "../../context/CheckoutContext";

const methods = [
  {
    id: "COD",
    title: "Cash on Delivery",
    icon: <FaMoneyBillWave size={22} />,
    description: "Pay when your order arrives",
  },
  {
    id: "RAZORPAY",
    title: "Razorpay",
    icon: <FaCreditCard size={22} />,
    description: "Cards, UPI, Net Banking",
  },
  {
    id: "UPI",
    title: "UPI",
    icon: <SiPhonepe size={22} />,
    description: "Google Pay, PhonePe, Paytm",
  },
  {
    id: "BANK",
    title: "Bank Transfer",
    icon: <FaUniversity size={22} />,
    description: "Direct Bank Transfer",
  },
];

const PaymentMethod = () => {
  const {
    paymentMethod,
    setPaymentMethod,
  } = useCheckout();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-2xl font-semibold text-[#6B1028] mb-2">
        Payment Method
      </h2>

      <p className="text-gray-500 mb-6">
        Select your preferred payment option.
      </p>

      <div className="space-y-4">

        {methods.map((method) => (

          <div
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`cursor-pointer rounded-xl border p-5 transition-all duration-300
            ${
              paymentMethod === method.id
                ? "border-[#6B1028] bg-[#FFF5F7]"
                : "border-gray-200 hover:border-[#6B1028]"
            }`}
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="text-[#6B1028]">
                  {method.icon}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {method.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {method.description}
                  </p>

                </div>

              </div>

              <input
                type="radio"
                checked={paymentMethod === method.id}
                onChange={() => setPaymentMethod(method.id)}
                className="accent-[#6B1028] h-5 w-5"
              />

            </div>

          </div>

        ))}

      </div>

    </motion.div>
  );
};

export default PaymentMethod;