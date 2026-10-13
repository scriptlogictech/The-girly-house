
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar and mobile hamburger header */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="min-w-0 pt-16 md:ml-64 md:pt-0">
        {/* White admin navbar */}
        <div className="relative z-30">
          <AdminNavbar />
        </div>

        {/* Current page */}
        <main className="min-w-0 p-4 sm:p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;