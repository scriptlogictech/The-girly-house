import { FaSearch, FaSortAmountDown } from "react-icons/fa";

const ProductToolbar = ({
  search,
  setSearch,
  total,
  sort,
  setSort,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#6B1028] focus:border-[#6B1028]"
          />

        </div>

        {/* Right Section */}

        <div className="flex flex-col sm:flex-row items-center gap-4">

          {/* Product Count */}

          <p className="text-gray-600 whitespace-nowrap">
            <span className="font-semibold text-[#6B1028]">
              {total}
            </span>{" "}
            Products Found
          </p>

          {/* Sort */}

          <div className="flex items-center gap-2">

            <FaSortAmountDown className="text-[#6B1028]" />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6B1028] focus:border-[#6B1028]"
            >
              <option value="latest">
                Newest First
              </option>

              <option value="priceLow">
                Price: Low to High
              </option>

              <option value="priceHigh">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

            </select>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductToolbar;