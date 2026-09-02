import { FaSearch, FaTimes } from "react-icons/fa";

const ProductFilters = ({
  search,
  setSearch,
  categories = [],
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
  clearFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* Search */}

        <div className="relative">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#6B1028]"
          />

        </div>

        {/* Category */}

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6B1028]"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6B1028]"
        >
          <option value="latest">
            Newest
          </option>

          <option value="priceLow">
            Price : Low to High
          </option>

          <option value="priceHigh">
            Price : High to Low
          </option>

          <option value="rating">
            Highest Rated
          </option>
        </select>

        {/* Clear */}

        <button
          onClick={clearFilters}
          className="bg-[#6B1028] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#4F0B1D] transition"
        >
          <FaTimes />

          Clear Filters
        </button>

      </div>

    </div>
  );
};

export default ProductFilters;