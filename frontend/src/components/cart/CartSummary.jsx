import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!cart?.items?.length) {
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="sticky top-24 h-fit rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-serif">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Items</span>
          <span>{cart?.totalItems || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{cart?.subtotal || 0}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- ₹{cart?.totalDiscount || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-green-600">
            FREE
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-[#6B1028]">
            ₹{cart?.totalAmount || 0}
          </span>
        </div>

      </div>

      <button
        onClick={handleCheckout}
        disabled={!cart?.items?.length}
        className={`mt-8 w-full rounded-xl py-4 font-semibold transition-all duration-300 ${
          cart?.items?.length
            ? "bg-[#6B1028] text-white hover:bg-[#4d0c1d]"
            : "cursor-not-allowed bg-gray-300 text-gray-500"
        }`}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;