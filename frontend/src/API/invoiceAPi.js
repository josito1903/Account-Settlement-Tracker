import api from "./api";

// ================= ADMIN =================

export const getInvoices = () => {
    return api.get("/invoices");
};

export const createInvoice = (data) => {
    return api.post("/invoices", data);
};

export const updateInvoice = (id, data) => {
    return api.put(`/invoices/${id}`, data);
};

export const deleteInvoice = (id) => {
    return api.delete(`/invoices/${id}`);
};

// ================= USER =================

export const getMyInvoices = () => {
    return api.get("/invoices/my-invoices");
};