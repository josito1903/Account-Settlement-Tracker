import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../API/userApi";
import { useAuth } from "../../context/AuthContext";

function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getMyProfile();
        setProfile(response.data.data);
      } catch (error) {
        console.error("Settings profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleNotificationChange = (e) => {
    const value = e.target.checked;

    setNotifications(value);
    localStorage.setItem("notifications", value);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading settings...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.eyebrow}>ACCOUNT</span>

        <h1 style={styles.title}>Settings</h1>

        <p style={styles.subtitle}>
          Manage your account preferences and security.
        </p>
      </div>

      {/* Success message */}
      {saved && (
        <div style={styles.success}>
          ✓ Settings saved successfully.
        </div>
      )}

      {/* Account section */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              Account Information
            </h2>

            <p style={styles.sectionText}>
              Basic information associated with your account.
            </p>
          </div>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoBox}>
            <span style={styles.label}>Full Name</span>
            <strong>
              {profile?.fullName || "Not provided"}
            </strong>
          </div>

          <div style={styles.infoBox}>
            <span style={styles.label}>Email</span>
            <strong>
              {profile?.email || "Not provided"}
            </strong>
          </div>

          <div style={styles.infoBox}>
            <span style={styles.label}>Phone</span>
            <strong>
              {profile?.phoneNumber || "Not provided"}
            </strong>
          </div>

          <div style={styles.infoBox}>
            <span style={styles.label}>Role</span>
            <strong style={{ textTransform: "capitalize" }}>
              {profile?.role || "user"}
            </strong>
          </div>
        </div>

        <button
          onClick={() => navigate("/user/profile")}
          style={styles.secondaryButton}
        >
          View Profile
        </button>
      </div>

      {/* Notification settings */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              Notifications
            </h2>

            <p style={styles.sectionText}>
              Control whether you receive application
              notifications.
            </p>
          </div>
        </div>

        <label style={styles.toggleRow}>
          <div>
            <strong>Email & Application Notifications</strong>

            <p style={styles.smallText}>
              Receive updates about invoices, payments and
              settlements.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationChange}
            style={styles.checkbox}
          />
        </label>
      </div>

      {/* Security */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              Security
            </h2>

            <p style={styles.sectionText}>
              Keep your account protected.
            </p>
          </div>
        </div>

        <div style={styles.securityRow}>
          <div>
            <strong>Password</strong>

            <p style={styles.smallText}>
              Your password is securely stored.
            </p>
          </div>

          <button
            onClick={() => {
              alert(
                "Password change functionality will be connected to the backend next."
              );
            }}
            style={styles.secondaryButton}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div style={styles.dangerCard}>
        <div>
          <span style={styles.dangerEyebrow}>
            SESSION
          </span>

          <h2 style={styles.dangerTitle}>
            Sign out
          </h2>

          <p style={styles.sectionText}>
            Sign out of your Accounts Settlement Tracker
            account on this device.
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    paddingBottom: "40px",
  },

  header: {
    marginBottom: "25px",
  },

  eyebrow: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "#2864e8",
  },

  title: {
    margin: "6px 0",
    fontSize: "34px",
    color: "#111827",
  },

  subtitle: {
    margin: 0,
    color: "#6b7280",
  },

  success: {
    background: "#e9f8ef",
    color: "#18794e",
    padding: "13px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "25px",
    marginBottom: "20px",
    border: "1px solid #edf0f5",
    boxShadow: "0 5px 18px rgba(0,0,0,0.05)",
  },

  sectionHeader: {
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "21px",
    color: "#111827",
  },

  sectionText: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  infoBox: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "9px",
    border: "1px solid #edf0f5",
  },

  label: {
    display: "block",
    color: "#6b7280",
    fontSize: "12px",
    marginBottom: "6px",
  },

  secondaryButton: {
    border: "1px solid #d6dce5",
    background: "#ffffff",
    color: "#2864e8",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "15px",
    background: "#f8fafc",
    borderRadius: "10px",
  },

  smallText: {
    margin: "5px 0 0",
    color: "#6b7280",
    fontSize: "12px",
  },

  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },

  securityRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "16px",
    background: "#f8fafc",
    borderRadius: "10px",
  },

  dangerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    background: "#fff7f7",
    border: "1px solid #f3d2d2",
    borderRadius: "14px",
    padding: "25px",
  },

  dangerEyebrow: {
    color: "#c62828",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
  },

  dangerTitle: {
    margin: "5px 0",
    fontSize: "21px",
    color: "#a91d1d",
  },

  logoutButton: {
    border: "none",
    background: "#d32f2f",
    color: "#ffffff",
    padding: "11px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  loading: {
    padding: "40px",
    textAlign: "center",
  },
};

export default Settings;