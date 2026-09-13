import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/cartService";

const CartContext = createContext();

const emptyCart = {
  items: [],
  subtotal: 0,
  totalDiscount: 0,
  totalAmount: 0,
  totalItems: 0,
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(emptyCart);

  const [loading, setLoading] = useState(false);

  /*
  =====================================================
  DIRECT CHECKOUT / BUY NOW
  =====================================================
  */

  const [directCheckout, setDirectCheckout] = useState(() => {
    try {
      const saved = sessionStorage.getItem(
        "girlyHouseDirectCheckout"
      );

      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error(
        "Direct checkout restore error:",
        error
      );

      return null;
    }
  });

  /*
  =====================================================
  FETCH CART
  =====================================================
  */

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await getCart();

      setCart(res.data || emptyCart);
    } catch (error) {
      console.error("Fetch cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
  =====================================================
  ADD TO CART
  =====================================================
  */

  const handleAddToCart = async (payload) => {
    try {
      const res = await addToCart(payload);

      setCart(res.data);

      toast.success(
        res.message || "Product added to cart."
      );

      return res;
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to add item."
      );

      throw error;
    }
  };

  /*
  =====================================================
  UPDATE CART QUANTITY
  =====================================================
  */

  const handleUpdateQuantity = async (
    itemId,
    quantity
  ) => {
    try {
      const res = await updateCartItem(
        itemId,
        quantity
      );

      setCart(res.data);

      return res;
    } catch (error) {
      console.error(
        "Update cart quantity error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to update cart."
      );

      throw error;
    }
  };

  /*
  =====================================================
  REMOVE CART ITEM
  =====================================================
  */

  const handleRemoveItem = async (itemId) => {
    try {
      const res = await removeCartItem(itemId);

      setCart(res.data);

      toast.success(
        res.message || "Item removed from cart."
      );

      return res;
    } catch (error) {
      console.error(
        "Remove cart item error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to remove item."
      );

      throw error;
    }
  };

  /*
  =====================================================
  CLEAR CART
  =====================================================
  */

  const handleClearCart = async () => {
    try {
      await clearCart();

      setCart(emptyCart);

      toast.success("Cart cleared.");
    } catch (error) {
      console.error("Clear cart error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to clear cart."
      );

      throw error;
    }
  };

  /*
  =====================================================
  BUY NOW
  =====================================================
  */

  const startDirectCheckout = (payload) => {
    try {
      setDirectCheckout(payload);

      sessionStorage.setItem(
        "girlyHouseDirectCheckout",
        JSON.stringify(payload)
      );
    } catch (error) {
      console.error(
        "Start direct checkout error:",
        error
      );
    }
  };

  /*
  =====================================================
  CLEAR BUY NOW
  =====================================================
  */

  const clearDirectCheckout = () => {
    setDirectCheckout(null);

    sessionStorage.removeItem(
      "girlyHouseDirectCheckout"
    );
  };

  /*
  =====================================================
  LOAD CART
  =====================================================
  */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchCart();
    }
  }, []);

  /*
  =====================================================
  PROVIDER
  =====================================================
  */

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,

        fetchCart,

        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        handleClearCart,

        // Buy Now
        directCheckout,
        startDirectCheckout,
        clearDirectCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);