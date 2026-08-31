import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../../API/paymentApi";

import { getInvoices } from "../../API/invoiceApi";

import "../../styles/Layout.css";
import "../../styles/Payments.css";

function Payments() {
  const { t, i18n } = useTranslation();

  const emptyForm = {
    invoice: "",
    amount: "",
    paymentMethod: "Bank Transfer",
    paymentDate: "",
    transactionId: "",
    remarks: "",
  };

  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);

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
        paymentResponse,
        invoiceResponse,
      ] = await Promise.all([
        getPayments(),
        getInvoices(),
      ]);

      setPayments(
        paymentResponse?.data?.data || []
      );

      setInvoices(
        invoiceResponse?.data?.data || []
      );
    } catch (error) {
      console.error(
        "Payment loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.paymentLoadError",
            "Failed to load payment data"
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

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.invoice) {
      setError(
        t(
          "messages.paymentInvoiceRequired",
          "Please select an invoice."
        )
      );
      return;
    }

    if (
      !form.amount ||
      Number(form.amount) <= 0
    ) {
      setError(
        t(
          "messages.paymentAmountRequired",
          "Payment amount must be greater than zero."
        )
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = {
        ...form,
        amount: Number(form.amount),
      };

      if (editingId) {
        await updatePayment(
          editingId,
          data
        );
      } else {
        await createPayment(data);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadData();
    } catch (error) {
      console.error(
        "Payment save error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.paymentSaveError",
            "Failed to save payment"
          )
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (payment) => {
    setEditingId(payment._id);

    setForm({
      invoice:
        payment.invoice?._id ||
        payment.invoice ||
        "",

      amount:
        payment.amount || "",

      paymentMethod:
        payment.paymentMethod ||
        "Bank Transfer",

      paymentDate:
        payment.paymentDate
          ? payment.paymentDate.substring(
              0,
              10
            )
          : "",

      transactionId:
        payment.transactionId || "",

      remarks:
        payment.remarks || "",
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
          "messages.deletePayment",
          "Are you sure you want to delete this payment?"
        )
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deletePayment(id);

      await loadData();
    } catch (error) {
      console.error(
        "Payment delete error:",
        error
      );

      setError(
        error.response?.data?.message ||
          t(
            "messages.paymentDeleteError",
            "Failed to delete payment"
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
  // ADD PAYMENT
  // =====================================================

  const handleAddPayment = () => {
    setForm({
      ...emptyForm,
      paymentDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  // =====================================================
  // TOTAL
  // =====================================================

  const totalPayments =
    payments.reduce(
      (sum, payment) =>
        sum +
        Number(payment.amount || 0),
      0
    );

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
  // PAYMENT METHOD LABEL
  // Keep DB values in English; translate only UI.
  // =====================================================

  const getPaymentMethodLabel = (
    method
  ) => {
    const methodMap = {
      Cash: "payments.methods.cash",
      "Bank Transfer":
        "payments.methods.bankTransfer",
      UPI: "payments.methods.upi",
      Cheque:
        "payments.methods.cheque",
    };

    return t(
      methodMap[method] || "payments.method",
      method || "-"
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="payments-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="payments-header">

        <div>

          <span className="page-eyebrow">
            {t(
              "payments.management",
              "PAYMENT MANAGEMENT"
            )}
          </span>

          <h1>
            {t(
              "payments.title",
              "Payments"
            )}
          </h1>

          <p>
            {t(
              "payments.description",
              "Record, monitor and manage payments against invoices."
            )}
          </p>

        </div>

        <button
          type="button"
          onClick={handleAddPayment}
          className="primary-action"
        >
          +{" "}
          {t(
            "payments.addPayment",
            "Add Payment"
          )}
        </button>

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
          SUMMARY
      ================================================= */}

      <div className="payment-summary">

        <div className="payment-summary-card">

          <div className="payment-summary-icon">
            💳
          </div>

          <span>
            {t(
              "payments.totalPayments",
              "Total Payments"
            )}
          </span>

          <strong>
            {payments.length}
          </strong>

          <small>
            {t(
              "payments.recordedTransactions",
              "Recorded transactions"
            )}
          </small>

        </div>

        <div className="payment-summary-card">

          <div className="payment-summary-icon">
            ₹
          </div>

          <span>
            {t(
              "payments.totalAmount",
              "Total Amount"
            )}
          </span>

          <strong>
            {formatAmount(
              totalPayments
            )}
          </strong>

          <small>
            {t(
              "payments.totalReceived",
              "Total amount received"
            )}
          </small>

        </div>

        <div className="payment-summary-card">

          <div className="payment-summary-icon">
            🧾
          </div>

          <span>
            {t(
              "common.invoice",
              "Invoices"
            )}
          </span>

          <strong>
            {invoices.length}
          </strong>

          <small>
            {t(
              "payments.availableInvoices",
              "Available invoices"
            )}
          </small>

        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      {showForm && (
        <div className="payment-form-card">

          <div className="form-card-header">

            <div>

              <span className="page-eyebrow">

                {editingId
                  ? t(
                      "payments.updatePayment",
                      "UPDATE PAYMENT"
                    )
                  : t(
                      "payments.newPayment",
                      "NEW PAYMENT"
                    )}

              </span>

              <h2>

                {editingId
                  ? t(
                      "payments.editPayment",
                      "Edit Payment"
                    )
                  : t(
                      "payments.recordPayment",
                      "Record Payment"
                    )}

              </h2>

            </div>

            <button
              type="button"
              className="close-form-button"
              onClick={handleCancel}
              aria-label={t(
                "common.cancel",
                "Close"
              )}
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="payment-form-grid">

              {/* INVOICE */}

              <div className="form-field">

                <label htmlFor="invoice">
                  {t(
                    "common.invoice",
                    "Invoice"
                  )}
                </label>

                <select
                  id="invoice"
                  name="invoice"
                  value={form.invoice}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    {t(
                      "payments.selectInvoice",
                      "Select Invoice"
                    )}
                  </option>

                  {invoices.map(
                    (invoice) => (
                      <option
                        key={
                          invoice._id
                        }
                        value={
                          invoice._id
                        }
                      >
                        {
                          invoice.invoiceNumber
                        }
                        {" — "}
                        {formatAmount(
                          invoice.balanceAmount ||
                            0
                        )}
                        {" "}
                        {t(
                          "payments.balance",
                          "balance"
                        )}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* AMOUNT */}

              <div className="form-field">

                <label htmlFor="amount">
                  {t(
                    "payments.paymentAmount",
                    "Payment Amount"
                  )}
                </label>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder={t(
                    "payments.amountPlaceholder",
                    "Enter payment amount"
                  )}
                  value={form.amount}
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* METHOD */}

              <div className="form-field">

                <label htmlFor="paymentMethod">
                  {t(
                    "payments.paymentMethod",
                    "Payment Method"
                  )}
                </label>

                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={
                    form.paymentMethod
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="Cash">
                    {t(
                      "payments.methods.cash",
                      "Cash"
                    )}
                  </option>

                  <option value="Bank Transfer">
                    {t(
                      "payments.methods.bankTransfer",
                      "Bank Transfer"
                    )}
                  </option>

                  <option value="UPI">
                    {t(
                      "payments.methods.upi",
                      "UPI"
                    )}
                  </option>

                  <option value="Cheque">
                    {t(
                      "payments.methods.cheque",
                      "Cheque"
                    )}
                  </option>

                </select>

              </div>

              {/* DATE */}

              <div className="form-field">

                <label htmlFor="paymentDate">
                  {t(
                    "payments.paymentDate",
                    "Payment Date"
                  )}
                </label>

                <input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  value={
                    form.paymentDate
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* TRANSACTION ID */}

              <div className="form-field full-width">

                <label htmlFor="transactionId">
                  {t(
                    "payments.transactionId",
                    "Transaction ID"
                  )}
                </label>

                <input
                  id="transactionId"
                  name="transactionId"
                  type="text"
                  placeholder={t(
                    "payments.transactionPlaceholder",
                    "Enter transaction ID"
                  )}
                  value={
                    form.transactionId
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* REMARKS */}

              <div className="form-field full-width">

                <label htmlFor="remarks">
                  {t(
                    "payments.remarks",
                    "Remarks"
                  )}
                </label>

                <textarea
                  id="remarks"
                  name="remarks"
                  placeholder={t(
                    "payments.remarksPlaceholder",
                    "Add payment remarks"
                  )}
                  value={
                    form.remarks
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                />

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
                      "payments.saving",
                      "Saving..."
                    )
                  : editingId
                  ? t(
                      "payments.updatePayment",
                      "Update Payment"
                    )
                  : t(
                      "payments.savePayment",
                      "Save Payment"
                    )}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =================================================
          PAYMENT LIST
      ================================================= */}

      <div className="payment-list-card">

        <div className="list-header">

          <div>

            <span className="page-eyebrow">
              {t(
                "payments.records",
                "PAYMENT RECORDS"
              )}
            </span>

            <h2>
              {t(
                "payments.paymentHistory",
                "Payment History"
              )}
            </h2>

          </div>

          <span className="record-count">

            {payments.length}{" "}

            {payments.length === 1
              ? t(
                  "common.payment",
                  "Payment"
                )
              : t(
                  "payments.title",
                  "Payments"
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
                "payments.loading",
                "Loading payments..."
              )}
            </h3>

            <p>
              {t(
                "payments.loadingDescription",
                "Please wait while payment records are loaded."
              )}
            </p>

          </div>

        ) : payments.length === 0 ? (

          /* =================================================
             EMPTY
          ================================================= */

          <div className="empty-state">

            <div className="empty-state-icon">
              💳
            </div>

            <h3>
              {t(
                "payments.noPayments",
                "No payments found"
              )}
            </h3>

            <p>
              {t(
                "payments.firstPayment",
                "Record your first payment to get started."
              )}
            </p>

            <button
              type="button"
              onClick={handleAddPayment}
              className="primary-action"
            >
              +{" "}
              {t(
                "payments.addPayment",
                "Add Payment"
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
                      "common.invoice",
                      "Invoice"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.amount",
                      "Amount"
                    )}
                  </th>

                  <th>
                    {t(
                      "payments.paymentMethod",
                      "Method"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.date",
                      "Date"
                    )}
                  </th>

                  <th>
                    {t(
                      "payments.transactionId",
                      "Transaction ID"
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

                {payments.map(
                  (payment) => (
                    <tr
                      key={
                        payment._id
                      }
                    >

                      {/* INVOICE */}

                      <td>

                        <strong>
                          {
                            payment.invoice
                              ?.invoiceNumber ||
                            "-"
                          }
                        </strong>

                      </td>

                      {/* AMOUNT */}

                      <td className="amount-cell">

                        {formatAmount(
                          payment.amount
                        )}

                      </td>

                      {/* METHOD */}

                      <td>

                        <span className="method-badge">
                          {
                            getPaymentMethodLabel(
                              payment.paymentMethod
                            )
                          }
                        </span>

                      </td>

                      {/* DATE */}

                      <td>

                        {payment.paymentDate
                          ? new Date(
                              payment.paymentDate
                            ).toLocaleDateString(
                              i18n.language
                            )
                          : "-"}

                      </td>

                      {/* TRANSACTION */}

                      <td>
                        {
                          payment.transactionId ||
                          "-"
                        }
                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="table-actions">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                payment
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
                                payment._id
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

export default Payments;