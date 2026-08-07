import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const CategoryTable = ({
  loading,
  categories,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-lg font-semibold">
          No Categories Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first category.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-3 text-left">
                Name
              </th>

              <th className="px-5 py-3 text-left">
                Slug
              </th>

              <th className="px-5 py-3 text-left">
                Parent
              </th>

              <th className="px-5 py-3 text-center">
                Order
              </th>

              <th className="px-5 py-3 text-center">
                Status
              </th>

              <th className="px-5 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4">

                  <div>

                    <p className="font-semibold">
                      {category.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {category.description || "-"}
                    </p>

                  </div>

                </td>

                <td className="px-5 py-4">
                  {category.slug}
                </td>

                <td className="px-5 py-4">

                  {category.parentCategory
                    ? category.parentCategory.name
                    : "-"}

                </td>

                <td className="px-5 py-4 text-center">
                  {category.displayOrder}
                </td>

                <td className="px-5 py-4 text-center">

                  {category.isActive ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                      Inactive
                    </span>
                  )}

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      className="text-red-600 hover:text-red-800"
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