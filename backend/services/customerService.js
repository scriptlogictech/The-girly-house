const User = require("../models/User");
const Order = require("../models/Order");

// ==========================================
// GET ALL CUSTOMERS
// ==========================================

const getAllCustomers = async () => {
  const customers = await User.find({
    role: "customer",
  })
    .select(
      "-password -emailOtp -emailOtpExpiry"
    )
    .sort({ createdAt: -1 })
    .lean();

  // Get order statistics for customers
  const orderStats = await Order.aggregate([
    {
      $match: {
        user: {
          $in: customers.map(
            (customer) => customer._id
          ),
        },
      },
    },
    {
      $group: {
        _id: "$user",

        orderCount: {
          $sum: 1,
        },

        totalSpent: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const statsMap = {};

  orderStats.forEach((item) => {
    statsMap[item._id.toString()] = {
      orderCount: item.orderCount,
      totalSpent: item.totalSpent,
    };
  });

  const customerData = customers.map(
    (customer) => {
      const stats =
        statsMap[customer._id.toString()] || {
          orderCount: 0,
          totalSpent: 0,
        };

      return {
        ...customer,

        orderCount: stats.orderCount,

        totalSpent: stats.totalSpent,
      };
    }
  );

  return {
    success: true,

    data: customerData,
  };
};

// ==========================================
// GET CUSTOMER BY ID
// ==========================================

const getCustomerById = async (customerId) => {
  const customer = await User.findOne({
    _id: customerId,
    role: "customer",
  })
    .select(
      "-password -emailOtp -emailOtpExpiry"
    )
    .lean();

  if (!customer) {
    throw new Error("Customer not found");
  }

  const orders = await Order.find({
    user: customerId,
  })
    .sort({ createdAt: -1 })
    .lean();

  const totalSpent = orders.reduce(
    (total, order) =>
      total + Number(order.totalAmount || 0),
    0
  );

  return {
    success: true,

    data: {
      ...customer,

      orderCount: orders.length,

      totalSpent,

      orders,
    },
  };
};

// ==========================================
// UPDATE CUSTOMER STATUS
// ==========================================

const updateCustomerStatus = async (
  customerId,
  status
) => {
  if (!["active", "blocked"].includes(status)) {
    throw new Error(
      "Invalid customer status"
    );
  }

  const customer = await User.findOne({
    _id: customerId,
    role: "customer",
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  customer.status = status;

  await customer.save();

  return {
    success: true,

    message:
      status === "blocked"
        ? "Customer blocked successfully"
        : "Customer unblocked successfully",

    data: {
      id: customer._id,
      status: customer.status,
    },
  };
};

// ==========================================
// CUSTOMER STATISTICS
// ==========================================

const getCustomerStats = async () => {
  const [
    totalCustomers,
    activeCustomers,
    blockedCustomers,
    verifiedCustomers,
  ] = await Promise.all([
    User.countDocuments({
      role: "customer",
    }),

    User.countDocuments({
      role: "customer",
      status: "active",
    }),

    User.countDocuments({
      role: "customer",
      status: "blocked",
    }),

    User.countDocuments({
      role: "customer",
      isEmailVerified: true,
    }),
  ]);

  return {
    success: true,

    data: {
      totalCustomers,
      activeCustomers,
      blockedCustomers,
      verifiedCustomers,
    },
  };
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  updateCustomerStatus,
  getCustomerStats,
};