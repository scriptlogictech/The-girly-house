import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { useCheckout } from "../../context/CheckoutContext";

import "./AddressForm.css";

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

  const [formData, setFormData] =
    useState(initialState);

  // ==========================================
  // LOAD EDIT DATA
  // ==========================================

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
        addressType:
          editAddress.addressType || "home",
        isDefault:
          editAddress.isDefault || false,
      });
    } else {
      setFormData(initialState);
    }
  }, [editAddress, show]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validate = () => {
    if (!formData.fullName.trim()) {
      return "Full Name is required.";
    }

    if (!formData.phone.trim()) {
      return "Phone number is required.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      return "Enter a valid phone number.";
    }

    if (!formData.house.trim()) {
      return "House / Flat is required.";
    }

    if (!formData.street.trim()) {
      return "Street is required.";
    }

    if (!formData.city.trim()) {
      return "City is required.";
    }

    if (!formData.state.trim()) {
      return "State is required.";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      return "Enter a valid pincode.";
    }

    return null;
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    try {
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
    } catch (error) {
      console.error(
        "Address Submit Error:",
        error
      );
    }
  };

  // ==========================================
  // CLOSE
  // ==========================================

  if (!show) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="address-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            scale: 0.95,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="address-modal"
        >
          {/* =====================================
              HEADER
          ===================================== */}

          <div className="address-modal-header">
            <h2>
              {editAddress
                ? "Edit Address"
                : "Add Address"}
            </h2>

            <button
              type="button"
              onClick={handleClose}
              className="address-modal-close"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* =====================================
              FORM
          ===================================== */}

          <form
            onSubmit={handleSubmit}
            className="address-form"
          >
            <div className="address-form-body">

              {/* Full Name */}

              <div className="address-field">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              {/* Phone */}

              <div className="address-field">
                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                />
              </div>

              {/* House */}

              <div className="address-field">
                <label>
                  House / Flat
                </label>

                <input
                  type="text"
                  name="house"
                  value={formData.house}
                  onChange={handleChange}
                  autoComplete="address-line1"
                />
              </div>

              {/* Street */}

              <div className="address-field">
                <label>
                  Street
                </label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  autoComplete="address-line2"
                />
              </div>

              {/* Landmark */}

              <div className="address-field address-field-full">
                <label>
                  Landmark
                </label>

                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                />
              </div>

              {/* City */}

              <div className="address-field">
                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                />
              </div>

              {/* State */}

              <div className="address-field">
                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  autoComplete="address-level1"
                />
              </div>

              {/* Pincode */}

              <div className="address-field">
                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="postal-code"
                />
              </div>

              {/* Country */}

              <div className="address-field">
                <label>
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  autoComplete="country-name"
                />
              </div>

              {/* Address Type */}

              <div className="address-field">
                <label>
                  Address Type
                </label>

                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                >
                  <option value="home">
                    Home
                  </option>

                  <option value="work">
                    Work
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* Default Address */}

              <div className="address-default">
                <label>
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                  />

                  <span>
                    Set as Default Address
                  </span>
                </label>
              </div>
            </div>

            {/* =====================================
                FOOTER
            ===================================== */}

            <div className="address-modal-footer">
              <button
                type="button"
                onClick={handleClose}
                className="address-cancel-btn"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="address-save-btn"
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