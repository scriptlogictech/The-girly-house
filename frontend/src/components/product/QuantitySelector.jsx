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
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Quantity
      </h3>

      <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden">

        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= 1}
          className="w-12 h-12 flex items-center justify-center hover:bg-[#6B1028] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaMinus size={14} />
        </button>

        <div className="w-14 h-12 flex items-center justify-center border-x font-semibold text-lg">
          {quantity}
        </div>

        <button
          type="button"
          onClick={increase}
          disabled={quantity >= max}
          className="w-12 h-12 flex items-center justify-center hover:bg-[#6B1028] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus size={14} />
        </button>

      </div>

      <p className="mt-2 text-sm text-gray-500">
        Available Stock: {max}
      </p>
    </div>
  );
};

export default QuantitySelector;