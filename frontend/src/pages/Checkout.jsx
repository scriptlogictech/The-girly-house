import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import AddressSection from "../components/checkout/AddressSection";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

import "./Checkout.css";

const Checkout = () => {
  const { user } = useAuth();

  const {
    cart,
    directCheckout,
  } = useCart();

  // =====================================
  // LOGIN CHECK
  // =====================================

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =====================================
  // CHECKOUT SOURCE
  // =====================================

  const hasDirectCheckout =
    !!directCheckout;

  const hasCartItems =
    cart?.items?.length > 0;

  // =====================================
  // EMPTY CHECKOUT
  // =====================================

  if (!hasDirectCheckout && !hasCartItems) {
    return (
      <Navigate
        to="/cart"
        replace
      />
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        {/* =====================================
            HEADING
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="checkout-header"
        >
          <h1>
            Checkout
          </h1>

          <p>
            Complete your purchase securely.
          </p>
        </motion.div>

        {/* =====================================
            MAIN LAYOUT
        ===================================== */}

        <div className="checkout-layout">

          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <div className="checkout-left">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <AddressSection />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              <PaymentMethod />
            </motion.div>

          </div>

          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <div className="checkout-right">

            <div className="checkout-summary-wrapper">

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
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