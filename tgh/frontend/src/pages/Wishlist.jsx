import { Link } from "react-router-dom";
import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const {
    wishlist,
    loading,
    removeFromWishlist,
  } = useWishlist();

  const { handleAddToCart } = useCart();

  // ==========================================
  // Get Product
  // ==========================================

  const getProduct = (item) => {
    // Backend returns populated products directly
    if (item?.product) {
      return item.product;
    }

    return item;
  };

  // ==========================================
  // Add Product To Cart
  // ==========================================

  const handleCart = async (product) => {
    try {
      if (!product?._id) {
        return;
      }

      const firstAvailableColor =
        product.colors?.find((color) =>
          color.sizes?.some(
            (size) => size.stock > 0
          )
        );

      if (!firstAvailableColor) {
        alert("Product is currently out of stock.");
        return;
      }

      const firstAvailableSize =
        firstAvailableColor.sizes?.find(
          (size) => size.stock > 0
        );

      if (!firstAvailableSize) {
        alert("Product is currently out of stock.");
        return;
      }

      await handleAddToCart({
        productId: product._id,
        color: firstAvailableColor.name,
        size: firstAvailableSize.size,
        quantity: 1,
      });
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] py-12">
        <div className="max-w-7xl mx-auto px-4">

          <div className="mb-10">
            <h1 className="text-4xl font-serif text-[#6B1028]">
              My Wishlist
            </h1>

            <p className="text-gray-500 mt-2">
              Save your favorite products for later.
            </p>
          </div>

          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-[#6B1028] border-t-transparent rounded-full animate-spin" />
          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // Empty Wishlist
  // ==========================================

  if (!wishlist || wishlist.length === 0) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] py-12">
        <div className="max-w-7xl mx-auto px-4">

          <div className="mb-10">
            <h1 className="text-4xl font-serif text-[#6B1028]">
              My Wishlist
            </h1>

            <p className="text-gray-500 mt-2">
              Save your favorite products for later.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <div className="flex justify-center mb-6">
              <FaHeart className="text-6xl text-[#6B1028]" />
            </div>

            <h2 className="text-3xl font-semibold mb-4">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Browse our latest collection and add
              your favourite products.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition"
            >
              Continue Shopping
              <FaArrowRight />
            </Link>

          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // Wishlist Page
  // ==========================================

  return (
    <section className="min-h-screen bg-[#FFFDFC] py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* ==============================
            Header
        ============================== */}

        <div className="mb-10">

          <div className="flex items-center justify-between gap-4">

            <div>
              <h1 className="text-4xl font-serif text-[#6B1028]">
                My Wishlist
              </h1>

              <p className="text-gray-500 mt-2">
                Save your favorite products for later.
              </p>
            </div>

            <div className="text-gray-500">
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "Item"
                : "Items"}
            </div>

          </div>

        </div>

        {/* ==============================
            Wishlist Products
        ============================== */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

          {wishlist.map((item, index) => {

            const product = getProduct(item);

            if (!product) {
              return null;
            }

            // ==================================
            // Product Image
            // ==================================

            const image =
              product.image?.url ||
              product.images?.[0]?.url ||
              product.images?.[0] ||
              product.colors?.[0]?.images?.[0]?.url ||
              product.colors?.[0]?.images?.[0] ||
              "https://placehold.co/600x800?text=Product";

            // ==================================
            // Find Available Variant
            // ==================================

            const availableColor =
              product.colors?.find((color) =>
                color.sizes?.some(
                  (size) => size.stock > 0
                )
              );

            const availableSize =
              availableColor?.sizes?.find(
                (size) => size.stock > 0
              );

            // ==================================
            // Price
            // ==================================

            const price =
              product.price ||
              availableSize?.price ||
              0;

            const discountPrice =
              product.discountPrice &&
                product.discountPrice < price
                ? product.discountPrice
                : availableSize?.discountPrice &&
                  availableSize.discountPrice < price
                  ? availableSize.discountPrice
                  : price;

            const hasDiscount =
              price > discountPrice;

            // ==================================
            // Product Link
            // ==================================

            const productLink = product.slug
              ? `/product/${product.slug}`
              : `/product/${product._id}`;

            return (
              <div
                key={
                  item._id ||
                  product._id ||
                  index
                }
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >

                {/* ==========================
                    Image
                ========================== */}

                <div className="relative h-[380px] overflow-hidden bg-gray-100">

                  <Link to={productLink}>

                    <img
                      src={image}
                      alt={
                        product.name ||
                        "Wishlist Product"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                  </Link>

                  {/* ==========================
                      Wishlist Heart
                  ========================== */}

                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6B1028]">

                    <FaHeart size={15} />

                  </div>

                  {/* ==========================
                      Remove Button
                  ========================== */}

                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(
                        product._id
                      )
                    }
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-300"
                    title="Remove from wishlist"
                  >
                    <FaTrash size={14} />
                  </button>

                  {/* ==========================
                      Discount Badge
                  ========================== */}

                  {hasDiscount && (
                    <div className="absolute bottom-4 left-4 bg-[#6B1028] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {Math.round(
                        ((price - discountPrice) /
                          price) *
                        100
                      )}
                      % OFF
                    </div>
                  )}

                </div>

                {/* ==========================
                    Product Content
                ========================== */}

                <div className="p-5">

                  <Link to={productLink}>

                    <h3 className="text-xl font-semibold text-gray-800 hover:text-[#6B1028] transition-colors duration-300 line-clamp-2">
                      {product.name ||
                        "Product"}
                    </h3>

                  </Link>

                  {/* Category */}

                  {product.category?.name && (
                    <p className="text-sm text-gray-400 mt-1">
                      {product.category.name}
                    </p>
                  )}

                  {/* ==========================
                      Price
                  ========================== */}

                  <div className="flex items-center gap-3 mt-3">

                    <span className="text-xl font-bold text-[#6B1028]">
                      ₹
                      {discountPrice}
                    </span>

                    {hasDiscount && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{price}
                      </span>
                    )}

                  </div>

                  {/* ==========================
                      Stock
                  ========================== */}

                  {availableSize ? (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ In Stock
                    </p>
                  ) : (
                    <p className="text-sm text-red-500 mt-2">
                      Out of Stock
                    </p>
                  )}

                  {/* ==========================
                      Add To Cart
                  ========================== */}

                  <button
                    type="button"
                    disabled={!availableSize}
                    onClick={() =>
                      handleCart(product)
                    }
                    className="w-full mt-5 bg-[#6B1028] hover:bg-[#541020] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >

                    <FaShoppingCart />

                    {availableSize
                      ? "Add to Cart"
                      : "Out of Stock"}

                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Wishlist;