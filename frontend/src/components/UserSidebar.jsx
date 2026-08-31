import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

import "../styles/Sidebar.css";

function UserSidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  const menuItems = [
    {
      name: t("menu.dashboard"),
      path: "/user/dashboard",
      icon: "📊",
    },
    {
      name: t("menu.invoices"),
      path: "/user/invoices",
      icon: "🧾",
    },
    {
      name: t("menu.payments"),
      path: "/user/payments",
      icon: "💳",
    },
    {
      name: t("menu.settlements"),
      path: "/user/settlements",
      icon: "💰",
    },
    {
      name: t("menu.profile"),
      path: "/user/profile",
      icon: "👤",
    },
    {
      name: t("menu.settings"),
      path: "/user/settings",
      icon: "⚙️",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar user-sidebar">

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
          USER INFORMATION
      ================================================= */}

      <div className="sidebar-user">

        <div className="sidebar-avatar">
          {(user?.fullName || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="sidebar-user-info">

          <strong>
            {user?.fullName || "User"}
          </strong>

          <span>
            {t("user.account", "User Account")}
          </span>

        </div>

      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="sidebar-nav">

        <div className="sidebar-section-title">
          {t("menu.mainMenu", "MAIN MENU")}
        </div>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
            🚪
          </span>

          <span className="sidebar-label">
            {t("menu.logout")}
          </span>

        </button>

      </div>

    </aside>
  );
}

export default UserSidebar;