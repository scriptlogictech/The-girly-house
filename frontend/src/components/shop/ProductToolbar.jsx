

import { FaSearch, FaSortAmountDown } from "react-icons/fa";

const ProductToolbar = ({
  search,
  setSearch,
  total,
  sort,
  setSort,
}) => {
  return (
    <div className="w-full min-w-0 rounded-xl border border-[#eee4dc] bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 lg:p-5">

      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="relative w-full min-w-0 lg:max-w-md lg:flex-1">
          <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 sm:left-4" />

          <input
            type="search"
            aria-label="Search products by name"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-11 w-full min-w-0 rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/15 sm:pl-11 sm:pr-4"
          />
        </div>

        {/* Product Count and Sort */}

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-none lg:justify-end lg:gap-5">

          {/* Product Count */}

          <p className="text-xs text-gray-600 sm:whitespace-nowrap sm:text-sm">
            <span className="font-semibold text-[#6B1028]">
              {total}
            </span>{" "}
            {total === 1 ? "Product Found" : "Products Found"}
          </p>

          {/* Sort */}

          <div className="flex min-w-0 items-center gap-2">
            <FaSortAmountDown className="shrink-0 text-sm text-[#6B1028]" />

            <label htmlFor="shop-product-sort" className="sr-only">
              Sort products
            </label>

            <select
              id="shop-product-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="min-h-11 w-full min-w-0 flex-1 cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-700 outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/15 sm:w-auto sm:flex-none sm:text-sm"
            >
              <option value="latest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;