import { FaBoxOpen } from "react-icons/fa";

const EmptyProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">

      <div className="w-24 h-24 rounded-full bg-[#F9F4EC] flex items-center justify-center mb-6">
        <FaBoxOpen
          size={42}
          className="text-[#6B1028]"
        />
      </div>

      <h2 className="text-3xl font-serif text-[#6B1028]">
        No Products Found
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        We couldn't find any products matching your search or filters.
        Try changing your search criteria or browse another category.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 bg-[#6B1028] text-white px-8 py-3 rounded-xl hover:bg-[#4f0b1d] transition"
      >
        Browse All Products
      </button>

    </div>
  );
};

export default EmptyProducts;