import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";

function AdminLayout() {
  return (
    <div className="app-layout">
      <AdminSidebar />

      <div className="main-content">
        <Navbar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;