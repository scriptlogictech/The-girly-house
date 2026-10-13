import { useEffect, useState } from "react";
import {
  FaStore,
  FaTruck,
  FaCreditCard,
  FaShoppingBag,
  FaSave,
  FaUndo,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../services/api";

const defaultSettings = {
  storeName: "The Girly House By Manisha",
  storeDescription:
    "Premium Farshi Salwar Suits for elegant women.",
  contactEmail: "",
  contactPhone: "",
  address: "",
  currency: "INR",
  freeShippingThreshold: 999,
  shippingCharge: 99,
  enableCOD: true,
  enableRazorpay: true,
  allowOrderCancellation: true,
  cancellationTimeLimit: 24,
};

const Settings = () => {
  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // FETCH SETTINGS
  // ==========================================

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const response = await API.get("/settings");

      if (response.data?.success) {
        setSettings({
          ...defaultSettings,
          ...response.data.data,
        });
      }
    } catch (error) {
      console.error(
        "Fetch Settings Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to load settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ==========================================
  // INPUT HANDLER
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...settings,
        freeShippingThreshold: Number(
          settings.freeShippingThreshold
        ),
        shippingCharge: Number(
          settings.shippingCharge
        ),
        cancellationTimeLimit: Number(
          settings.cancellationTimeLimit
        ),
      };

      const response = await API.put(
        "/settings",
        payload
      );

      if (response.data?.success) {
        setSettings({
          ...defaultSettings,
          ...response.data.data,
        });

        toast.success(
          response.data.message ||
            "Settings updated successfully."
        );
      }
    } catch (error) {
      console.error(
        "Update Settings Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to update settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    fetchSettings();
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDFC] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="w-10 h-10 border-4 border-[#6B1028] border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-500">
              Loading settings...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFC] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6B1028]">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your store information,
            shipping, payments and order settings.
          </p>
        </div>

        <form onSubmit={handleSave}>

          {/* ==========================================
              STORE INFORMATION
          ========================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">

            <div className="flex items-center gap-4 p-6 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-[#F9F4EC] flex items-center justify-center text-[#6B1028]">
                <FaStore size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Store Information
                </h2>

                <p className="text-sm text-gray-500">
                  Basic information about your store.
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Store Name */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>

                <input
                  type="text"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                  placeholder="Store name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    placeholder="store@example.com"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                  />
                </div>
              </div>

              {/* Currency */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>

                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                >
                  <option value="INR">
                    INR - Indian Rupee
                  </option>

                  <option value="USD">
                    USD - US Dollar
                  </option>
                </select>
              </div>

              {/* Address */}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Address
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter your store address"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none resize-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                  />
                </div>
              </div>

              {/* Description */}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Description
                </label>

                <textarea
                  name="storeDescription"
                  value={settings.storeDescription}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your store..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                />
              </div>
            </div>
          </div>

          {/* ==========================================
              SHIPPING SETTINGS
          ========================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">

            <div className="flex items-center gap-4 p-6 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-[#F9F4EC] flex items-center justify-center text-[#6B1028]">
                <FaTruck size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Shipping Settings
                </h2>

                <p className="text-sm text-gray-500">
                  Configure your shipping charges.
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Shipping Above
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    name="freeShippingThreshold"
                    value={
                      settings.freeShippingThreshold
                    }
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Orders above this amount get free
                  shipping.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Charge
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    name="shippingCharge"
                    value={settings.shippingCharge}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Shipping charge when the order does
                  not qualify for free shipping.
                </p>
              </div>
            </div>
          </div>

          {/* ==========================================
              PAYMENT SETTINGS
          ========================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">

            <div className="flex items-center gap-4 p-6 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-[#F9F4EC] flex items-center justify-center text-[#6B1028]">
                <FaCreditCard size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Payment Settings
                </h2>

                <p className="text-sm text-gray-500">
                  Enable or disable payment methods.
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">

              {/* COD */}

              <label className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-5 cursor-pointer hover:bg-[#FFFDFC] transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    <FaShoppingBag />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Cash on Delivery
                    </h3>

                    <p className="text-sm text-gray-500">
                      Allow customers to pay when
                      their order arrives.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  name="enableCOD"
                  checked={settings.enableCOD}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#6B1028]"
                />
              </label>

              {/* Razorpay */}

              <label className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-5 cursor-pointer hover:bg-[#FFFDFC] transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaCreditCard />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Razorpay
                    </h3>

                    <p className="text-sm text-gray-500">
                      Accept online payments through
                      Razorpay.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  name="enableRazorpay"
                  checked={settings.enableRazorpay}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#6B1028]"
                />
              </label>
            </div>
          </div>

          {/* ==========================================
              ORDER SETTINGS
          ========================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">

            <div className="flex items-center gap-4 p-6 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-[#F9F4EC] flex items-center justify-center text-[#6B1028]">
                <FaShoppingBag size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Order Settings
                </h2>

                <p className="text-sm text-gray-500">
                  Configure customer order options.
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">

              {/* Cancellation */}

              <label className="flex items-center justify-between gap-4 border border-gray-100 rounded-xl p-5 cursor-pointer">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Allow Order Cancellation
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Allow customers to cancel their
                    orders.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="allowOrderCancellation"
                  checked={
                    settings.allowOrderCancellation
                  }
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#6B1028]"
                />
              </label>

              {/* Cancellation Time */}

              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Time Limit
                </label>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    name="cancellationTimeLimit"
                    value={
                      settings.cancellationTimeLimit
                    }
                    onChange={handleChange}
                    disabled={
                      !settings.allowOrderCancellation
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none disabled:bg-gray-100 focus:border-[#6B1028] focus:ring-1 focus:ring-[#6B1028]"
                  />

                  <span className="text-gray-500 whitespace-nowrap">
                    Hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              ACTION BUTTONS
          ========================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-end gap-3">

            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              <FaUndo size={14} />
              Reset
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#6B1028] text-white font-semibold hover:bg-[#54101F] transition disabled:opacity-60"
            >
              <FaSave size={15} />

              {saving
                ? "Saving..."
                : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;