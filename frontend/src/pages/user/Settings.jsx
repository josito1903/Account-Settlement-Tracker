import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";

import "../../styles/UserSettings.css";

function Settings() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  // =====================================================
  // THEME
  // light | dark | system
  // =====================================================

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  // =====================================================
  // LANGUAGE
  // =====================================================

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [emailNotifications, setEmailNotifications] =
    useState(() => {
      return (
        localStorage.getItem("emailNotifications") !==
        "false"
      );
    });

  const [
    paymentNotifications,
    setPaymentNotifications,
  ] = useState(() => {
    return (
      localStorage.getItem("paymentNotifications") !==
      "false"
    );
  });

  const [
    settlementNotifications,
    setSettlementNotifications,
  ] = useState(() => {
    return (
      localStorage.getItem(
        "settlementNotifications"
      ) !== "false"
    );
  });

  // =====================================================
  // UI STATE
  // =====================================================

  const [successMessage, setSuccessMessage] =
    useState("");

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] =
    useState("");

  // =====================================================
  // APPLY THEME
  // =====================================================

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  // =====================================================
  // APPLY LANGUAGE
  // =====================================================

  useEffect(() => {
    i18n.changeLanguage(language);

    localStorage.setItem(
      "language",
      language
    );

    // Arabic uses right-to-left layout
    document.documentElement.dir =
      language === "ar"
        ? "rtl"
        : "ltr";

    document.documentElement.lang =
      language;
  }, [language]);

  // =====================================================
  // LANGUAGE CHANGE
  // =====================================================

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    setLanguage(selectedLanguage);

    setSuccessMessage(
      "Language updated successfully."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSave = () => {
    localStorage.setItem(
      "theme",
      theme
    );

    localStorage.setItem(
      "language",
      language
    );

    localStorage.setItem(
      "emailNotifications",
      emailNotifications.toString()
    );

    localStorage.setItem(
      "paymentNotifications",
      paymentNotifications.toString()
    );

    localStorage.setItem(
      "settlementNotifications",
      settlementNotifications.toString()
    );

    setSuccessMessage(
      "Settings saved successfully."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogoutAll = () => {
    const confirmed = window.confirm(
      t("menu.logout") +
        "? Are you sure you want to log out of this account?"
    );

    if (confirmed) {
      logout();
    }
  };

  // =====================================================
  // THEME LABEL
  // =====================================================

  const getThemeLabel = () => {
    if (theme === "light") {
      return t("settings.light") + " mode is currently selected.";
    }

    if (theme === "dark") {
      return t("settings.dark") + " mode is currently selected.";
    }

    return "System mode follows your device appearance.";
  };

  // =====================================================
  // PASSWORD FORM
  // =====================================================

  const handlePasswordChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordMessage("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!passwordForm.currentPassword) {
      setPasswordMessage(
        "Please enter your current password."
      );
      return;
    }

    if (!passwordForm.newPassword) {
      setPasswordMessage(
        "Please enter a new password."
      );
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      setPasswordMessage(
        "New passwords do not match."
      );
      return;
    }

    setPasswordMessage(
      "Password change is ready for backend integration."
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("");
  };

  return (
    <div className="user-settings-page">

      {/* =================================================
          SUCCESS MESSAGE
      ================================================= */}

      {successMessage && (
        <div className="settings-success-message">
          <span>✓</span>
          {successMessage}
        </div>
      )}

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="settings-header">
        <span className="settings-eyebrow">
          {t("settings.preferences")}
        </span>

        <h1>
          {t("settings.title")}
        </h1>

        <p>
          Manage your account preferences,
          notifications and application appearance.
        </p>
      </div>

      {/* =================================================
          ACCOUNT SUMMARY
      ================================================= */}

      <div className="settings-account-card">

        <div className="settings-avatar">
          {(user?.fullName || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="settings-account-info">

          <h2>
            {user?.fullName || "User"}
          </h2>

          <p>
            {user?.email ||
              "No email available"}
          </p>

          <span className="settings-role">
            {user?.role || "User"}
          </span>

        </div>

        <div className="settings-account-status">
          <span className="status-dot"></span>
          {t("common.active")}
        </div>

      </div>

      {/* =================================================
          MAIN SETTINGS
      ================================================= */}

      <div className="settings-grid">

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              🔔
            </div>

            <div>
              <h2>
                {t("settings.notifications")}
              </h2>

              <p>
                Choose what updates you want
                to receive.
              </p>
            </div>

          </div>

          <div className="settings-options">

            <SettingToggle
              title="Email Notifications"
              description="Receive important account updates by email."
              checked={emailNotifications}
              onChange={() =>
                setEmailNotifications(
                  !emailNotifications
                )
              }
            />

            <SettingToggle
              title="Payment Notifications"
              description="Get notified when payment records change."
              checked={paymentNotifications}
              onChange={() =>
                setPaymentNotifications(
                  !paymentNotifications
                )
              }
            />

            <SettingToggle
              title="Settlement Notifications"
              description="Receive updates about settlement progress."
              checked={settlementNotifications}
              onChange={() =>
                setSettlementNotifications(
                  !settlementNotifications
                )
              }
            />

          </div>

        </div>

        {/* =================================================
            APPEARANCE
        ================================================= */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              🎨
            </div>

            <div>
              <h2>
                {t("settings.appearance")}
              </h2>

              <p>
                Choose how Accounts Settlement
                Tracker looks.
              </p>
            </div>

          </div>

          <div className="theme-options">

            {/* LIGHT */}

            <label
              className={`theme-option ${
                theme === "light"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={(e) =>
                  setTheme(e.target.value)
                }
              />

              <div className="theme-option-icon">
                ☀️
              </div>

              <div className="theme-option-content">
                <strong>
                  {t("settings.light")}
                </strong>

                <span>
                  Use the light application theme.
                </span>
              </div>

              <div className="theme-check">
                {theme === "light"
                  ? "✓"
                  : ""}
              </div>

            </label>

            {/* DARK */}

            <label
              className={`theme-option ${
                theme === "dark"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={(e) =>
                  setTheme(e.target.value)
                }
              />

              <div className="theme-option-icon">
                🌙
              </div>

              <div className="theme-option-content">
                <strong>
                  {t("settings.dark")}
                </strong>

                <span>
                  Use the dark application theme.
                </span>
              </div>

              <div className="theme-check">
                {theme === "dark"
                  ? "✓"
                  : ""}
              </div>

            </label>

            {/* SYSTEM */}

            <label
              className={`theme-option ${
                theme === "system"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="theme"
                value="system"
                checked={theme === "system"}
                onChange={(e) =>
                  setTheme(e.target.value)
                }
              />

              <div className="theme-option-icon">
                💻
              </div>

              <div className="theme-option-content">
                <strong>
                  {t("settings.system")}
                </strong>

                <span>
                  Follow your device appearance.
                </span>
              </div>

              <div className="theme-check">
                {theme === "system"
                  ? "✓"
                  : ""}
              </div>

            </label>

          </div>

          <div className="theme-note">
            {getThemeLabel()}
          </div>

        </div>

        {/* =================================================
            LANGUAGE
        ================================================= */}

        <div className="settings-card language-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              🌐
            </div>

            <div>
              <h2>
                {t("settings.language")}
              </h2>

              <p>
                {t(
                  "settings.languageDescription"
                )}
              </p>
            </div>

          </div>

          <div className="language-selector">

            <label htmlFor="language">
              {t("settings.language")}
            </label>

            <select
              id="language"
              value={language}
              onChange={
                handleLanguageChange
              }
            >

              <option value="en">
                🇬🇧 English
              </option>

              <option value="fr">
                🇫🇷 Français
              </option>

              <option value="pt">
                🇵🇹 Português
              </option>

              <option value="es">
                🇪🇸 Español
              </option>

              <option value="ar">
                🇸🇦 العربية
              </option>

              <option value="hi">
                🇮🇳 हिन्दी
              </option>

              <option value="zh">
                🇨🇳 中文
              </option>

              <option value="ja">
                🇯🇵 日本語
              </option>

              <option value="de">
                🇩🇪 Deutsch
              </option>

              <option value="it">
                🇮🇹 Italiano
              </option>

              <option value="ru">
                🇷🇺 Русский
              </option>

              <option value="ko">
                🇰🇷 한국어
              </option>

            </select>

          </div>

          <div className="language-current">
            🌐{" "}
            {language.toUpperCase()}
          </div>

        </div>

      </div>

      {/* =================================================
          SECURITY
      ================================================= */}

      <div className="settings-card security-card">

        <div className="settings-card-heading">

          <div className="settings-card-icon">
            🔐
          </div>

          <div>
            <h2>
              {t("settings.security")}
            </h2>

            <p>
              Manage your account access and
              security.
            </p>
          </div>

        </div>

        {/* ACCOUNT SECURITY */}

        <div className="security-row">

          <div>
            <strong>
              Account Security
            </strong>

            <span>
              Your account is protected by
              authenticated access.
            </span>
          </div>

          <span className="secure-badge">
            Secure
          </span>

        </div>

        {/* PASSWORD */}

        <div className="security-row">

          <div>
            <strong>
              Password
            </strong>

            <span>
              Update your account password.
            </span>
          </div>

          <button
            type="button"
            className="change-password-btn"
            onClick={() =>
              setShowPasswordModal(true)
            }
          >
            Change Password
          </button>

        </div>

        {/* LOGOUT */}

        <div className="security-row">

          <div>
            <strong>
              {t("menu.logout")}
            </strong>

            <span>
              Log out of your current session.
            </span>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogoutAll}
          >
            {t("menu.logout")}
          </button>

        </div>

      </div>

      {/* =================================================
          SAVE
      ================================================= */}

      <div className="settings-save-area">

        <button
          type="button"
          className="save-settings-button"
          onClick={handleSave}
        >
          {t("settings.saveSettings")}
        </button>

      </div>

      {/* =================================================
          CHANGE PASSWORD MODAL
      ================================================= */}

      {showPasswordModal && (
        <div
          className="password-modal-overlay"
          onClick={closePasswordModal}
        >

          <div
            className="password-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="password-modal-header">

              <div>
                <span className="settings-eyebrow">
                  ACCOUNT SECURITY
                </span>

                <h2>
                  Change Password
                </h2>
              </div>

              <button
                type="button"
                className="password-modal-close"
                onClick={closePasswordModal}
              >
                ×
              </button>

            </div>

            <p className="password-modal-description">
              Update your account password using
              the form below.
            </p>

            {passwordMessage && (
              <div className="password-message">
                {passwordMessage}
              </div>
            )}

            <form
              onSubmit={
                handlePasswordSubmit
              }
            >

              <div className="password-fields">

                <div className="password-field">

                  <label>
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={
                      passwordForm.currentPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />

                </div>

                <div className="password-field">

                  <label>
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={
                      passwordForm.newPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    placeholder="Enter new password"
                    autoComplete="new-password"
                  />

                </div>

                <div className="password-field">

                  <label>
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={
                      passwordForm.confirmPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />

                </div>

              </div>

              <div className="password-modal-actions">

                <button
                  type="button"
                  className="password-cancel-btn"
                  onClick={
                    closePasswordModal
                  }
                >
                  {t("common.cancel")}
                </button>

                <button
                  type="submit"
                  className="password-save-btn"
                >
                  Update Password
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

// =====================================================
// SETTING TOGGLE
// =====================================================

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="setting-toggle-row">

      <div>
        <strong>{title}</strong>

        <span>{description}</span>
      </div>

      <label className="switch">

        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />

        <span className="slider"></span>

      </label>

    </div>
  );
}

export default Settings;