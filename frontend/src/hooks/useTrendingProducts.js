import { useEffect, useState } from "react";
import { getTrendingProducts } from "../services/productService";

const useTrendingProducts = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true);

      const res = await getTrendingProducts();

      console.log("Trending Products:", res);

      setProducts(res.data || []);
    } catch (error) {
      console.error(error);

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  return {
    products,
    loading,
    fetchTrendingProducts,
  };
};

export default useTrendingProducts;