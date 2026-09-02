
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="flex-1 ml-64">

        <AdminNavbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;