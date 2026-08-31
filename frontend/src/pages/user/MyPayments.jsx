import { useEffect, useState } from "react";
import { getMyPayments } from "../../API/paymentApi";

import "../../styles/MyPayments.css";

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyPayments();

      setPayments(response.data.data || []);
    } catch (error) {
      console.error(
        "Payment loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load your payments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  // ================= SUMMARY =================

  const totalPaid = payments.reduce(
    (sum, payment) =>
      sum + Number(payment.amount || 0),
    0
  );

  const latestPayment =
    payments.length > 0
      ? payments[0]
      : null;

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  return (
    <div className="my-payments-page">

      {/* ================= HEADER ================= */}

      <div className="my-payments-header">

        <div>
          <span className="payments-eyebrow">
            FINANCIAL RECORDS
          </span>

          <h1>My Payments</h1>

          <p>
            View and track your payment activity,
            transactions and payment history.
          </p>
        </div>

        <button
          type="button"
          className="payments-refresh-btn"
          onClick={loadPayments}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="my-payments-error">
          {error}
        </div>
      )}

      {/* ================= SUMMARY ================= */}

      <div className="payments-summary">

        {/* Total payments */}

        <div className="payment-summary-card">

          <div className="payment-summary-icon blue">
            💳
          </div>

          <div>
            <span>Total Payments</span>

            <strong>
              {payments.length}
            </strong>

            <small>
              Payment records
            </small>
          </div>

        </div>

        {/* Total paid */}

        <div className="payment-summary-card">

          <div className="payment-summary-icon green">
            ₹
          </div>

          <div>
            <span>Total Paid</span>

            <strong>
              {formatAmount(totalPaid)}
            </strong>

            <small>
              Total amount paid
            </small>
          </div>

        </div>

        {/* Latest payment */}

        <div className="payment-summary-card">

          <div className="payment-summary-icon orange">
            🕒
          </div>

          <div>
            <span>Latest Payment</span>

            <strong className="latest-method">
              {latestPayment?.paymentMethod ||
                "—"}
            </strong>

            <small>
              {latestPayment?.paymentDate
                ? new Date(
                    latestPayment.paymentDate
                  ).toLocaleDateString()
                : "No payment yet"}
            </small>
          </div>

        </div>

      </div>

      {/* ================= HISTORY ================= */}

      <div className="payments-history-card">

        <div className="payments-history-header">

          <div>
            <span className="payments-eyebrow">
              TRANSACTION HISTORY
            </span>

            <h2>Payment History</h2>
          </div>

          <span className="payments-count">
            {payments.length}{" "}
            {payments.length === 1
              ? "Payment"
              : "Payments"}
          </span>

        </div>

        {loading ? (
          <div className="payments-empty-state">

            <div className="payment-spinner"></div>

            <h3>
              Loading payments...
            </h3>

            <p>
              Please wait while your payment
              records are loaded.
            </p>

          </div>
        ) : payments.length === 0 ? (
          <div className="payments-empty-state">

            <div className="payments-empty-icon">
              💳
            </div>

            <h3>
              No payments found
            </h3>

            <p>
              Your payments will appear here
              after they are recorded against
              your invoices.
            </p>

          </div>
        ) : (
          <div className="payments-table-wrapper">

            <table className="my-payments-table">

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>

                    <td>
                      <div className="invoice-cell">
                        <div className="invoice-icon">
                          🧾
                        </div>

                        <div>
                          <strong>
                            {payment.invoice
                              ?.invoiceNumber ||
                              "—"}
                          </strong>

                          <span>
                            Payment received
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong className="amount-green">
                        {formatAmount(
                          payment.amount
                        )}
                      </strong>
                    </td>

                    <td>
                      <span className="method-badge">
                        {payment.paymentMethod ||
                          "—"}
                      </span>
                    </td>

                    <td>
                      {payment.paymentDate
                        ? new Date(
                            payment.paymentDate
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <span className="transaction-id">
                        {payment.transactionId ||
                          "—"}
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

export default MyPayments;