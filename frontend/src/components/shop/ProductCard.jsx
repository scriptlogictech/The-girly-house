
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

  const isWishlisted = isInWishlist(product._id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-2xl sm:hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="relative shrink-0 overflow-hidden bg-[#faf7f2]">
        <Link
          to={`/product/${product.slug}`}
          className="block"
          aria-label={`View ${product.name}`}
        >
          <img
            src={image}
            alt={product.name || "Clothing product"}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Featured Badge */}
        {product.isFeatured && (
          <span className="absolute left-1.5 top-1.5 max-w-[70%] truncate rounded-full bg-[#6B1028] px-2 py-1 text-[9px] font-medium text-white sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            Featured
          </span>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-red-500 px-2 py-1 text-[9px] font-semibold text-white sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
          className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-colors duration-200 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10 ${
            isWishlisted
              ? "bg-pink-500 text-white"
              : "bg-white text-gray-700 hover:bg-[#6B1028] hover:text-white"
          }`}
        >
          <FaHeart className="text-xs sm:text-sm" />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">
        {/* Category */}
        <p className="truncate text-[10px] text-gray-500 sm:text-xs md:text-sm">
          {product.category?.name || "Collection"}
        </p>

        {/* Product Name */}
        <Link
          to={`/product/${product.slug}`}
          className="mt-1 block"
        >
          <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-semibold leading-5 text-gray-800 transition-colors hover:text-[#6B1028] sm:min-h-[3.25rem] sm:text-sm sm:leading-6 md:text-base">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1.5 flex min-w-0 items-center gap-1 sm:mt-2 sm:gap-1.5">
          <FaStar className="shrink-0 text-[10px] text-yellow-500 sm:text-xs" />

          <span className="text-[10px] font-medium text-gray-700 sm:text-xs">
            {product.averageRating || 0}
          </span>

          <span className="truncate text-[10px] text-gray-400 sm:text-xs">
            ({product.totalReviews || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-1 sm:mt-3 sm:gap-x-2">
          <span className="text-sm font-bold text-[#6B1028] sm:text-lg md:text-xl">
            ₹{discountPrice}
          </span>

          {price > discountPrice && (
            <>
              <span className="text-[10px] text-gray-400 line-through sm:text-sm">
                ₹{price}
              </span>

              <span className="text-[9px] font-medium text-green-600 sm:text-xs">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        <p
          className={`mt-1.5 text-[10px] sm:mt-2 sm:text-xs ${
            stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {stock > 0 ? `${stock} in stock` : "Out of Stock"}
        </p>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={addToCart}
          disabled={stock === 0}
          className={`mt-auto flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg px-1.5 py-2 text-[10px] font-medium transition-colors duration-200 sm:mt-4 sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-3 sm:text-sm ${
            stock > 0
              ? "bg-[#6B1028] text-white hover:bg-[#52101f]"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          <FaShoppingBag className="shrink-0 text-[10px] sm:text-sm" />
          <span>{stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;