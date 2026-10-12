
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

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
        parentCategory:
          typeof category.parentCategory === "object"
            ? category.parentCategory?._id || ""
            : category.parentCategory || "",
        displayOrder: category.displayOrder ?? 0,
        isActive: category.isActive !== undefined
          ? category.isActive
          : true,
      });
    } else {
      setFormData(initialState);
    }
  }, [category, open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Category name is required.");
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      displayOrder: Number(formData.displayOrder),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        className="my-auto flex max-h-[calc(100dvh-24px)] w-full max-w-xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-4 sm:px-6">
          <h2
            id="category-modal-title"
            className="text-lg font-semibold text-gray-800 sm:text-xl"
          >
            {category ? "Edit Category" : "Add Category"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close category form"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 space-y-5 overflow-y-auto p-4 sm:p-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="category-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category Name <span className="text-red-500">*</span>
            </label>

            <input
              id="category-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Women's Fashion"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="category-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="category-description"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Category description"
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
            />
          </div>

          {/* Parent Category */}
          <div>
            <label
              htmlFor="parent-category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Parent Category
            </label>

            <select
              id="parent-category"
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
            >
              <option value="">None</option>

              {categories
                .filter((cat) => !category || cat._id !== category._id)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Display Order */}
          <div>
            <label
              htmlFor="category-display-order"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Display Order
            </label>

            <input
              id="category-display-order"
              type="number"
              min="0"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
            />
          </div>

          {/* Status */}
          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg bg-gray-50 px-3 py-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 accent-[#6B1028]"
            />

            <span className="text-sm font-medium text-gray-700">
              Active Category
            </span>
          </label>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="min-h-11 rounded-lg bg-[#6B1028] px-5 py-2.5 font-medium text-white transition hover:bg-[#8B1538] sm:w-auto"
            >
              {category ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CategoryModal;