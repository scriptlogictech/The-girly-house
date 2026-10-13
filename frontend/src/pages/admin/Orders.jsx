

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

import AdminLayout from "../../components/layout/AdminLayout";
import OrderTable from "../../components/admin/OrderTable";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";
import { getAllOrders } from "../../services/orderService";

const ORDERS_PER_PAGE = 10;

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getAllOrders();

      console.log("Orders:", res);

      const orderList = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.orders)
          ? res.data.orders
          : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];

      setOrders(orderList);
    } catch (error) {
      console.error("Unable to load orders:", error);
      alert("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Search and status filtering
  const filteredOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return orders.filter((order) => {
      const orderNumber = order.orderNumber?.toLowerCase() || "";
      const customerName = order.user?.name?.toLowerCase() || "";
      const customerEmail = order.user?.email?.toLowerCase() || "";

      const matchesSearch =
        !keyword ||
        orderNumber.includes(keyword) ||
        customerName.includes(keyword) ||
        customerEmail.includes(keyword);

      const matchesStatus =
        status === "All" || order.orderStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  // Pagination
  const totalPages = Math.ceil(
    filteredOrders.length / ORDERS_PER_PAGE
  );

  useEffect(() => {
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    } else if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
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

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full min-w-0 max-w-7xl p-3 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6B1028]/10 text-[#6B1028] sm:h-12 sm:w-12">
              <FaShoppingBag className="text-lg sm:text-xl" />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Orders
              </h1>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Manage and track customer orders.
              </p>
            </div>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Total Orders
            </p>
            <p className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
              {loading ? "—" : orders.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Pending
            </p>
            <p className="mt-2 text-xl font-bold text-amber-600 sm:text-2xl">
              {loading
                ? "—"
                : orders.filter(
                    (order) => order.orderStatus === "Pending"
                  ).length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Processing
            </p>
            <p className="mt-2 text-xl font-bold text-blue-600 sm:text-2xl">
              {loading
                ? "—"
                : orders.filter(
                    (order) => order.orderStatus === "Processing"
                  ).length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Delivered
            </p>
            <p className="mt-2 text-xl font-bold text-green-600 sm:text-2xl">
              {loading
                ? "—"
                : orders.filter(
                    (order) => order.orderStatus === "Delivered"
                  ).length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-5 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:mb-6 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <FaFilter className="text-[#6B1028]" />
            <h2 className="text-base font-semibold text-gray-800">
              Search and Filter
            </h2>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative min-w-0">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search order number or customer..."
                aria-label="Search orders"
                className="h-12 w-full rounded-lg border border-gray-200 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="min-w-0">
              <label
                htmlFor="order-status"
                className="mb-1.5 block text-xs font-medium text-gray-600 sm:text-sm"
              >
                Order Status
              </label>

              <select
                id="order-status"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
              >
                <option value="All">All Statuses</option>

                {ORDER_STATUSES.map((orderStatus) => (
                  <option key={orderStatus} value={orderStatus}>
                    {orderStatus}
                  </option>
                ))}
              </select>
            </div>
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
        </div>

        {/* Results Header */}
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Order List
          </h2>

          {!loading && (
            <p className="text-xs text-gray-500 sm:text-sm">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"} found
            </p>
          )}
        </div>

        {/* Orders Table / Cards */}
        <OrderTable
          loading={loading}
          orders={currentOrders}
          onView={(order) => setSelectedOrder(order)}
        />

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-5 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center text-xs text-gray-500 sm:text-left sm:text-sm">
                Showing {indexOfFirstOrder + 1}–
                {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  className="min-h-9 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                  className="min-h-9 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onUpdated={fetchOrders}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;