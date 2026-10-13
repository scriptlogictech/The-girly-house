
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
      ? Math.round(
          ((actualPrice - salePrice) / actualPrice) * 100
        )
      : 0;

  const stock = firstSize?.stock || 0;
  const isWishlisted = isInWishlist(product._id);

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstColor || !firstSize) {
      return toast.warning("Product variant not available.");
    }

    if (stock <= 0) {
      return toast.warning("Product is out of stock.");
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
      if (isWishlisted) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-2xl sm:hover:shadow-xl">

      {/* Product Image */}

      <Link
        to={`/product/${product.slug}`}
        className="block min-w-0"
        aria-label={`View ${product.name}`}
      >
        <div className="relative overflow-hidden bg-[#faf7f2]">
          <img
            src={firstImage}
            alt={product.name || "Product"}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {product.isNewArrival && (
            <span className="absolute left-2 top-2 rounded-full bg-[#6B1028] px-2 py-1 text-[9px] font-semibold text-white sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
              NEW
            </span>
          )}

          {discount > 0 && (
            <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[9px] font-semibold text-white sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
              {discount}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}

      <div className="flex flex-1 flex-col p-2.5 sm:p-4 md:p-5">

        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-[#6B1028] transition-colors hover:text-[#4F0B1D] sm:min-h-12 sm:text-base sm:leading-6">
            {product.name}
          </h3>
        </Link>

        {product.brand && (
          <p className="mt-1 truncate text-[10px] text-gray-500 sm:text-sm">
            {product.brand}
          </p>
        )}

        {/* Rating */}

        <div className="mt-2 flex items-center gap-1.5">
          <FaStar className="shrink-0 text-[10px] text-yellow-500 sm:text-sm" />

          <span className="text-[10px] text-gray-700 sm:text-sm">
            {product.averageRating || 0}
          </span>

          <span className="truncate text-[10px] text-gray-400 sm:text-sm">
            ({product.totalReviews || 0})
          </span>
        </div>

        {/* Price */}

        <div className="mt-2 flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-1 sm:mt-3 sm:gap-x-2">
          <span className="text-sm font-bold text-[#6B1028] sm:text-xl">
            ₹{salePrice}
          </span>

          {discount > 0 && (
            <>
              <span className="text-[10px] text-gray-400 line-through sm:text-sm">
                ₹{actualPrice}
              </span>

              <span className="text-[9px] font-medium text-green-600 sm:text-xs">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Actions */}

        <div className="mt-auto flex gap-2 pt-3 sm:gap-3 sm:pt-4">

          <button
            type="button"
            onClick={addToCart}
            disabled={stock <= 0}
            className={`flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-[10px] font-medium transition-colors sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm ${
              stock > 0
                ? "bg-[#6B1028] text-white hover:bg-[#54101F]"
                : "cursor-not-allowed bg-gray-200 text-gray-500"
            }`}
          >
            <FaShoppingCart className="shrink-0 text-[10px] sm:text-sm" />

            <span className="truncate">
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors sm:h-11 sm:w-11 sm:rounded-xl ${
              isWishlisted
                ? "border-pink-500 bg-pink-500 text-white"
                : "border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-500"
            }`}
          >
            <FaHeart className="text-xs sm:text-sm" />
          </button>

        </div>
      </div>
    </article>
  );
};

export default ProductCard;