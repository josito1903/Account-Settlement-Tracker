import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../API/customerAPi";

import "../../styles/Layout.css";
import "../../styles/Customers.css";

function Customers() {
  const { t, i18n } = useTranslation();

  const emptyForm = {
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    outstandingBalance: 0,
    status: "Active",
  };

  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD CUSTOMERS
  // =====================================================

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers();

      setCustomers(response?.data?.data || []);
    } catch (error) {
      console.error(
        "Customer loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.loadingCustomers",
            "Failed to load customers"
          )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
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

    if (!form.customerName.trim()) {
      setError(
        t(
          "customers.customerName"
        ) + " is required."
      );
      return;
    }

    if (!form.email.trim()) {
      setError(
        t(
          "customers.email"
        ) + " is required."
      );
      return;
    }

    if (!form.phone.trim()) {
      setError(
        t(
          "customers.phone"
        ) + " is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const customerData = {
        ...form,
        outstandingBalance:
          Number(
            form.outstandingBalance
          ) || 0,
      };

      if (editingId) {
        await updateCustomer(
          editingId,
          customerData
        );
      } else {
        await createCustomer(
          customerData
        );
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadCustomers();
    } catch (error) {
      console.error(
        "Customer save error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.dashboardLoadError",
            "Failed to save customer"
          )
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (customer) => {
    setEditingId(customer._id);

    setForm({
      customerName:
        customer.customerName || "",

      companyName:
        customer.companyName || "",

      email:
        customer.email || "",

      phone:
        customer.phone || "",

      address:
        customer.address || "",

      outstandingBalance:
        customer.outstandingBalance || 0,

      status:
        customer.status || "Active",
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
        t(
          "messages.deleteCustomer",
          "Are you sure you want to delete this customer?"
        )
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteCustomer(id);

      await loadCustomers();
    } catch (error) {
      console.error(
        "Customer delete error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.dashboardLoadError",
            "Failed to delete customer"
          )
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
  // OPEN ADD FORM
  // =====================================================

  const handleAddCustomer = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalCustomers =
    customers.length;

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status === "Active"
    ).length;

  const inactiveCustomers =
    customers.filter(
      (customer) =>
        customer.status !== "Active"
    ).length;

  const customersWithBalance =
    customers.filter(
      (customer) =>
        Number(
          customer.outstandingBalance || 0
        ) > 0
    ).length;

  const totalOutstanding =
    customers.reduce(
      (sum, customer) =>
        sum +
        Number(
          customer.outstandingBalance || 0
        ),
      0
    );

  // =====================================================
  // MONEY
  // =====================================================

  const formatAmount = (amount) => {
    return new Intl.NumberFormat(
      i18n.language,
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }
    ).format(
      Number(amount || 0)
    );
  };

  // =====================================================
  // TRANSLATED STATUS
  // =====================================================

  const getStatusLabel = (status) => {
    if (status === "Active") {
      return t(
        "common.active",
        "Active"
      );
    }

    return t(
      "common.inactive",
      "Inactive"
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="customers-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="customers-header">

        <div>

          <span className="page-eyebrow">
            {t(
              "customers.eyebrow",
              "CUSTOMER MANAGEMENT"
            )}
          </span>

          <h1>
            {t(
              "customers.title",
              "Customers"
            )}
          </h1>

          <p>
            {t(
              "customers.description",
              "Manage your customers, contact details and outstanding balances."
            )}
          </p>

        </div>

        <div className="customers-header-actions">

          <button
            type="button"
            onClick={loadCustomers}
            className="secondary-action refresh-button"
            disabled={loading}
          >
            {loading
              ? t(
                  "common.loading",
                  "Loading..."
                )
              : `↻ ${t(
                  "common.refresh",
                  "Refresh"
                )}`}
          </button>

          <button
            type="button"
            onClick={handleAddCustomer}
            className="primary-action"
          >
            +{" "}
            {t(
              "customers.addCustomer",
              "Add Customer"
            )}
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

      <div className="customer-summary-grid">

        <SummaryCard
          icon="👥"
          title={t(
            "customers.totalCustomers",
            "Total Customers"
          )}
          value={totalCustomers}
          subtitle={t(
            "customers.records",
            "Registered customers"
          )}
          type="blue"
        />

        <SummaryCard
          icon="✓"
          title={t(
            "customers.activeCustomers",
            "Active Customers"
          )}
          value={activeCustomers}
          subtitle={t(
            "common.active",
            "Currently active"
          )}
          type="green"
        />

        <SummaryCard
          icon="₹"
          title={t(
            "customers.outstanding",
            "Outstanding Balance"
          )}
          value={formatAmount(
            totalOutstanding
          )}
          subtitle={t(
            "customers.balance",
            "Total amount outstanding"
          )}
          type="orange"
        />

        <SummaryCard
          icon="!"
          title={t(
            "customers.withOutstanding",
            "With Outstanding"
          )}
          value={customersWithBalance}
          subtitle={t(
            "customers.withOutstanding",
            "Customers with balance"
          )}
          type="purple"
        />

      </div>

      {/* =================================================
          CUSTOMER STATUS OVERVIEW
      ================================================= */}

      <div className="customer-overview-card">

        <div>

          <span className="page-eyebrow">
            {t(
              "customers.statusTitle",
              "CUSTOMER STATUS"
            )}
          </span>

          <h2>
            {t(
              "customers.overview",
              "Account Overview"
            )}
          </h2>

        </div>

        <div className="customer-status-group">

          <div className="customer-status-item">

            <span className="status-dot active-dot"></span>

            <strong>
              {activeCustomers}
            </strong>

            <span>
              {t(
                "common.active",
                "Active"
              )}
            </span>

          </div>

          <div className="customer-status-item">

            <span className="status-dot inactive-dot"></span>

            <strong>
              {inactiveCustomers}
            </strong>

            <span>
              {t(
                "common.inactive",
                "Inactive"
              )}
            </span>

          </div>

          <div className="customer-status-item">

            <span className="status-dot balance-dot"></span>

            <strong>
              {customersWithBalance}
            </strong>

            <span>
              {t(
                "customers.outstanding",
                "Outstanding"
              )}
            </span>

          </div>

        </div>

      </div>

      {/* =================================================
          ADD / EDIT FORM
      ================================================= */}

      {showForm && (
        <div className="customer-form-card">

          <div className="form-card-header">

            <div>

              <span className="page-eyebrow">
                {editingId
                  ? t(
                      "customers.updateCustomer",
                      "UPDATE CUSTOMER"
                    )
                  : t(
                      "customers.newCustomer",
                      "NEW CUSTOMER"
                    )}
              </span>

              <h2>
                {editingId
                  ? t(
                      "customers.editCustomer",
                      "Edit Customer"
                    )
                  : t(
                      "customers.addCustomer",
                      "Add Customer"
                    )}
              </h2>

            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="close-form-button"
              aria-label={t(
                "common.cancel",
                "Close form"
              )}
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="customer-form-grid">

              {/* CUSTOMER NAME */}

              <div className="form-field">

                <label htmlFor="customerName">
                  {t(
                    "customers.customerName",
                    "Customer Name"
                  )}
                </label>

                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  placeholder={
                    t(
                      "customers.customerName",
                      "Enter customer name"
                    )
                  }
                  value={
                    form.customerName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* COMPANY */}

              <div className="form-field">

                <label htmlFor="companyName">
                  {t(
                    "customers.companyName",
                    "Company Name"
                  )}
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder={
                    t(
                      "customers.companyName",
                      "Enter company name"
                    )
                  }
                  value={
                    form.companyName
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* EMAIL */}

              <div className="form-field">

                <label htmlFor="email">
                  {t(
                    "customers.email",
                    "Email Address"
                  )}
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={
                    t(
                      "customers.email",
                      "Enter email address"
                    )
                  }
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* PHONE */}

              <div className="form-field">

                <label htmlFor="phone">
                  {t(
                    "customers.phone",
                    "Phone Number"
                  )}
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={
                    t(
                      "customers.phone",
                      "Enter phone number"
                    )
                  }
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* ADDRESS */}

              <div className="form-field full-width">

                <label htmlFor="address">
                  {t(
                    "customers.address",
                    "Address"
                  )}
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder={
                    t(
                      "customers.address",
                      "Enter customer address"
                    )
                  }
                  value={
                    form.address
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* BALANCE */}

              <div className="form-field">

                <label htmlFor="outstandingBalance">
                  {t(
                    "customers.balance",
                    "Outstanding Balance"
                  )}
                </label>

                <input
                  id="outstandingBalance"
                  name="outstandingBalance"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={
                    form.outstandingBalance
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* STATUS */}

              <div className="form-field">

                <label htmlFor="status">
                  {t(
                    "common.status",
                    "Status"
                  )}
                </label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={
                    handleChange
                  }
                >
                  <option value="Active">
                    {t(
                      "common.active",
                      "Active"
                    )}
                  </option>

                  <option value="Inactive">
                    {t(
                      "common.inactive",
                      "Inactive"
                    )}
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
                {t(
                  "common.cancel",
                  "Cancel"
                )}
              </button>

              <button
                type="submit"
                disabled={saving}
                className="primary-action"
              >
                {saving
                  ? t(
                      "common.loading",
                      "Saving..."
                    )
                  : editingId
                  ? t(
                      "customers.updateCustomer",
                      "Update Customer"
                    )
                  : t(
                      "common.save",
                      "Save Customer"
                    )}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =================================================
          CUSTOMER LIST
      ================================================= */}

      <div className="customer-list-card">

        <div className="list-header">

          <div>

            <span className="page-eyebrow">
              {t(
                "customers.records",
                "CUSTOMER RECORDS"
              )}
            </span>

            <h2>
              {t(
                "customers.list",
                "Customer List"
              )}
            </h2>

          </div>

          <span className="record-count">

            {customers.length}{" "}

            {customers.length === 1
              ? t(
                  "customers.customerName",
                  "Customer"
                )
              : t(
                  "customers.title",
                  "Customers"
                )}

          </span>

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="empty-state">

            <div className="loading-spinner"></div>

            <h3>
              {t(
                "common.loading",
                "Loading customers..."
              )}
            </h3>

            <p>
              {t(
                "messages.loadingCustomers",
                "Please wait while customer records are loaded."
              )}
            </p>

          </div>

        ) : customers.length === 0 ? (

          /* =================================================
             EMPTY
          ================================================= */

          <div className="empty-state">

            <div className="empty-state-icon">
              👥
            </div>

            <h3>
              {t(
                "customers.noCustomers",
                "No customers found"
              )}
            </h3>

            <p>
              {t(
                "messages.addFirstCustomer",
                "Add your first customer to get started."
              )}
            </p>

            <button
              type="button"
              onClick={handleAddCustomer}
              className="primary-action"
            >
              +{" "}
              {t(
                "customers.addCustomer",
                "Add Customer"
              )}
            </button>

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="table-responsive">

            <table className="data-table">

              <thead>

                <tr>

                  <th>
                    {t(
                      "customers.customerName",
                      "Name"
                    )}
                  </th>

                  <th>
                    {t(
                      "customers.companyName",
                      "Company"
                    )}
                  </th>

                  <th>
                    {t(
                      "customers.email",
                      "Email"
                    )}
                  </th>

                  <th>
                    {t(
                      "customers.phone",
                      "Phone"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.balance",
                      "Balance"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.status",
                      "Status"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.actions",
                      "Actions"
                    )}
                  </th>

                </tr>

              </thead>

              <tbody>

                {customers.map((customer) => {

                  const initial =
                    customer.customerName
                      ?.charAt(0)
                      .toUpperCase() ||
                    "C";

                  const balance =
                    Number(
                      customer.outstandingBalance ||
                        0
                    );

                  return (
                    <tr
                      key={
                        customer._id
                      }
                    >

                      {/* NAME */}

                      <td>

                        <div className="customer-main-cell">

                          <div className="customer-avatar">
                            {initial}
                          </div>

                          <div>

                            <strong>
                              {
                                customer.customerName
                              }
                            </strong>

                            <span>
                              {t(
                                "user.account",
                                "Customer account"
                              )}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* COMPANY */}

                      <td>
                        {customer.companyName ||
                          "—"}
                      </td>

                      {/* EMAIL */}

                      <td>
                        {customer.email ||
                          "—"}
                      </td>

                      {/* PHONE */}

                      <td>
                        {customer.phone ||
                          "—"}
                      </td>

                      {/* BALANCE */}

                      <td>

                        <strong
                          className={
                            balance > 0
                              ? "balance-warning"
                              : "balance-clear"
                          }
                        >
                          {formatAmount(
                            balance
                          )}
                        </strong>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            customer.status ===
                            "Active"
                              ? "status-badge active"
                              : "status-badge inactive"
                          }
                        >

                          <span className="status-indicator"></span>

                          {
                            getStatusLabel(
                              customer.status
                            )
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
                                customer
                              )
                            }
                            className="edit-button"
                          >
                            {t(
                              "common.edit",
                              "Edit"
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                customer._id
                              )
                            }
                            className="delete-button"
                          >
                            {t(
                              "common.delete",
                              "Delete"
                            )}
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
    <div className="customer-summary-card">

      <div
        className={`customer-summary-icon ${type}`}
      >
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {subtitle}
        </small>

      </div>

    </div>
  );
}

export default Customers;