
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaBoxOpen } from "react-icons/fa";

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
        console.error("Fetch products error:", error);
        alert(
          error.response?.data?.message ||
            error.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword) ||
        product.category?.name?.toLowerCase().includes(keyword)
      );
    });
  }, [products, search]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage((page) =>
      Math.max(1, Math.min(page, totalPages || 1))
    );
  }, [totalPages]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedProduct || deleteLoading) return;

    try {
      setDeleteLoading(true);

      await deleteProduct(selectedProduct._id);

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== selectedProduct._id
        )
      );

      setDeleteModal(false);
      setSelectedProduct(null);

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete product error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;

    setDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage all products from here.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/products/add")}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-5 py-3 font-medium text-white transition hover:bg-[#8B1538] sm:w-auto"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* Search and Count */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <label
          htmlFor="product-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search Products
        </label>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-3 transition focus-within:border-[#6B1028] focus-within:ring-2 focus-within:ring-[#6B1028]/10 sm:max-w-xl sm:px-4">
          <FaSearch className="shrink-0 text-gray-400" />

          <input
            id="product-search"
            type="search"
            placeholder="Search by product, brand or category..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
              className="shrink-0 text-sm text-gray-500 hover:text-[#6B1028]"
            >
              Clear
            </button>
          )}
        </div>

        {!loading && (
          <p className="mt-3 text-xs text-gray-500 sm:text-sm">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        )}
      </div>

      {/* Product List */}
      {loading ? (
        <div className="rounded-xl bg-white px-4 py-12 text-center shadow-sm sm:py-20">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B1028]" />
          <p className="font-medium text-gray-600">
            Loading products...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-xl bg-white px-4 py-12 text-center shadow-sm sm:py-20">
          <FaBoxOpen className="mx-auto mb-3 text-4xl text-gray-300" />

          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            No Products Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {search
              ? "Try a different search term."
              : "Add your first product to get started."}
          </p>

          {!search && (
            <button
              type="button"
              onClick={() => navigate("/admin/products/add")}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-5 py-2.5 font-medium text-white hover:bg-[#8B1538]"
            >
              <FaPlus />
              Add Product
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="min-w-0">
            <ProductTable
              products={currentProducts}
              onEdit={(product) =>
                navigate(`/admin/products/edit/${product._id}`)
              }
              onDelete={handleDeleteClick}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:justify-between">
              <p className="text-center text-xs text-gray-500 sm:text-sm">
                Showing{" "}
                {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                {Math.min(
                  currentPage * PRODUCTS_PER_PAGE,
                  filteredProducts.length
                )}{" "}
                of {filteredProducts.length}
              </p>

              <div className="flex max-w-full items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="min-h-10 rounded-lg border px-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                >
                  Previous
                </button>

                <div className="flex max-w-[42vw] items-center gap-1 overflow-x-auto sm:max-w-none">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  )
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                    )
                    .reduce((result, page, index, pages) => {
                      if (index > 0 && page - pages[index - 1] > 1) {
                        result.push("ellipsis-" + page);
                      }

                      result.push(page);
                      return result;
                    }, [])
                    .map((page) =>
                      typeof page === "string" ? (
                        <span
                          key={page}
                          className="px-1 text-gray-400"
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          aria-label={`Go to page ${page}`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          onClick={() => setCurrentPage(page)}
                          className={`min-h-10 min-w-10 shrink-0 rounded-lg px-3 text-sm font-medium transition ${
                            currentPage === page
                              ? "bg-[#6B1028] text-white"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                </div>

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  className="min-h-10 rounded-lg border px-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation */}
      <DeleteProductModal
        isOpen={deleteModal}
        loading={deleteLoading}
        productName={selectedProduct?.name}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Products;