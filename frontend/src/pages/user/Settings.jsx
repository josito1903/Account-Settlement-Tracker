import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";

import "../../styles/UserSettings.css";

function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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
  // LANGUAGE
  // =====================================================

  const [language, setLanguage] = useState(() => {
    const saved =
      localStorage.getItem("language");

    const validLanguages = [
      "en",
      "fr",
      "es",
      "pt",
      "zh",
    ];

    return validLanguages.includes(saved)
      ? saved
      : "en";
  });

  // =====================================================
  // THEME
  // =====================================================

  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      "system"
    );
  });

  // =====================================================
  // ACCENT COLOR
  // =====================================================

  const [accentColor, setAccentColor] =
    useState(() => {
      return (
        localStorage.getItem(
          "accentColor"
        ) || "blue"
      );
    });

  // =====================================================
  // DISPLAY DENSITY
  // =====================================================

  const [density, setDensity] = useState(() => {
    return (
      localStorage.getItem("density") ||
      "comfortable"
    );
  });

  // =====================================================
  // REDUCED MOTION
  // =====================================================

  const [reducedMotion, setReducedMotion] =
    useState(() => {
      return (
        localStorage.getItem(
          "reducedMotion"
        ) === "true"
      );
    });

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [
    emailNotifications,
    setEmailNotifications,
  ] = useState(() => {
    return (
      localStorage.getItem(
        "emailNotifications"
      ) !== "false"
    );
  });

  const [
    paymentNotifications,
    setPaymentNotifications,
  ] = useState(() => {
    return (
      localStorage.getItem(
        "paymentNotifications"
      ) !== "false"
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

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [
    passwordMessage,
    setPasswordMessage,
  ] = useState("");

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
    // Profile is already supplied through
    // AuthContext, so no additional API
    // request is required here.
  }, []);

  // =====================================================
  // APPLY LANGUAGE
  // =====================================================

  useEffect(() => {
    const applyLanguage = async () => {
      try {
        await i18n.changeLanguage(
          language
        );
      } catch (error) {
        console.error(
          "Language initialization error:",
          error
        );
      }

      localStorage.setItem(
        "language",
        language
      );

      document.documentElement.lang =
        language;

      document.documentElement.dir =
        "ltr";
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

  const handleLanguageChange = async (
    e
  ) => {
    const selectedLanguage =
      e.target.value;

    try {
      await i18n.changeLanguage(
        selectedLanguage
      );

      setLanguage(
        selectedLanguage
      );

      localStorage.setItem(
        "language",
        selectedLanguage
      );

      setSuccessMessage(
        i18n.t(
          "messages.languageUpdated",
          "Language updated successfully."
        )
      );

      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (error) {
      console.error(
        "Language change error:",
        error
      );

      setErrorMessage(
        i18n.t(
          "messages.languageChangeError",
          "Failed to change language."
        )
      );
    }
  };

  // =====================================================
  // SAVE
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

      setErrorMessage("");

      setSuccessMessage(
        t(
          "messages.settingsSaved",
          "Settings saved successfully."
        )
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Settings save error:",
        error
      );

      setErrorMessage(
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
    const confirmed =
      window.confirm(
        t(
          "settings.resetDescription",
          "This will restore your preferences to their default values. Continue?"
        )
      );

    if (!confirmed) {
      return;
    }

    setLanguage("en");
    setTheme("system");
    setAccentColor("blue");
    setDensity("comfortable");
    setReducedMotion(false);

    setEmailNotifications(true);
    setPaymentNotifications(true);
    setSettlementNotifications(true);

    localStorage.setItem(
      "language",
      "en"
    );

    localStorage.setItem(
      "theme",
      "system"
    );

    localStorage.setItem(
      "accentColor",
      "blue"
    );

    localStorage.setItem(
      "density",
      "comfortable"
    );

    localStorage.setItem(
      "reducedMotion",
      "false"
    );

    localStorage.setItem(
      "emailNotifications",
      "true"
    );

    localStorage.setItem(
      "paymentNotifications",
      "true"
    );

    localStorage.setItem(
      "settlementNotifications",
      "true"
    );

    i18n.changeLanguage("en");

    setSuccessMessage(
      t(
        "settings.resetSuccess",
        "Preferences have been reset."
      )
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // =====================================================
  // PASSWORD CHANGE
  // =====================================================

  const handlePasswordChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setPasswordForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    setPasswordMessage("");
    setErrorMessage("");
  };

  const handlePasswordSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !passwordForm.currentPassword
    ) {
      setPasswordMessage(
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
      setPasswordMessage(
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
      setPasswordMessage(
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
      setPasswordMessage(
        t(
          "messages.passwordMismatch",
          "New passwords do not match."
        )
      );

      return;
    }

    /*
      No password-update API was provided
      in the current project code.

      Therefore this validates the form
      without falsely claiming that the
      backend password has changed.
    */

    setPasswordMessage(
      t(
        "security.passwordUpdated",
        "Password change is ready for backend integration."
      )
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // =====================================================
  // CLOSE PASSWORD MODAL
  // =====================================================

  const closePasswordModal = () => {
    setShowPasswordModal(false);

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    const confirmed =
      window.confirm(
        t(
          "messages.confirmLogout",
          "Are you sure you want to log out of this account?"
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

  const getRoleLabel = () => {
    if (
      user?.role?.toLowerCase() ===
      "admin"
    ) {
      return t(
        "user.administrator",
        "Administrator"
      );
    }

    return t(
      "user.user",
      "User"
    );
  };

  // =====================================================
  // CURRENT LANGUAGE
  // =====================================================

  const currentLanguage =
    languages.find(
      (item) =>
        item.code === language
    );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="user-settings-page">

      {/* =================================================
          SUCCESS
      ================================================= */}

      {successMessage && (
        <div className="settings-success-message">

          <span>✓</span>

          {successMessage}

        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {errorMessage && (
        <div className="settings-error-message">

          <span>!</span>

          <span>
            {errorMessage}
          </span>

          <button
            type="button"
            onClick={() =>
              setErrorMessage("")
            }
          >
            ×
          </button>

        </div>
      )}

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="settings-header">

        <span className="settings-eyebrow">
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
            "Manage your account preferences, notifications and application appearance."
          )}
        </p>

      </div>

      {/* =================================================
          ACCOUNT
      ================================================= */}

      <div className="settings-account-card">

        <div className="settings-avatar">

          {(user?.fullName || "U")
            .charAt(0)
            .toUpperCase()}

        </div>

        <div className="settings-account-info">

          <h2>
            {user?.fullName ||
              t(
                "user.user",
                "User"
              )}
          </h2>

          <p>
            {user?.email ||
              t(
                "profile.notProvided",
                "Not provided"
              )}
          </p>

          <span className="settings-role">
            {getRoleLabel()}
          </span>

        </div>

        <div className="settings-account-status">

          <span className="status-dot"></span>

          {t(
            "common.active",
            "Active"
          )}

        </div>

      </div>

      {/* =================================================
          MAIN SETTINGS
      ================================================= */}

      <div className="settings-grid">

        {/* =================================================
            LANGUAGE
        ================================================= */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              🌐
            </div>

            <div>

              <h2>
                {t(
                  "settings.language",
                  "Language"
                )}
              </h2>

              <p>
                {t(
                  "settings.languageDescription",
                  "Choose the language for the application."
                )}
              </p>

            </div>

          </div>

          <div className="language-selector">

            <label htmlFor="language">
              {t(
                "settings.language",
                "Language"
              )}
            </label>

            <select
              id="language"
              value={language}
              onChange={
                handleLanguageChange
              }
            >

              {languages.map(
                (item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.flag}{" "}
                    {item.label}
                  </option>
                )
              )}

            </select>

          </div>

          <div className="language-current">

            <span>
              {currentLanguage?.flag}
            </span>

            <div>

              <strong>
                {currentLanguage?.label}
              </strong>

              <small>
                {t(
                  "settings.currentLanguage",
                  "Current application language"
                )}
              </small>

            </div>

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
                {t(
                  "settings.appearance",
                  "Appearance"
                )}
              </h2>

              <p>
                {t(
                  "settings.appearanceDescription",
                  "Customize how the application looks."
                )}
              </p>

            </div>

          </div>

          <div className="theme-options">

            <ThemeOption
              value="light"
              current={theme}
              icon="☀️"
              title={t(
                "settings.light",
                "Light"
              )}
              description={t(
                "settings.lightDescription",
                "Use the light application theme."
              )}
              onChange={setTheme}
            />

            <ThemeOption
              value="dark"
              current={theme}
              icon="🌙"
              title={t(
                "settings.dark",
                "Dark"
              )}
              description={t(
                "settings.darkDescription",
                "Use the dark application theme."
              )}
              onChange={setTheme}
            />

            <ThemeOption
              value="system"
              current={theme}
              icon="💻"
              title={t(
                "settings.system",
                "System"
              )}
              description={t(
                "settings.systemDescription",
                "Follow your device appearance."
              )}
              onChange={setTheme}
            />

          </div>

        </div>

        {/* =================================================
            ACCENT COLOR
        ================================================= */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              🖌️
            </div>

            <div>

              <h2>
                {t(
                  "settings.accent",
                  "Accent Color"
                )}
              </h2>

              <p>
                {t(
                  "settings.accentDescription",
                  "Choose the primary color used throughout the application."
                )}
              </p>

            </div>

          </div>

          <div className="accent-color-grid">

            <AccentOption
              value="blue"
              color="#2864e8"
              current={accentColor}
              label={t(
                "settings.blue",
                "Blue"
              )}
              onChange={setAccentColor}
            />

            <AccentOption
              value="purple"
              color="#7c3aed"
              current={accentColor}
              label={t(
                "settings.purple",
                "Purple"
              )}
              onChange={setAccentColor}
            />

            <AccentOption
              value="green"
              color="#178347"
              current={accentColor}
              label={t(
                "settings.green",
                "Green"
              )}
              onChange={setAccentColor}
            />

            <AccentOption
              value="orange"
              color="#d97706"
              current={accentColor}
              label={t(
                "settings.orange",
                "Orange"
              )}
              onChange={setAccentColor}
            />

            <AccentOption
              value="red"
              color="#dc2626"
              current={accentColor}
              label={t(
                "settings.red",
                "Red"
              )}
              onChange={setAccentColor}
            />

          </div>

        </div>

        {/* =================================================
            DISPLAY
        ================================================= */}

        <div className="settings-card">

          <div className="settings-card-heading">

            <div className="settings-card-icon">
              📐
            </div>

            <div>

              <h2>
                {t(
                  "settings.display",
                  "Display"
                )}
              </h2>

              <p>
                {t(
                  "settings.displayDescription",
                  "Customize the interface experience."
                )}
              </p>

            </div>

          </div>

          <div className="display-setting-row">

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
                  "Control the spacing throughout the interface."
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

          <div className="display-setting-row">

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

        </div>

      </div>

      {/* =================================================
          NOTIFICATIONS
      ================================================= */}

      <div className="settings-card settings-full-card">

        <div className="settings-card-heading">

          <div className="settings-card-icon">
            🔔
          </div>

          <div>

            <h2>
              {t(
                "settings.notifications",
                "Notifications"
              )}
            </h2>

            <p>
              {t(
                "notifications.chooseUpdates",
                "Choose what updates you want to receive."
              )}
            </p>

          </div>

        </div>

        <div className="settings-options">

          <SettingToggle
            title={t(
              "notifications.email",
              "Email Notifications"
            )}
            description={t(
              "notifications.emailDescription",
              "Receive important account updates by email."
            )}
            checked={
              emailNotifications
            }
            onChange={() =>
              setEmailNotifications(
                !emailNotifications
              )
            }
          />

          <SettingToggle
            title={t(
              "notifications.payment",
              "Payment Notifications"
            )}
            description={t(
              "notifications.paymentDescription",
              "Get notified when payment records change."
            )}
            checked={
              paymentNotifications
            }
            onChange={() =>
              setPaymentNotifications(
                !paymentNotifications
              )
            }
          />

          <SettingToggle
            title={t(
              "notifications.settlement",
              "Settlement Notifications"
            )}
            description={t(
              "notifications.settlementDescription",
              "Receive updates about settlement progress."
            )}
            checked={
              settlementNotifications
            }
            onChange={() =>
              setSettlementNotifications(
                !settlementNotifications
              )
            }
          />

        </div>

      </div>

      {/* =================================================
          SECURITY
      ================================================= */}

      <div className="settings-card settings-full-card">

        <div className="settings-card-heading">

          <div className="settings-card-icon">
            🔐
          </div>

          <div>

            <h2>
              {t(
                "settings.security",
                "Security"
              )}
            </h2>

            <p>
              {t(
                "security.description",
                "Manage your account access and security."
              )}
            </p>

          </div>

        </div>

        <div className="security-row">

          <div>

            <strong>
              {t(
                "security.account",
                "Account Security"
              )}
            </strong>

            <span>
              {t(
                "security.accountDescription",
                "Your account is protected by authenticated access."
              )}
            </span>

          </div>

          <span className="secure-badge">
            {t(
              "security.secure",
              "Secure"
            )}
          </span>

        </div>

        <div className="security-row">

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
            className="change-password-btn"
            onClick={() =>
              setShowPasswordModal(true)
            }
          >
            {t(
              "security.changePassword",
              "Change Password"
            )}
          </button>

        </div>

        <div className="security-row">

          <div>

            <strong>
              {t(
                "security.signOut",
                "Sign out"
              )}
            </strong>

            <span>
              {t(
                "security.signOutDescription",
                "Log out of your current session."
              )}
            </span>

          </div>

          <button
            type="button"
            className="logout-button"
            onClick={
              handleLogout
            }
          >
            {t(
              "menu.logout",
              "Logout"
            )}
          </button>

        </div>

      </div>

      {/* =================================================
          SAVE / RESET
      ================================================= */}

      <div className="settings-save-area">

        <button
          type="button"
          className="settings-reset-button"
          onClick={
            handleReset
          }
        >
          {t(
            "settings.reset",
            "Reset Preferences"
          )}
        </button>

        <button
          type="button"
          className="save-settings-button"
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
          PASSWORD MODAL
      ================================================= */}

      {showPasswordModal && (
        <div
          className="password-modal-overlay"
          onClick={
            closePasswordModal
          }
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
                  {t(
                    "security.account",
                    "ACCOUNT SECURITY"
                  )}
                </span>

                <h2>
                  {t(
                    "security.changePassword",
                    "Change Password"
                  )}
                </h2>

              </div>

              <button
                type="button"
                className="password-modal-close"
                onClick={
                  closePasswordModal
                }
              >
                ×
              </button>

            </div>

            <p className="password-modal-description">
              {t(
                "security.passwordModalDescription",
                "Update your account password using the form below."
              )}
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
                    autoComplete="current-password"
                  />

                </div>

                <div className="password-field">

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
                    autoComplete="new-password"
                  />

                </div>

                <div className="password-field">

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
                  {t(
                    "common.cancel",
                    "Cancel"
                  )}
                </button>

                <button
                  type="submit"
                  className="password-save-btn"
                >
                  {t(
                    "security.updatePassword",
                    "Update Password"
                  )}
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
// THEME OPTION
// =====================================================

function ThemeOption({
  value,
  current,
  icon,
  title,
  description,
  onChange,
}) {
  return (
    <label
      className={`theme-option ${
        current === value
          ? "selected"
          : ""
      }`}
    >

      <input
        type="radio"
        name="theme"
        value={value}
        checked={
          current === value
        }
        onChange={() =>
          onChange(value)
        }
      />

      <div className="theme-option-icon">
        {icon}
      </div>

      <div className="theme-option-content">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <div className="theme-check">
        {current === value
          ? "✓"
          : ""}
      </div>

    </label>
  );
}


// =====================================================
// ACCENT COLOR
// =====================================================

function AccentOption({
  value,
  color,
  current,
  label,
  onChange,
}) {
  return (
    <button
      type="button"
      className={`accent-option ${
        current === value
          ? "selected"
          : ""
      }`}
      onClick={() =>
        onChange(value)
      }
      aria-label={label}
    >

      <span
        className="accent-color-dot"
        style={{
          backgroundColor: color,
        }}
      ></span>

      <strong>
        {label}
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
    <label className="switch">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span className="slider"></span>

    </label>
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

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <Toggle
        checked={checked}
        onChange={onChange}
      />

    </div>
  );
}

export default Settings;