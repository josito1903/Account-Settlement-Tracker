import api from "./api";

// Admin
export const getSettlements = () => {
    return api.get("/settlements");
};

export const createSettlement = (data) => {
    return api.post("/settlements", data);
};

export const updateSettlement = (id, data) => {
    return api.put(`/settlements/${id}`, data);
};

export const deleteSettlement = (id) => {
    return api.delete(`/settlements/${id}`);
};

// User
export const getMySettlements = () => {
    return api.get("/settlements/my-settlements");
};