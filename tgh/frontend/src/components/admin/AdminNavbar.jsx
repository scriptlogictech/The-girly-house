import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 border-b">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 bg-transparent outline-none w-full"
          />

        </div>

        {/* Notification */}

        <button className="relative text-gray-600 hover:text-[#6B1028]">

          <FaBell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={42}
            className="text-[#6B1028]"
          />

          <div className="hidden md:block">

            <h4 className="font-semibold">
              Admin
            </h4>

            <p className="text-xs text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;