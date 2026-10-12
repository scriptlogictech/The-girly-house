
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import AdminLayout from "../../components/layout/AdminLayout";
import ProductForm from "../../components/admin/ProductForm";

import { createProduct } from "../../services/productService";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await createProduct(formData);

      alert("Product created successfully.");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full min-w-0 max-w-7xl p-3 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-[#6B1028] transition hover:bg-[#6B1028]/5 hover:underline"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                Add Product
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                Create a new product for your store.
              </p>
            </div>
          </div>
        </div>

        {/* Product Form */}
        <div className="w-full min-w-0">
          <ProductForm
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;