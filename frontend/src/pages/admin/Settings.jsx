import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getMyProfile } from "../../API/userApi";
import { useAuth } from "../../context/AuthContext";
import i18n from "../../i18n";

import "../../styles/AdminSettings.css";

function Settings() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  // =====================================================
  // SUPPORTED LANGUAGES
  // =====================================================

  const languages = [
    {
      code: "en",
      flag: "🇬🇧",
      label: "English",
    },
    {
      code: "fr",
      flag: "🇫🇷",
      label: "Français",
    },
    {
      code: "es",
      flag: "🇪🇸",
      label: "Español",
    },
    {
      code: "pt",
      flag: "🇵🇹",
      label: "Português",
    },
    {
      code: "zh",
      flag: "🇨🇳",
      label: "中文",
    },
  ];

  // =====================================================
  // PROFILE
  // =====================================================

  const [profile, setProfile] = useState(
    user || null
  );

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // LANGUAGE
  // =====================================================

  const [language, setLanguage] = useState(
    () =>
      localStorage.getItem(
        "language"
      ) || "en"
  );

  // =====================================================
  // THEME
  // =====================================================

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem(
        "theme"
      ) || "system"
  );

  // =====================================================
  // ACCENT COLOR
  // =====================================================

  const [accentColor, setAccentColor] =
    useState(
      () =>
        localStorage.getItem(
          "accentColor"
        ) || "blue"
    );

  // =====================================================
  // DENSITY
  // =====================================================

  const [density, setDensity] =
    useState(
      () =>
        localStorage.getItem(
          "density"
        ) || "comfortable"
    );

  // =====================================================
  // REDUCED MOTION
  // =====================================================

  const [reducedMotion, setReducedMotion] =
    useState(
      () =>
        localStorage.getItem(
          "reducedMotion"
        ) === "true"
    );

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [notifications, setNotifications] =
    useState(
      () =>
        localStorage.getItem(
          "notifications"
        ) !== "false"
    );

  const [
    emailNotifications,
    setEmailNotifications,
  ] = useState(
    () =>
      localStorage.getItem(
        "emailNotifications"
      ) !== "false"
  );

  const [
    paymentNotifications,
    setPaymentNotifications,
  ] = useState(
    () =>
      localStorage.getItem(
        "paymentNotifications"
      ) !== "false"
  );

  const [
    settlementNotifications,
    setSettlementNotifications,
  ] = useState(
    () =>
      localStorage.getItem(
        "settlementNotifications"
      ) !== "false"
  );

  // =====================================================
  // UI
  // =====================================================

  const [saved, setSaved] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showReset, setShowReset] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  // =====================================================
  // PASSWORD
  // =====================================================

  const [passwordForm, setPasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getMyProfile();

        setProfile(
          response?.data?.data || user
        );
      } catch (error) {
        console.error(
          "Settings profile error:",
          error
        );

        setProfile(user || null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  // =====================================================
  // APPLY LANGUAGE
  // =====================================================

  useEffect(() => {
    const applyLanguage = async () => {
      try {
        await i18n.changeLanguage(
          language
        );

        localStorage.setItem(
          "language",
          language
        );

        document.documentElement.lang =
          language;

        document.documentElement.dir =
          "ltr";
      } catch (error) {
        console.error(
          "Language error:",
          error
        );
      }
    };

    applyLanguage();
  }, [language]);

  // =====================================================
  // APPLY THEME
  // =====================================================

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    document.documentElement.setAttribute(
      "data-color",
      accentColor
    );

    document.documentElement.setAttribute(
      "data-density",
      density
    );

    document.documentElement.setAttribute(
      "data-reduced-motion",
      reducedMotion
        ? "true"
        : "false"
    );

    localStorage.setItem(
      "theme",
      theme
    );

    localStorage.setItem(
      "accentColor",
      accentColor
    );

    localStorage.setItem(
      "density",
      density
    );

    localStorage.setItem(
      "reducedMotion",
      reducedMotion.toString()
    );
  }, [
    theme,
    accentColor,
    density,
    reducedMotion,
  ]);

  // =====================================================
  // LANGUAGE CHANGE
  // =====================================================

 const handleLanguageChange = async (e) => {
  const selected = e.target.value;

  try {
    await i18n.changeLanguage(selected);

    setLanguage(selected);

    localStorage.setItem(
      "language",
      selected
    );

    showSaved();
  } catch (error) {
    console.error(
      "Language change error:",
      error
    );

    setError(
      t(
        "messages.languageChangeError",
        "Failed to change language."
      )
    );
  }
};

// =====================================================
// SAVE MESSAGE
// =====================================================

const showSaved = () => {
  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2500);
};
  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSave = () => {
    try {
      localStorage.setItem(
        "language",
        language
      );

      localStorage.setItem(
        "theme",
        theme
      );

      localStorage.setItem(
        "accentColor",
        accentColor
      );

      localStorage.setItem(
        "density",
        density
      );

      localStorage.setItem(
        "reducedMotion",
        reducedMotion.toString()
      );

      localStorage.setItem(
        "notifications",
        notifications.toString()
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

      i18n.changeLanguage(
        language
      );

      setError("");
      showSaved();
    } catch (error) {
      console.error(
        "Save settings error:",
        error
      );

      setError(
        t(
          "messages.settingsSaveError",
          "Failed to save settings."
        )
      );
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    localStorage.removeItem(
      "language"
    );

    localStorage.removeItem(
      "theme"
    );

    localStorage.removeItem(
      "accentColor"
    );

    localStorage.removeItem(
      "density"
    );

    localStorage.removeItem(
      "reducedMotion"
    );

    localStorage.removeItem(
      "notifications"
    );

    localStorage.removeItem(
      "emailNotifications"
    );

    localStorage.removeItem(
      "paymentNotifications"
    );

    localStorage.removeItem(
      "settlementNotifications"
    );

    setLanguage("en");
    setTheme("system");
    setAccentColor("blue");
    setDensity("comfortable");
    setReducedMotion(false);

    setNotifications(true);
    setEmailNotifications(true);
    setPaymentNotifications(true);
    setSettlementNotifications(true);

    i18n.changeLanguage("en");

    setShowReset(false);

    showSaved();
  };

  // =====================================================
  // NOTIFICATION
  // =====================================================

  const handleNotifications = (
    e
  ) => {
    const value =
      e.target.checked;

    setNotifications(value);

    localStorage.setItem(
      "notifications",
      value.toString()
    );
  };

  // =====================================================
  // PASSWORD
  // =====================================================

  const handlePasswordChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setPasswordForm(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

    setError("");
  };

  const handlePasswordSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !passwordForm.currentPassword
    ) {
      setError(
        t(
          "messages.currentPasswordRequired",
          "Please enter your current password."
        )
      );

      return;
    }

    if (
      !passwordForm.newPassword
    ) {
      setError(
        t(
          "messages.newPasswordRequired",
          "Please enter a new password."
        )
      );

      return;
    }

    if (
      passwordForm.newPassword.length <
      6
    ) {
      setError(
        t(
          "messages.passwordMinLength",
          "New password must contain at least 6 characters."
        )
      );

      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      setError(
        t(
          "messages.passwordMismatch",
          "New passwords do not match."
        )
      );

      return;
    }

    /*
      Your current code does not include
      an admin password-update API.

      Therefore we do not pretend that the
      password was actually changed in the
      database.
    */

    alert(
      t(
        "security.passwordBackendPending",
        "Password change is ready to be connected to the backend."
      )
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPassword(false);
    setError("");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    const confirmed =
      window.confirm(
        t(
          "messages.confirmLogout",
          "Are you sure you want to log out?"
        )
      );

    if (!confirmed) {
      return;
    }

    logout();

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  };

  // =====================================================
  // ROLE
  // =====================================================

  const role =
    profile?.role?.toLowerCase() ===
    "admin"
      ? t(
          "user.administrator",
          "Administrator"
        )
      : t(
          "user.user",
          "User"
        );

  // =====================================================
  // CURRENT LANGUAGE
  // =====================================================

  const selectedLanguage =
    languages.find(
      (item) =>
        item.code === language
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="admin-settings-loading">

        <div className="admin-settings-spinner"></div>

        <h2>
          {t(
            "settings.loading",
            "Loading settings..."
          )}
        </h2>

        <p>
          {t(
            "settings.loadingDescription",
            "Please wait while your settings are loaded."
          )}
        </p>

      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="admin-settings-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-settings-header">

        <div>

          <span className="admin-settings-eyebrow">
            {t(
              "settings.preferences",
              "ACCOUNT PREFERENCES"
            )}
          </span>

          <h1>
            {t(
              "settings.title",
              "Settings"
            )}
          </h1>

          <p>
            {t(
              "settings.description",
              "Manage your account preferences and security."
            )}
          </p>

        </div>

        <div className="admin-settings-status">

          <span></span>

          {t(
            "common.active",
            "Active"
          )}

        </div>

      </div>

      {/* =================================================
          SUCCESS
      ================================================= */}

      {saved && (
        <div className="admin-settings-success">

          <span>✓</span>

          {t(
            "messages.settingsSaved",
            "Settings saved successfully."
          )}

        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="admin-settings-error">

          <span>!</span>

          <div>
            {error}
          </div>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            ×
          </button>

        </div>
      )}

      {/* =================================================
          ADMIN ACCOUNT
      ================================================= */}

      <section className="admin-settings-card">

        <div className="admin-settings-card-header">

          <div className="admin-settings-title-wrap">

            <div className="admin-settings-icon">
              👤
            </div>

            <div>

              <span className="admin-settings-section-label">
                {t(
                  "settings.account",
                  "ACCOUNT"
                )}
              </span>

              <h2>
                {t(
                  "settings.accountInformation",
                  "Account Information"
                )}
              </h2>

              <p>
                {t(
                  "settings.accountDescription",
                  "Basic information associated with your administrator account."
                )}
              </p>

            </div>

          </div>

        </div>

        <div className="admin-settings-account">

          <div className="admin-settings-avatar">

            {(profile?.fullName ||
              "A")
              .charAt(0)
              .toUpperCase()}

          </div>

          <div className="admin-settings-account-info">

            <h3>
              {profile?.fullName ||
                t(
                  "user.administrator",
                  "Administrator"
                )}
            </h3>

            <p>
              {profile?.email ||
                t(
                  "profile.notProvided",
                  "Not provided"
                )}
            </p>

            <span>
              {role}
            </span>

          </div>

          <button
            type="button"
            className="admin-settings-secondary"
            onClick={() =>
              navigate(
                "/admin/users"
              )
            }
          >
            {t(
              "settings.manageUsers",
              "Manage Users"
            )}
          </button>

        </div>

        <div className="admin-settings-info-grid">

          <InfoBox
            label={t(
              "users.name",
              "Name"
            )}
            value={
              profile?.fullName ||
              "-"
            }
          />

          <InfoBox
            label={t(
              "users.email",
              "Email"
            )}
            value={
              profile?.email ||
              "-"
            }
          />

          <InfoBox
            label={t(
              "users.phone",
              "Phone"
            )}
            value={
              profile?.phoneNumber ||
              "-"
            }
          />

          <InfoBox
            label={t(
              "users.role",
              "Role"
            )}
            value={role}
          />

        </div>

      </section>

      {/* =================================================
          SETTINGS GRID
      ================================================= */}

      <div className="admin-settings-grid">

        {/* =================================================
            LANGUAGE
        ================================================= */}

        <section className="admin-settings-card">

          <CardHeader
            icon="🌐"
            title={t(
              "settings.language",
              "Language"
            )}
            description={t(
              "settings.languageDescription",
              "Choose the application language."
            )}
          />

          <div className="admin-settings-control">

            <label htmlFor="admin-language">
              {t(
                "settings.language",
                "Language"
              )}
            </label>

            <select
              id="admin-language"
              value={language}
              onChange={
                handleLanguageChange
              }
            >

              {languages.map(
                (item) => (
                  <option
                    key={item.code}
                    value={
                      item.code
                    }
                  >
                    {item.flag}{" "}
                    {item.label}
                  </option>
                )
              )}

            </select>

          </div>

          <div className="admin-settings-current">

            <span>
              {
                selectedLanguage?.flag
              }
            </span>

            <div>

              <strong>
                {
                  selectedLanguage?.label
                }
              </strong>

              <small>
                {t(
                  "settings.currentLanguage",
                  "Current application language"
                )}
              </small>

            </div>

          </div>

        </section>

        {/* =================================================
            APPEARANCE
        ================================================= */}

        <section className="admin-settings-card">

          <CardHeader
            icon="🎨"
            title={t(
              "settings.appearance",
              "Appearance"
            )}
            description={t(
              "settings.appearanceDescription",
              "Customize the application appearance."
            )}
          />

          <div className="admin-settings-theme-grid">

            <ThemeChoice
              value="light"
              current={theme}
              icon="☀️"
              title={t(
                "settings.light",
                "Light"
              )}
              description={t(
                "settings.lightDescription",
                "Use the light theme."
              )}
              onChange={
                setTheme
              }
            />

            <ThemeChoice
              value="dark"
              current={theme}
              icon="🌙"
              title={t(
                "settings.dark",
                "Dark"
              )}
              description={t(
                "settings.darkDescription",
                "Use the dark theme."
              )}
              onChange={
                setTheme
              }
            />

            <ThemeChoice
              value="system"
              current={theme}
              icon="💻"
              title={t(
                "settings.system",
                "System"
              )}
              description={t(
                "settings.systemDescription",
                "Follow your device."
              )}
              onChange={
                setTheme
              }
            />

          </div>

        </section>

        {/* =================================================
            ACCENT COLOR
        ================================================= */}

        <section className="admin-settings-card">

          <CardHeader
            icon="🖌️"
            title={t(
              "settings.accent",
              "Accent Color"
            )}
            description={t(
              "settings.accentDescription",
              "Choose the primary application color."
            )}
          />

          <div className="admin-settings-colors">

            <ColorChoice
              value="blue"
              color="#2864e8"
              current={
                accentColor
              }
              title={t(
                "settings.blue",
                "Blue"
              )}
              onChange={
                setAccentColor
              }
            />

            <ColorChoice
              value="purple"
              color="#7c3aed"
              current={
                accentColor
              }
              title={t(
                "settings.purple",
                "Purple"
              )}
              onChange={
                setAccentColor
              }
            />

            <ColorChoice
              value="green"
              color="#178347"
              current={
                accentColor
              }
              title={t(
                "settings.green",
                "Green"
              )}
              onChange={
                setAccentColor
              }
            />

            <ColorChoice
              value="orange"
              color="#d97706"
              current={
                accentColor
              }
              title={t(
                "settings.orange",
                "Orange"
              )}
              onChange={
                setAccentColor
              }
            />

            <ColorChoice
              value="red"
              color="#dc2626"
              current={
                accentColor
              }
              title={t(
                "settings.red",
                "Red"
              )}
              onChange={
                setAccentColor
              }
            />

          </div>

        </section>

        {/* =================================================
            DISPLAY
        ================================================= */}

        <section className="admin-settings-card">

          <CardHeader
            icon="📐"
            title={t(
              "settings.display",
              "Display"
            )}
            description={t(
              "settings.displayDescription",
              "Customize how the interface behaves."
            )}
          />

          <div className="admin-settings-display-row">

            <div>

              <strong>
                {t(
                  "settings.density",
                  "Interface Density"
                )}
              </strong>

              <span>
                {t(
                  "settings.densityDescription",
                  "Control the spacing between elements."
                )}
              </span>

            </div>

            <select
              value={density}
              onChange={(e) =>
                setDensity(
                  e.target.value
                )
              }
            >

              <option value="comfortable">
                {t(
                  "settings.comfortable",
                  "Comfortable"
                )}
              </option>

              <option value="compact">
                {t(
                  "settings.compact",
                  "Compact"
                )}
              </option>

            </select>

          </div>

          <div className="admin-settings-display-row">

            <div>

              <strong>
                {t(
                  "settings.reduceMotion",
                  "Reduce Motion"
                )}
              </strong>

              <span>
                {t(
                  "settings.reduceMotionDescription",
                  "Reduce animations and visual movement."
                )}
              </span>

            </div>

            <Toggle
              checked={
                reducedMotion
              }
              onChange={(e) =>
                setReducedMotion(
                  e.target.checked
                )
              }
            />

          </div>

        </section>

      </div>

      {/* =================================================
          NOTIFICATIONS
      ================================================= */}

      <section className="admin-settings-card">

        <CardHeader
          icon="🔔"
          title={t(
            "settings.notifications",
            "Notifications"
          )}
          description={t(
            "notifications.chooseUpdates",
            "Choose what notifications you want to receive."
          )}
        />

        <div className="admin-settings-notification-row">

          <div>

            <strong>
              {t(
                "notifications.all",
                "All Notifications"
              )}
            </strong>

            <span>
              {t(
                "notifications.allDescription",
                "Enable or disable application notifications."
              )}
            </span>

          </div>

          <Toggle
            checked={
              notifications
            }
            onChange={
              handleNotifications
            }
          />

        </div>

        <div className="admin-settings-notification-row">

          <div>

            <strong>
              {t(
                "notifications.email",
                "Email Notifications"
              )}
            </strong>

            <span>
              {t(
                "notifications.emailDescription",
                "Receive important account updates by email."
              )}
            </span>

          </div>

          <Toggle
            checked={
              emailNotifications
            }
            onChange={(e) =>
              setEmailNotifications(
                e.target.checked
              )
            }
          />

        </div>

        <div className="admin-settings-notification-row">

          <div>

            <strong>
              {t(
                "notifications.payment",
                "Payment Notifications"
              )}
            </strong>

            <span>
              {t(
                "notifications.paymentDescription",
                "Receive payment updates."
              )}
            </span>

          </div>

          <Toggle
            checked={
              paymentNotifications
            }
            onChange={(e) =>
              setPaymentNotifications(
                e.target.checked
              )
            }
          />

        </div>

        <div className="admin-settings-notification-row">

          <div>

            <strong>
              {t(
                "notifications.settlement",
                "Settlement Notifications"
              )}
            </strong>

            <span>
              {t(
                "notifications.settlementDescription",
                "Receive settlement updates."
              )}
            </span>

          </div>

          <Toggle
            checked={
              settlementNotifications
            }
            onChange={(e) =>
              setSettlementNotifications(
                e.target.checked
              )
            }
          />

        </div>

      </section>

      {/* =================================================
          SECURITY
      ================================================= */}

      <section className="admin-settings-card">

        <CardHeader
          icon="🔐"
          title={t(
            "settings.security",
            "Security"
          )}
          description={t(
            "security.description",
            "Manage your account security."
          )}
        />

        <div className="admin-settings-security-row">

          <div>

            <strong>
              {t(
                "security.password",
                "Password"
              )}
            </strong>

            <span>
              {t(
                "security.passwordDescription",
                "Update your account password."
              )}
            </span>

          </div>

          <button
            type="button"
            className="admin-settings-secondary"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {t(
              "security.changePassword",
              "Change Password"
            )}
          </button>

        </div>

        {showPassword && (
          <form
            className="admin-password-form"
            onSubmit={
              handlePasswordSubmit
            }
          >

            <div className="admin-password-grid">

              <div>

                <label>
                  {t(
                    "security.currentPassword",
                    "Current Password"
                  )}
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
                  placeholder={t(
                    "security.currentPasswordPlaceholder",
                    "Enter current password"
                  )}
                />

              </div>

              <div>

                <label>
                  {t(
                    "security.newPassword",
                    "New Password"
                  )}
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
                  placeholder={t(
                    "security.newPasswordPlaceholder",
                    "Enter new password"
                  )}
                />

              </div>

              <div>

                <label>
                  {t(
                    "security.confirmPassword",
                    "Confirm New Password"
                  )}
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
                  placeholder={t(
                    "security.confirmPasswordPlaceholder",
                    "Confirm new password"
                  )}
                />

              </div>

            </div>

            <div className="admin-password-actions">

              <button
                type="button"
                className="admin-settings-secondary"
                onClick={() =>
                  setShowPassword(
                    false
                  )
                }
              >
                {t(
                  "common.cancel",
                  "Cancel"
                )}
              </button>

              <button
                type="submit"
                className="admin-settings-primary"
              >
                {t(
                  "security.updatePassword",
                  "Update Password"
                )}
              </button>

            </div>

          </form>
        )}

      </section>

      {/* =================================================
          SESSION / LOGOUT
      ================================================= */}

      <section className="admin-settings-danger">

        <div>

          <span>
            {t(
              "settings.session",
              "SESSION"
            )}
          </span>

          <h2>
            {t(
              "security.signOut",
              "Sign out"
            )}
          </h2>

          <p>
            {t(
              "security.signOutDescription",
              "Log out of your administrator session on this device."
            )}
          </p>

        </div>

        <button
          type="button"
          onClick={
            handleLogout
          }
        >
          🚪{" "}
          {t(
            "menu.logout",
            "Logout"
          )}
        </button>

      </section>

      {/* =================================================
          FOOTER ACTIONS
      ================================================= */}

      <div className="admin-settings-footer">

        <button
          type="button"
          className="admin-settings-reset"
          onClick={() =>
            setShowReset(true)
          }
        >
          {t(
            "settings.reset",
            "Reset Preferences"
          )}
        </button>

        <button
          type="button"
          className="admin-settings-primary"
          onClick={
            handleSave
          }
        >
          ✓{" "}
          {t(
            "settings.saveSettings",
            "Save Settings"
          )}
        </button>

      </div>

      {/* =================================================
          RESET MODAL
      ================================================= */}

      {showReset && (
        <div className="admin-settings-modal-overlay">

          <div className="admin-settings-modal">

            <div className="admin-settings-modal-icon">
              ⚠️
            </div>

            <h2>
              {t(
                "settings.resetTitle",
                "Reset Preferences?"
              )}
            </h2>

            <p>
              {t(
                "settings.resetDescription",
                "This will restore your application preferences to their default values."
              )}
            </p>

            <div className="admin-settings-modal-actions">

              <button
                type="button"
                className="admin-settings-secondary"
                onClick={() =>
                  setShowReset(
                    false
                  )
                }
              >
                {t(
                  "common.cancel",
                  "Cancel"
                )}
              </button>

              <button
                type="button"
                className="admin-settings-reset-confirm"
                onClick={
                  handleReset
                }
              >
                {t(
                  "settings.reset",
                  "Reset Preferences"
                )}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


// =====================================================
// CARD HEADER
// =====================================================

function CardHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="admin-settings-card-header">

      <div className="admin-settings-title-wrap">

        <div className="admin-settings-icon">
          {icon}
        </div>

        <div>

          <h2>
            {title}
          </h2>

          <p>
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// INFO BOX
// =====================================================

function InfoBox({
  label,
  value,
}) {
  return (
    <div className="admin-settings-info-box">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


// =====================================================
// THEME CHOICE
// =====================================================

function ThemeChoice({
  value,
  current,
  icon,
  title,
  description,
  onChange,
}) {
  return (
    <label
      className={`admin-settings-theme-choice ${
        current === value
          ? "selected"
          : ""
      }`}
    >

      <input
        type="radio"
        name="admin-theme"
        value={value}
        checked={
          current === value
        }
        onChange={() =>
          onChange(value)
        }
      />

      <div className="admin-settings-theme-icon">
        {icon}
      </div>

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <div className="admin-settings-theme-check">
        {current === value
          ? "✓"
          : ""}
      </div>

    </label>
  );
}


// =====================================================
// COLOR CHOICE
// =====================================================

function ColorChoice({
  value,
  color,
  current,
  title,
  onChange,
}) {
  return (
    <button
      type="button"
      className={`admin-settings-color ${
        current === value
          ? "selected"
          : ""
      }`}
      onClick={() =>
        onChange(value)
      }
    >

      <span
        style={{
          background: color,
        }}
      ></span>

      <strong>
        {title}
      </strong>

      {current === value && (
        <small>
          ✓
        </small>
      )}

    </button>
  );
}


// =====================================================
// TOGGLE
// =====================================================

function Toggle({
  checked,
  onChange,
}) {
  return (
    <label className="admin-settings-switch">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span></span>

    </label>
  );
}

export default Settings;
