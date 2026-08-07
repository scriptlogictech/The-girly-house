import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    <section className="bg-[#FFFDFC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breadcrumb */}

        <div className="text-sm text-gray-500 mb-3">
          <Link
            to="/"
            className="hover:text-[#6B1028]"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <span className="text-[#6B1028] font-medium">
            Shop
          </span>
        </div>

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-4xl md:text-5xl font-serif text-[#6B1028]">
            Shop
          </h1>

          <p className="text-gray-500 mt-2">
            Discover our latest collection crafted just for you.
          </p>

        </div>

        {/* Shop Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}

          <FilterSidebar
            category={category}
            setCategory={handleCategory}
            clearFilters={clearFilters}
          />

          {/* Product Section */}

          <div className="lg:col-span-3">

            <ProductToolbar
              search={search}
              setSearch={handleSearch}
              total={total}
              sort={sort}
              setSort={handleSort}
            />

            <ProductGrid
              products={products}
              loading={loading}
            />

            {!loading && products.length > 0 && (
              <Pagination
                page={page}
                pages={pages}
                setPage={setPage}
              />
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Shop;