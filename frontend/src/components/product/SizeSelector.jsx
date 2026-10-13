
const SizeSelector = ({
  sizes = [],
  selectedSize,
  setSelectedSize,
}) => {
  if (!sizes.length) {
    return null;
  }

  return (
    <div className="w-full min-w-0">
      {/* Heading */}

      <h3 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">
        Select Size
      </h3>

      {/* Size Options */}

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {sizes.map((sizeObj) => {
          const isSelected =
            selectedSize?.size === sizeObj.size;

          const outOfStock = sizeObj.stock <= 0;

          return (
            <button
              key={sizeObj._id || sizeObj.size}
              type="button"
              disabled={outOfStock}
              aria-pressed={isSelected}
              aria-label={`${sizeObj.size}${outOfStock ? ", out of stock" : ""}`}
              onClick={() => setSelectedSize(sizeObj)}
              className={`flex min-h-10 min-w-11 items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:min-h-12 sm:min-w-[60px] sm:rounded-xl sm:px-5 sm:py-3 sm:text-base ${
                isSelected
                  ? "border-[#6B1028] bg-[#6B1028] text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:border-[#6B1028] hover:text-[#6B1028]"
              } ${
                outOfStock
                  ? "cursor-not-allowed opacity-40 line-through hover:border-gray-300 hover:text-gray-800"
                  : ""
              }`}
            >
              {sizeObj.size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;