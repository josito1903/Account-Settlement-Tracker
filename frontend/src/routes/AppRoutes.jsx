import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import ProtectedRoute from "../components/ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

// ADMIN
import AdminDashboard from "../pages/admin/Dashboard";
import Customers from "../pages/admin/Customers";
import Vendors from "../pages/admin/Vendors";
import Invoices from "../pages/admin/Invoices";
import Payments from "../pages/admin/Payments";
import Settlements from "../pages/admin/Settlements";
import Reports from "../pages/admin/Reports";
import Users from "../pages/admin/Users";
import AdminProfile from "../pages/admin/Profile";
import AdminSettings from "../pages/admin/Settings";

// USER
import UserDashboard from "../pages/user/Dashboard";
import MyInvoices from "../pages/user/MyInvoices";
import MyPayments from "../pages/user/MyPayments";
import MySettlements from "../pages/user/MySettlements";
import UserProfile from "../pages/user/Profile";
import UserSettings from "../pages/user/Settings";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      {/* ================= ADMIN ================= */}

      <Route
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/vendors" element={<Vendors />} />
        <Route path="/admin/invoices" element={<Invoices />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/settlements" element={<Settlements />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>


      {/* ================= USER ================= */}

      <Route
        element={
          <ProtectedRoute role="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/invoices" element={<MyInvoices />} />
        <Route path="/user/payments" element={<MyPayments />} />
        <Route path="/user/settlements" element={<MySettlements />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/settings" element={<UserSettings />} />
      </Route>


      {/* ================= DEFAULT ================= */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;