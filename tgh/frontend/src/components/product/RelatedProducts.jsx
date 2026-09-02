import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/productService";

const RelatedProducts = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);

      const res = await getAllProducts();

      // Support different API response structures
      const allProducts = res.data;

      const related = allProducts
        .filter(
          (item) =>
            item._id !== product._id &&
            item.category === product.category
        )
        .slice(0, 4);

      setProducts(related);
    } catch (error) {
      console.error("Error loading related products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8 text-[#6B1028]">
          Related Products
        </h2>

        <p>Loading...</p>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-8 text-[#6B1028]">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;