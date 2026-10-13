

import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  loading = false,
  title = "",
}) => {
  const gridClasses =
    "grid min-w-0 grid-cols-2 items-stretch gap-x-3 gap-y-5 min-[480px]:gap-x-4 min-[480px]:gap-y-6 sm:gap-5 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-6";

  if (loading) {
    return (
      <section className="w-full min-w-0 py-6 sm:py-9 lg:py-12">
        {title && (
          <h2 className="mb-5 text-xl font-bold leading-tight text-[#6B1028] sm:mb-7 sm:text-2xl lg:mb-8 lg:text-3xl">
            {title}
          </h2>
        )}

        <div className={gridClasses}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm sm:rounded-2xl"
            >
              {/* Responsive Image Placeholder */}
              <div className="aspect-[3/4] w-full animate-pulse bg-gray-200" />

              {/* Content Placeholder */}
              <div className="space-y-3 p-2.5 sm:p-4 lg:p-5">
                <div className="h-4 animate-pulse rounded bg-gray-200 sm:h-5" />

                <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200 sm:h-4" />

                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200 sm:h-6" />

                <div className="h-9 animate-pulse rounded-lg bg-gray-200 sm:h-11 sm:rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="w-full px-3 py-12 text-center sm:px-4 sm:py-16 lg:py-20">
        <h2 className="text-xl font-semibold text-gray-600 sm:text-2xl">
          No Products Found
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:mt-3 sm:text-base">
          Please check back later.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full min-w-0 py-6 sm:py-9 lg:py-12">
      {title && (
        <h2 className="mb-5 text-xl font-bold leading-tight text-[#6B1028] sm:mb-7 sm:text-2xl lg:mb-8 lg:text-3xl">
          {title}
        </h2>
      )}

      <div className={gridClasses}>
        {products.map((product) => (
          <div key={product._id} className="min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;