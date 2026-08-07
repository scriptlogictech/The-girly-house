import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { useCheckout } from "../../context/CheckoutContext";

const initialState = {
  fullName: "",
  phone: "",
  house: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  addressType: "home",
  isDefault: false,
};

const AddressForm = ({
  show,
  handleClose,
  editAddress,
}) => {
  const {
    addNewAddress,
    updateExistingAddress,
    loading,
  } = useCheckout();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editAddress) {
      setFormData({
        fullName: editAddress.fullName || "",
        phone: editAddress.phone || "",
        house: editAddress.house || "",
        street: editAddress.street || "",
        landmark: editAddress.landmark || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        pincode: editAddress.pincode || "",
        country: editAddress.country || "India",
        addressType: editAddress.addressType || "home",
        isDefault: editAddress.isDefault || false,
      });
    } else {
      setFormData(initialState);
    }
  }, [editAddress, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
  if (!formData.fullName.trim())
    return "Full Name is required.";

  if (!formData.phone.trim())
    return "Phone number is required.";

  if (!/^[6-9]\d{9}$/.test(formData.phone))
    return "Enter a valid phone number.";

  if (!formData.house.trim())
    return "House / Flat is required.";

  if (!formData.street.trim())
    return "Street is required.";

  if (!formData.city.trim())
    return "City is required.";

  if (!formData.state.trim())
    return "State is required.";

  if (!/^\d{6}$/.test(formData.pincode))
    return "Enter a valid pincode.";

  return null;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    if (editAddress) {
      await updateExistingAddress(
        editAddress._id,
        formData
      );
      toast.success("Address Updated");
    } else {
      await addNewAddress(formData);
      toast.success("Address Added");
    }

    handleClose();
  };

  if (!show) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl"
        >

          {/* Header */}

          <div className="flex items-center justify-between border-b px-6 py-4">

            <h2 className="text-2xl font-semibold text-[#6B1028]">
              {editAddress ? "Edit Address" : "Add Address"}
            </h2>

            <button
              onClick={handleClose}
              className="text-3xl leading-none text-gray-500 hover:text-black"
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  House / Flat
                </label>

                <input
                  type="text"
                  name="house"
                  value={formData.house}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Street
                </label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Landmark
                </label>

                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

                            <div>
                <label className="block mb-2 font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Address Type
                </label>

                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#6B1028]"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-center mt-8">
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#6B1028]"
                  />

                  <span className="font-medium">
                    Set as Default Address
                  </span>

                </label>
              </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-4 border-t px-6 py-5">

              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#6B1028] px-8 py-3 font-medium text-white hover:bg-[#54101f] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : editAddress
                  ? "Update Address"
                  : "Save Address"}
              </button>

            </div>

          </form>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
};

export default AddressForm;