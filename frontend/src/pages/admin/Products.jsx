
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaBoxOpen,
  FaTimes,
} from "react-icons/fa";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import DeleteProductModal from "../../components/admin/DeleteProductModal";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";

const PRODUCTS_PER_PAGE = 10;

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getAllProducts();

        const productList =
          response?.products ??
          response?.data?.products ??
          response?.data ??
          response;

        if (!Array.isArray(productList)) {
          throw new Error("Invalid products response.");
        }

        setProducts(productList);
      } catch (error) {
        console.error("Unable to load products:", error);
        alert("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search products
  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return products;

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const brand = product.brand?.toLowerCase() || "";
      const category =
        typeof product.category === "object"
          ? product.category?.name?.toLowerCase() || ""
          : "";

      const slug = product.slug?.toLowerCase() || "";

      return (
        name.includes(keyword) ||
        brand.includes(keyword) ||
        category.includes(keyword) ||
        slug.includes(keyword)
      );
    });
  }, [products, search]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Keep current page valid after deleting a product
  useEffect(() => {
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    } else if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct =
    indexOfLastProduct - PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Delete modal
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;

    setDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    if (!selectedProduct?._id || deleteLoading) return;

    try {
      setDeleteLoading(true);

      await deleteProduct(selectedProduct._id);

      setProducts((prev) =>
        prev.filter((item) => item._id !== selectedProduct._id)
      );

      setDeleteModal(false);
      setSelectedProduct(null);

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Unable to delete product:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // Pagination buttons
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const pages = new Set([
      1,
      totalPages,
      currentPage,
      currentPage - 1,
      currentPage + 1,
    ]);

    return [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b)
      .reduce((result, page, index, array) => {
        if (index > 0 && page - array[index - 1] > 1) {
          result.push("...");
        }

        result.push(page);
        return result;
      }, []);
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full min-w-0 max-w-7xl p-3 sm:p-5 lg:p-6">
        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Products
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage all products from here.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/products/add")}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#520b1e] sm:w-auto"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* Search and Product Count */}
        <div className="mb-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full min-w-0 sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, brand, category..."
              aria-label="Search products"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBoxOpen className="text-[#6B1028]" />

            <span>
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} ${
                    filteredProducts.length === 1
                      ? "product"
                      : "products"
                  } found`}
            </span>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="rounded-xl border border-gray-100 bg-white px-4 py-16 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B1028]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white px-4 py-16 text-center shadow-sm">
            <FaBoxOpen className="mx-auto text-4xl text-gray-300" />

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {search ? "No products found" : "No products yet"}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try another search term."
                : "Add your first product to get started."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={() => navigate("/admin/products/add")}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-5 py-3 text-sm font-semibold text-white hover:bg-[#520b1e]"
              >
                <FaPlus />
                Add Product
              </button>
            )}
          </div>
        ) : (
          <>
            <ProductTable
              products={currentProducts}
              onEdit={(product) =>
                navigate(`/admin/products/edit/${product._id}`)
              }
              onDelete={handleDeleteClick}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-5 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
                <p className="text-center text-xs text-gray-500 sm:text-left sm:text-sm">
                  Showing {indexOfFirstProduct + 1}–
                  {Math.min(
                    indexOfLastProduct,
                    filteredProducts.length
                  )}{" "}
                  of {filteredProducts.length} products
                </p>

                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => page - 1)
                    }
                    className="min-h-9 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-1 text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                        className={`min-h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-[#6B1028] text-white"
                            : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => page + 1)
                    }
                    className="min-h-9 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Delete Product Modal */}
        <DeleteProductModal
          isOpen={deleteModal}
          loading={deleteLoading}
          productName={selectedProduct?.name}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Products;