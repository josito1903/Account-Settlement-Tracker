import UserSidebar from "../components/UserSidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";

function UserLayout() {
  return (
    <div className="app-layout">
      <UserSidebar />

      <div className="main-content">
        <Navbar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;