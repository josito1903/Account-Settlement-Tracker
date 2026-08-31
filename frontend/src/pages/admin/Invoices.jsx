import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../../API/invoiceApi";

import { getCustomers } from "../../API/customerApi";
import { getVendors } from "../../API/vendorApi";
import { getUsers } from "../../API/userApi";

import "../../styles/Invoices.css";

function Invoices() {
  const { t, i18n } = useTranslation();

  const emptyForm = {
    invoiceNumber: "",
    user: "",
    customer: "",
    vendor: "",
    invoiceDate: "",
    dueDate: "",
    totalAmount: "",
    paidAmount: 0,
    balanceAmount: "",
    status: "Pending",
    notes: "",
  };

  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DATA
  // =====================================================

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        invoiceResponse,
        customerResponse,
        vendorResponse,
        userResponse,
      ] = await Promise.all([
        getInvoices(),
        getCustomers(),
        getVendors(),
        getUsers(),
      ]);

      setInvoices(
        invoiceResponse?.data?.data || []
      );

      setCustomers(
        customerResponse?.data?.data || []
      );

      setVendors(
        vendorResponse?.data?.data || []
      );

      setUsers(
        userResponse?.data?.data || []
      );
    } catch (error) {
      console.error(
        "Invoice loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.invoiceLoadError",
            "Failed to load invoice data"
          )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (
        name === "totalAmount" ||
        name === "paidAmount"
      ) {
        const total =
          Number(updated.totalAmount) || 0;

        const paid =
          Number(updated.paidAmount) || 0;

        updated.balanceAmount =
          Math.max(
            total - paid,
            0
          );

        if (paid <= 0) {
          updated.status = "Pending";
        } else if (paid < total) {
          updated.status = "Partial";
        } else if (total > 0) {
          updated.status = "Paid";
        }
      }

      return updated;
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.user ||
      !form.customer ||
      !form.vendor
    ) {
      setError(
        t(
          "messages.invoiceRequiredFields",
          "Please select a user, customer and vendor."
        )
      );

      return;
    }

    if (
      !form.totalAmount ||
      Number(form.totalAmount) <= 0
    ) {
      setError(
        t(
          "messages.invoiceAmountRequired",
          "Total amount must be greater than zero."
        )
      );

      return;
    }

    if (
      Number(form.paidAmount) >
      Number(form.totalAmount)
    ) {
      setError(
        t(
          "messages.invoicePaidTooHigh",
          "Paid amount cannot be greater than total amount."
        )
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = {
        ...form,

        totalAmount:
          Number(form.totalAmount) || 0,

        paidAmount:
          Number(form.paidAmount) || 0,

        balanceAmount:
          Number(form.balanceAmount) || 0,
      };

      if (editingId) {
        await updateInvoice(
          editingId,
          data
        );
      } else {
        await createInvoice(data);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadData();
    } catch (error) {
      console.error(
        "Invoice save error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.invoiceSaveError",
            "Failed to save invoice"
          )
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (invoice) => {
    setEditingId(invoice._id);

    setForm({
      invoiceNumber:
        invoice.invoiceNumber || "",

      user:
        invoice.user?._id ||
        invoice.user ||
        "",

      customer:
        invoice.customer?._id ||
        invoice.customer ||
        "",

      vendor:
        invoice.vendor?._id ||
        invoice.vendor ||
        "",

      invoiceDate:
        invoice.invoiceDate
          ? invoice.invoiceDate.substring(
              0,
              10
            )
          : "",

      dueDate:
        invoice.dueDate
          ? invoice.dueDate.substring(
              0,
              10
            )
          : "",

      totalAmount:
        invoice.totalAmount || "",

      paidAmount:
        invoice.paidAmount || 0,

      balanceAmount:
        invoice.balanceAmount || 0,

      status:
        invoice.status || "Pending",

      notes:
        invoice.notes || "",
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
          "messages.deleteInvoice",
          "Are you sure you want to delete this invoice?"
        )
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteInvoice(id);

      await loadData();
    } catch (error) {
      console.error(
        "Invoice delete error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.invoiceDeleteError",
            "Failed to delete invoice"
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
  // CREATE FORM
  // =====================================================

  const openCreateForm = () => {
    setForm({
      ...emptyForm,
      invoiceDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  // =====================================================
  // MONEY FORMAT
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
  // SUMMARY
  // =====================================================

  const totalValue =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        Number(
          invoice.totalAmount || 0
        ),
      0
    );

  const totalPaid =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        Number(
          invoice.paidAmount || 0
        ),
      0
    );

  const totalOutstanding =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        Number(
          invoice.balanceAmount || 0
        ),
      0
    );

  const pendingCount =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "Pending"
    ).length;

  const partialCount =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "Partial"
    ).length;

  const paidCount =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "Paid"
    ).length;

  // =====================================================
  // TRANSLATED STATUS
  // =====================================================

  const getStatusLabel = (status) => {
    if (status === "Paid") {
      return t(
        "common.paid",
        "Paid"
      );
    }

    if (status === "Partial") {
      return t(
        "common.partial",
        "Partial"
      );
    }

    return t(
      "common.pending",
      "Pending"
    );
  };

  const getStatusClass = (status) => {
    if (status === "Paid") {
      return "invoice-status paid";
    }

    if (status === "Partial") {
      return "invoice-status partial";
    }

    return "invoice-status pending";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="admin-invoices-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="invoice-page-header">

        <div>

          <span className="invoice-eyebrow">
            {t(
              "invoices.eyebrow",
              "FINANCIAL MANAGEMENT"
            )}
          </span>

          <h1>
            {t(
              "invoices.title",
              "Invoices"
            )}
          </h1>

          <p>
            {t(
              "invoices.description",
              "Create, monitor and manage all customer invoices from one place."
            )}
          </p>

        </div>

        <div className="invoice-header-buttons">

          <button
            className="refresh-invoice-btn"
            onClick={loadData}
            disabled={loading}
            type="button"
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
            className="add-invoice-btn"
            onClick={
              openCreateForm
            }
            type="button"
          >
            +{" "}
            {t(
              "invoices.addInvoice",
              "Add Invoice"
            )}
          </button>

        </div>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="invoice-error">
          {error}
        </div>
      )}

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="invoice-summary-grid">

        <SummaryCard
          icon="🧾"
          title={t(
            "invoices.totalInvoices",
            "Total Invoices"
          )}
          value={
            invoices.length
          }
          subtitle={t(
            "invoices.records",
            "All invoice records"
          )}
          className="blue"
        />

        <SummaryCard
          icon="₹"
          title={t(
            "invoices.totalValue",
            "Total Value"
          )}
          value={formatAmount(
            totalValue
          )}
          subtitle={t(
            "common.total",
            "Total billed amount"
          )}
          className="purple"
        />

        <SummaryCard
          icon="✓"
          title={t(
            "invoices.totalPaid",
            "Total Paid"
          )}
          value={formatAmount(
            totalPaid
          )}
          subtitle={t(
            "payments.totalPaid",
            "Amount received"
          )}
          className="green"
        />

        <SummaryCard
          icon="!"
          title={t(
            "invoices.outstanding",
            "Outstanding"
          )}
          value={formatAmount(
            totalOutstanding
          )}
          subtitle={t(
            "invoices.balanceAmount",
            "Amount remaining"
          )}
          className="orange"
        />

      </div>

      {/* =================================================
          STATUS OVERVIEW
      ================================================= */}

      <div className="invoice-overview-card">

        <div>

          <span className="invoice-eyebrow">
            {t(
              "invoices.paymentStatus",
              "PAYMENT STATUS"
            )}
          </span>

          <h2>
            {t(
              "invoices.overview",
              "Invoice Overview"
            )}
          </h2>

        </div>

        <div className="invoice-status-group">

          <div className="invoice-status-item">

            <span className="status-dot pending-dot"></span>

            <strong>
              {pendingCount}
            </strong>

            <span>
              {t(
                "common.pending",
                "Pending"
              )}
            </span>

          </div>

          <div className="invoice-status-item">

            <span className="status-dot partial-dot"></span>

            <strong>
              {partialCount}
            </strong>

            <span>
              {t(
                "common.partial",
                "Partial"
              )}
            </span>

          </div>

          <div className="invoice-status-item">

            <span className="status-dot paid-dot"></span>

            <strong>
              {paidCount}
            </strong>

            <span>
              {t(
                "common.paid",
                "Paid"
              )}
            </span>

          </div>

        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      {showForm && (
        <div className="invoice-form-card">

          <div className="invoice-form-top">

            <div>

              <span className="invoice-eyebrow">

                {editingId
                  ? t(
                      "invoices.updateInvoice",
                      "UPDATE INVOICE"
                    )
                  : t(
                      "invoices.newInvoice",
                      "NEW INVOICE"
                    )}

              </span>

              <h2>

                {editingId
                  ? t(
                      "invoices.editInvoice",
                      "Edit Invoice"
                    )
                  : t(
                      "invoices.addInvoice",
                      "Create Invoice"
                    )}

              </h2>

            </div>

            <button
              className="close-invoice-form"
              onClick={
                handleCancel
              }
              type="button"
              aria-label={t(
                "common.cancel",
                "Close"
              )}
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="invoice-form-grid">

              {/* INVOICE NUMBER */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "invoices.invoiceNumber",
                    "Invoice Number"
                  )}
                </label>

                <input
                  name="invoiceNumber"
                  placeholder="INV-001"
                  value={
                    form.invoiceNumber
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* USER */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "invoices.assignedUser",
                    "Assigned User"
                  )}
                </label>

                <select
                  name="user"
                  value={
                    form.user
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="">
                    {t(
                      "invoices.selectUser",
                      "Select User"
                    )}
                  </option>

                  {users.map(
                    (user) => (
                      <option
                        key={
                          user._id
                        }
                        value={
                          user._id
                        }
                      >
                        {user.fullName} —{" "}
                        {user.email}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* CUSTOMER */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "common.customer",
                    "Customer"
                  )}
                </label>

                <select
                  name="customer"
                  value={
                    form.customer
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="">
                    {t(
                      "invoices.selectCustomer",
                      "Select Customer"
                    )}
                  </option>

                  {customers.map(
                    (customer) => (
                      <option
                        key={
                          customer._id
                        }
                        value={
                          customer._id
                        }
                      >
                        {
                          customer.customerName
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* VENDOR */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "common.vendor",
                    "Vendor"
                  )}
                </label>

                <select
                  name="vendor"
                  value={
                    form.vendor
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="">
                    {t(
                      "invoices.selectVendor",
                      "Select Vendor"
                    )}
                  </option>

                  {vendors.map(
                    (vendor) => (
                      <option
                        key={
                          vendor._id
                        }
                        value={
                          vendor._id
                        }
                      >
                        {
                          vendor.vendorName
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* INVOICE DATE */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "invoices.invoiceDate",
                    "Invoice Date"
                  )}
                </label>

                <input
                  type="date"
                  name="invoiceDate"
                  value={
                    form.invoiceDate
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* DUE DATE */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "invoices.dueDate",
                    "Due Date"
                  )}
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={
                    form.dueDate
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* TOTAL */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "invoices.totalValue",
                    "Total Amount"
                  )}
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="totalAmount"
                  placeholder="0"
                  value={
                    form.totalAmount
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* PAID */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "invoices.paidAmount",
                    "Paid Amount"
                  )}
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="paidAmount"
                  placeholder="0"
                  value={
                    form.paidAmount
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* BALANCE */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "invoices.balanceAmount",
                    "Balance Amount"
                  )}
                </label>

                <input
                  className="calculated-input"
                  value={formatAmount(
                    form.balanceAmount
                  )}
                  readOnly
                />

              </div>

              {/* STATUS */}

              <div className="invoice-input-group">

                <label>
                  {t(
                    "common.status",
                    "Status"
                  )}
                </label>

                <div className="invoice-form-status">

                  <span
                    className={
                      getStatusClass(
                        form.status
                      )
                    }
                  >
                    {getStatusLabel(
                      form.status
                    )}
                  </span>

                </div>

              </div>

              {/* NOTES */}

              <div className="invoice-input-group full-width">

                <label>
                  {t(
                    "invoices.notes",
                    "Notes"
                  )}
                </label>

                <textarea
                  name="notes"
                  rows="4"
                  placeholder={t(
                    "invoices.notesPlaceholder",
                    "Add notes for this invoice..."
                  )}
                  value={
                    form.notes
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>

            {/* FORM ACTIONS */}

            <div className="invoice-form-actions">

              <button
                type="button"
                className="cancel-invoice-btn"
                onClick={
                  handleCancel
                }
              >
                {t(
                  "common.cancel",
                  "Cancel"
                )}
              </button>

              <button
                type="submit"
                className="save-invoice-btn"
                disabled={saving}
              >
                {saving
                  ? t(
                      "invoices.saving",
                      "Saving..."
                    )
                  : editingId
                  ? t(
                      "invoices.updateInvoice",
                      "Update Invoice"
                    )
                  : t(
                      "invoices.saveInvoice",
                      "Save Invoice"
                    )}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="invoice-list-card">

        <div className="invoice-list-header">

          <div>

            <span className="invoice-eyebrow">
              {t(
                "invoices.records",
                "INVOICE RECORDS"
              )}
            </span>

            <h2>
              {t(
                "invoices.list",
                "Invoice List"
              )}
            </h2>

          </div>

          <span className="invoice-count">

            {invoices.length}{" "}

            {invoices.length === 1
              ? t(
                  "common.invoice",
                  "Invoice"
                )
              : t(
                  "invoices.title",
                  "Invoices"
                )}

          </span>

        </div>

        {loading ? (

          <div className="invoice-empty-state">

            <div className="invoice-spinner"></div>

            <h3>
              {t(
                "invoices.loading",
                "Loading invoices..."
              )}
            </h3>

            <p>
              {t(
                "invoices.loadingDescription",
                "Please wait while your records are loaded."
              )}
            </p>

          </div>

        ) : invoices.length === 0 ? (

          <div className="invoice-empty-state">

            <div className="invoice-empty-icon">
              🧾
            </div>

            <h3>
              {t(
                "invoices.noInvoices",
                "No invoices found"
              )}
            </h3>

            <p>
              {t(
                "invoices.createFirst",
                "Create your first invoice to start tracking your accounts."
              )}
            </p>

            <button
              type="button"
              className="add-invoice-btn"
              onClick={
                openCreateForm
              }
            >
              +{" "}
              {t(
                "invoices.addInvoice",
                "Add Invoice"
              )}
            </button>

          </div>

        ) : (

          <div className="invoice-table-wrapper">

            <table className="admin-invoice-table">

              <thead>

                <tr>

                  <th>
                    {t(
                      "common.invoice",
                      "Invoice"
                    )}
                  </th>

                  <th>
                    {t(
                      "invoices.assignedUser",
                      "User"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.customer",
                      "Customer"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.vendor",
                      "Vendor"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.total",
                      "Total"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.paid",
                      "Paid"
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

                {invoices.map(
                  (invoice) => (
                    <tr
                      key={
                        invoice._id
                      }
                    >

                      {/* INVOICE */}

                      <td>

                        <div className="invoice-main-cell">

                          <div className="invoice-icon-box">
                            🧾
                          </div>

                          <div>

                            <strong>
                              {
                                invoice.invoiceNumber
                              }
                            </strong>

                            <span>
                              {t(
                                "invoices.record",
                                "Invoice record"
                              )}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* USER */}

                      <td>
                        {
                          invoice.user
                            ?.fullName ||
                          "—"
                        }
                      </td>

                      {/* CUSTOMER */}

                      <td>
                        {
                          invoice.customer
                            ?.customerName ||
                          "—"
                        }
                      </td>

                      {/* VENDOR */}

                      <td>
                        {
                          invoice.vendor
                            ?.vendorName ||
                          "—"
                        }
                      </td>

                      {/* TOTAL */}

                      <td>

                        <strong>
                          {formatAmount(
                            invoice.totalAmount
                          )}
                        </strong>

                      </td>

                      {/* PAID */}

                      <td>

                        <strong className="paid-text">
                          {formatAmount(
                            invoice.paidAmount
                          )}
                        </strong>

                      </td>

                      {/* BALANCE */}

                      <td>

                        <strong className="balance-text">
                          {formatAmount(
                            invoice.balanceAmount
                          )}
                        </strong>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            getStatusClass(
                              invoice.status
                            )
                          }
                        >
                          {
                            getStatusLabel(
                              invoice.status
                            )
                          }
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="invoice-action-buttons">

                          <button
                            type="button"
                            className="edit-invoice-btn"
                            onClick={() =>
                              handleEdit(
                                invoice
                              )
                            }
                          >
                            {t(
                              "common.edit",
                              "Edit"
                            )}
                          </button>

                          <button
                            type="button"
                            className="delete-invoice-btn"
                            onClick={() =>
                              handleDelete(
                                invoice._id
                              )
                            }
                          >
                            {t(
                              "common.delete",
                              "Delete"
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

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
  className,
}) {
  return (
    <div className="invoice-summary-card">

      <div
        className={`invoice-summary-icon ${className}`}
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

export default Invoices;