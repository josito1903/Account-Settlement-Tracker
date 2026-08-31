import { useEffect, useState } from "react";
import { getMySettlements } from "../../API/settlementApi";
import "../../styles/Settlement.css";

function MySettlements() {
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSettlements();
  }, []);

  const loadSettlements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMySettlements();

      setSettlements(response.data.data || []);
    } catch (error) {
      console.error("Settlement loading error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load your settlements"
      );
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = settlements.reduce(
    (sum, settlement) =>
      sum + Number(settlement.totalAmount || 0),
    0
  );

  const totalPaid = settlements.reduce(
    (sum, settlement) =>
      sum + Number(settlement.paidAmount || 0),
    0
  );

  const totalRemaining = settlements.reduce(
    (sum, settlement) =>
      sum + Number(settlement.remainingAmount || 0),
    0
  );

  const completedCount = settlements.filter(
    (settlement) =>
      settlement.status === "Completed"
  ).length;

  return (
    <div className="settlements-page">

      {/* Header */}
      <div className="settlements-header">
        <div>
          <span className="settlements-eyebrow">
            FINANCIAL RECORDS
          </span>

          <h1>My Settlements</h1>

          <p>
            Track the settlement progress of your
            invoices and payments.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={loadSettlements}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="settlements-error">
          {error}
        </div>
      )}

      {/* Summary cards */}
      <div className="settlement-stats">

        <div className="settlement-stat-card">
          <div className="stat-icon">💰</div>

          <span>Total Settlements</span>

          <strong>{settlements.length}</strong>

          <small>
            Settlement records
          </small>
        </div>

        <div className="settlement-stat-card">
          <div className="stat-icon">₹</div>

          <span>Total Value</span>

          <strong>
            ₹{totalAmount.toLocaleString()}
          </strong>

          <small>
            Total settlement amount
          </small>
        </div>

        <div className="settlement-stat-card">
          <div className="stat-icon">✅</div>

          <span>Completed</span>

          <strong>{completedCount}</strong>

          <small>
            Completed settlements
          </small>
        </div>

        <div className="settlement-stat-card">
          <div className="stat-icon">⏳</div>

          <span>Remaining</span>

          <strong>
            ₹{totalRemaining.toLocaleString()}
          </strong>

          <small>
            Outstanding amount
          </small>
        </div>

      </div>

      {/* Main content */}
      <div className="settlements-card">

        <div className="settlements-card-header">
          <div>
            <span className="settlements-eyebrow">
              SETTLEMENT HISTORY
            </span>

            <h2>Settlement List</h2>
          </div>

          <div className="paid-summary">
            Paid:{" "}
            <strong>
              ₹{totalPaid.toLocaleString()}
            </strong>
          </div>
        </div>

        {loading ? (
          <div className="settlements-empty">
            <div className="settlement-spinner"></div>
            <h3>Loading settlements...</h3>
            <p>
              Please wait while your records are loaded.
            </p>
          </div>
        ) : settlements.length === 0 ? (
          <div className="settlements-empty">
            <div className="empty-settlement-icon">
              💰
            </div>

            <h3>No settlements found</h3>

            <p>
              Your settlement records will appear here
              once they are created.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
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
                </tr>
              </thead>

              <tbody>
                {settlements.map((settlement) => (
                  <tr key={settlement._id}>

                    <td>
                      <strong>
                        {settlement.invoice
                          ?.invoiceNumber || "-"}
                      </strong>
                    </td>

                    <td>
                      {settlement.customer
                        ?.customerName ||
                        settlement.invoice?.customer
                          ?.customerName ||
                        "-"}
                    </td>

                    <td>
                      {settlement.vendor
                        ?.vendorName ||
                        settlement.invoice?.vendor
                          ?.vendorName ||
                        "-"}
                    </td>

                    <td>
                      ₹
                      {Number(
                        settlement.totalAmount || 0
                      ).toLocaleString()}
                    </td>

                    <td className="paid-amount">
                      ₹
                      {Number(
                        settlement.paidAmount || 0
                      ).toLocaleString()}
                    </td>

                    <td>
                      ₹
                      {Number(
                        settlement.remainingAmount || 0
                      ).toLocaleString()}
                    </td>

                    <td>
                      <StatusBadge
                        status={settlement.status}
                      />
                    </td>

                    <td>
                      {settlement.settlementDate
                        ? new Date(
                            settlement.settlementDate
                          ).toLocaleDateString()
                        : settlement.createdAt
                        ? new Date(
                            settlement.createdAt
                          ).toLocaleDateString()
                        : "-"}
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

function StatusBadge({ status }) {
  const normalizedStatus = status || "Pending";

  let className = "settlement-status pending";

  if (normalizedStatus === "Completed") {
    className = "settlement-status completed";
  } else if (
    normalizedStatus === "Partial"
  ) {
    className = "settlement-status partial";
  }

  return (
    <span className={className}>
      {normalizedStatus}
    </span>
  );
}

export default MySettlements;