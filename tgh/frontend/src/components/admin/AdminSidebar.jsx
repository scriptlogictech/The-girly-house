import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTags,
  FaBoxOpen,
  FaShoppingBag,
  FaTicketAlt,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <FaTags />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <FaBoxOpen />,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <FaShoppingBag />,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: <FaTicketAlt />,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <FaUsers />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FaCog />,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#6B1028] text-white shadow-xl">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-white/20">
        <h1 className="text-2xl font-bold">
          The Girly House
        </h1>
      </div>

      {/* Menu */}
      <nav className="mt-6 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all ${
                isActive
                  ? "bg-white text-[#6B1028] font-semibold"
                  : "hover:bg-[#8B1538]"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;