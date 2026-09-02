import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

const useProducts = ({
  page,
  search,
  category,
}) => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [pages, setPages] = useState(1);

  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts({
        page,
        limit: 12,
        search,
        category,
      });

      setProducts(data.data);

      setPages(data.pages);

      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  return {
    products,
    loading,
    pages,
    total,
    fetchProducts,
  };
};

export default useProducts;