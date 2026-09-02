import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import useTrendingProducts from "../../hooks/useTrendingProducts";
import ProductCard from "../shop/ProductCard";

const TrendingProducts = () => {
  const { products, loading } = useTrendingProducts();

  if (loading) {
    return (
      <section className="py-10 bg-[#faf7f2]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center">
            Loading Trending Products...
          </h2>
        </div>
      </section>
    );
  }

  if (!products.length) {
  return (
    <section className="py-10 text-center">
      <h2 className="text-3xl font-bold">Trending Products</h2>
      <p className="mt-4 text-red-500">
        No trending products found.
      </p>
    </section>
  );
}

  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="container mx-auto px-4">

        {/* Heading */}

        <div className="flex justify-between items-center mb-12">

          <div>

            <p className="text-[#6B1028] uppercase tracking-[3px] text-sm font-semibold">
              TRENDING NOW
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              Trending Products
            </h2>

            <p className="text-gray-500 mt-3">
              Discover the latest styles loved by our customers.
            </p>

          </div>

          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-[#6B1028] font-semibold hover:gap-3 transition-all"
          >
            View All
            <FaArrowRight />
          </Link>

        </div>

        {/* Products */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

        {/* Mobile Button */}

        <div className="mt-10 flex justify-center md:hidden">

          <Link
            to="/shop"
            className="bg-[#6B1028] text-white px-8 py-3 rounded-full"
          >
            View All Products
          </Link>

        </div>

      </div>


      
    </section>
  );
};

export default TrendingProducts;