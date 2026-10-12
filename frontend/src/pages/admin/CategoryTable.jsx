
import { FaEdit, FaTrash, FaTags } from "react-icons/fa";

const CategoryTable = ({
  loading,
  categories,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B1028]" />
        <p className="text-sm text-gray-500">Loading categories...</p>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="rounded-xl bg-white px-5 py-10 text-center shadow-sm">
        <FaTags className="mx-auto mb-3 text-3xl text-gray-300" />

        <h2 className="text-lg font-semibold text-gray-800">
          No Categories Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Create your first category.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Mobile layout */}
      <div className="divide-y divide-gray-100 md:hidden">
        {categories.map((category) => (
          <article key={category._id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="break-words font-semibold text-gray-800">
                  {category.name}
                </h3>

                <p className="mt-1 break-all text-xs text-gray-500">
                  Slug: {category.slug}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  category.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {category.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {category.description && (
              <p className="mt-3 break-words text-sm text-gray-600">
                {category.description}
              </p>
            )}

            <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 text-sm">
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Parent Category</p>
                <p className="mt-1 break-words font-medium text-gray-700">
                  {category.parentCategory?.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Display Order</p>
                <p className="mt-1 font-medium text-gray-700">
                  {category.displayOrder ?? 0}
                </p>
              </div>
            </div>

            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => onEdit(category)}
                aria-label={`Edit ${category.name}`}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
              >
                <FaEdit />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(category)}
                aria-label={`Delete ${category.name}`}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Tablet and desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Name</th>
              <th className="px-5 py-4 font-semibold">Slug</th>
              <th className="px-5 py-4 font-semibold">Parent</th>
              <th className="px-5 py-4 text-center font-semibold">Order</th>
              <th className="px-5 py-4 text-center font-semibold">Status</th>
              <th className="px-5 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr
                key={category._id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="max-w-[260px] px-5 py-4">
                  <p className="break-words font-semibold text-gray-800">
                    {category.name}
                  </p>
                  <p className="mt-1 break-words text-sm text-gray-500">
                    {category.description || "-"}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {category.slug}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {category.parentCategory?.name || "-"}
                </td>

                <td className="px-5 py-4 text-center text-sm text-gray-700">
                  {category.displayOrder ?? 0}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(category)}
                      aria-label={`Edit ${category.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(category)}
                      aria-label={`Delete ${category.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;