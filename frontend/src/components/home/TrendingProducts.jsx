
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import useTrendingProducts from "../../hooks/useTrendingProducts";
import ProductCard from "../shop/ProductCard";

const TrendingProducts = () => {
  const { products, loading } = useTrendingProducts();

  if (loading) {
    return (
      <section className="bg-[#faf7f2] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-2xl font-bold text-[#6B1028] sm:text-3xl lg:text-4xl">
            Loading Trending Products...
          </h2>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="bg-[#faf7f2] px-4 py-12 text-center sm:py-16">
        <h2 className="font-serif text-2xl font-bold text-[#6B1028] sm:text-3xl">
          Trending Products
        </h2>

        <p className="mt-3 text-sm text-red-500 sm:text-base">
          No trending products found.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-[#faf7f2] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}

        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9 lg:mb-12">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#6B1028] sm:text-sm sm:tracking-[3px]">
              Trending Now
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-[#292323] sm:text-3xl md:text-4xl lg:text-5xl">
              Trending Products
            </h2>

            <p className="mt-2 max-w-xl text-xs leading-6 text-gray-500 sm:mt-3 sm:text-sm md:text-base">
              Discover the latest styles loved by our customers.
            </p>
          </div>

          {/* Desktop View All Button */}

          <Link
            to="/shop"
            className="mb-1 hidden shrink-0 items-center gap-2 whitespace-nowrap font-semibold text-[#6B1028] transition-all duration-300 hover:gap-3 md:inline-flex"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

        {/* Responsive Product Grid */}

        <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-5 min-[480px]:gap-x-4 min-[480px]:gap-y-6 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4 lg:gap-7 xl:gap-8">
          {products.map((product) => (
            <div key={product._id} className="min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}

        <div className="mt-8 flex justify-center sm:mt-10 md:hidden">
          <Link
            to="/shop"
            className="inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#6B1028] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#841b37] sm:text-base"
          >
            View All Products
            <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TrendingProducts;
