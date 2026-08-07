import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <section className="min-h-[70vh] flex justify-center items-center">

      <div className="text-center">

        <FaShoppingBag
          size={70}
          className="mx-auto text-[#6B1028]"
        />

        <h2 className="text-3xl font-serif mt-6">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-8 px-8 py-3 bg-[#6B1028] text-white rounded-xl hover:bg-[#4d0c1d]"
        >
          Continue Shopping
        </Link>

      </div>

    </section>
  );
};

export default EmptyCart;