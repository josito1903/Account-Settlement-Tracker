import { useEffect, useState } from "react";
import { getMyInvoices } from "../../API/invoiceAPi";

import "../../styles/MyInvoices.css";

function MyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyInvoices();

      setInvoices(response.data.data || []);
    } catch (error) {
      console.error("My invoices error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load your invoices"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // ================= SUMMARY =================

  const totalInvoices = invoices.length;

  const totalValue = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.totalAmount || 0),
    0
  );

  const totalPaid = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.paidAmount || 0),
    0
  );

  const totalOutstanding = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.balanceAmount || 0),
    0
  );

  const pendingCount = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  const partialCount = invoices.filter(
    (invoice) => invoice.status === "Partial"
  ).length;

  const paidCount = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "invoice-status paid";

      case "Partial":
        return "invoice-status partial";

      default:
        return "invoice-status pending";
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="my-invoices-page">
        <div className="invoice-loading">
          <div className="invoice-spinner"></div>

          <h3>Loading your invoices...</h3>

          <p>
            Please wait while your invoice records
            are loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-invoices-page">

      {/* ================= HEADER ================= */}

      <div className="my-invoices-header">

        <div>
          <span className="invoice-eyebrow">
            FINANCIAL RECORDS
          </span>

          <h1>My Invoices</h1>

          <p>
            View and track invoices assigned to
            your account.
          </p>
        </div>

        <button
          type="button"
          className="invoice-refresh-btn"
          onClick={loadInvoices}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="my-invoices-error">
          {error}
        </div>
      )}

      {/* ================= SUMMARY ================= */}

      <div className="invoice-summary">

        {/* Total invoices */}

        <div className="invoice-summary-card">

          <div className="invoice-summary-icon blue">
            🧾
          </div>

          <div>
            <span>Total Invoices</span>

            <strong>
              {totalInvoices}
            </strong>

            <small>
              Assigned invoices
            </small>
          </div>

        </div>

        {/* Total value */}

        <div className="invoice-summary-card">

          <div className="invoice-summary-icon purple">
            ₹
          </div>

          <div>
            <span>Total Value</span>

            <strong>
              {formatAmount(totalValue)}
            </strong>

            <small>
              Total invoice amount
            </small>
          </div>

        </div>

        {/* Paid */}

        <div className="invoice-summary-card">

          <div className="invoice-summary-icon green">
            ✓
          </div>

          <div>
            <span>Total Paid</span>

            <strong>
              {formatAmount(totalPaid)}
            </strong>

            <small>
              Payments recorded
            </small>
          </div>

        </div>

        {/* Outstanding */}

        <div className="invoice-summary-card">

          <div className="invoice-summary-icon orange">
            !
          </div>

          <div>
            <span>Outstanding</span>

            <strong>
              {formatAmount(totalOutstanding)}
            </strong>

            <small>
              Remaining balance
            </small>
          </div>

        </div>

      </div>

      {/* ================= STATUS OVERVIEW ================= */}

      <div className="invoice-status-overview">

        <div className="status-overview-title">
          <span className="invoice-eyebrow">
            INVOICE STATUS
          </span>

          <h2>Overview</h2>
        </div>

        <div className="status-overview-items">

          <div className="status-overview-item">
            <span className="status-dot pending"></span>

            <div>
              <strong>{pendingCount}</strong>
              <span>Pending</span>
            </div>
          </div>

          <div className="status-overview-item">
            <span className="status-dot partial"></span>

            <div>
              <strong>{partialCount}</strong>
              <span>Partial</span>
            </div>
          </div>

          <div className="status-overview-item">
            <span className="status-dot paid"></span>

            <div>
              <strong>{paidCount}</strong>
              <span>Paid</span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= INVOICE HISTORY ================= */}

      <div className="invoice-history-card">

        <div className="invoice-history-header">

          <div>
            <span className="invoice-eyebrow">
              INVOICE HISTORY
            </span>

            <h2>Invoice Records</h2>
          </div>

          <span className="invoice-count">
            {totalInvoices}{" "}
            {totalInvoices === 1
              ? "Invoice"
              : "Invoices"}
          </span>

        </div>

        {invoices.length === 0 ? (
          <div className="invoice-empty-state">

            <div className="invoice-empty-icon">
              🧾
            </div>

            <h3>
              No invoices found
            </h3>

            <p>
              There are currently no invoices
              assigned to your account.
            </p>

          </div>
        ) : (
          <div className="invoice-table-wrapper">

            <table className="my-invoices-table">

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Vendor</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>

                    {/* Invoice */}

                    <td>
                      <div className="invoice-number-cell">

                        <div className="invoice-row-icon">
                          🧾
                        </div>

                        <div>
                          <strong>
                            {invoice.invoiceNumber}
                          </strong>

                          <span>
                            Invoice record
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* Customer */}

                    <td>
                      {invoice.customer
                        ?.customerName || "—"}
                    </td>

                    {/* Vendor */}

                    <td>
                      {invoice.vendor
                        ?.vendorName || "—"}
                    </td>

                    {/* Total */}

                    <td>
                      <strong>
                        {formatAmount(
                          invoice.totalAmount
                        )}
                      </strong>
                    </td>

                    {/* Paid */}

                    <td>
                      <strong className="paid-amount">
                        {formatAmount(
                          invoice.paidAmount
                        )}
                      </strong>
                    </td>

                    {/* Balance */}

                    <td>
                      <strong className="balance-amount">
                        {formatAmount(
                          invoice.balanceAmount
                        )}
                      </strong>
                    </td>

                    {/* Due Date */}

                    <td>
                      {invoice.dueDate
                        ? new Date(
                            invoice.dueDate
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* Status */}

                    <td>
                      <span
                        className={getStatusClass(
                          invoice.status
                        )}
                      >
                        {invoice.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default MyInvoices;