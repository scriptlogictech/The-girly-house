
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="min-w-0 md:ml-64">
        {/* Navbar */}
        <div className="sticky top-0 z-30">
          <AdminNavbar />
        </div>

        {/* Page Content */}
        <main className="min-w-0 p-4 sm:p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;