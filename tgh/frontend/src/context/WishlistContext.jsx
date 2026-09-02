import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getWishlist,
  addWishlist,
  removeWishlist,
} from "../services/wishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Fetch Wishlist
  // ==========================================

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const response = await getWishlist();

      console.log("Wishlist API Response:", response);

      /*
        Backend response:

        {
          success: true,
          data: {
            user: "...",
            products: [...]
          }
        }
      */

      const products =
        response?.data?.products || [];

      console.log(
        "Wishlist Products:",
        products
      );

      setWishlist(products);
      setWishlistCount(products.length);

    } catch (error) {
      console.error(
        "Wishlist fetch error:",
        error
      );

      setWishlist([]);
      setWishlistCount(0);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Add To Wishlist
  // ==========================================

  const addToWishlist = async (productId) => {
    try {
      const response =
        await addWishlist(productId);

      toast.success(
        response.message ||
          "Product added to wishlist"
      );

      // Refresh wishlist after adding
      await fetchWishlist();

      return response;

    } catch (error) {
      console.error(
        "Add wishlist error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to add to wishlist"
      );

      throw error;
    }
  };

  // ==========================================
  // Remove From Wishlist
  // ==========================================

  const removeFromWishlist = async (
    productId
  ) => {
    try {
      const response =
        await removeWishlist(productId);

      toast.success(
        response.message ||
          "Product removed from wishlist"
      );

      // Refresh wishlist after removing
      await fetchWishlist();

      return response;

    } catch (error) {
      console.error(
        "Remove wishlist error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to remove from wishlist"
      );

      throw error;
    }
  };

  // ==========================================
  // Check Product In Wishlist
  // ==========================================

  const isInWishlist = (productId) => {
    if (!productId) {
      return false;
    }

    return wishlist.some((product) => {
      const id =
        product?.product?._id ||
        product?._id ||
        product?.product;

      return (
        id?.toString() ===
        productId?.toString()
      );
    });
  };

  // ==========================================
  // Load Wishlist
  // ==========================================

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setWishlistCount(0);
    }
  }, []);

  // ==========================================
  // Provider
  // ==========================================

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        loading,

        fetchWishlist,

        addToWishlist,
        removeFromWishlist,

        isInWishlist,

        setWishlist,
        setWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ==========================================
// Hook
// ==========================================

export const useWishlist = () =>
  useContext(WishlistContext);