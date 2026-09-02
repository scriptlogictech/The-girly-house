import { useEffect, useState } from "react";
import { getNewArrivalProducts } from "../services/productService";

const useNewArrivalProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrivalProducts = async () => {
    try {
      setLoading(true);

      const res = await getNewArrivalProducts();

      setProducts(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivalProducts();
  }, []);

  return {
    products,
    loading,
    fetchNewArrivalProducts,
  };
};

export default useNewArrivalProducts;