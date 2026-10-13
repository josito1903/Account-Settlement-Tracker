import { useEffect, useState } from "react";
import { getMyProfile } from "../../API/userAPi";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getMyProfile();
        setProfile(response.data.data);
      } catch (error) {
        console.error("Profile error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div style={styles.center}>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorCard}>
        <h2>Profile</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <span style={styles.eyebrow}>MY ACCOUNT</span>
          <h1 style={styles.title}>Profile</h1>
          <p style={styles.subtitle}>
            View your account information.
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {(profile?.fullName || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h2 style={styles.name}>
              {profile?.fullName || "User"}
            </h2>

            <span style={styles.role}>
              {profile?.role || "user"}
            </span>
          </div>
        </div>

        <div style={styles.grid}>
          <Info
            label="Full Name"
            value={profile?.fullName}
          />

          <Info
            label="Email"
            value={profile?.email}
          />

          <Info
            label="Phone Number"
            value={
              profile?.phoneNumber || "Not provided"
            }
          />

          <Info
            label="Role"
            value={profile?.role}
          />

          <Info
            label="Account Status"
            value={
              profile?.isActive
                ? "Active"
                : "Inactive"
            }
          />

          <Info
            label="Member Since"
            value={
              profile?.createdAt
                ? new Date(
                    profile.createdAt
                  ).toLocaleDateString()
                : "—"
            }
          />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <span style={styles.label}>{label}</span>
      <strong style={styles.value}>
        {value || "Not provided"}
      </strong>
    </div>
  );
}

const styles = {
  page: {
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
  },

  subtitle: {
    margin: 0,
    color: "#6b7280",
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "30px",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.05)",
    border: "1px solid #edf0f5",
  },

  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    paddingBottom: "25px",
    marginBottom: "25px",
    borderBottom: "1px solid #edf0f5",
  },

  avatar: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "#2864e8",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: "700",
  },

  name: {
    margin: 0,
    fontSize: "22px",
  },

  role: {
    display: "inline-block",
    marginTop: "5px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#2864e8",
    textTransform: "capitalize",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "18px",
  },

  infoBox: {
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "16px",
  },

  label: {
    display: "block",
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "6px",
  },

  value: {
    fontSize: "14px",
    color: "#111827",
    wordBreak: "break-word",
  },

  center: {
    padding: "40px",
    textAlign: "center",
  },

  errorCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    color: "#c62828",
  },
};

export default Profile;