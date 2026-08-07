import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const {
    handleUpdateQuantity,
    handleRemoveItem,
  } = useCart();

  const product = item.product;

  const image =
    product?.colors
      ?.find((c) => c.name === item.color)
      ?.images?.[0]?.url ||
    "/placeholder.png";

  const increase = () => {
    handleUpdateQuantity(item._id, item.quantity + 1);
  };

  const decrease = () => {
    if (item.quantity > 1) {
      handleUpdateQuantity(item._id, item.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">

      <div className="flex flex-col md:flex-row gap-6">

        {/* Product Image */}

        <div className="w-full md:w-40 h-48 rounded-xl overflow-hidden bg-gray-100">

          <img
            src={image}
            alt={product?.name}
            className="w-full h-full object-cover"
          />

        </div>

        {/* Product Details */}

        <div className="flex-1">

          <h2 className="text-2xl font-serif text-[#6B1028]">
            {product?.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {product?.category?.name}
          </p>

          {/* Color & Size */}

          <div className="flex gap-6 mt-4">

            <div>
              <span className="text-gray-500">
                Color
              </span>

              <p className="font-medium">
                {item.color}
              </p>
            </div>

            <div>
              <span className="text-gray-500">
                Size
              </span>

              <p className="font-medium">
                {item.size}
              </p>
            </div>

          </div>

          {/* Price */}

          <div className="flex items-center gap-3 mt-5">

            <span className="text-2xl font-bold text-[#6B1028]">
              ₹{item.discountPrice}
            </span>

            {item.price > item.discountPrice && (
              <span className="line-through text-gray-400">
                ₹{item.price}
              </span>
            )}

          </div>

          {/* Quantity */}

          <div className="flex items-center mt-6">

            <button
              onClick={decrease}
              disabled={item.quantity <= 1}
              className="w-10 h-10 border rounded-l-lg flex items-center justify-center hover:bg-[#6B1028] hover:text-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <FaMinus />
            </button>

            <div className="w-14 h-10 border-t border-b flex items-center justify-center font-semibold">
              {item.quantity}
            </div>

            <button
              onClick={increase}
              className="w-10 h-10 border rounded-r-lg flex items-center justify-center hover:bg-[#6B1028] hover:text-white"
            >
              <FaPlus />
            </button>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex flex-col justify-between items-end">

          <button
            onClick={() => handleRemoveItem(item._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>

          <div className="text-right">

            <p className="text-gray-500">
              Total
            </p>

            <h3 className="text-2xl font-bold text-[#6B1028]">
              ₹{item.discountPrice * item.quantity}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartItem;