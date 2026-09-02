import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useCheckout } from "../../context/CheckoutContext";

const AddressCard = ({
  address,
  selected,
  onSelect,
  onEdit,
}) => {
  const {
    removeAddress,
    makeDefaultAddress,
  } = useCheckout();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (confirmDelete) {
      removeAddress(address._id);
    }
  };

  const getAddressTypeIcon = () => {
    switch (address.addressType) {
      case "home":
        return <FaHome size={14} />;

      case "work":
        return <FaBuilding size={14} />;

      default:
        return <FaMapMarkerAlt size={14} />;
    }
  };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 cursor-pointer
      ${
        selected
          ? "border-[#6B1028] ring-2 ring-[#6B1028]/20"
          : "border-gray-200 hover:border-[#6B1028]/40"
      }`}
      onClick={onSelect}
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <input
          type="radio"
          checked={selected}
          onChange={onSelect}
          className="mt-1 h-5 w-5 accent-[#6B1028]"
        />

        <div className="flex flex-wrap gap-2">

          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium capitalize text-gray-700">
            {getAddressTypeIcon()}
            {address.addressType}
          </span>

          {address.isDefault && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Default
            </span>
          )}

        </div>

      </div>

      {/* Name */}

      <h3 className="mt-5 text-lg font-semibold text-[#6B1028]">
        {address.fullName}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {address.phone}
      </p>

      {/* Address */}

      <div className="mt-4 space-y-1 text-sm text-gray-700">

        <p>{address.house}</p>

        <p>{address.street}</p>

        {address.landmark && (
          <p>
            <span className="font-medium">
              Landmark:
            </span>{" "}
            {address.landmark}
          </p>
        )}

        <p>
          {address.city}, {address.state}
        </p>

        <p>
          {address.pincode}, {address.country}
        </p>

      </div>

      {/* Buttons */}

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex items-center gap-2 rounded-lg border border-[#6B1028] px-4 py-2 text-sm font-medium text-[#6B1028] transition hover:bg-[#6B1028] hover:text-white"
        >
          <FaEdit />
          Edit
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          <FaTrash />
          Delete
        </button>

        {!address.isDefault && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              makeDefaultAddress(address._id);
            }}
            className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-600 hover:text-white"
          >
            <FaCheckCircle />
            Set Default
          </button>
        )}

      </div>
    </div>
  );
};

export default AddressCard;