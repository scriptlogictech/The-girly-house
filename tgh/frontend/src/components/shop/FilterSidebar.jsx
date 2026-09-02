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
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">

      {/* Heading */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-2">

          <FaFilter className="text-[#6B1028]" />

          <h2 className="text-xl font-semibold text-[#6B1028]">
            Filters
          </h2>

        </div>

        <button
          onClick={clearFilters}
          className="text-sm text-[#6B1028] hover:underline flex items-center gap-1"
        >
          <FaTimes size={12} />
          Clear
        </button>

      </div>

      {/* Categories */}

      <div>

        <h3 className="font-medium text-gray-700 mb-3">
          Categories
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500">
            Loading categories...
          </p>
        ) : (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6B1028]"
          >
            <option value="">
              All Categories ({categories.length})
            </option>

            {categories.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>
        )}

      </div>

      {/* Future Filters */}

      <div className="mt-8 border-t pt-6">

        <p className="text-sm text-gray-400">
          More filters like Price, Size, Color, and Brand will be available soon.
        </p>

      </div>

    </aside>
  );
};

export default FilterSidebar;