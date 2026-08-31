import api from "./api";

export const getDashboardReport = () =>
    api.get("/reports/dashboard");

export const getRevenueReport = () =>
    api.get("/reports/revenue");

export const getCustomerReport = () =>
    api.get("/reports/customers");

export const getVendorReport = () =>
    api.get("/reports/vendors");

export const getSettlementReport = () =>
    api.get("/reports/settlements");