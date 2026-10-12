
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";

const ProductTable = ({
  loading = false,
  products = [],
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B1028]" />
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <FaBoxOpen className="mx-auto mb-3 text-3xl text-gray-300" />
        <p className="font-medium text-gray-600">No products found.</p>
      </div>
    );
  }

  const getProductDetails = (product) => {
    const firstColor = product.colors?.[0];
    const firstImage = firstColor?.images?.[0];

    const imageUrl =
      typeof firstImage === "string"
        ? firstImage
        : firstImage?.url;

    const firstSize = firstColor?.sizes?.[0];

    const price = firstSize
      ? firstSize.discountPrice > 0
        ? firstSize.discountPrice
        : firstSize.price
      : null;

    return {
      imageUrl,
      price,
      colorName: firstColor?.name,
    };
  };

  const formatPrice = (price) =>
    price != null
      ? `₹${Number(price).toLocaleString("en-IN")}`
      : "Price unavailable";

  const ProductActions = ({ product }) => (
    <div className="flex items-center gap-2">
      <Link
        to={`/admin/products/edit/${product._id}`}
        onClick={() => onEdit?.(product)}
        aria-label={`Edit ${product.name}`}
        className="flex min-h-10 min-w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition hover:bg-blue-100"
      >
        <FaEdit />
      </Link>

      <button
        type="button"
        onClick={() => onDelete?.(product)}
        aria-label={`Delete ${product.name}`}
        className="flex min-h-10 min-w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
      >
        <FaTrash />
      </button>
    </div>
  );

  return (
    <div className="min-w-0">
      {/* Mobile Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        {products.map((product) => {
          const { imageUrl, price, colorName } =
            getProductDetails(product);

          return (
            <article
              key={product._id}
              className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="flex gap-3 p-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="h-24 w-24 shrink-0 rounded-lg border border-gray-100 object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                    <FaBoxOpen size={28} />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="mt-1 break-all text-xs text-gray-500">
                    {product.slug}
                  </p>

                  <p className="mt-2 font-semibold text-[#6B1028]">
                    {formatPrice(price)}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t bg-gray-50/70 px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="mt-1 break-words font-medium text-gray-700">
                    {product.category?.name || "N/A"}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Brand</p>
                  <p className="mt-1 break-words font-medium text-gray-700">
                    {product.brand || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Stock</p>
                  <p className="mt-1 font-medium text-gray-700">
                    {product.totalStock ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Color</p>
                  <p className="mt-1 break-words font-medium text-gray-700">
                    {colorName || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
                <span className="text-sm font-medium text-gray-600">
                  Actions
                </span>
                <ProductActions product={product} />
              </div>
            </article>
          );
        })}
      </div>

      {/* Tablet and Desktop Table */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm md:block">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-4 font-semibold">Image</th>
              <th className="px-4 py-4 font-semibold">Product</th>
              <th className="px-4 py-4 font-semibold">Category</th>
              <th className="px-4 py-4 font-semibold">Brand</th>
              <th className="px-4 py-4 font-semibold">Price</th>
              <th className="px-4 py-4 font-semibold">Stock</th>
              <th className="px-4 py-4 font-semibold">Status</th>
              <th className="px-4 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const { imageUrl, price } =
                getProductDetails(product);

              return (
                <tr
                  key={product._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="h-16 w-16 rounded-lg border border-gray-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                        <FaBoxOpen size={22} />
                      </div>
                    )}
                  </td>

                  <td className="max-w-[240px] px-4 py-3">
                    <p className="break-words font-semibold text-gray-800">
                      {product.name}
                    </p>
                    <p className="mt-1 break-all text-xs text-gray-500">
                      {product.slug}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.category?.name || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.brand || "N/A"}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-800">
                    {formatPrice(price)}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    {product.totalStock ?? 0}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <ProductActions product={product} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;