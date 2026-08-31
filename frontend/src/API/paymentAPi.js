import api from "./api";

// ================= ADMIN =================

export const getPayments = () => {
    return api.get("/payments");
};

export const createPayment = (data) => {
    return api.post("/payments", data);
};

export const updatePayment = (id, data) => {
    return api.put(`/payments/${id}`, data);
};

export const deletePayment = (id) => {
    return api.delete(`/payments/${id}`);
};

// ================= USER =================

export const getMyPayments = () => {
    return api.get("/payments/my-payments");
};