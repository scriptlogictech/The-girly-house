
import { useCallback, useEffect, useState } from "react";
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
  FaCog,
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

const defaultSettings = {
  storeName: "The Girly House By Manisha",
  storeDescription: "Premium Farshi Salwar Suits for elegant women.",
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

const inputClass =
  "w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10 sm:px-4";

const labelClass =
  "mb-2 block text-sm font-medium text-gray-700";

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch settings
  const fetchSettings = useCallback(async () => {
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
      console.error("Fetch Settings Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load settings."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save settings
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...settings,
        freeShippingThreshold: Number(
          settings.freeShippingThreshold
        ),
        shippingCharge: Number(settings.shippingCharge),
        cancellationTimeLimit: Number(
          settings.cancellationTimeLimit
        ),
      };

      const response = await API.put("/settings", payload);

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
      console.error("Update Settings Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // Reset form to the latest server settings
  const handleReset = () => {
    if (!saving) {
      fetchSettings();
    }
  };

  // Loading state
  if (loading) {
    return (
      <AdminLayout>
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-2xl border border-gray-100 bg-white px-4 py-12 text-center shadow-sm sm:px-8">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#6B1028] border-t-transparent" />

            <p className="mt-4 text-sm text-gray-500">
              Loading settings...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl min-w-0">
        {/* Page heading */}
        <div className="mb-5 flex items-start gap-3 sm:mb-8 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F9F4EC] text-[#6B1028] sm:h-12 sm:w-12">
            <FaCog size={20} />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-[#6B1028] sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Manage your store information, shipping, payments
              and order settings.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
          {/* Store Information */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <SectionHeader
              icon={<FaStore size={18} />}
              title="Store Information"
              description="Basic information about your store."
            />

            <div className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 md:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="storeName" className={labelClass}>
                  Store Name
                </label>

                <input
                  id="storeName"
                  type="text"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                  placeholder="Store name"
                  className={inputClass}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="contactEmail" className={labelClass}>
                  Contact Email
                </label>

                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-4" />

                  <input
                    id="contactEmail"
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    placeholder="store@example.com"
                    className={`${inputClass} pl-10 sm:pl-11`}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="contactPhone" className={labelClass}>
                  Contact Phone
                </label>

                <div className="relative">
                  <FaPhone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-4" />

                  <input
                    id="contactPhone"
                    type="tel"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`${inputClass} pl-10 sm:pl-11`}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="currency" className={labelClass}>
                  Currency
                </label>

                <select
                  id="currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
              </div>

              <div className="min-w-0 md:col-span-2">
                <label htmlFor="address" className={labelClass}>
                  Store Address
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="pointer-events-none absolute left-3.5 top-4 text-gray-400 sm:left-4" />

                  <textarea
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter your store address"
                    className={`${inputClass} resize-y pl-10 sm:pl-11`}
                  />
                </div>
              </div>

              <div className="min-w-0 md:col-span-2">
                <label
                  htmlFor="storeDescription"
                  className={labelClass}
                >
                  Store Description
                </label>

                <textarea
                  id="storeDescription"
                  name="storeDescription"
                  value={settings.storeDescription}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your store..."
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </section>

          {/* Shipping Settings */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <SectionHeader
              icon={<FaTruck size={18} />}
              title="Shipping Settings"
              description="Configure your shipping charges."
            />

            <div className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 md:grid-cols-2">
              <div className="min-w-0">
                <label
                  htmlFor="freeShippingThreshold"
                  className={labelClass}
                >
                  Free Shipping Above
                </label>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 sm:left-4">
                    ₹
                  </span>

                  <input
                    id="freeShippingThreshold"
                    type="number"
                    min="0"
                    name="freeShippingThreshold"
                    value={settings.freeShippingThreshold}
                    onChange={handleChange}
                    className={`${inputClass} pl-9 sm:pl-10`}
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Orders above this amount get free shipping.
                </p>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="shippingCharge"
                  className={labelClass}
                >
                  Shipping Charge
                </label>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 sm:left-4">
                    ₹
                  </span>

                  <input
                    id="shippingCharge"
                    type="number"
                    min="0"
                    name="shippingCharge"
                    value={settings.shippingCharge}
                    onChange={handleChange}
                    className={`${inputClass} pl-9 sm:pl-10`}
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Shipping charge when the order does not qualify
                  for free shipping.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Settings */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <SectionHeader
              icon={<FaCreditCard size={18} />}
              title="Payment Settings"
              description="Enable or disable payment methods."
            />

            <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
              <ToggleSetting
                icon={
                  <FaShoppingBag className="text-green-600" />
                }
                iconBackground="bg-green-50"
                title="Cash on Delivery"
                description="Allow customers to pay when their order arrives."
                name="enableCOD"
                checked={settings.enableCOD}
                onChange={handleChange}
              />

              <ToggleSetting
                icon={<FaCreditCard className="text-blue-600" />}
                iconBackground="bg-blue-50"
                title="Razorpay"
                description="Accept online payments through Razorpay."
                name="enableRazorpay"
                checked={settings.enableRazorpay}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Order Settings */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <SectionHeader
              icon={<FaShoppingBag size={18} />}
              title="Order Settings"
              description="Configure customer order options."
            />

            <div className="space-y-5 p-4 sm:p-6">
              <ToggleSetting
                title="Allow Order Cancellation"
                description="Allow customers to cancel their orders."
                name="allowOrderCancellation"
                checked={settings.allowOrderCancellation}
                onChange={handleChange}
              />

              <div className="w-full max-w-md">
                <label
                  htmlFor="cancellationTimeLimit"
                  className={labelClass}
                >
                  Cancellation Time Limit
                </label>

                <div className="flex items-center gap-3">
                  <input
                    id="cancellationTimeLimit"
                    type="number"
                    min="0"
                    name="cancellationTimeLimit"
                    value={settings.cancellationTimeLimit}
                    onChange={handleChange}
                    disabled={!settings.allowOrderCancellation}
                    className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`}
                  />

                  <span className="shrink-0 text-sm text-gray-500">
                    Hours
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Customers can cancel orders within this time
                  limit after placing an order.
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:justify-end sm:p-5">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <FaUndo size={14} />
              Reset
            </button>

            <button
              type="submit"
              disabled={saving || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B1028] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#54101F] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <FaSave size={15} />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

// Reusable section header
const SectionHeader = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 border-b border-gray-100 p-4 sm:items-center sm:gap-4 sm:p-6">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9F4EC] text-[#6B1028] sm:h-11 sm:w-11">
      {icon}
    </div>

    <div className="min-w-0">
      <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
        {title}
      </h2>

      <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
        {description}
      </p>
    </div>
  </div>
);

// Reusable payment/order toggle
const ToggleSetting = ({
  icon,
  iconBackground = "",
  title,
  description,
  name,
  checked,
  onChange,
}) => (
  <label className="flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-100 p-3 transition hover:bg-[#FFFDFC] sm:gap-4 sm:p-5">
    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
      {icon && (
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${iconBackground}`}
        >
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <h3 className="break-words text-sm font-semibold text-gray-800 sm:text-base">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
            {description}
          </p>
        )}
      </div>
    </div>

    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 shrink-0 cursor-pointer accent-[#6B1028]"
    />
  </label>
);

export default Settings;