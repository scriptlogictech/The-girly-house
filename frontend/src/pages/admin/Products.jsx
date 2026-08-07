import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductTable from "../../components/admin/ProductTable";
import DeleteProductModal from "../../components/admin/DeleteProductModal";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

     const data = await getAllProducts();

console.log("Products Response:", data);

const products =
  data.products ||
  data.data ||
  data;

setProducts(products);
setFilteredProducts(products);
    } catch (err) {
      console.error(err);

      alert("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    const keyword = search.toLowerCase();

    const result = products.filter((product) => {
      return (
        product.name
          ?.toLowerCase()
          .includes(keyword) ||
        product.brand
          ?.toLowerCase()
          .includes(keyword) ||
        product.category?.name
          ?.toLowerCase()
          .includes(keyword)
      );
    });

    setFilteredProducts(result);

    setCurrentPage(1);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);

    setDeleteModal(true);
  };

const handleDelete = async () => {
  try {
    console.log("Selected Product:", selectedProduct);

    setDeleteLoading(true);

    const response = await deleteProduct(selectedProduct._id);

    console.log("Delete Response:", response);

    const updated = products.filter(
      (item) => item._id !== selectedProduct._id
    );

    setProducts(updated);
    setFilteredProducts(updated);

    setDeleteModal(false);
    setSelectedProduct(null);

    alert("Product deleted successfully.");
  } catch (err) {
    console.error("Delete Error:", err);
    console.log("Response:", err.response);

    alert(
      err.response?.data?.message ||
      "Unable to delete product."
    );
  } finally {
    setDeleteLoading(false);
  }
};

    // ==========================
  // Pagination
  // ==========================

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  return (
    <div className="p-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all products from here.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/admin/products/add")
          }
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </button>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <input
          type="text"
          placeholder="Search by product, brand or category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

      </div>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="bg-white rounded-xl shadow p-20">

          <h2 className="text-center text-xl font-semibold">
            Loading Products...
          </h2>

        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-20">

          <h2 className="text-center text-xl font-semibold">
            No Products Found
          </h2>

        </div>

      ) : (

        <>
          <ProductTable
            products={currentProducts}
            onEdit={(product) =>
              navigate(
                `/admin/products/edit/${product._id}`
              )
            }
            onDelete={handleDeleteClick}
          />

          {/* ================= PAGINATION ================= */}

          <div className="flex justify-center mt-8 gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) =>
                  prev - 1
                )
              }
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => (

                <button
                  key={i}
                  onClick={() =>
                    setCurrentPage(i + 1)
                  }
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-pink-600 text-white"
                      : "border"
                  }`}
                >
                  {i + 1}
                </button>

              )
            )}

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((prev) =>
                  prev + 1
                )
              }
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>

      )}

      {/* ================= DELETE MODAL ================= */}

      <DeleteProductModal
        isOpen={deleteModal}
        loading={deleteLoading}
        productName={selectedProduct?.name}
        onClose={() => {
          setDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
      />

    </div>
  );
};

export default Products;