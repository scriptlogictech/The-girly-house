import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { handleAddToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  if (!product) return null;

  const firstColor = product.colors?.[0];
  const firstImage = firstColor?.images?.[0]?.url || "";
  const firstSize = firstColor?.sizes?.[0];

  const actualPrice = firstSize?.price || 0;
  const salePrice =
    firstSize?.discountPrice > 0
      ? firstSize.discountPrice
      : actualPrice;

  const discount =
    actualPrice > salePrice
      ? Math.round(((actualPrice - salePrice) / actualPrice) * 100)
      : 0;

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstColor || !firstSize) {
      return toast.warning("Product variant not available.");
    }

    try {
      await handleAddToCart({
        productId: product._id,
        color: firstColor.name,
        size: firstSize.size,
        quantity: 1,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden">

      {/* Clickable Area */}
      <Link to={`/product/${product.slug}`}>

        <div className="relative overflow-hidden">

          <img
            src={firstImage}
            alt={product.name}
            className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-300"
          />

          {product.isNewArrival && (
            <span className="absolute top-3 left-3 bg-[#6B1028] text-white text-xs px-3 py-1 rounded-full">
              NEW
            </span>
          )}

        </div>

        <div className="p-5">

          <h3 className="font-semibold text-lg text-[#6B1028] line-clamp-2">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {product.brand}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <FaStar className="text-yellow-500" />

            <span>{product.averageRating || 0}</span>

            <span className="text-gray-400">
              ({product.totalReviews || 0})
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3">

            <span className="text-2xl font-bold text-[#6B1028]">
              ₹{salePrice}
            </span>

            {discount > 0 && (
              <>
                <span className="line-through text-gray-400">
                  ₹{actualPrice}
                </span>

                <span className="text-green-600 font-semibold">
                  {discount}% OFF
                </span>
              </>
            )}

          </div>

        </div>

      </Link>

      {/* Action Buttons */}
      <div className="px-5 pb-5 flex gap-3">

        <button
          onClick={addToCart}
          className="flex-1 bg-[#6B1028] hover:bg-[#54101F] text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
        >
          <FaShoppingCart />
          Add to Cart
        </button>

        <button
          onClick={handleWishlist}
          className={`w-12 h-12 rounded-xl border flex items-center justify-center transition ${
            isInWishlist(product._id)
              ? "bg-pink-500 border-pink-500 text-white"
              : "border-gray-300 hover:border-pink-500"
          }`}
        >
          <FaHeart />
        </button>

      </div>

    </div>
  );
};

export default ProductCard;