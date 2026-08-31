import { useEffect, useState } from "react";

import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../API/userApi";

import "../../styles/Users.css";

function Users() {
  const emptyForm = {
    fullName: "",
    phoneNumber: "",
    role: "user",
    isActive: true,
  };

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ================= LOAD USERS =================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers();

      setUsers(response.data.data || []);
    } catch (error) {
      console.error("User loading error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ================= EDIT =================

  const handleEdit = (user) => {
    setEditingId(user._id);

    setForm({
      fullName: user.fullName || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || "user",
      isActive: user.isActive !== false,
    });

    setError("");
  };

  // ================= CHANGE =================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  // ================= UPDATE =================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateUser(
        editingId,
        form
      );

      setEditingId(null);
      setForm(emptyForm);

      await loadUsers();
    } catch (error) {
      console.error("User update error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update user"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteUser(id);

      await loadUsers();
    } catch (error) {
      console.error("User delete error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  // ================= CANCEL =================

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  // ================= SUMMARY =================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.isActive !== false
  ).length;

  const inactiveUsers =
    totalUsers - activeUsers;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  const normalUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  return (
    <div className="users-page">

      {/* ================= HEADER ================= */}

      <div className="users-header">
        <div>
          <span className="users-eyebrow">
            USER MANAGEMENT
          </span>

          <h1>User Management</h1>

          <p>
            Manage registered users, roles and
            account access.
          </p>
        </div>

        <button
          type="button"
          className="users-refresh-btn"
          onClick={loadUsers}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "↻ Refresh"}
        </button>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="users-error">
          {error}
        </div>
      )}

      {/* ================= SUMMARY ================= */}

      <div className="users-summary">

        <SummaryCard
          icon="👥"
          title="Total Users"
          value={totalUsers}
          subtitle="Registered accounts"
          type="blue"
        />

        <SummaryCard
          icon="✓"
          title="Active Users"
          value={activeUsers}
          subtitle="Currently active"
          type="green"
        />

        <SummaryCard
          icon="🛡️"
          title="Administrators"
          value={adminUsers}
          subtitle="Admin accounts"
          type="purple"
        />

        <SummaryCard
          icon="👤"
          title="Regular Users"
          value={normalUsers}
          subtitle="User accounts"
          type="orange"
        />

      </div>

      {/* ================= EDIT FORM ================= */}

      {editingId && (
        <div className="user-form-card">

          <div className="user-form-header">
            <div>
              <span className="users-eyebrow">
                ACCOUNT MANAGEMENT
              </span>

              <h2>Edit User</h2>
            </div>

            <button
              type="button"
              className="close-user-form"
              onClick={handleCancel}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleUpdate}>

            <div className="user-form-grid">

              <div className="user-field">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="user-field">
                <label htmlFor="phoneNumber">
                  Phone Number
                </label>

                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="user-field">
                <label htmlFor="role">
                  Account Role
                </label>

                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="user">
                    User
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </div>

              <div className="user-active-field">
                <label className="active-toggle">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />

                  <span>
                    Active Account
                  </span>
                </label>
              </div>

            </div>

            <div className="user-form-actions">

              <button
                type="button"
                className="user-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="user-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* ================= USERS TABLE ================= */}

      <div className="users-table-card">

        <div className="users-table-header">
          <div>
            <span className="users-eyebrow">
              REGISTERED ACCOUNTS
            </span>

            <h2>Registered Users</h2>
          </div>

          <span className="users-count">
            {totalUsers}{" "}
            {totalUsers === 1
              ? "User"
              : "Users"}
          </span>
        </div>

        {loading ? (
          <div className="users-empty-state">

            <div className="users-spinner"></div>

            <h3>Loading users...</h3>

            <p>
              Please wait while user records are
              loaded.
            </p>

          </div>
        ) : users.length === 0 ? (
          <div className="users-empty-state">

            <div className="users-empty-icon">
              👥
            </div>

            <h3>No users found</h3>

            <p>
              There are no registered users to
              display.
            </p>

          </div>
        ) : (
          <div className="users-table-wrapper">

            <table className="users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => {
                  const initial =
                    user.fullName
                      ?.charAt(0)
                      .toUpperCase() || "U";

                  return (
                    <tr key={user._id}>

                      <td>
                        <div className="user-cell">

                          <div className="user-avatar">
                            {initial}
                          </div>

                          <div>
                            <strong>
                              {user.fullName ||
                                "Unknown User"}
                            </strong>

                            <span>
                              User account
                            </span>
                          </div>

                        </div>
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.phoneNumber ||
                          "—"}
                      </td>

                      <td>
                        <span
                          className={
                            user.role === "admin"
                              ? "role-badge admin"
                              : "role-badge user"
                          }
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            user.isActive !==
                            false
                              ? "account-status active"
                              : "account-status inactive"
                          }
                        >
                          <span className="status-dot"></span>

                          {user.isActive !==
                          false
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <div className="user-actions">

                          <button
                            type="button"
                            className="edit-user-btn"
                            onClick={() =>
                              handleEdit(user)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-user-btn"
                            onClick={() =>
                              handleDelete(
                                user._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  type,
}) {
  return (
    <div className="user-summary-card">

      <div
        className={`user-summary-icon ${type}`}
      >
        {icon}
      </div>

      <div>
        <span>{title}</span>

        <strong>{value}</strong>

        <small>{subtitle}</small>
      </div>

    </div>
  );
}

export default Users;