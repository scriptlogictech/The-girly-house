import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductTable = ({
  loading,
  products = [],
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <p className="text-lg font-medium text-gray-600">
          Loading products...
        </p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <p className="text-lg font-medium text-gray-600">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Brand</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const firstColor = product.colors?.[0];

            const firstImage =
              firstColor?.images?.[0]?.url ||
              firstColor?.images?.[0] ||
              "https://via.placeholder.com/60";

            const firstSize = firstColor?.sizes?.[0];

            const price =
              firstSize?.discountPrice ||
              firstSize?.price ||
              "-";

            return (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <img
                    src={firstImage}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="font-semibold">
                    {product.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {product.slug}
                  </div>
                </td>

                <td className="px-4 py-3">
                  {product.category?.name || "N/A"}
                </td>

                <td className="px-4 py-3">
                  {product.brand}
                </td>

                <td className="px-4 py-3">
                  ₹ {price}
                </td>

                <td className="px-4 py-3">
                  {product.totalStock}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => onDelete(product)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;