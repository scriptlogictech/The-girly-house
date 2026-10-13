
import { useCallback, useEffect, useMemo, useState } from "react";
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
  FaFilter,
} from "react-icons/fa";

import AdminLayout from "../../components/layout/AdminLayout";

import {
  getAllCustomers,
  getCustomerStats,
  getCustomerById,
  updateCustomerStatus,
} from "../../services/customerService";

const CUSTOMERS_PER_PAGE = 10;

const INITIAL_STATS = {
  totalCustomers: 0,
  activeCustomers: 0,
  blockedCustomers: 0,
  verifiedCustomers: 0,
};

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(INITIAL_STATS);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch customers
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getAllCustomers();
      const customerList = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.customers)
          ? res.data.customers
          : [];

      setCustomers(customerList);
    } catch (error) {
      console.error("Fetch Customers Error:", error);
      alert("Unable to load customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch customer statistics
  const fetchStats = useCallback(async () => {
    try {
      const res = await getCustomerStats();

      if (res.success) {
        setStats({
          ...INITIAL_STATS,
          ...(res.data || {}),
        });
      }
    } catch (error) {
      console.error("Fetch Customer Stats Error:", error);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCustomers();
    fetchStats();
  }, [fetchCustomers, fetchStats]);

  // Search and filter
  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        !keyword ||
        customer.name?.toLowerCase().includes(keyword) ||
        customer.email?.toLowerCase().includes(keyword) ||
        customer.phone?.toLowerCase().includes(keyword);

      const matchesStatus =
        status === "All" ||
        customer.status === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  // Pagination
  const totalPages = Math.ceil(
    filteredCustomers.length / CUSTOMERS_PER_PAGE
  );

  useEffect(() => {
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    } else if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const indexOfLastCustomer = currentPage * CUSTOMERS_PER_PAGE;
  const indexOfFirstCustomer = indexOfLastCustomer - CUSTOMERS_PER_PAGE;

  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [
      ...new Set([
        1,
        totalPages,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ]),
    ]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    return pages.reduce((result, page, index) => {
      if (index > 0 && page - pages[index - 1] > 1) {
        result.push("...");
      }

      result.push(page);
      return result;
    }, []);
  };

  // View customer details
  const handleViewCustomer = async (customer) => {
    try {
      setDetailsLoading(true);
      setSelectedCustomer(null);

      const res = await getCustomerById(customer._id);

      setSelectedCustomer(res.data);
    } catch (error) {
      console.error("Customer Details Error:", error);
      alert("Unable to load customer details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeCustomerDetails = () => {
    if (updatingStatus) return;

    setSelectedCustomer(null);
    setDetailsLoading(false);
  };

  // Block or unblock customer
  const handleStatusChange = async (customer) => {
    if (!customer?._id || updatingStatus) return;

    const newStatus =
      customer.status === "active" ? "blocked" : "active";

    const action = newStatus === "blocked" ? "block" : "unblock";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${customer.name}?`
    );

    if (!confirmed) return;

    try {
      setUpdatingStatus(true);

      await updateCustomerStatus(customer._id, newStatus);

      setCustomers((prev) =>
        prev.map((item) =>
          item._id === customer._id
            ? { ...item, status: newStatus }
            : item
        )
      );

      if (selectedCustomer?._id === customer._id) {
        setSelectedCustomer((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }

      await Promise.all([fetchCustomers(), fetchStats()]);
    } catch (error) {
      console.error("Update Customer Status Error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to update customer status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Shared customer action buttons
  const CustomerActions = ({ customer }) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleViewCustomer(customer)}
        aria-label={`View ${customer.name || "customer"}`}
        title="View Customer"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
      >
        <FaEye />
      </button>

      <button
        type="button"
        disabled={updatingStatus}
        onClick={() => handleStatusChange(customer)}
        aria-label={
          customer.status === "active"
            ? `Block ${customer.name || "customer"}`
            : `Unblock ${customer.name || "customer"}`
        }
        title={
          customer.status === "active"
            ? "Block Customer"
            : "Unblock Customer"
        }
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${
          customer.status === "active"
            ? "bg-red-50 text-red-600 hover:bg-red-100"
            : "bg-green-50 text-green-600 hover:bg-green-100"
        }`}
      >
        {customer.status === "active" ? <FaBan /> : <FaUnlock />}
      </button>
    </div>
  );

  const CustomerStatus = ({ customer }) => (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        customer.status === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {customer.status === "active" ? "Active" : "Blocked"}
    </span>
  );

  const EmailVerification = ({ verified }) => (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        verified
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {verified ? "Verified" : "Not Verified"}
    </span>
  );

  return (
    <AdminLayout>
      <div className="mx-auto w-full min-w-0 max-w-7xl p-3 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6B1028]/10 text-[#6B1028] sm:h-12 sm:w-12">
            <FaUsers className="text-xl" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Customers
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Manage your registered customers.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <div className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 sm:text-sm">
                Total Customers
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {stats.totalCustomers}
              </h2>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6B1028] text-white sm:h-12 sm:w-12">
              <FaUsers />
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 sm:text-sm">
                Active Customers
              </p>
              <h2 className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
                {stats.activeCustomers}
              </h2>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 sm:h-12 sm:w-12">
              <FaUserCheck />
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 sm:text-sm">
                Blocked Customers
              </p>
              <h2 className="mt-2 text-2xl font-bold text-red-600 sm:text-3xl">
                {stats.blockedCustomers}
              </h2>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 sm:h-12 sm:w-12">
              <FaUserSlash />
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 sm:text-sm">
                Verified Emails
              </p>
              <h2 className="mt-2 text-2xl font-bold text-blue-600 sm:text-3xl">
                {stats.verifiedCustomers}
              </h2>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 sm:h-12 sm:w-12">
              <FaEnvelope />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <section className="mb-6 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <FaFilter className="text-[#6B1028]" />
            <h2 className="font-semibold text-gray-800">
              Search and Filter
            </h2>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative min-w-0">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search name, email or phone..."
                aria-label="Search customers"
                className="h-12 w-full rounded-lg border border-gray-200 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter customers by status"
              className="h-12 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
            >
              <option value="All">All Customers</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {(search || status !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("All");
                setCurrentPage(1);
              }}
              className="mt-3 text-sm font-medium text-[#6B1028] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </section>

        {/* Customer List Header */}
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Customer List
          </h2>

          {!loading && (
            <p className="text-xs text-gray-500 sm:text-sm">
              {filteredCustomers.length}{" "}
              {filteredCustomers.length === 1 ? "customer" : "customers"} found
            </p>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B1028]" />
            <p className="mt-4 text-sm text-gray-500">
              Loading customers...
            </p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white px-4 py-12 text-center shadow-sm">
            <FaUsers className="mx-auto text-4xl text-gray-300" />
            <h3 className="mt-4 font-semibold text-gray-800">
              No customers found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Customer Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {currentCustomers.map((customer) => (
                <article
                  key={customer._id}
                  className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6B1028] text-lg font-semibold text-white">
                      {customer.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-semibold text-gray-900">
                        {customer.name || "Unnamed Customer"}
                      </h3>

                      <p className="mt-1 break-all text-sm text-gray-500">
                        {customer.email || "No email"}
                      </p>

                      <p className="mt-1 break-words text-sm text-gray-500">
                        {customer.phone || "No phone number"}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Joined {formatDate(customer.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 grid grid-cols-2 gap-3 border-y border-gray-100 py-3">
                    <div>
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="mt-1 flex items-center gap-2 font-semibold text-gray-800">
                        <FaShoppingBag className="text-gray-400" />
                        {customer.orderCount || 0}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Total Spent</p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {formatPrice(customer.totalSpent)}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-xs text-gray-500">
                        Email Verification
                      </p>
                      <EmailVerification
                        verified={customer.isEmailVerified}
                      />
                    </div>

                    <div>
                      <p className="mb-1.5 text-xs text-gray-500">
                        Account Status
                      </p>
                      <CustomerStatus customer={customer} />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-gray-500">
                      Customer Actions
                    </span>
                    <CustomerActions customer={customer} />
                  </div>
                </article>
              ))}
            </div>

            {/* Tablet and Desktop Table */}
            <div className="hidden overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-sm">
                  <thead className="border-b bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-5 py-4 text-left font-semibold">
                        Customer
                      </th>
                      <th className="px-5 py-4 text-left font-semibold">
                        Contact
                      </th>
                      <th className="px-5 py-4 text-left font-semibold">
                        Orders
                      </th>
                      <th className="px-5 py-4 text-left font-semibold">
                        Spent
                      </th>
                      <th className="px-5 py-4 text-left font-semibold">
                        Verification
                      </th>
                      <th className="px-5 py-4 text-left font-semibold">
                        Status
                      </th>
                      <th className="px-5 py-4 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {currentCustomers.map((customer) => (
                      <tr
                        key={customer._id}
                        className="transition hover:bg-[#6B1028]/5"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B1028] font-semibold text-white">
                              {customer.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900">
                                {customer.name || "Unnamed Customer"}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                Joined {formatDate(customer.createdAt)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="max-w-[240px] px-5 py-4">
                          <p className="break-all text-gray-800">
                            {customer.email || "—"}
                          </p>
                          <p className="mt-1 break-words text-xs text-gray-500">
                            {customer.phone || "—"}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="flex items-center gap-2">
                            <FaShoppingBag className="text-gray-400" />
                            {customer.orderCount || 0}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                          {formatPrice(customer.totalSpent)}
                        </td>

                        <td className="px-5 py-4">
                          <EmailVerification
                            verified={customer.isEmailVerified}
                          />
                        </td>

                        <td className="px-5 py-4">
                          <CustomerStatus customer={customer} />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-center">
                            <CustomerActions customer={customer} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-5 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-center text-xs text-gray-500 sm:text-left sm:text-sm">
                    Showing {indexOfFirstCustomer + 1}–
                    {Math.min(
                      indexOfLastCustomer,
                      filteredCustomers.length
                    )}{" "}
                    of {filteredCustomers.length} customers
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((page) => page - 1)
                      }
                      className="min-h-9 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-1 text-gray-400"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          aria-label={`Go to page ${page}`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          className={`min-h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                            currentPage === page
                              ? "bg-[#6B1028] text-white"
                              : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((page) => page + 1)
                      }
                      className="min-h-9 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Customer Details Modal */}
        {(selectedCustomer || detailsLoading) && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-5"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeCustomerDetails();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="customer-details-title"
              className="flex max-h-[calc(100dvh-24px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:max-h-[90dvh]"
            >
              {/* Modal Header */}
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
                <div className="min-w-0">
                  <h2
                    id="customer-details-title"
                    className="text-xl font-bold text-gray-900 sm:text-2xl"
                  >
                    Customer Details
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Customer information and order history
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCustomerDetails}
                  disabled={updatingStatus}
                  aria-label="Close customer details"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
                {detailsLoading ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B1028]" />
                    <p className="mt-4 text-sm text-gray-500">
                      Loading customer details...
                    </p>
                  </div>
                ) : (
                  selectedCustomer && (
                    <>
                      {/* Customer Profile */}
                      <div className="mb-6 flex min-w-0 items-center gap-3 sm:gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#6B1028] text-xl font-bold text-white sm:h-16 sm:w-16 sm:text-2xl">
                          {selectedCustomer.name?.charAt(0)?.toUpperCase() ||
                            "?"}
                        </div>

                        <div className="min-w-0">
                          <h3 className="break-words text-lg font-bold text-gray-900 sm:text-xl">
                            {selectedCustomer.name || "Unnamed Customer"}
                          </h3>

                          <p className="break-all text-sm text-gray-500">
                            {selectedCustomer.email || "No email"}
                          </p>

                          <div className="mt-2">
                            <CustomerStatus customer={selectedCustomer} />
                          </div>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="mt-1 break-words font-semibold text-gray-800">
                            {selectedCustomer.phone || "-"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs text-gray-500">
                            Email Verification
                          </p>
                          <div className="mt-2">
                            <EmailVerification
                              verified={selectedCustomer.isEmailVerified}
                            />
                          </div>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs text-gray-500">
                            Total Orders
                          </p>
                          <p className="mt-1 font-semibold text-gray-800">
                            {selectedCustomer.orderCount || 0}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-xs text-gray-500">Total Spent</p>
                          <p className="mt-1 font-semibold text-gray-800">
                            {formatPrice(selectedCustomer.totalSpent)}
                          </p>
                        </div>
                      </div>

                      {/* Order History */}
                      <div className="mt-7">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">
                          Order History
                        </h3>

                        {selectedCustomer.orders?.length > 0 ? (
                          <div className="space-y-3">
                            {selectedCustomer.orders.map((order) => (
                              <div
                                key={order._id}
                                className="flex min-w-0 flex-col gap-3 rounded-xl border border-gray-200 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                              >
                                <div className="min-w-0">
                                  <p className="break-words font-semibold text-gray-900">
                                    {order.orderNumber || "Order"}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-500">
                                    {formatDate(order.createdAt)}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                                  <p className="font-semibold text-gray-900">
                                    {formatPrice(order.totalAmount)}
                                  </p>

                                  <span className="text-xs text-gray-500">
                                    {order.orderStatus || "—"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
                            No orders found.
                          </p>
                        )}
                      </div>

                      {/* Block / Unblock */}
                      <div className="mt-6 border-t border-gray-100 pt-5">
                        <button
                          type="button"
                          disabled={updatingStatus}
                          onClick={() =>
                            handleStatusChange(selectedCustomer)
                          }
                          className={`min-h-12 w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
                            selectedCustomer.status === "active"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {updatingStatus
                            ? "Updating..."
                            : selectedCustomer.status === "active"
                              ? "Block Customer"
                              : "Unblock Customer"}
                        </button>
                      </div>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Customers;