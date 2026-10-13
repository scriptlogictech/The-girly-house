

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
    <div className="mb-6 w-full min-w-0 rounded-xl border border-[#eee4dc] bg-white p-3 shadow-sm sm:mb-8 sm:rounded-2xl sm:p-5 lg:p-6">
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">

        {/* Search */}

        <div className="relative min-w-0">
          <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 sm:left-4" />

          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-11 w-full min-w-0 rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/15 sm:pl-11 sm:pr-4"
          />
        </div>

        {/* Category */}

        <div className="min-w-0">
          <label
            htmlFor="product-filter-category"
            className="sr-only"
          >
            Filter by category
          </label>

          <select
            id="product-filter-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="min-h-11 w-full min-w-0 cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/15 sm:px-4"
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
        </div>

        {/* Sort */}

        <div className="min-w-0">
          <label
            htmlFor="product-filter-sort"
            className="sr-only"
          >
            Sort products
          </label>

          <select
            id="product-filter-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-h-11 w-full min-w-0 cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/15 sm:px-4"
          >
            <option value="latest">Newest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Clear Filters */}

        <button
          type="button"
          onClick={clearFilters}
          className="flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-[#6B1028] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4F0B1D] focus:outline-none focus:ring-2 focus:ring-[#6B1028] focus:ring-offset-2"
        >
          <FaTimes className="shrink-0" />
          <span>Clear Filters</span>
        </button>

      </div>
    </div>
  );
};

export default ProductFilters;