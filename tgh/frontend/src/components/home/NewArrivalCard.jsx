import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

const NewArrivalCard = ({ product }) => {
  const firstColor = product.colors?.[0];

  const image =
    firstColor?.images?.[0]?.url ||
    firstColor?.images?.[0] ||
    "https://via.placeholder.com/500x650";

  const firstSize = firstColor?.sizes?.[0];

  const price =
    firstSize?.discountPrice ||
    firstSize?.price ||
    0;

  const originalPrice =
    firstSize?.price || 0;

  const discount =
    originalPrice > price
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">

      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={product.name}
          className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-500"
        />

        {/* NEW Badge */}

        <span className="absolute top-4 left-4 bg-[#6B1028] text-white text-xs px-3 py-1 rounded-full font-semibold">
          NEW
        </span>

        {/* Discount */}

        {discount > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}

        <button className="absolute bottom-4 right-4 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-pink-500 hover:text-white transition">
          <FaHeart />
        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <p className="text-sm text-gray-500 uppercase">
          {product.category?.name}
        </p>

        <Link
          to={`/product/${product.slug}`}
        >
          <h3 className="text-xl font-semibold mt-2 hover:text-[#6B1028] transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mt-3">

          <span className="text-2xl font-bold text-[#6B1028]">
            ₹{price}
          </span>

          {discount > 0 && (
            <span className="line-through text-gray-400">
              ₹{originalPrice}
            </span>
          )}

        </div>

        <div className="flex items-center justify-between mt-5">

          <div className="text-yellow-500">
            ⭐ {product.averageRating || 5}
          </div>

          <button className="bg-[#6B1028] hover:bg-[#4a0b1d] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <FaShoppingCart />

            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default NewArrivalCard;