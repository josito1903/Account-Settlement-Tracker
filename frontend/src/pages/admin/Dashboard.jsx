import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getDashboardStats } from "../../API/dashboardApi";

function Dashboard() {
  const { t } = useTranslation();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalVendors: 0,
    totalInvoices: 0,
    totalPayments: 0,
    totalSettlements: 0,
    pendingInvoices: 0,
    completedSettlements: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboardStats();

        setStats(response?.data?.data || {});
      } catch (error) {
        console.error("Dashboard error:", error);

        setError(
          error.response?.data?.message ||
            t(
              "messages.dashboardLoadError",
              "Failed to load dashboard data"
            )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [t]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>

        <h2>
          {t(
            "adminDashboard.loadingTitle",
            "Loading Admin Dashboard..."
          )}
        </h2>

        <p>
          {t(
            "adminDashboard.loadingDescription",
            "Please wait while we load your account data."
          )}
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div style={styles.errorCard}>
        <h1>
          {t(
            "adminDashboard.title",
            "Admin Dashboard"
          )}
        </h1>

        <p>{error}</p>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div style={styles.page}>

      {/* =================================================
          HEADER
      ================================================= */}

      <div style={styles.header}>

        <div>
          <span style={styles.eyebrow}>
            {t(
              "adminDashboard.eyebrow",
              "ADMIN OVERVIEW"
            )}
          </span>

          <h1 style={styles.title}>
            {t(
              "app.name",
              "Accounts Settlement Tracker"
            )}
          </h1>

          <p style={styles.subtitle}>
            {t(
              "adminDashboard.description",
              "Monitor customers, vendors, invoices, payments and settlements from one place."
            )}
          </p>
        </div>

        <div style={styles.headerBadge}>
          <span style={styles.headerDot}></span>

          {t(
            "adminDashboard.systemActive",
            "System Active"
          )}
        </div>

      </div>

      {/* =================================================
          MAIN STATISTICS
      ================================================= */}

      <div style={styles.cardGrid}>

        <StatCard
          icon="👥"
          title={t(
            "adminDashboard.totalCustomers",
            "Total Customers"
          )}
          value={stats.totalCustomers}
          description={t(
            "adminDashboard.registeredCustomers",
            "Registered customers"
          )}
        />

        <StatCard
          icon="🏢"
          title={t(
            "adminDashboard.totalVendors",
            "Total Vendors"
          )}
          value={stats.totalVendors}
          description={t(
            "adminDashboard.registeredVendors",
            "Registered vendors"
          )}
        />

        <StatCard
          icon="🧾"
          title={t(
            "adminDashboard.totalInvoices",
            "Total Invoices"
          )}
          value={stats.totalInvoices}
          description={t(
            "adminDashboard.invoicesCreated",
            "Invoices created"
          )}
        />

        <StatCard
          icon="💳"
          title={t(
            "adminDashboard.totalPayments",
            "Total Payments"
          )}
          value={stats.totalPayments}
          description={t(
            "adminDashboard.paymentsRecorded",
            "Payments recorded"
          )}
        />

        <StatCard
          icon="💰"
          title={t(
            "adminDashboard.totalSettlements",
            "Total Settlements"
          )}
          value={stats.totalSettlements}
          description={t(
            "adminDashboard.settlementRecords",
            "Settlement records"
          )}
        />

        <StatCard
          icon="⏳"
          title={t(
            "adminDashboard.pendingInvoices",
            "Pending Invoices"
          )}
          value={stats.pendingInvoices}
          description={t(
            "adminDashboard.awaitingPayment",
            "Invoices awaiting payment"
          )}
        />

        <StatCard
          icon="✅"
          title={t(
            "adminDashboard.completedSettlements",
            "Completed Settlements"
          )}
          value={stats.completedSettlements}
          description={t(
            "adminDashboard.successfullyCompleted",
            "Successfully completed"
          )}
        />

      </div>

      {/* =================================================
          BUSINESS OVERVIEW
      ================================================= */}

      <div style={styles.sectionCard}>

        <div style={styles.sectionHeader}>

          <div>
            <span style={styles.eyebrow}>
              {t(
                "adminDashboard.businessOverview",
                "BUSINESS OVERVIEW"
              )}
            </span>

            <h2 style={styles.sectionTitle}>
              {t(
                "adminDashboard.settlementActivity",
                "Settlement Activity"
              )}
            </h2>
          </div>

        </div>

        <div style={styles.overviewGrid}>

          <OverviewItem
            title={t(
              "common.invoice",
              "Invoices"
            )}
            value={stats.totalInvoices}
            status={t(
              "adminDashboard.tracked",
              "Tracked"
            )}
          />

          <OverviewItem
            title={t(
              "common.payment",
              "Payments"
            )}
            value={stats.totalPayments}
            status={t(
              "adminDashboard.recorded",
              "Recorded"
            )}
          />

          <OverviewItem
            title={t(
              "common.settlement",
              "Settlements"
            )}
            value={stats.totalSettlements}
            status={t(
              "adminDashboard.managed",
              "Managed"
            )}
          />

          <OverviewItem
            title={t(
              "adminDashboard.completed",
              "Completed"
            )}
            value={stats.completedSettlements}
            status={t(
              "adminDashboard.closed",
              "Closed"
            )}
          />

        </div>

      </div>

    </div>
  );
}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div style={styles.statCard}>

      <div style={styles.iconBox}>
        {icon}
      </div>

      <span style={styles.cardTitle}>
        {title}
      </span>

      <h2 style={styles.cardValue}>
        {value}
      </h2>

      <span style={styles.cardDescription}>
        {description}
      </span>

    </div>
  );
}


// =====================================================
// OVERVIEW ITEM
// =====================================================

function OverviewItem({
  title,
  value,
  status,
}) {
  return (
    <div style={styles.overviewItem}>

      <div>

        <span style={styles.overviewTitle}>
          {title}
        </span>

        <strong style={styles.overviewValue}>
          {value}
        </strong>

      </div>

      <span style={styles.statusBadge}>
        {status}
      </span>

    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = {
  page: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    paddingBottom: "40px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "28px",
    padding: "28px",
    borderRadius: "16px",

    background:
      "linear-gradient(135deg, var(--accent-light), var(--surface))",

    border:
      "1px solid var(--accent-border)",

    boxShadow:
      "var(--shadow)",
  },

  eyebrow: {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "var(--accent)",
    marginBottom: "6px",
  },

  title: {
    margin: "0 0 8px",
    fontSize: "34px",
    color: "var(--text-h)",
    lineHeight: "1.2",
  },

  subtitle: {
    margin: 0,
    color: "var(--text)",
    fontSize: "14px",
    lineHeight: "1.6",
    maxWidth: "700px",
  },

  headerBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",

    background:
      "var(--surface)",

    border:
      "1px solid var(--border)",

    padding: "10px 14px",

    borderRadius: "20px",

    fontSize: "12px",

    fontWeight: "600",

    color: "var(--success)",

    whiteSpace: "nowrap",

    boxShadow:
      "0 3px 10px rgba(0, 0, 0, 0.03)",
  },

  headerDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "var(--success)",
  },

  cardGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",

    gap: "18px",

    marginBottom: "25px",
  },

  statCard: {
    background:
      "var(--surface)",

    borderRadius: "14px",

    padding: "20px",

    border:
      "1px solid var(--border)",

    boxShadow:
      "var(--shadow)",

    transition:
      "transform 0.2s ease, box-shadow 0.2s ease",
  },

  iconBox: {
    width: "44px",
    height: "44px",

    borderRadius: "11px",

    background:
      "var(--accent-light)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "20px",

    marginBottom: "15px",
  },

  cardTitle: {
    display: "block",

    fontSize: "13px",

    color: "var(--text)",
  },

  cardValue: {
    margin: "6px 0",

    fontSize: "30px",

    fontWeight: "700",

    color: "var(--text-h)",
  },

  cardDescription: {
    display: "block",

    fontSize: "11px",

    color: "var(--text)",
  },

  sectionCard: {
    background:
      "var(--surface)",

    borderRadius: "14px",

    padding: "25px",

    border:
      "1px solid var(--border)",

    boxShadow:
      "var(--shadow)",
  },

  sectionHeader: {
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: "6px 0 0",

    fontSize: "22px",

    color: "var(--text-h)",
  },

  overviewGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",

    gap: "15px",
  },

  overviewItem: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: "15px",

    background:
      "var(--surface-2)",

    border:
      "1px solid var(--border)",

    borderRadius: "10px",

    padding: "16px",
  },

  overviewTitle: {
    display: "block",

    fontSize: "12px",

    color: "var(--text)",

    marginBottom: "5px",
  },

  overviewValue: {
    display: "block",

    fontSize: "20px",

    color: "var(--text-h)",
  },

  statusBadge: {
    background:
      "var(--accent-light)",

    color:
      "var(--accent)",

    padding: "6px 10px",

    borderRadius: "20px",

    fontSize: "11px",

    fontWeight: "700",

    whiteSpace: "nowrap",
  },

  loading: {
    padding: "70px 20px",

    textAlign: "center",

    color: "var(--text)",
  },

  spinner: {
    width: "34px",
    height: "34px",

    border:
      "4px solid var(--border)",

    borderTop:
      "4px solid var(--accent)",

    borderRadius: "50%",

    margin: "0 auto 18px",

    animation:
      "dashboardSpin 0.8s linear infinite",
  },

  errorCard: {
    padding: "30px",

    background:
      "var(--danger-bg)",

    borderRadius: "12px",

    border:
      "1px solid color-mix(in srgb, var(--danger) 25%, transparent)",

    color:
      "var(--danger)",
  },
};

export default Dashboard;