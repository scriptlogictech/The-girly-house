import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";
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

  const firstColor = product?.colors?.[0];
  const firstImage = firstColor?.images?.[0];
  const firstSize = firstColor?.sizes?.[0];

  const image =
    firstImage?.url ||
    "https://via.placeholder.com/500x600?text=No+Image";

  const price = firstSize?.price || 0;
  const discountPrice =
    firstSize?.discountPrice > 0
      ? firstSize.discountPrice
      : price;

  const stock = firstSize?.stock || 0;

  const discount =
    price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={image}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
          />
        </Link>

        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-[#6B1028] text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}

        <button
          onClick={handleWishlist}
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full shadow flex items-center justify-center transition ${
            isInWishlist(product._id)
              ? "bg-pink-500 text-white"
              : "bg-white hover:bg-[#6B1028] hover:text-white"
          }`}
        >
          <FaHeart />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category?.name}
        </p>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mt-1 text-gray-800 line-clamp-2 hover:text-[#6B1028] transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <FaStar className="text-yellow-500" />

          <span className="text-sm">
            {product.averageRating || 0}
          </span>

          <span className="text-gray-400 text-sm">
            ({product.totalReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-bold text-[#6B1028]">
            ₹{discountPrice}
          </span>

          {price > discountPrice && (
            <>
              <span className="line-through text-gray-400">
                ₹{price}
              </span>

              <span className="text-green-600 text-sm font-medium">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <p
          className={`text-sm mt-2 ${
            stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {stock > 0 ? `${stock} in stock` : "Out of Stock"}
        </p>

        {/* Add To Cart */}
        <button
          onClick={addToCart}
          disabled={stock === 0}
          className={`mt-5 w-full py-3 rounded-xl flex items-center justify-center gap-2 transition ${
            stock > 0
              ? "bg-[#6B1028] hover:bg-[#52101f] text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FaShoppingBag />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;