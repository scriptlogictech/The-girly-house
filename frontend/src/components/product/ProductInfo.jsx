
import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}) => {
  const navigate = useNavigate();

  const { handleAddToCart, startDirectCheckout } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  if (!product) return null;

  const stock = selectedSize?.stock || 0;
  const isWishlisted = isInWishlist(product._id);

  const currentPrice =
    selectedSize?.discountPrice > 0
      ? selectedSize.discountPrice
      : selectedSize?.price || 0;

  const originalPrice = selectedSize?.price || 0;

  const discount =
    originalPrice > currentPrice
      ? Math.round(
          ((originalPrice - currentPrice) / originalPrice) * 100
        )
      : 0;

  const validateSelection = () => {
    if (!selectedColor) {
      toast.warning("Please select a color.");
      return false;
    }

    if (!selectedSize) {
      toast.warning("Please select a size.");
      return false;
    }

    if (stock <= 0) {
      toast.warning("This product is out of stock.");
      return false;
    }

    if (quantity <= 0) {
      toast.warning("Please select a valid quantity.");
      return false;
    }

    if (quantity > stock) {
      toast.warning(`Only ${stock} items are available.`);
      return false;
    }

    return true;
  };

  /* Add to Cart */

  const addCart = async () => {
    if (!validateSelection()) return;

    try {
      await handleAddToCart({
        productId: product._id,
        color: selectedColor.name,
        size: selectedSize.size,
        quantity,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  /* Buy Now */

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    startDirectCheckout({
      productId: product._id,
      color: selectedColor.name,
      size: selectedSize.size,
      quantity,
    });

    navigate("/checkout");
  };

  /* Wishlist */

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6 lg:space-y-7">

      {/* PRODUCT HEADER */}

      <div className="min-w-0">
        {product.brand && (
          <p className="text-xs uppercase tracking-[0.16em] text-gray-500 sm:text-sm sm:tracking-widest">
            {product.brand}
          </p>
        )}

        <h1 className="mt-2 break-words text-2xl font-bold leading-tight text-[#6B1028] sm:text-3xl lg:text-4xl">
          {product.name}
        </h1>

        {product.shortDescription && (
          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            {product.shortDescription}
          </p>
        )}
      </div>

      {/* RATING */}

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="inline-flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1.5 text-sm text-white sm:px-3">
          <span>★</span>
          <span>{product.averageRating || 0}</span>
        </div>

        <span className="text-xs text-gray-500 sm:text-sm">
          {product.totalReviews || 0} Reviews
        </span>
      </div>

      {/* PRICE */}

      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-3xl font-bold text-[#6B1028] sm:text-4xl">
          ₹{currentPrice}
        </span>

        {discount > 0 && (
          <>
            <span className="text-base text-gray-400 line-through sm:text-xl">
              ₹{originalPrice}
            </span>

            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600 sm:text-sm">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* DESCRIPTION */}

      {product.description && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
            Description
          </h3>

          <p className="break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            {product.description}
          </p>
        </div>
      )}

      {/* COLOR SELECTOR */}

      <div className="min-w-0">
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
        />
      </div>

      {/* SIZE SELECTOR */}

      <div className="min-w-0">
        <SizeSelector
          sizes={selectedColor?.sizes || []}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>

      {/* QUANTITY */}

      <div className="min-w-0">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          max={stock}
        />
      </div>

      {/* STOCK */}

      <div>
        {stock > 0 ? (
          <span className="text-sm font-semibold text-green-600 sm:text-base">
            ✓ {stock} Items Available
          </span>
        ) : (
          <span className="text-sm font-semibold text-red-600 sm:text-base">
            Out of Stock
          </span>
        )}
      </div>

      {/* ACTION BUTTONS */}

      <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">

        {/* ADD TO CART */}

        <button
          type="button"
          onClick={addCart}
          disabled={stock <= 0}
          className="flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-[#6B1028] px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-[#54101F] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        >
          <FaShoppingCart className="shrink-0" />
          <span>Add to Cart</span>
        </button>

        {/* BUY NOW */}

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={stock <= 0}
          className="flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-black px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        >
          <FaBolt className="shrink-0" />
          <span>Buy Now</span>
        </button>

        {/* WISHLIST */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-pressed={isWishlisted}
          className={`flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors sm:text-base min-[360px]:col-span-2 lg:col-span-1 ${
            isWishlisted
              ? "border-pink-500 bg-pink-500 text-white"
              : "border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-500"
          }`}
        >
          <FaHeart className="shrink-0" />
          <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
        </button>
      </div>

      {/* PRODUCT DETAILS */}

      <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5 sm:p-5">
        <div className="grid grid-cols-[85px_minmax(0,1fr)] gap-2 text-sm sm:grid-cols-[100px_minmax(0,1fr)] sm:text-base">
          <strong className="text-gray-800">Material:</strong>
          <span className="break-words text-gray-600">
            {product.material || "Premium"}
          </span>
        </div>

        <div className="grid grid-cols-[85px_minmax(0,1fr)] gap-2 text-sm sm:grid-cols-[100px_minmax(0,1fr)] sm:text-base">
          <strong className="text-gray-800">Fabric:</strong>
          <span className="break-words text-gray-600">
            {product.fabric || "-"}
          </span>
        </div>

        <div className="grid grid-cols-[85px_minmax(0,1fr)] gap-2 text-sm sm:grid-cols-[100px_minmax(0,1fr)] sm:text-base">
          <strong className="text-gray-800">Fit:</strong>
          <span className="break-words text-gray-600">
            {product.fit || "-"}
          </span>
        </div>
      </div>

      {/* DELIVERY INFORMATION */}

      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-3.5 text-sm text-gray-700 sm:p-5 sm:text-base">
        <p className="flex items-start gap-2">
          <span className="shrink-0" aria-hidden="true">🚚</span>
          <span>Free Delivery above ₹999</span>
        </p>

        <p className="flex items-start gap-2">
          <span className="shrink-0" aria-hidden="true">🔄</span>
          <span>7 Days Easy Returns</span>
        </p>

        <p className="flex items-start gap-2">
          <span className="shrink-0" aria-hidden="true">🔒</span>
          <span>Secure Payments</span>
        </p>
      </div>

    </div>
  );
};

export default ProductInfo;
