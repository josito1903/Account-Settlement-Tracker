import { useEffect, useState } from "react";
import { getMyProfile } from "../../API/userApi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Profile.css";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyProfile();

        setProfile(response.data.data || response.data.user);
      } catch (error) {
        console.error("Profile loading error:", error);

        // Use the saved user if the profile request fails
        if (user) {
          setProfile(user);
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to load profile"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          {error}
        </div>
      </div>
    );
  }

  const fullName =
    profile?.fullName || "User";

  const email =
    profile?.email || "Not provided";

  const phone =
    profile?.phoneNumber || "Not provided";

  const role =
    profile?.role || "user";

  const initial = fullName
    .charAt(0)
    .toUpperCase();

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div>
          <span className="profile-eyebrow">
            ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            View and manage your personal account
            information.
          </p>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="profile-hero">

        <div className="profile-avatar">
          {initial}
        </div>

        <div className="profile-hero-info">
          <h2>{fullName}</h2>

          <p>{email}</p>

          <span className="profile-role-badge">
            {role}
          </span>
        </div>

      </div>

      {/* Information */}
      <div className="profile-card">

        <div className="profile-card-header">
          <div>
            <span className="profile-eyebrow">
              PERSONAL INFORMATION
            </span>

            <h2>Account Details</h2>
          </div>
        </div>

        <div className="profile-grid">

          <ProfileField
            label="Full Name"
            value={fullName}
            icon="👤"
          />

          <ProfileField
            label="Email Address"
            value={email}
            icon="✉️"
          />

          <ProfileField
            label="Phone Number"
            value={phone}
            icon="📱"
          />

          <ProfileField
            label="Account Role"
            value={
              role.charAt(0).toUpperCase() +
              role.slice(1)
            }
            icon="🛡️"
          />

        </div>
      </div>

      {/* Account Status */}
      <div className="account-status-card">

        <div className="status-left">
          <div className="status-icon">
            ✓
          </div>

          <div>
            <h3>Account Status</h3>

            <p>
              Your account is active and ready
              to use.
            </p>
          </div>
        </div>

        <span className="active-badge">
          Active
        </span>

      </div>

    </div>
  );
}

function ProfileField({
  label,
  value,
  icon,
}) {
  return (
    <div className="profile-field">

      <div className="profile-field-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}

export default Profile;