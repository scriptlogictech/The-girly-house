import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/admin/ProductForm";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setPageLoading(true);

      const res = await getProductById(id);

      const data = res.data;

      const formattedProduct = {
        name: data.name || "",

        shortDescription:
          data.shortDescription || "",

        description:
          data.description || "",

        category:
          data.category?._id ||
          data.category ||
          "",

        brand: data.brand || "",

        material:
          data.material || "",

        fabric:
          data.fabric || "",

        fit:
          data.fit || "",

        careInstructions:
          data.careInstructions || "",

        tags: data.tags || [],

        tagInput: "",

        colors:
          data.colors?.map((color) => ({
            name: color.name,

            colorCode:
              color.colorCode,

            images: [],

            existingImages:
              color.images || [],

            sizes:
              color.sizes || [],
          })) || [],

        isFeatured:
          data.isFeatured || false,

        isTrending:
          data.isTrending || false,

        isNewArrival:
          data.isNewArrival || false,

        isBestSeller:
          data.isBestSeller || false,
      };

      setProduct(formattedProduct);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to load product."
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdate = async (
    formData
  ) => {
    try {
      setLoading(true);

      await updateProduct(
        id,
        formData
      );

      alert(
        "Product updated successfully."
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <h2 className="text-xl font-semibold">
          Loading Product...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-1">
            Update product details.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/admin/products")
          }
          className="border px-5 py-2 rounded-lg hover:bg-gray-100"
        >
          Back
        </button>

      </div>

      {/* Product Form */}

      <ProductForm
        initialData={product}
        loading={loading}
        onSubmit={handleUpdate}
      />

    </div>
  );
};

export default EditProduct;