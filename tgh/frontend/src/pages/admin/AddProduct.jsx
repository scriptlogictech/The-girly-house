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

      <div className="p-6">

        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-pink-600 mb-3 hover:underline"
            >
              <FaArrowLeft />

              Back
            </button>

            <h1 className="text-3xl font-bold">
              Add Product
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new product for your store.
            </p>

          </div>

        </div>

        <ProductForm
          loading={loading}
          onSubmit={handleSubmit}
        />

      </div>

    </AdminLayout>
  );
};

export default AddProduct;