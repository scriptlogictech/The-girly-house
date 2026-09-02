const SizeSelector = ({
  sizes = [],
  selectedSize,
  setSelectedSize,
}) => {
  if (!sizes.length) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Select Size
      </h3>

      <div className="flex flex-wrap gap-3">
        {sizes.map((sizeObj) => {
          const isSelected =
            selectedSize?.size === sizeObj.size;

          const outOfStock = sizeObj.stock <= 0;

          return (
            <button
              key={sizeObj._id || sizeObj.size}
              type="button"
              disabled={outOfStock}
              onClick={() => setSelectedSize(sizeObj)}
              className={`min-w-[60px] px-5 py-3 rounded-xl border font-medium transition
                ${
                  isSelected
                    ? "bg-[#6B1028] text-white border-[#6B1028]"
                    : "bg-white border-gray-300 hover:border-[#6B1028]"
                }
                ${
                  outOfStock
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
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