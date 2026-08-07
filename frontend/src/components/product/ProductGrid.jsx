import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  loading = false,
  title = "",
}) => {
  if (loading) {
    return (
      <section className="py-12">
        {title && (
          <h2 className="text-3xl font-bold mb-8 text-[#6B1028]">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white rounded-2xl overflow-hidden shadow"
            >
              <div className="bg-gray-200 h-[350px]" />

              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          No Products Found
        </h2>

        <p className="text-gray-500 mt-3">
          Please check back later.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12">

      {title && (
        <h2 className="text-3xl font-bold mb-8 text-[#6B1028]">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
};

export default ProductGrid;