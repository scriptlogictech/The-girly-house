import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";


import AdminLayout from "../../components/layout/AdminLayout" 
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";
import DeleteCategoryModal from "./DeleteCategoryModal";


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
      category.name.toLowerCase().includes(search.toLowerCase())
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

      loadCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed.");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(selectedCategory._id);

      setShowDeleteModal(false);
      setSelectedCategory(null);

      loadCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Categories
          </h1>

          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg transition"
          >
            <FaPlus />
            Add Category
          </button>

        </div>

        {/* Search */}

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search categories..."
            className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Table */}

        <CategoryTable
          loading={loading}
          categories={filteredCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

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