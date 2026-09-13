import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import addressService from "../services/addressService";
import { createOrder } from "../services/orderService";

import {
  createPaymentOrder,
  verifyPayment,
} from "../services/paymentService";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [couponCode, setCouponCode] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================
  // Fetch Addresses
  // =====================================

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const res =
        await addressService.getAddresses();

      const addressList = res.data || [];

      setAddresses(addressList);

      const defaultAddress =
        addressList.find(
          (address) => address.isDefault
        ) ||
        addressList[0] ||
        null;

      setSelectedAddress(defaultAddress);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load addresses."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Add Address
  // =====================================

  const addNewAddress = async (addressData) => {
    try {
      setLoading(true);

      const res =
        await addressService.addAddress(
          addressData
        );

      setAddresses(res.data);

      const defaultAddress =
        res.data.find(
          (address) => address.isDefault
        ) || res.data[0];

      setSelectedAddress(defaultAddress);

      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add address."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Update Address
  // =====================================

  const updateExistingAddress = async (
    addressId,
    addressData
  ) => {
    try {
      setLoading(true);

      const res =
        await addressService.updateAddress(
          addressId,
          addressData
        );

      setAddresses(res.data);

      const defaultAddress =
        res.data.find(
          (address) => address.isDefault
        ) || res.data[0];

      setSelectedAddress(defaultAddress);

      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update default address."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Delete Address
  // =====================================

  const removeAddress = async (addressId) => {
    try {
      setLoading(true);

      const res =
        await addressService.deleteAddress(
          addressId
        );

      setAddresses(res.data);

      const defaultAddress =
        res.data.find(
          (address) => address.isDefault
        ) ||
        res.data[0] ||
        null;

      setSelectedAddress(defaultAddress);

      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete address."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Set Default Address
  // =====================================

  const makeDefaultAddress = async (addressId) => {
    try {
      setLoading(true);

      const res =
        await addressService.setDefaultAddress(
          addressId
        );

      setAddresses(res.data);

      const defaultAddress =
        res.data.find(
          (address) => address.isDefault
        ) || res.data[0];

      setSelectedAddress(defaultAddress);

      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update default address."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // COD / NORMAL ORDER
  // =====================================

  const placeOrder = async ({
    addressId,
    paymentMethod,
    couponCode,
    buyNowItem,
  }) => {
    try {
      setLoading(true);

      const response = await createOrder({
        addressId,
        paymentMethod,
        couponCode,

        ...(buyNowItem
          ? {
              buyNowItem,
            }
          : {}),
      });

      return response;
    } catch (error) {
      console.error(
        "Place Order Error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // CREATE RAZORPAY ORDER
  // =====================================

  const createRazorpayPayment = async ({
    addressId,
    couponCode,
    buyNowItem,
  }) => {
    try {
      setLoading(true);

      const response =
        await createPaymentOrder({
          addressId,
          couponCode,
          buyNowItem,
        });

      return response;
    } catch (error) {
      console.error(
        "Create Razorpay Payment Error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // VERIFY RAZORPAY PAYMENT
  // =====================================

  const verifyRazorpayPayment = async ({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  }) => {
    try {
      setLoading(true);

      const response =
        await verifyPayment({
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
        });

      return response;
    } catch (error) {
      console.error(
        "Verify Razorpay Payment Error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Load Addresses
  // =====================================

  useEffect(() => {
    fetchAddresses();
  }, []);

  // =====================================
  // PROVIDER
  // =====================================

  return (
    <CheckoutContext.Provider
      value={{
        // Loading
        loading,

        // Address
        addresses,
        selectedAddress,

        setSelectedAddress,

        fetchAddresses,
        addNewAddress,
        updateExistingAddress,
        removeAddress,
        makeDefaultAddress,

        // Payment
        paymentMethod,
        setPaymentMethod,

        // Coupon
        couponCode,
        setCouponCode,

        // COD / Normal Order
        placeOrder,

        // Razorpay
        createRazorpayPayment,
        verifyRazorpayPayment,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// =====================================
// HOOK
// =====================================

export const useCheckout = () =>
  useContext(CheckoutContext);