
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-3 shadow-sm sm:px-6 md:px-8">
      {/* Left: Heading */}
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
          Admin Dashboard
        </h2>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-5 md:gap-6">
        {/* Search */}
        <div className="hidden items-center rounded-full bg-gray-100 px-4 py-2 md:flex md:w-48 lg:w-80">
          <FaSearch className="shrink-0 text-gray-400" />

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications, 3 unread"
          className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[#6B1028]"
        >
          <FaBell size={20} />

          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FaUserCircle
            size={34}
            className="shrink-0 text-[#6B1028] sm:h-10 sm:w-10"
          />

          <div className="hidden lg:block">
            <h4 className="font-semibold text-gray-800">Admin</h4>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;