import { useEffect, useState } from "react";

const initialState = {
  name: "",
  description: "",
  parentCategory: "",
  displayOrder: 0,
  isActive: true,
};

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  category,
  categories,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        parentCategory: category.parentCategory?._id || "",
        displayOrder: category.displayOrder || 0,
        isActive:
          category.isActive !== undefined
            ? category.isActive
            : true,
      });
    } else {
      setFormData(initialState);
    }
  }, [category, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return alert("Category name is required.");
    }

    onSubmit({
      ...formData,
      displayOrder: Number(formData.displayOrder),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl">

        {/* Header */}

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-semibold">

            {category
              ? "Edit Category"
              : "Add Category"}

          </h2>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Name */}

          <div>

            <label className="block mb-2 font-medium">
              Category Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Women's Fashion"
            />

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Category description"
            />

          </div>

          {/* Parent Category */}

          <div>

            <label className="block mb-2 font-medium">
              Parent Category
            </label>

            <select
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">
                None
              </option>

              {categories
                .filter(
                  (cat) =>
                    !category ||
                    cat._id !== category._id
                )
                .map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}

            </select>

          </div>

          {/* Display Order */}

          <div>

            <label className="block mb-2 font-medium">
              Display Order
            </label>

            <input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

          </div>

          {/* Status */}

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />

            <label>
              Active Category
            </label>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg"
            >
              {category
                ? "Update Category"
                : "Create Category"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CategoryModal;