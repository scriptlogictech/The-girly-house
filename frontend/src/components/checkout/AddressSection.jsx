import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";

import { useCheckout } from "../../context/CheckoutContext";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

const AddressSection = () => {
  const {
    addresses,
    selectedAddress,
    setSelectedAddress,
    loading,
  } = useCheckout();

  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const handleAddAddress = () => {
    setEditAddress(null);
    setShowForm(true);
  };

  const handleEditAddress = (address) => {
    setEditAddress(address);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditAddress(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-[#F8E8EC] flex items-center justify-center">
              <FaMapMarkerAlt className="text-[#6B1028]" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#6B1028]">
                Shipping Address
              </h2>

              <p className="text-sm text-gray-500">
                Select your delivery address
              </p>
            </div>

          </div>

          <button
            onClick={handleAddAddress}
            className="flex items-center gap-2 bg-[#6B1028] hover:bg-[#551020] text-white px-5 py-3 rounded-xl transition"
          >
            <FaPlus />
            Add Address
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div className="flex justify-center py-16">

            <div className="w-10 h-10 border-4 border-[#6B1028] border-t-transparent rounded-full animate-spin"></div>

          </div>
        )}

        {/* Empty */}

        {!loading && addresses.length === 0 && (
          <div className="text-center py-16">

            <div className="text-6xl mb-4">
              📍
            </div>

            <h3 className="text-xl font-semibold mb-2">
              No Address Found
            </h3>

            <p className="text-gray-500 mb-6">
              Add your first delivery address.
            </p>

            <button
              onClick={handleAddAddress}
              className="bg-[#6B1028] text-white px-6 py-3 rounded-xl hover:bg-[#551020]"
            >
              Add Address
            </button>

          </div>
        )}

        {/* Address List */}

        {!loading && addresses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                selected={
                  selectedAddress?._id === address._id
                }
                onSelect={() =>
                  setSelectedAddress(address)
                }
                onEdit={() =>
                  handleEditAddress(address)
                }
              />
            ))}

          </div>
        )}
      </motion.div>

      <AddressForm
        show={showForm}
        handleClose={handleClose}
        editAddress={editAddress}
      />
    </>
  );
};

export default AddressSection;