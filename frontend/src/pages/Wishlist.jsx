// Placeholder file
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const wishlistItems = [];

  return (
    <section className="min-h-screen bg-[#FFFDFC] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif text-[#6B1028]">
            My Wishlist
          </h1>

          <p className="text-gray-500 mt-2">
            Save your favorite products for later.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="flex justify-center mb-6">
              <FaHeart className="text-6xl text-[#6B1028]" />
            </div>

            <h2 className="text-3xl font-semibold mb-4">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Browse our latest collection and add your favourite products.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Wishlist products will come here */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;