
import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [categories, search]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleSaveCategory = async (formData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, formData);
      } else {
        await createCategory(formData);
      }

      setShowModal(false);
      setEditingCategory(null);
      await loadCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed.");
    }
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      await deleteCategory(selectedCategory._id);

      setShowDeleteModal(false);
      setSelectedCategory(null);
      await loadCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <AdminLayout>
      <div className="min-w-0 space-y-5 sm:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Categories
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your store categories
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddCategory}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-5 py-3 font-medium text-white transition hover:bg-[#8B1538] sm:w-auto sm:py-2.5"
          >
            <FaPlus />
            <span>Add Category</span>
          </button>
        </div>

        {/* Search */}
        <div className="w-full sm:max-w-md">
          <label htmlFor="category-search" className="sr-only">
            Search categories
          </label>

          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-[#6B1028] focus-within:ring-2 focus-within:ring-[#6B1028]/10">
            <FaSearch className="shrink-0 text-gray-400" />

            <input
              id="category-search"
              type="search"
              placeholder="Search categories..."
              className="w-full min-w-0 bg-transparent text-sm outline-none"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="shrink-0 text-sm text-gray-500 hover:text-[#6B1028]"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          {!loading && (
            <p className="mt-2 text-xs text-gray-500">
              {filteredCategories.length}{" "}
              {filteredCategories.length === 1 ? "category" : "categories"}
              {search.trim() ? " found" : ""}
            </p>
          )}
        </div>

        {/* Categories Table */}
        <div className="min-w-0">
          <CategoryTable
            loading={loading}
            categories={filteredCategories}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </div>

        {/* Add / Edit Modal */}
        <CategoryModal
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
          onSubmit={handleSaveCategory}
          category={editingCategory}
          categories={categories}
        />

        {/* Delete Modal */}
        <DeleteCategoryModal
          open={showDeleteModal}
          category={selectedCategory}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
          onConfirm={confirmDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Categories;