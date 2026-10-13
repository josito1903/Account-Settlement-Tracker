import { useEffect, useMemo, useState } from "react";

import { getMyInvoices } from "../../API/invoiceAPi";
import { getMyPayments } from "../../API/paymentAPi";
import { getMySettlements } from "../../API/settlementApi";


function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD USER DASHBOARD DATA
  // =====================================================

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        invoicesResponse,
        paymentsResponse,
        settlementsResponse,
      ] = await Promise.all([
        getMyInvoices(),
        getMyPayments(),
        getMySettlements(),
      ]);

      console.log("Invoices:", invoicesResponse);
      console.log("Payments:", paymentsResponse);
      console.log("Settlements:", settlementsResponse);

      setInvoices(
        invoicesResponse?.data?.data || []
      );

      setPayments(
        paymentsResponse?.data?.data || []
      );

      setSettlements(
        settlementsResponse?.data?.data || []
      );
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // =====================================================
  // CALCULATE OUTSTANDING
  // =====================================================

  const outstandingAmount = useMemo(() => {
    return invoices.reduce(
      (total, invoice) => {
        return (
          total +
          Number(
            invoice.balanceAmount || 0
          )
        );
      },
      0
    );
  }, [invoices]);

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatAmount = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // USER NAME
  // =====================================================

  const savedUser = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("user")
      );
    } catch {
      return null;
    }
  })();

  const userName =
    savedUser?.fullName || "User";

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Loading dashboard...</h2>
        <p>
          Please wait while your financial data
          is loaded.
        </p>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div
      style={{
        width: "100%",
        paddingBottom: "40px",
      }}
    >

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#fff0f0",
            color: "#c62828",
            border: "1px solid #ffd0d0",
          }}
        >
          {error}
        </div>
      )}

      {/* =================================================
          WELCOME
      ================================================= */}

      <div
        style={{
          padding: "35px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, #eef4ff, #ffffff)",
          border: "1px solid #e4eaf5",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>

          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              color: "#2864e8",
            }}
          >
            USER DASHBOARD
          </span>

          <h1
            style={{
              margin:
                "8px 0 8px",
              fontSize: "36px",
              color: "#111827",
            }}
          >
            Welcome back, {userName} 👋
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Here is a quick overview of your
            invoices, payments and settlements.
          </p>

        </div>

        <div
          style={{
            padding: "18px 22px",
            background: "#ffffff",
            border: "1px solid #e3e8f0",
            borderRadius: "14px",
            minWidth: "190px",
          }}
        >
          <strong
            style={{
              display: "block",
              color: "#111827",
              fontSize: "14px",
            }}
          >
            {userName}
          </strong>

          <span
            style={{
              display: "block",
              marginTop: "4px",
              color: "#8a93a2",
              fontSize: "11px",
            }}
          >
            User Account
          </span>
        </div>

      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "18px",
          marginBottom: "25px",
        }}
      >

        {/* INVOICES */}

        <DashboardCard
          icon="🧾"
          title="My Invoices"
          value={invoices.length}
          subtitle="Total invoices"
          type="blue"
        />

        {/* PAYMENTS */}

        <DashboardCard
          icon="💳"
          title="My Payments"
          value={payments.length}
          subtitle="Payments made"
          type="green"
        />

        {/* SETTLEMENTS */}

        <DashboardCard
          icon="💰"
          title="My Settlements"
          value={settlements.length}
          subtitle="Settlement records"
          type="orange"
        />

        {/* OUTSTANDING */}

        <DashboardCard
          icon="₹"
          title="Outstanding"
          value={formatAmount(
            outstandingAmount
          )}
          subtitle="Amount remaining"
          type="purple"
        />

      </div>

      {/* =================================================
          FINANCIAL OVERVIEW
      ================================================= */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "25px",
          border: "1px solid #edf0f5",
          boxShadow:
            "0 5px 18px rgba(0,0,0,0.04)",
        }}
      >

        <span
          style={{
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "1.5px",
            color: "#2864e8",
          }}
        >
          ACCOUNT DETAILS
        </span>

        <h2
          style={{
            margin:
              "6px 0 20px",
            color: "#111827",
          }}
        >
          Your Information
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "15px",
          }}
        >

          <InfoBox
            label="Full Name"
            value={userName}
          />

          <InfoBox
            label="Email Address"
            value={
              savedUser?.email ||
              "Not available"
            }
          />

          <InfoBox
            label="Total Invoices"
            value={invoices.length}
          />

          <InfoBox
            label="Outstanding Balance"
            value={formatAmount(
              outstandingAmount
            )}
          />

        </div>

      </div>

    </div>
  );
}


// =====================================================
// DASHBOARD CARD
// =====================================================

function DashboardCard({
  icon,
  title,
  value,
  subtitle,
  type,
}) {
  const colors = {
    blue: {
      background: "#eef4ff",
      color: "#2864e8",
    },

    green: {
      background: "#e8f8ef",
      color: "#178347",
    },

    orange: {
      background: "#fff4df",
      color: "#b66e00",
    },

    purple: {
      background: "#f2edff",
      color: "#6842c2",
    },
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "15px",
        padding: "20px",
        border: "1px solid #edf0f5",
        boxShadow:
          "0 5px 18px rgba(0,0,0,0.05)",
      }}
    >

      <div
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "11px",
          background:
            colors[type].background,
          color: colors[type].color,
          fontSize: "18px",
          marginBottom: "18px",
        }}
      >
        {icon}
      </div>

      <span
        style={{
          display: "block",
          color: "#6b7280",
          fontSize: "12px",
        }}
      >
        {title}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: "6px",
          color: "#111827",
          fontSize: "28px",
        }}
      >
        {value}
      </strong>

      <small
        style={{
          display: "block",
          marginTop: "5px",
          color: "#9aa2ae",
          fontSize: "10px",
        }}
      >
        {subtitle}
      </small>

    </div>
  );
}


// =====================================================
// INFO BOX
// =====================================================

function InfoBox({ label, value }) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "10px",
        background: "#f8fafc",
        border: "1px solid #edf0f5",
      }}
    >
      <span
        style={{
          display: "block",
          color: "#8a93a2",
          fontSize: "11px",
          marginBottom: "5px",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: "#111827",
          fontSize: "13px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

export default Dashboard;