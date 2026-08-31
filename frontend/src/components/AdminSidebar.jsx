import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaFileInvoice,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaExchangeAlt,
  FaUserCog,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "../styles/Sidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  const menuItems = [
    {
      name: t("menu.dashboard"),
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
      end: true,
    },
    {
      name: t("menu.customers"),
      path: "/admin/customers",
      icon: <FaUsers />,
    },
    {
      name: t("menu.vendors"),
      path: "/admin/vendors",
      icon: <FaBuilding />,
    },
    {
      name: t("menu.invoices"),
      path: "/admin/invoices",
      icon: <FaFileInvoice />,
    },
    {
      name: t("menu.payments"),
      path: "/admin/payments",
      icon: <FaMoneyBillWave />,
    },
    {
      name: t("menu.settlements"),
      path: "/admin/settlements",
      icon: <FaExchangeAlt />,
    },
    {
      name: t("menu.reports"),
      path: "/admin/reports",
      icon: <FaChartBar />,
    },
    {
      name: t("menu.users"),
      path: "/admin/users",
      icon: <FaUserCog />,
    },
    {
      name: t("menu.settings"),
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar admin-sidebar">

      {/* =================================================
          BRAND
      ================================================= */}

      <div className="sidebar-brand">

        <div className="sidebar-logo">
          AST
        </div>

        <div className="sidebar-brand-text">

          <strong>
            Accounts
          </strong>

          <span>
            Settlement Tracker
          </span>

        </div>

      </div>

      {/* =================================================
          ADMIN INFORMATION
      ================================================= */}

      <div className="sidebar-user">

        <div className="sidebar-avatar">
          {(user?.fullName || "A")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="sidebar-user-info">

          <strong>
            {user?.fullName || "Administrator"}
          </strong>

          <span>
            {t(
              "user.administrator",
              "Administrator"
            )}
          </span>

        </div>

      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="sidebar-nav">

        <div className="sidebar-section-title">
          {t(
            "menu.adminMenu",
            "ADMIN MENU"
          )}
        </div>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span className="sidebar-label">
              {item.name}
            </span>

          </NavLink>
        ))}

      </nav>

      {/* =================================================
          LOGOUT
      ================================================= */}

      <div className="sidebar-bottom">

        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-logout"
        >

          <span className="sidebar-icon">
            <FaSignOutAlt />
          </span>

          <span className="sidebar-label">
            {t("menu.logout")}
          </span>

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;