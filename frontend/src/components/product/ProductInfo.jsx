import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { toast } from "react-toastify";

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
  const { handleAddToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  if (!product) return null;

  const stock = selectedSize?.stock || 0;

  const currentPrice =
    selectedSize?.discountPrice > 0
      ? selectedSize.discountPrice
      : selectedSize?.price || 0;

  const originalPrice = selectedSize?.price || 0;

  const discount =
    originalPrice > currentPrice
      ? Math.round(
          ((originalPrice - currentPrice) /
            originalPrice) *
            100
        )
      : 0;

  const addCart = async () => {
    if (!selectedColor) {
      return toast.warning("Please select a color.");
    }

    if (!selectedSize) {
      return toast.warning("Please select a size.");
    }

    await handleAddToCart({
      productId: product._id,
      color: selectedColor.name,
      size: selectedSize.size,
      quantity,
    });
  };

  const handleWishlist = async () => {
    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {}
  };

  return (
    <div className="space-y-7">

      <div>

        <p className="uppercase tracking-widest text-gray-500 text-sm">
          {product.brand}
        </p>

        <h1 className="text-4xl font-bold text-[#6B1028] mt-2">
          {product.name}
        </h1>

        <p className="mt-3 text-gray-600">
          {product.shortDescription}
        </p>

      </div>

      {/* Rating */}

      <div className="flex items-center gap-3">

        <div className="bg-green-600 text-white px-3 py-1 rounded">
          ⭐ {product.averageRating || 0}
        </div>

        <span className="text-gray-500">
          {product.totalReviews || 0} Reviews
        </span>

      </div>

      {/* Price */}

      <div className="flex items-center gap-4">

        <span className="text-4xl font-bold text-[#6B1028]">
          ₹{currentPrice}
        </span>

        {discount > 0 && (
          <>
            <span className="text-xl line-through text-gray-400">
              ₹{originalPrice}
            </span>

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              {discount}% OFF
            </span>
          </>
        )}

      </div>

      {/* Description */}

      <div>

        <h3 className="font-semibold mb-2">
          Description
        </h3>

        <p className="text-gray-600 leading-7">
          {product.description}
        </p>

      </div>

      {/* Color */}

      <ColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
      />

      {/* Size */}

      <SizeSelector
        sizes={selectedColor?.sizes || []}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      {/* Quantity */}

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        max={stock}
      />

      {/* Stock */}

      <div>
        {stock > 0 ? (
          <span className="text-green-600 font-semibold">
            ✓ {stock} Items Available
          </span>
        ) : (
          <span className="text-red-600 font-semibold">
            Out of Stock
          </span>
        )}
      </div>

      {/* Buttons */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <button
          onClick={addCart}
          disabled={stock === 0}
          className="bg-[#6B1028] hover:bg-[#54101F] text-white rounded-xl py-4 flex justify-center items-center gap-2 transition disabled:opacity-50"
        >
          <FaShoppingCart />

          Add to Cart
        </button>

        <button
          className="bg-black hover:bg-gray-800 text-white rounded-xl py-4 flex justify-center items-center gap-2 transition"
        >
          <FaBolt />

          Buy Now
        </button>

        <button
          onClick={handleWishlist}
          className={`rounded-xl py-4 border flex justify-center items-center gap-2 transition ${
            isInWishlist(product._id)
              ? "bg-pink-500 text-white border-pink-500"
              : "border-gray-300 hover:border-pink-500"
          }`}
        >
          <FaHeart />

          {isInWishlist(product._id)
            ? "Wishlisted"
            : "Wishlist"}
        </button>

      </div>

      {/* Product Details */}

      <div className="rounded-xl border p-5 bg-gray-50 space-y-3">

        <div>
          <strong>Material:</strong>{" "}
          {product.material || "Premium"}
        </div>

        <div>
          <strong>Fabric:</strong>{" "}
          {product.fabric || "-"}
        </div>

        <div>
          <strong>Fit:</strong>{" "}
          {product.fit || "-"}
        </div>

      </div>

      {/* Delivery */}

      <div className="rounded-xl border p-5 bg-white space-y-2">

        <p>🚚 Free Delivery above ₹999</p>

        <p>🔄 7 Days Easy Returns</p>

        <p>🔒 Secure Payments</p>

      </div>

    </div>
  );
};

export default ProductInfo;