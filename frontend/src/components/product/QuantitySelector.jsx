

import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = ({
  quantity,
  setQuantity,
  max = 1,
}) => {
  const increase = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-full min-w-0">
      {/* Heading */}

      <h3 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">
        Quantity
      </h3>

      {/* Quantity Controls */}

      <div
        className="inline-flex max-w-full items-center overflow-hidden rounded-xl border border-gray-300 bg-white"
        aria-label="Product quantity selector"
      >
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-gray-700 transition-colors hover:bg-[#6B1028] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
        >
          <FaMinus size={12} />
        </button>

        <div
          className="flex h-11 w-12 items-center justify-center border-x border-gray-300 text-base font-semibold text-gray-800 sm:h-12 sm:w-14 sm:text-lg"
          aria-live="polite"
          aria-atomic="true"
        >
          {quantity}
        </div>

        <button
          type="button"
          onClick={increase}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-gray-700 transition-colors hover:bg-[#6B1028] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
        >
          <FaPlus size={12} />
        </button>
      </div>

      {/* Available Stock */}

      <p className="mt-2 text-xs text-gray-500 sm:text-sm">
        Available Stock:{" "}
        <span className="font-medium text-gray-700">
          {max}
        </span>
      </p>
    </div>
  );
};

export default QuantitySelector;