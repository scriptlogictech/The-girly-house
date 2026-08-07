const User = require("../models/User");

const addAddress = async (userId, body) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  // If first address, make it default
  if (user.addresses.length === 0) {
    body.isDefault = true;
  }

  // If new address is marked default, unset previous defaults
  if (body.isDefault) {
    user.addresses.forEach((address) => {
      address.isDefault = false;
    });
  }

  user.addresses.push(body);

  await user.save();

  return {
    success: true,
    message: "Address added successfully.",
    data: user.addresses,
  };
};


const getAddresses = async (userId) => {
  const user = await User.findById(userId).select("addresses");

  if (!user) {
    throw new Error("User not found.");
  }

  return {
    success: true,
    data: user.addresses,
  };
};

const updateAddress = async (userId, addressId, body) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found.");
  }

  if (body.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  Object.assign(address, body);

  await user.save();

  return {
    success: true,
    message: "Address updated successfully.",
    data: user.addresses,
  };
};

const deleteAddress = async (userId, addressId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found.");
  }

  const wasDefault = address.isDefault;

  address.deleteOne();

  // If default address deleted, make first remaining address default
  if (wasDefault && user.addresses.length > 0) {
    user.addresses[0].isDefault = true;
  }

  await user.save();

  return {
    success: true,
    message: "Address deleted successfully.",
    data: user.addresses,
  };
};


const setDefaultAddress = async (userId, addressId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  let found = false;

  user.addresses.forEach((address) => {
    if (address._id.toString() === addressId) {
      address.isDefault = true;
      found = true;
    } else {
      address.isDefault = false;
    }
  });

  if (!found) {
    throw new Error("Address not found.");
  }

  await user.save();

  return {
    success: true,
    message: "Default address updated successfully.",
    data: user.addresses,
  };
};


module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};