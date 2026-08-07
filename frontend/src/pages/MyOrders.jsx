import { Link } from "react-router-dom";

const MyOrders = () => {
  const orders = [
    {
      id: "ORD1001",
      date: "20 Jul 2026",
      status: "Delivered",
      total: 2499,
      items: 3,
    },
    {
      id: "ORD1002",
      date: "15 Jul 2026",
      status: "Processing",
      total: 1599,
      items: 2,
    },
  ];

  return (
    <section className="min-h-screen bg-[#FFFDFC] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif text-[#6B1028]">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track and manage your previous orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">
              No Orders Found
            </h2>

            <p className="text-gray-500 mb-8">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                  {/* Order Info */}
                  <div>
                    <h2 className="text-xl font-semibold text-[#6B1028]">
                      Order #{order.id}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Placed on {order.date}
                    </p>

                    <p className="text-gray-500">
                      {order.items} Item{order.items > 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-gray-500">Order Total</p>

                    <h3 className="text-2xl font-bold text-[#6B1028]">
                      ₹{order.total}
                    </h3>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Action */}
                  <div>
                    <button className="bg-[#6B1028] hover:bg-[#541020] text-white px-6 py-3 rounded-lg transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;