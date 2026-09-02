import { useEffect, useMemo, useState } from "react";
import OrderTable from "../../components/admin/OrderTable";
import { getAllOrders } from "../../services/orderService";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders();

      console.log("Orders:", res);

      setOrders(res.data || []);
    } catch (err) {
      console.error(err);

      alert("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Filter
  // ==========================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        order.orderNumber
          ?.toLowerCase()
          .includes(keyword) ||
        order.user?.name
          ?.toLowerCase()
          .includes(keyword) ||
        order.user?.email
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "All" ||
        order.orderStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  // ==========================
  // Pagination
  // ==========================

  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      indexOfFirstOrder,
      indexOfLastOrder
    );

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Manage customer orders
        </p>

      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search Order Number / Customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg p-3"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg p-3"
          >
            <option>All</option>

            <option>Pending</option>

            <option>Confirmed</option>

            <option>Processing</option>

            <option>Shipped</option>

            <option>Delivered</option>

            <option>Cancelled</option>

          </select>

        </div>

      </div>

      {/* Table */}

      <OrderTable
        loading={loading}
        orders={currentOrders}
        onView={(order) =>
          setSelectedOrder(order)
        }
      />

      {/* Pagination */}

      <div className="flex justify-center mt-8 gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) =>
              prev - 1
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
                  ? "bg-pink-600 text-white"
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
            setCurrentPage((prev) =>
              prev + 1
            )
          }
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {/* Order Details Modal */}

      {selectedOrder && (
  <OrderDetailsModal
    order={selectedOrder}
    onClose={() => setSelectedOrder(null)}
    onUpdated={fetchOrders}
  />
)}

    </div>
  );
};

export default Orders;