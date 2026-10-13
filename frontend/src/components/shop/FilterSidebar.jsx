

import { useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { getAllCategories } from "../../services/categoryService";

const FilterSidebar = ({
  category,
  setCategory,
  clearFilters,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await getAllCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error("Category Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <aside className="w-full min-w-0 rounded-xl border border-[#eee4dc] bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6">

      {/* Heading */}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
        <div className="flex items-center gap-2">
          <FaFilter className="shrink-0 text-[#6B1028]" />

          <h2 className="text-lg font-semibold text-[#6B1028] sm:text-xl">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-medium text-[#6B1028] transition-colors hover:bg-[#faf7f2] hover:underline sm:text-sm"
        >
          <FaTimes size={12} />
          Clear Filters
        </button>
      </div>

      {/* Categories */}

      <div className="min-w-0">
        <label
          htmlFor="shop-category-filter"
          className="mb-2 block text-sm font-medium text-gray-700 sm:mb-3"
        >
          Categories
        </label>

        {loading ? (
          <p className="py-2 text-sm text-gray-500">
            Loading categories...
          </p>
        ) : (
          <select
            id="shop-category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-h-11 w-full min-w-0 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/15 sm:px-4"
          >
            <option value="">
              All Categories ({categories.length})
            </option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Future Filters */}

      <div className="mt-5 border-t border-gray-200 pt-4 sm:mt-7 sm:pt-5">
        <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
          More filters like Price, Size, Color, and Brand will be available soon.
        </p>
      </div>

    </aside>
  );
};

export default FilterSidebar;