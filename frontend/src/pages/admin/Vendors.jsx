import { useEffect, useState } from "react";

import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../../API/vendorApi";

import "../../styles/Layout.css";
import "../../styles/Vendors.css";

function Vendors() {
  const emptyForm = {
    vendorName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    payableAmount: 0,
    status: "Active",
  };

  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD VENDORS
  // =====================================================

  const loadVendors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getVendors();

      setVendors(response.data.data || []);
    } catch (error) {
      console.error(
        "Vendor loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load vendors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.vendorName.trim()) {
      setError("Vendor name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const vendorData = {
        ...form,
        payableAmount:
          Number(form.payableAmount) || 0,
      };

      if (editingId) {
        await updateVendor(
          editingId,
          vendorData
        );
      } else {
        await createVendor(vendorData);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadVendors();
    } catch (error) {
      console.error(
        "Vendor save error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to save vendor"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (vendor) => {
    setEditingId(vendor._id);

    setForm({
      vendorName:
        vendor.vendorName || "",

      companyName:
        vendor.companyName || "",

      email:
        vendor.email || "",

      phone:
        vendor.phone || "",

      address:
        vendor.address || "",

      payableAmount:
        vendor.payableAmount || 0,

      status:
        vendor.status || "Active",
    });

    setShowForm(true);
    setError("");
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this vendor?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteVendor(id);

      await loadVendors();
    } catch (error) {
      console.error(
        "Vendor delete error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete vendor"
      );
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // =====================================================
  // ADD VENDOR
  // =====================================================

  const handleAddVendor = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalVendors = vendors.length;

  const activeVendors = vendors.filter(
    (vendor) =>
      vendor.status === "Active"
  ).length;

  const inactiveVendors = vendors.filter(
    (vendor) =>
      vendor.status !== "Active"
  ).length;

  const vendorsWithPayable =
    vendors.filter(
      (vendor) =>
        Number(
          vendor.payableAmount || 0
        ) > 0
    ).length;

  const totalPayable = vendors.reduce(
    (sum, vendor) =>
      sum +
      Number(
        vendor.payableAmount || 0
      ),
    0
  );

  const formatAmount = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="vendors-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="vendors-header">

        <div>
          <span className="page-eyebrow">
            VENDOR MANAGEMENT
          </span>

          <h1>Vendors</h1>

          <p>
            Manage vendors, contact details and
            payable amounts.
          </p>
        </div>

        <div className="vendors-header-actions">

          <button
            type="button"
            onClick={loadVendors}
            className="secondary-action"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "↻ Refresh"}
          </button>

          <button
            type="button"
            onClick={handleAddVendor}
            className="primary-action"
          >
            + Add Vendor
          </button>

        </div>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="page-error">
          {error}
        </div>
      )}

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="vendor-summary-grid">

        <SummaryCard
          icon="🏢"
          title="Total Vendors"
          value={totalVendors}
          subtitle="Registered vendors"
          type="blue"
        />

        <SummaryCard
          icon="✓"
          title="Active Vendors"
          value={activeVendors}
          subtitle="Currently active"
          type="green"
        />

        <SummaryCard
          icon="₹"
          title="Total Payable"
          value={formatAmount(totalPayable)}
          subtitle="Amount payable"
          type="orange"
        />

        <SummaryCard
          icon="!"
          title="With Payable"
          value={vendorsWithPayable}
          subtitle="Vendors with balance"
          type="purple"
        />

      </div>

      {/* =================================================
          STATUS OVERVIEW
      ================================================= */}

      <div className="vendor-overview-card">

        <div>
          <span className="page-eyebrow">
            VENDOR STATUS
          </span>

          <h2>Account Overview</h2>
        </div>

        <div className="vendor-status-group">

          <div className="vendor-status-item">
            <span className="status-dot active-dot"></span>

            <strong>
              {activeVendors}
            </strong>

            <span>Active</span>
          </div>

          <div className="vendor-status-item">
            <span className="status-dot inactive-dot"></span>

            <strong>
              {inactiveVendors}
            </strong>

            <span>Inactive</span>
          </div>

          <div className="vendor-status-item">
            <span className="status-dot payable-dot"></span>

            <strong>
              {vendorsWithPayable}
            </strong>

            <span>Payable</span>
          </div>

        </div>

      </div>

      {/* =================================================
          ADD / EDIT FORM
      ================================================= */}

      {showForm && (
        <div className="vendor-form-card">

          <div className="form-card-header">

            <div>
              <span className="page-eyebrow">
                {editingId
                  ? "UPDATE VENDOR"
                  : "NEW VENDOR"}
              </span>

              <h2>
                {editingId
                  ? "Edit Vendor"
                  : "Add Vendor"}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="close-form-button"
              aria-label="Close form"
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="vendor-form-grid">

              {/* VENDOR NAME */}

              <div className="form-field">
                <label htmlFor="vendorName">
                  Vendor Name
                </label>

                <input
                  id="vendorName"
                  name="vendorName"
                  type="text"
                  placeholder="Enter vendor name"
                  value={form.vendorName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* COMPANY */}

              <div className="form-field">
                <label htmlFor="companyName">
                  Company Name
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={handleChange}
                />
              </div>

              {/* EMAIL */}

              <div className="form-field">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}

              <div className="form-field">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ADDRESS */}

              <div className="form-field full-width">
                <label htmlFor="address">
                  Address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter vendor address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              {/* PAYABLE */}

              <div className="form-field">
                <label htmlFor="payableAmount">
                  Payable Amount
                </label>

                <input
                  id="payableAmount"
                  name="payableAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={form.payableAmount}
                  onChange={handleChange}
                />
              </div>

              {/* STATUS */}

              <div className="form-field">
                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

            </div>

            {/* FORM ACTIONS */}

            <div className="form-actions">

              <button
                type="button"
                onClick={handleCancel}
                className="secondary-action"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="primary-action"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Vendor"
                  : "Save Vendor"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =================================================
          VENDOR LIST
      ================================================= */}

      <div className="vendor-list-card">

        <div className="list-header">

          <div>
            <span className="page-eyebrow">
              VENDOR RECORDS
            </span>

            <h2>Vendor List</h2>
          </div>

          <span className="record-count">
            {vendors.length}{" "}
            {vendors.length === 1
              ? "Vendor"
              : "Vendors"}
          </span>

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="empty-state">

            <div className="loading-spinner"></div>

            <h3>
              Loading vendors...
            </h3>

            <p>
              Please wait while vendor records
              are loaded.
            </p>

          </div>
        ) : vendors.length === 0 ? (
          /* EMPTY */
          <div className="empty-state">

            <div className="empty-state-icon">
              🏢
            </div>

            <h3>
              No vendors found
            </h3>

            <p>
              Add your first vendor to get started.
            </p>

            <button
              type="button"
              onClick={handleAddVendor}
              className="primary-action"
            >
              + Add Vendor
            </button>

          </div>
        ) : (
          /* TABLE */
          <div className="table-responsive">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Payable</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {vendors.map((vendor) => {

                  const initial =
                    vendor.vendorName
                      ?.charAt(0)
                      .toUpperCase() || "V";

                  const payable =
                    Number(
                      vendor.payableAmount || 0
                    );

                  return (
                    <tr key={vendor._id}>

                      {/* NAME */}

                      <td>
                        <div className="vendor-main-cell">

                          <div className="vendor-avatar">
                            {initial}
                          </div>

                          <div>
                            <strong>
                              {vendor.vendorName}
                            </strong>

                            <span>
                              Vendor account
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* COMPANY */}

                      <td>
                        {vendor.companyName ||
                          "—"}
                      </td>

                      {/* EMAIL */}

                      <td>
                        {vendor.email ||
                          "—"}
                      </td>

                      {/* PHONE */}

                      <td>
                        {vendor.phone ||
                          "—"}
                      </td>

                      {/* PAYABLE */}

                      <td>
                        <strong
                          className={
                            payable > 0
                              ? "payable-warning"
                              : "payable-clear"
                          }
                        >
                          {formatAmount(
                            payable
                          )}
                        </strong>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={
                            vendor.status ===
                            "Active"
                              ? "status-badge active"
                              : "status-badge inactive"
                          }
                        >
                          <span className="status-indicator"></span>

                          {
                            vendor.status
                          }
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="table-actions">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                vendor
                              )
                            }
                            className="edit-button"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                vendor._id
                              )
                            }
                            className="delete-button"
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

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  type,
}) {
  return (
    <div className="vendor-summary-card">

      <div
        className={`vendor-summary-icon ${type}`}
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

export default Vendors;