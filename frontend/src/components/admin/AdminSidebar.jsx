
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTags,
  FaBoxOpen,
  FaShoppingBag,
  FaTicketAlt,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Categories", path: "/admin/categories", icon: <FaTags /> },
  { name: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
  { name: "Orders", path: "/admin/orders", icon: <FaShoppingBag /> },
  { name: "Coupons", path: "/admin/coupons", icon: <FaTicketAlt /> },
  { name: "Customers", path: "/admin/customers", icon: <FaUsers /> },
  { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-[#6B1028] px-4 text-white shadow-md md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          className="rounded-lg p-2 hover:bg-white/10"
        >
          <FaBars size={22} />
        </button>

        <h1 className="text-lg font-bold">The Girly House</h1>

        <div className="w-9" />
      </header>

      {/* Mobile Backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col bg-[#6B1028] text-white shadow-xl transition-transform duration-300 md:w-64 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/20 px-5">
          <h1 className="text-xl font-bold md:text-2xl">
            The Girly House
          </h1>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 hover:bg-white/10 md:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const isHome = item.path === "/";
            const active = isHome
              ? location.pathname === "/"
              : location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={isHome}
                onClick={closeSidebar}
                className={`mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition-colors ${
                  active
                    ? "bg-white font-semibold text-[#6B1028]"
                    : "hover:bg-[#8B1538]"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;