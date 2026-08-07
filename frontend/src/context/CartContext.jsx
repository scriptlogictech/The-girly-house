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

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    subtotal: 0,
    totalDiscount: 0,
    totalAmount: 0,
    totalItems: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await getCart();

      setCart(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (payload) => {
    try {
      const res = await addToCart(payload);

      setCart(res.data);

      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add item."
      );
    }
  };

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
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update cart."
      );
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const res = await removeCartItem(itemId);

      setCart(res.data);

      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove item."
      );
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();

      setCart({
        items: [],
        subtotal: 0,
        totalDiscount: 0,
        totalAmount: 0,
        totalItems: 0,
      });

      toast.success("Cart cleared.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to clear cart."
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchCart();
    }
  }, []);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);