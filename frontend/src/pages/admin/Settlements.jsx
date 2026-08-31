import { useEffect, useMemo, useState } from "react";

import {
  getSettlements,
  createSettlement,
  updateSettlement,
  deleteSettlement,
} from "../../API/settlementApi";

import { getInvoices } from "../../API/invoiceApi";

import "../../styles/Layout.css";
import "../../styles/Settlements.css";

function Settlements() {
  const emptyForm = {
    invoice: "",
    customer: "",
    vendor: "",
    totalAmount: "",
    paidAmount: "",
    remainingAmount: "",
    status: "Pending",
    settlementDate: "",
    remarks: "",
  };

  const [settlements, setSettlements] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ================= LOAD DATA =================

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        settlementResponse,
        invoiceResponse,
      ] = await Promise.all([
        getSettlements(),
        getInvoices(),
      ]);

      setSettlements(
        settlementResponse.data.data || []
      );

      setInvoices(
        invoiceResponse.data.data || []
      );
    } catch (error) {
      console.error(
        "Settlement loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load settlement data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= SUMMARY =================

  const summary = useMemo(() => {
    const total = settlements.reduce(
      (sum, settlement) =>
        sum +
        Number(
          settlement.totalAmount || 0
        ),
      0
    );

    const paid = settlements.reduce(
      (sum, settlement) =>
        sum +
        Number(
          settlement.paidAmount || 0
        ),
      0
    );

    const remaining = settlements.reduce(
      (sum, settlement) =>
        sum +
        Number(
          settlement.remainingAmount || 0
        ),
      0
    );

    const completed = settlements.filter(
      (settlement) =>
        settlement.status === "Completed"
    ).length;

    const pending = settlements.filter(
      (settlement) =>
        settlement.status === "Pending"
    ).length;

    const partial = settlements.filter(
      (settlement) =>
        settlement.status === "Partial"
    ).length;

    return {
      total,
      paid,
      remaining,
      completed,
      pending,
      partial,
    };
  }, [settlements]);

  // ================= STATUS =================

  const calculateStatus = (
    totalAmount,
    paidAmount
  ) => {
    const total = Number(totalAmount) || 0;
    const paid = Number(paidAmount) || 0;
    const remaining = Math.max(
      total - paid,
      0
    );

    if (
      remaining === 0 &&
      total > 0
    ) {
      return "Completed";
    }

    if (paid > 0) {
      return "Partial";
    }

    return "Pending";
  };

  // ================= INVOICE CHANGE =================

  const handleInvoiceChange = (e) => {
    const invoiceId = e.target.value;

    if (!invoiceId) {
      setForm(emptyForm);
      return;
    }

    const selectedInvoice =
      invoices.find(
        (invoice) =>
          invoice._id === invoiceId
      );

    if (!selectedInvoice) {
      return;
    }

    const totalAmount =
      Number(
        selectedInvoice.totalAmount || 0
      );

    const paidAmount =
      Number(
        selectedInvoice.paidAmount || 0
      );

    const remainingAmount = Math.max(
      totalAmount - paidAmount,
      0
    );

    const status = calculateStatus(
      totalAmount,
      paidAmount
    );

    setForm({
      invoice: selectedInvoice._id,

      customer:
        selectedInvoice.customer?._id ||
        selectedInvoice.customer ||
        "",

      vendor:
        selectedInvoice.vendor?._id ||
        selectedInvoice.vendor ||
        "",

      totalAmount,
      paidAmount,
      remainingAmount,
      status,

      settlementDate:
        new Date()
          .toISOString()
          .split("T")[0],

      remarks: "",
    });
  };

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.invoice) {
      setError(
        "Please select an invoice."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = {
        invoice: form.invoice,
        customer: form.customer,
        vendor: form.vendor,

        totalAmount:
          Number(form.totalAmount) || 0,

        paidAmount:
          Number(form.paidAmount) || 0,

        remainingAmount:
          Number(form.remainingAmount) || 0,

        status: form.status,

        settlementDate:
          form.settlementDate || undefined,

        remarks: form.remarks || "",
      };

      if (editingId) {
        await updateSettlement(
          editingId,
          data
        );
      } else {
        await createSettlement(data);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadData();
    } catch (error) {
      console.error(
        "Settlement save error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to save settlement"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= EDIT =================

  const handleEdit = (settlement) => {
    setEditingId(
      settlement._id
    );

    setForm({
      invoice:
        settlement.invoice?._id ||
        settlement.invoice ||
        "",

      customer:
        settlement.customer?._id ||
        settlement.customer ||
        "",

      vendor:
        settlement.vendor?._id ||
        settlement.vendor ||
        "",

      totalAmount:
        settlement.totalAmount || 0,

      paidAmount:
        settlement.paidAmount || 0,

      remainingAmount:
        settlement.remainingAmount || 0,

      status:
        settlement.status ||
        "Pending",

      settlementDate:
        settlement.settlementDate
          ? settlement.settlementDate.substring(
              0,
              10
            )
          : "",

      remarks:
        settlement.remarks || "",
    });

    setShowForm(true);
    setError("");
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this settlement?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteSettlement(id);

      await loadData();
    } catch (error) {
      console.error(
        "Settlement delete error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete settlement"
      );
    }
  };

  // ================= CANCEL =================

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // ================= ADD =================

  const handleAddSettlement = () => {
    setForm({
      ...emptyForm,
      settlementDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  // ================= STATUS CLASS =================

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "settlement-status completed";

      case "Partial":
        return "settlement-status partial";

      default:
        return "settlement-status pending";
    }
  };

  return (
    <div className="settlements-page">

      {/* ================= HEADER ================= */}

      <div className="settlements-header">
        <div>
          <span className="page-eyebrow">
            SETTLEMENT MANAGEMENT
          </span>

          <h1>Settlements</h1>

          <p>
            Track invoices, payments and
            outstanding settlement balances.
          </p>
        </div>

        <button
          type="button"
          className="add-settlement-btn"
          onClick={handleAddSettlement}
        >
          + New Settlement
        </button>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="settlement-error">
          {error}
        </div>
      )}

      {/* ================= SUMMARY ================= */}

      <div className="settlement-summary">

        <div className="summary-card">
          <div className="summary-icon total-icon">
            ₹
          </div>

          <div>
            <span>Total Value</span>

            <strong>
              ₹{summary.total.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon paid-icon">
            ✓
          </div>

          <div>
            <span>Paid Amount</span>

            <strong>
              ₹{summary.paid.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon remaining-icon">
            !
          </div>

          <div>
            <span>Outstanding</span>

            <strong>
              ₹{summary.remaining.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon completed-icon">
            ✓
          </div>

          <div>
            <span>Completed</span>

            <strong>
              {summary.completed}
            </strong>
          </div>
        </div>

      </div>

      {/* ================= FORM ================= */}

      {showForm && (
        <div className="settlement-form-card">

          <div className="form-header">
            <div>
              <span className="page-eyebrow">
                {editingId
                  ? "UPDATE RECORD"
                  : "CREATE RECORD"}
              </span>

              <h2>
                {editingId
                  ? "Edit Settlement"
                  : "Create Settlement"}
              </h2>
            </div>

            <button
              type="button"
              className="close-form-btn"
              onClick={handleCancel}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="settlement-form-grid">

              {/* INVOICE */}

              <div className="field full-width">
                <label htmlFor="invoice">
                  Invoice
                </label>

                <select
                  id="invoice"
                  value={form.invoice}
                  onChange={
                    handleInvoiceChange
                  }
                  required
                  disabled={!!editingId}
                >
                  <option value="">
                    Select an invoice
                  </option>

                  {invoices.map(
                    (invoice) => (
                      <option
                        key={invoice._id}
                        value={invoice._id}
                      >
                        {
                          invoice.invoiceNumber
                        }{" "}
                        — ₹
                        {Number(
                          invoice.totalAmount ||
                            0
                        ).toLocaleString()}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* CUSTOMER */}

              <div className="field">
                <label>
                  Customer
                </label>

                <input
                  value={
                    invoices.find(
                      (invoice) =>
                        invoice._id ===
                        form.invoice
                    )?.customer
                      ?.customerName || "—"
                  }
                  readOnly
                />
              </div>

              {/* VENDOR */}

              <div className="field">
                <label>
                  Vendor
                </label>

                <input
                  value={
                    invoices.find(
                      (invoice) =>
                        invoice._id ===
                        form.invoice
                    )?.vendor
                      ?.vendorName || "—"
                  }
                  readOnly
                />
              </div>

              {/* TOTAL */}

              <div className="field">
                <label>
                  Total Amount
                </label>

                <input
                  value={`₹${Number(
                    form.totalAmount || 0
                  ).toLocaleString()}`}
                  readOnly
                />
              </div>

              {/* PAID */}

              <div className="field">
                <label>
                  Paid Amount
                </label>

                <input
                  value={`₹${Number(
                    form.paidAmount || 0
                  ).toLocaleString()}`}
                  readOnly
                />
              </div>

              {/* REMAINING */}

              <div className="field">
                <label>
                  Remaining Amount
                </label>

                <input
                  value={`₹${Number(
                    form.remainingAmount ||
                      0
                  ).toLocaleString()}`}
                  readOnly
                  className="remaining-field"
                />
              </div>

              {/* STATUS */}

              <div className="field">
                <label>
                  Status
                </label>

                <div className="status-preview">
                  <span
                    className={getStatusClass(
                      form.status
                    )}
                  >
                    {form.status}
                  </span>
                </div>
              </div>

              {/* DATE */}

              <div className="field">
                <label htmlFor="settlementDate">
                  Settlement Date
                </label>

                <input
                  id="settlementDate"
                  type="date"
                  name="settlementDate"
                  value={
                    form.settlementDate
                  }
                  onChange={handleChange}
                />
              </div>

              {/* REMARKS */}

              <div className="field full-width">
                <label htmlFor="remarks">
                  Remarks
                </label>

                <textarea
                  id="remarks"
                  name="remarks"
                  placeholder="Add settlement notes..."
                  value={form.remarks}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-settlement-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Settlement"
                  : "Create Settlement"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="settlements-table-card">

        <div className="table-header">
          <div>
            <span className="page-eyebrow">
              TRANSACTION HISTORY
            </span>

            <h2>
              Settlement Records
            </h2>
          </div>

          <span className="record-count">
            {settlements.length} Records
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="loading-spinner"></div>

            <p>
              Loading settlements...
            </p>
          </div>
        ) : settlements.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              ₹
            </div>

            <h3>
              No settlements yet
            </h3>

            <p>
              Create your first settlement
              using the button above.
            </p>

          </div>
        ) : (
          <div className="table-wrapper">

            <table className="settlements-table">

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Vendor</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Remaining</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {settlements.map(
                  (settlement) => (
                    <tr
                      key={
                        settlement._id
                      }
                    >
                      <td>
                        <strong>
                          {settlement
                            .invoice
                            ?.invoiceNumber ||
                            "—"}
                        </strong>
                      </td>

                      <td>
                        {settlement
                          .customer
                          ?.customerName ||
                          "—"}
                      </td>

                      <td>
                        {settlement
                          .vendor
                          ?.vendorName ||
                          "—"}
                      </td>

                      <td>
                        ₹
                        {Number(
                          settlement.totalAmount ||
                            0
                        ).toLocaleString()}
                      </td>

                      <td className="paid-amount">
                        ₹
                        {Number(
                          settlement.paidAmount ||
                            0
                        ).toLocaleString()}
                      </td>

                      <td className="remaining-amount">
                        ₹
                        {Number(
                          settlement
                            .remainingAmount ||
                            0
                        ).toLocaleString()}
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            settlement.status
                          )}
                        >
                          {
                            settlement.status
                          }
                        </span>
                      </td>

                      <td>
                        {settlement
                          .settlementDate
                          ? new Date(
                              settlement.settlementDate
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                      <td>
                        <div className="action-buttons">

                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(
                                settlement
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                settlement._id
                              )
                            }
                          >
                            Delete
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

export default Settlements;