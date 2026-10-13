

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/productService";

const RelatedProducts = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product?._id) {
      fetchRelatedProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [product?._id]);

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);

      const res = await getAllProducts();

      // Support common API response structures.
      const allProducts = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.products)
          ? res.data.products
          : [];

      // Support category IDs and populated category objects.
      const currentCategory =
        typeof product.category === "object"
          ? product.category?._id
          : product.category;

      const related = allProducts
        .filter((item) => {
          const itemCategory =
            typeof item.category === "object"
              ? item.category?._id
              : item.category;

          return (
            item._id !== product._id &&
            currentCategory &&
            itemCategory === currentCategory
          );
        })
        .slice(0, 4);

      setProducts(related);
    } catch (error) {
      console.error("Error loading related products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <section className="mt-10 w-full min-w-0 sm:mt-14 lg:mt-20">
        <h2 className="mb-5 text-xl font-bold text-[#6B1028] sm:mb-7 sm:text-2xl lg:mb-8 lg:text-3xl">
          Related Products
        </h2>

        <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-5 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white sm:rounded-2xl"
            >
              <div className="aspect-[3/4] animate-pulse bg-gray-200" />

              <div className="space-y-3 p-3 sm:p-4">
                <div className="h-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-9 animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // No Related Products
  if (products.length === 0) {
    return null;
  }

  // Related Products
  return (
    <section className="mt-10 w-full min-w-0 sm:mt-14 lg:mt-20">
      <h2 className="mb-5 text-xl font-bold leading-tight text-[#6B1028] sm:mb-7 sm:text-2xl lg:mb-8 lg:text-3xl">
        Related Products
      </h2>

      <div className="grid min-w-0 grid-cols-2 items-stretch gap-x-3 gap-y-5 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {products.map((item) => (
          <div key={item._id} className="min-w-0">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;