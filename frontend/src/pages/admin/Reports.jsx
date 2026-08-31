import { useEffect, useMemo, useState } from "react";

import {
  getDashboardReport,
  getRevenueReport,
  getCustomerReport,
  getVendorReport,
  getSettlementReport,
} from "../../API/reportApi";

import "../../styles/Reports.css";

function Reports() {
  const [dashboard, setDashboard] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        dashboardResponse,
        revenueResponse,
        customerResponse,
        vendorResponse,
        settlementResponse,
      ] = await Promise.all([
        getDashboardReport(),
        getRevenueReport(),
        getCustomerReport(),
        getVendorReport(),
        getSettlementReport(),
      ]);

      setDashboard(
        dashboardResponse.data.data || null
      );

      setRevenue(
        revenueResponse.data.data || []
      );

      setCustomers(
        customerResponse.data.data || []
      );

      setVendors(
        vendorResponse.data.data || []
      );

      setSettlements(
        settlementResponse.data.data || []
      );
    } catch (error) {
      console.error("Reports error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  // ================= CALCULATIONS =================

  const reportSummary = useMemo(() => {
    const totalOutstanding = customers.reduce(
      (sum, customer) =>
        sum +
        Number(
          customer.outstandingBalance || 0
        ),
      0
    );

    const totalPayable = vendors.reduce(
      (sum, vendor) =>
        sum +
        Number(
          vendor.payableAmount || 0
        ),
      0
    );

    const totalRevenue = revenue.reduce(
      (sum, item) =>
        sum +
        Number(
          item.totalRevenue || 0
        ),
      0
    );

    const totalSettlementAmount =
      settlements.reduce(
        (sum, item) =>
          sum +
          Number(
            item.totalAmount || 0
          ),
        0
      );

    const totalSettlementPaid =
      settlements.reduce(
        (sum, item) =>
          sum +
          Number(
            item.paidAmount || 0
          ),
        0
      );

    const totalSettlementRemaining =
      settlements.reduce(
        (sum, item) =>
          sum +
          Number(
            item.remainingAmount || 0
          ),
        0
      );

    return {
      totalOutstanding,
      totalPayable,
      totalRevenue,
      totalSettlementAmount,
      totalSettlementPaid,
      totalSettlementRemaining,
    };
  }, [
    customers,
    vendors,
    revenue,
    settlements,
  ]);

  const formatAmount = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "status-badge active";
    }

    return "status-badge inactive";
  };

  const getSettlementClass = (status) => {
    if (status === "Completed") {
      return "status-badge completed";
    }

    if (status === "Partial") {
      return "status-badge partial";
    }

    return "status-badge pending";
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="reports-page">
        <div className="reports-loading">
          <div className="reports-spinner"></div>

          <h2>Loading reports...</h2>

          <p>
            Preparing your financial reports.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page">

      {/* ================= HEADER ================= */}

      <div className="reports-header">

        <div>
          <span className="reports-eyebrow">
            BUSINESS INTELLIGENCE
          </span>

          <h1>Reports</h1>

          <p>
            Financial, customer, vendor and
            settlement reports for the Accounts
            Settlement Tracker.
          </p>
        </div>

        <button
          type="button"
          className="reports-refresh-button"
          onClick={loadReports}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "↻ Refresh Reports"}
        </button>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="reports-error">
          {error}
        </div>
      )}

      {/* ================= KPI ================= */}

      {dashboard && (
        <div className="reports-kpi-grid">

          <ReportCard
            title="Customers"
            value={dashboard.totalCustomers}
            subtitle="Registered customers"
            icon="👥"
            type="blue"
          />

          <ReportCard
            title="Vendors"
            value={dashboard.totalVendors}
            subtitle="Registered vendors"
            icon="🏢"
            type="purple"
          />

          <ReportCard
            title="Invoices"
            value={dashboard.totalInvoices}
            subtitle="Invoices created"
            icon="🧾"
            type="orange"
          />

          <ReportCard
            title="Payments"
            value={dashboard.totalPayments}
            subtitle="Payments recorded"
            icon="💳"
            type="green"
          />

          <ReportCard
            title="Settlements"
            value={dashboard.totalSettlements}
            subtitle="Settlement records"
            icon="💰"
            type="blue"
          />

          <ReportCard
            title="Pending Invoices"
            value={dashboard.pendingInvoices}
            subtitle="Awaiting payment"
            icon="⏳"
            type="red"
          />

          <ReportCard
            title="Completed Settlements"
            value={
              dashboard.completedSettlements
            }
            subtitle="Successfully completed"
            icon="✅"
            type="green"
          />

          <ReportCard
            title="Outstanding"
            value={formatAmount(
              reportSummary.totalOutstanding
            )}
            subtitle="Customer balances"
            icon="₹"
            type="orange"
          />

        </div>
      )}

      {/* ================= FINANCIAL OVERVIEW ================= */}

      <div className="financial-overview">

        <div className="overview-card">
          <div className="overview-icon green">
            ₹
          </div>

          <div>
            <span>Total Revenue</span>

            <strong>
              {formatAmount(
                reportSummary.totalRevenue
              )}
            </strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon orange">
            !
          </div>

          <div>
            <span>Customer Outstanding</span>

            <strong>
              {formatAmount(
                reportSummary.totalOutstanding
              )}
            </strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon red">
            ↑
          </div>

          <div>
            <span>Vendor Payables</span>

            <strong>
              {formatAmount(
                reportSummary.totalPayable
              )}
            </strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon blue">
            ✓
          </div>

          <div>
            <span>Settlement Balance</span>

            <strong>
              {formatAmount(
                reportSummary.totalSettlementRemaining
              )}
            </strong>
          </div>
        </div>

      </div>

      {/* ================= REVENUE ================= */}

      <ReportSection
        eyebrow="REVENUE ANALYSIS"
        title="Revenue Report"
        count={`${revenue.length} Records`}
      >
        {revenue.length === 0 ? (
          <EmptyReport message="No revenue data available." />
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">

              <thead>
                <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {revenue.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>
                        {item._id?.year || "-"}
                      </strong>
                    </td>

                    <td>
                      {item._id?.month || "-"}
                    </td>

                    <td className="money-positive">
                      {formatAmount(
                        item.totalRevenue
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </ReportSection>

      {/* ================= CUSTOMER ================= */}

      <ReportSection
        eyebrow="CUSTOMER ANALYSIS"
        title="Customer Outstanding Report"
        count={`${customers.length} Customers`}
      >
        {customers.length === 0 ? (
          <EmptyReport message="No customer report data available." />
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Company</th>
                  <th>Outstanding</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {customers.map(
                  (customer) => (
                    <tr key={customer._id}>

                      <td>
                        <strong>
                          {customer.customerName}
                        </strong>
                      </td>

                      <td>
                        {customer.companyName ||
                          "—"}
                      </td>

                      <td className="money-warning">
                        {formatAmount(
                          customer.outstandingBalance
                        )}
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            customer.status
                          )}
                        >
                          {customer.status}
                        </span>
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>
        )}
      </ReportSection>

      {/* ================= VENDOR ================= */}

      <ReportSection
        eyebrow="VENDOR ANALYSIS"
        title="Vendor Payables Report"
        count={`${vendors.length} Vendors`}
      >
        {vendors.length === 0 ? (
          <EmptyReport message="No vendor report data available." />
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">

              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Company</th>
                  <th>Payable Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {vendors.map(
                  (vendor) => (
                    <tr key={vendor._id}>

                      <td>
                        <strong>
                          {vendor.vendorName}
                        </strong>
                      </td>

                      <td>
                        {vendor.companyName ||
                          "—"}
                      </td>

                      <td className="money-danger">
                        {formatAmount(
                          vendor.payableAmount
                        )}
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            vendor.status
                          )}
                        >
                          {vendor.status}
                        </span>
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>
        )}
      </ReportSection>

      {/* ================= SETTLEMENT ================= */}

      <ReportSection
        eyebrow="SETTLEMENT ANALYSIS"
        title="Settlement Summary"
        count={`${settlements.length} Records`}
      >
        {settlements.length === 0 ? (
          <EmptyReport message="No settlement report data available." />
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">

              <thead>
                <tr>
                  <th>Status</th>
                  <th>Count</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Remaining</th>
                </tr>
              </thead>

              <tbody>
                {settlements.map(
                  (item, index) => (
                    <tr key={index}>

                      <td>
                        <span
                          className={getSettlementClass(
                            item._id
                          )}
                        >
                          {item._id ||
                            "Pending"}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {item.count || 0}
                        </strong>
                      </td>

                      <td>
                        {formatAmount(
                          item.totalAmount
                        )}
                      </td>

                      <td className="money-positive">
                        {formatAmount(
                          item.paidAmount
                        )}
                      </td>

                      <td className="money-warning">
                        {formatAmount(
                          item.remainingAmount
                        )}
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>
        )}
      </ReportSection>

    </div>
  );
}

/* =====================================================
   REPORT CARD
===================================================== */

function ReportCard({
  title,
  value,
  subtitle,
  icon,
  type,
}) {
  return (
    <div className="report-kpi-card">

      <div
        className={`report-kpi-icon ${type}`}
      >
        {icon}
      </div>

      <div className="report-kpi-content">
        <span>{title}</span>

        <strong>{value}</strong>

        <small>{subtitle}</small>
      </div>

    </div>
  );
}

/* =====================================================
   REPORT SECTION
===================================================== */

function ReportSection({
  eyebrow,
  title,
  count,
  children,
}) {
  return (
    <section className="report-section">

      <div className="report-section-header">

        <div>
          <span className="reports-eyebrow">
            {eyebrow}
          </span>

          <h2>{title}</h2>
        </div>

        <span className="report-count">
          {count}
        </span>

      </div>

      {children}

    </section>
  );
}

/* =====================================================
   EMPTY REPORT
===================================================== */

function EmptyReport({ message }) {
  return (
    <div className="report-empty">
      <div className="report-empty-icon">
        📊
      </div>

      <h3>No data available</h3>

      <p>{message}</p>
    </div>
  );
}

export default Reports;