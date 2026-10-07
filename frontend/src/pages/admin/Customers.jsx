import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaEnvelope,
  FaSearch,
  FaEye,
  FaBan,
  FaUnlock,
  FaTimes,
  FaShoppingBag,
} from "react-icons/fa";

import {
  getAllCustomers,
  getCustomerStats,
  getCustomerById,
  updateCustomerStatus,
} from "../../services/customerService";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    blockedCustomers: 0,
    verifiedCustomers: 0,
  });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const customersPerPage = 10;

  // ==========================================
  // FETCH CUSTOMERS
  // ==========================================

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await getAllCustomers();

      setCustomers(res.data || []);
    } catch (error) {
      console.error(
        "Fetch Customers Error:",
        error
      );

      alert("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH STATS
  // ==========================================

  const fetchStats = async () => {
    try {
      const res =
        await getCustomerStats();

      if (res.success) {
        setStats(
          res.data || {
            totalCustomers: 0,
            activeCustomers: 0,
            blockedCustomers: 0,
            verifiedCustomers: 0,
          }
        );
      }
    } catch (error) {
      console.error(
        "Fetch Customer Stats Error:",
        error
      );
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchCustomers();
    fetchStats();
  }, []);

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredCustomers = useMemo(() => {
    const keyword =
      search.toLowerCase().trim();

    return customers.filter(
      (customer) => {
        const matchesSearch =
          customer.name
            ?.toLowerCase()
            .includes(keyword) ||
          customer.email
            ?.toLowerCase()
            .includes(keyword) ||
          customer.phone
            ?.toLowerCase()
            .includes(keyword);

        const matchesStatus =
          status === "All" ||
          customer.status ===
            status.toLowerCase();

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [customers, search, status]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const indexOfLastCustomer =
    currentPage * customersPerPage;

  const indexOfFirstCustomer =
    indexOfLastCustomer -
    customersPerPage;

  const currentCustomers =
    filteredCustomers.slice(
      indexOfFirstCustomer,
      indexOfLastCustomer
    );

  const totalPages = Math.ceil(
    filteredCustomers.length /
      customersPerPage
  );

  // ==========================================
  // VIEW CUSTOMER
  // ==========================================

  const handleViewCustomer = async (
    customer
  ) => {
    try {
      setDetailsLoading(true);

      const res =
        await getCustomerById(
          customer._id
        );

      setSelectedCustomer(
        res.data
      );
    } catch (error) {
      console.error(
        "Customer Details Error:",
        error
      );

      alert(
        "Unable to load customer details."
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  // ==========================================
  // BLOCK / UNBLOCK
  // ==========================================

  const handleStatusChange = async (
    customer
  ) => {
    const newStatus =
      customer.status === "active"
        ? "blocked"
        : "active";

    const action =
      newStatus === "blocked"
        ? "block"
        : "unblock";

    const confirmed =
      window.confirm(
        `Are you sure you want to ${action} ${customer.name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingStatus(true);

      await updateCustomerStatus(
        customer._id,
        newStatus
      );

      await fetchCustomers();
      await fetchStats();

      if (
        selectedCustomer?._id ===
        customer._id
      ) {
        setSelectedCustomer(
          (prev) =>
            prev
              ? {
                  ...prev,
                  status:
                    newStatus,
                }
              : null
        );
      }
    } catch (error) {
      console.error(
        "Update Customer Status Error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to update customer status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="p-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your registered customers
        </p>

      </div>

      {/* ======================================
          STAT CARDS
      ====================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total */}

        <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">

          <div>
            <p className="text-gray-500 text-sm">
              Total Customers
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {stats.totalCustomers}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-xl bg-[#6B1028] text-white flex items-center justify-center">
            <FaUsers size={21} />
          </div>

        </div>

        {/* Active */}

        <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">

          <div>
            <p className="text-gray-500 text-sm">
              Active Customers
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {stats.activeCustomers}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <FaUserCheck size={21} />
          </div>

        </div>

        {/* Blocked */}

        <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">

          <div>
            <p className="text-gray-500 text-sm">
              Blocked Customers
            </p>

            <h2 className="text-3xl font-bold mt-2 text-red-600">
              {stats.blockedCustomers}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <FaUserSlash size={21} />
          </div>

        </div>

        {/* Verified */}

        <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">

          <div>
            <p className="text-gray-500 text-sm">
              Verified Emails
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-600">
              {stats.verifiedCustomers}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FaEnvelope size={21} />
          </div>

        </div>

      </div>

      {/* ======================================
          SEARCH + FILTER
      ====================================== */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="grid md:grid-cols-2 gap-4">

          <div className="relative">

            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Name / Email / Phone..."
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );
                setCurrentPage(1);
              }}
              className="w-full border rounded-lg p-3 pl-11 outline-none focus:border-[#6B1028]"
            />

          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="border rounded-lg p-3 outline-none focus:border-[#6B1028]"
          >
            <option value="All">
              All Customers
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Blocked">
              Blocked
            </option>
          </select>

        </div>

      </div>

      {/* ======================================
          CUSTOMER TABLE
      ====================================== */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading customers...
          </div>
        ) : currentCustomers.length ===
          0 ? (
          <div className="p-10 text-center">

            <FaUsers
              className="mx-auto text-gray-300"
              size={45}
            />

            <p className="mt-4 text-gray-500">
              No customers found.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Contact
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Orders
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Spent
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Verification
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="text-center px-6 py-4 text-sm font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentCustomers.map(
                  (customer) => (
                    <tr
                      key={customer._id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      {/* Customer */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-[#6B1028] text-white flex items-center justify-center font-semibold">

                            {customer.name
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <p className="font-semibold">
                              {customer.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              Joined{" "}
                              {customer.createdAt
                                ? new Date(
                                    customer.createdAt
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "-"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Contact */}

                      <td className="px-6 py-4">

                        <p className="text-sm">
                          {customer.email}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {customer.phone ||
                            "-"}
                        </p>

                      </td>

                      {/* Orders */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          <FaShoppingBag className="text-gray-400" />

                          <span>
                            {customer.orderCount ||
                              0}
                          </span>

                        </div>

                      </td>

                      {/* Spent */}

                      <td className="px-6 py-4 font-semibold">
                        ₹
                        {Number(
                          customer.totalSpent ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* Verification */}

                      <td className="px-6 py-4">

                        {customer.isEmailVerified ? (
                          <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                            Not Verified
                          </span>
                        )}

                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">

                        {customer.status ===
                        "active" ? (
                          <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                            Blocked
                          </span>
                        )}

                      </td>

                      {/* Actions */}

                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleViewCustomer(
                                customer
                              )
                            }
                            className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            title="View Customer"
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                            disabled={
                              updatingStatus
                            }
                            onClick={() =>
                              handleStatusChange(
                                customer
                              )
                            }
                            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                              customer.status ===
                              "active"
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                            } disabled:opacity-50`}
                            title={
                              customer.status ===
                              "active"
                                ? "Block Customer"
                                : "Unblock Customer"
                            }
                          >
                            {customer.status ===
                            "active" ? (
                              <FaBan />
                            ) : (
                              <FaUnlock />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* ======================================
          PAGINATION
      ====================================== */}

      {totalPages > 0 && (
        <div className="flex justify-center mt-8 gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, i) => (
              <button
                key={i}
                onClick={() =>
                  setCurrentPage(i + 1)
                }
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-[#6B1028] text-white"
                    : "border"
                }`}
              >
                {i + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

      {/* ======================================
          CUSTOMER DETAILS MODAL
      ====================================== */}

      {(selectedCustomer ||
        detailsLoading) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>
                <h2 className="text-2xl font-bold">
                  Customer Details
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Customer information and order history
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedCustomer(
                    null
                  )
                }
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <FaTimes />
              </button>

            </div>

            {detailsLoading ? (
              <div className="p-10 text-center text-gray-500">
                Loading customer details...
              </div>
            ) : (
              selectedCustomer && (
                <div className="p-6">

                  {/* Profile */}

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-16 h-16 rounded-full bg-[#6B1028] text-white flex items-center justify-center text-2xl font-bold">
                      {selectedCustomer.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {selectedCustomer.name}
                      </h3>

                      <p className="text-gray-500">
                        {selectedCustomer.email}
                      </p>

                    </div>

                  </div>

                  {/* Information */}

                  <div className="grid md:grid-cols-2 gap-4">

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Phone
                      </p>

                      <p className="font-semibold mt-1">
                        {selectedCustomer.phone ||
                          "-"}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Email Verification
                      </p>

                      <p className="font-semibold mt-1">
                        {selectedCustomer.isEmailVerified
                          ? "Verified"
                          : "Not Verified"}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Total Orders
                      </p>

                      <p className="font-semibold mt-1">
                        {selectedCustomer.orderCount ||
                          0}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Total Spent
                      </p>

                      <p className="font-semibold mt-1">
                        ₹
                        {Number(
                          selectedCustomer.totalSpent ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>

                  {/* Orders */}

                  <div className="mt-8">

                    <h3 className="text-lg font-bold mb-4">
                      Order History
                    </h3>

                    {selectedCustomer.orders
                      ?.length > 0 ? (
                      <div className="space-y-3">

                        {selectedCustomer.orders.map(
                          (order) => (
                            <div
                              key={
                                order._id
                              }
                              className="border rounded-xl p-4 flex items-center justify-between"
                            >

                              <div>

                                <p className="font-semibold">
                                  {
                                    order.orderNumber
                                  }
                                </p>

                                <p className="text-sm text-gray-500">
                                  {order.createdAt
                                    ? new Date(
                                        order.createdAt
                                      ).toLocaleDateString(
                                        "en-IN"
                                      )
                                    : "-"}
                                </p>

                              </div>

                              <div className="text-right">

                                <p className="font-semibold">
                                  ₹
                                  {Number(
                                    order.totalAmount ||
                                      0
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </p>

                                <span className="text-xs text-gray-500">
                                  {
                                    order.orderStatus
                                  }
                                </span>

                              </div>

                            </div>
                          )
                        )}

                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No orders found.
                      </p>
                    )}

                  </div>

                  {/* Modal Action */}

                  <div className="mt-6 flex justify-end">

                    <button
                      type="button"
                      disabled={
                        updatingStatus
                      }
                      onClick={() =>
                        handleStatusChange(
                          selectedCustomer
                        )
                      }
                      className={`px-5 py-2.5 rounded-lg text-white ${
                        selectedCustomer.status ===
                        "active"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      } disabled:opacity-50`}
                    >
                      {selectedCustomer.status ===
                      "active"
                        ? "Block Customer"
                        : "Unblock Customer"}
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default Customers;