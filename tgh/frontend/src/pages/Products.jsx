import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getAllProducts({
        page,
        search,
      });

      setProducts(response.data || []);

      setPages(response.pages || 1);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Products
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all products
            </p>

          </div>

          <Link
            to="/admin/products/add"
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <FaPlus />

            Add Product
          </Link>

        </div>

        {/* Search */}

        <div className="relative w-full md:w-96 mb-6">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-pink-500"
          />

        </div>

        {/* Table */}

        <ProductTable
          loading={loading}
          products={products}
          onDelete={handleDelete}
        />

        {/* Pagination */}

        <div className="flex justify-end mt-6 gap-2">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            {page} / {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </AdminLayout>
  );
};

export default Products;