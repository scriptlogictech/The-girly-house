import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import "./Shop.css";

import FilterSidebar from "../components/shop/FilterSidebar";
import ProductToolbar from "../components/shop/ProductToolbar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";

import { getAllProducts } from "../services/productService";

const Shop = () => {

  // ==========================================
  // URL Search Params
  // ==========================================

  const [searchParams, setSearchParams] =
    useSearchParams();


  // ==========================================
  // State
  // ==========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(1);

  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("latest");


  // ==========================================
  // Sync URL Search With State
  // ==========================================

  useEffect(() => {

    const urlSearch =
      searchParams.get("search") || "";

    setSearch(urlSearch);

    setPage(1);

  }, [searchParams]);


  // ==========================================
  // Fetch Products
  // ==========================================

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


  // ==========================================
  // Fetch When Filters Change
  // ==========================================

  useEffect(() => {

    fetchProducts();

  }, [
    page,
    search,
    category,
    sort,
  ]);


  // ==========================================
  // Search
  // ==========================================

  const handleSearch = (value) => {

    setSearch(value);

    setPage(1);

    if (value.trim()) {

      setSearchParams({
        search: value.trim(),
      });

    } else {

      setSearchParams({});

    }

  };


  // ==========================================
  // Category
  // ==========================================

  const handleCategory = (value) => {

    setCategory(value);

    setPage(1);

  };


  // ==========================================
  // Sort
  // ==========================================

  const handleSort = (value) => {

    setSort(value);

    setPage(1);

  };


  // ==========================================
  // Clear Filters
  // ==========================================

  const clearFilters = () => {

    setSearch("");

    setCategory("");

    setSort("latest");

    setPage(1);

    setSearchParams({});

  };


  return (

    <section className="shop-page">

      <div className="shop-container">


        {/* ======================================
            Breadcrumb
        ====================================== */}

        <div className="shop-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <span className="shop-breadcrumb__current">
            Shop
          </span>

        </div>


        {/* ======================================
            Heading
        ====================================== */}

        <div className="shop-header">

          <h1 className="shop-title">
            Shop
          </h1>

          <p className="shop-description">

            {search
              ? `Showing results for "${search}"`
              : "Discover our latest collection crafted just for you."}

          </p>

        </div>


        {/* ======================================
            Shop Layout
        ====================================== */}

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


            {/* Toolbar */}

            <div className="shop-toolbar">

              <ProductToolbar
                search={search}
                setSearch={handleSearch}
                total={total}
                sort={sort}
                setSort={handleSort}
              />

            </div>


            {/* Product Grid */}

            <div className="shop-product-grid">

              <ProductGrid
                products={products}
                loading={loading}
              />

            </div>


            {/* Pagination */}

            {!loading &&
              products.length > 0 && (

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