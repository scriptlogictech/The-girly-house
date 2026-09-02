import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import AddressSection from "../components/checkout/AddressSection";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

const Checkout = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if cart is empty
  if (!cart?.items?.length) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FFFDFC] py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-[#6B1028]">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your purchase securely.
          </p>
        </motion.div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <AddressSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PaymentMethod />
            </motion.div>

          </div>

          {/* Right Side */}

          <div>

            <div className="sticky top-24">

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CheckoutSummary />
              </motion.div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;