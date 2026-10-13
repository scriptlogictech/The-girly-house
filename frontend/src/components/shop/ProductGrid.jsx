
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import EmptyProducts from "./EmptyProducts";

const ProductGrid = ({
  products = [],
  loading = false,
}) => {
  // Loading State
  if (loading) {
    return (
      <div className="grid min-w-0 grid-cols-2 items-stretch gap-x-3 gap-y-5 min-[480px]:gap-x-4 min-[480px]:gap-y-6 sm:gap-5 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="min-w-0">
            <ProductSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (!products.length) {
    return <EmptyProducts />;
  }

  // Products
  return (
    <motion.div
      layout
      className="grid min-w-0 grid-cols-2 items-stretch gap-x-3 gap-y-5 min-[480px]:gap-x-4 min-[480px]:gap-y-6 sm:gap-5 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-6"
    >
      {products.map((product) => (
        <motion.div
          key={product._id}
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-w-0 max-w-full"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;