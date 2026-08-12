import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./Shop.css";

import FilterSidebar from "../components/shop/FilterSidebar";
import ProductToolbar from "../components/shop/ProductToolbar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";

import { getAllProducts } from "../services/productService";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");

  // ================= Fetch Products =================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getAllProducts({
        page,
        limit: 12,
        search,
        category,
        sort,
      });

      setProducts(res.data || []);
      setPages(res.pages || 1);
      setTotal(res.total || 0);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, sort]);

  // ================= Handlers =================

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleSort = (value) => {
    setSort(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("latest");
    setPage(1);
  };

  return (
   <section className="shop-page">
  <div className="shop-container">

    {/* Breadcrumb */}
    <div className="shop-breadcrumb">
      <Link to="/">Home</Link>

      <span>/</span>

      <span className="shop-breadcrumb__current">
        Shop
      </span>
    </div>

    {/* Heading */}
    <div className="shop-header">
      <h1 className="shop-title">
        Shop
      </h1>

      <p className="shop-description">
        Discover our latest collection crafted just for you.
      </p>
    </div>

    {/* Shop Layout */}
    <div className="shop-layout">

      {/* Sidebar */}
      <div className="shop-sidebar">
        <FilterSidebar
          category={category}
          setCategory={handleCategory}
          clearFilters={clearFilters}
        />
      </div>

      {/* Products */}
      <div className="shop-products">

        <div className="shop-toolbar">
          <ProductToolbar
            search={search}
            setSearch={handleSearch}
            total={total}
            sort={sort}
            setSort={handleSort}
          />
        </div>

        <div className="shop-product-grid">
          <ProductGrid
            products={products}
            loading={loading}
          />
        </div>

        {!loading && products.length > 0 && (
          <div className="shop-pagination">
            <Pagination
              page={page}
              pages={pages}
              setPage={setPage}
            />
          </div>
        )}

      </div>

    </div>

  </div>
</section>
  );
};

export default Shop;