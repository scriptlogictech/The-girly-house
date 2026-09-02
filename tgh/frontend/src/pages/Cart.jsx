import { useCart } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

const Cart = () => {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        Loading Cart...
      </div>
    );
  }

  if (!cart.items.length) {
    return <EmptyCart />;
  }

  return (
    <section className="bg-[#FFFDFC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-serif text-[#6B1028] mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2 space-y-6">

            {cart.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))}

          </div>

          {/* Right */}

          <CartSummary />

        </div>

      </div>
    </section>
  );
};

export default Cart;