
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1 pt-16 md:ml-64 md:pt-0">
        <AdminNavbar />

        <main className="min-w-0 p-4 sm:p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;