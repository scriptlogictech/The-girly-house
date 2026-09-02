// Placeholder file
import AdminLayout from "../../components/layout/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";
// import AnalyticsChart from "../../components/admin/AnalyticsChart";

import {
  FaBoxOpen,
  FaTags,
  FaShoppingBag,
  FaRupeeSign,
} from "react-icons/fa";


const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Heading */}

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome to The Girly House Admin Panel
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  <DashboardCard
    title="Products"
    value="0"
    icon={<FaBoxOpen />}
    color="#6B1028"
    growth="+0%"
  />

  <DashboardCard
    title="Categories"
    value="0"
    icon={<FaTags />}
    color="#C08457"
    growth="+0%"
  />

  <DashboardCard
    title="Orders"
    value="0"
    icon={<FaShoppingBag />}
    color="#1E3A8A"
    growth="+0%"
  />

  <DashboardCard
    title="Revenue"
    value="₹0"
    icon={<FaRupeeSign />}
    color="#15803D"
    growth="+0%"
  />

</div>

        {/* Analytics */}

        {/* <AnalyticsChart /> */}

      </div>
    </AdminLayout>
  );
};

export default Dashboard;