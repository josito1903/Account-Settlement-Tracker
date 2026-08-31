import api from "./api";

export const getMyProfile = () => {
    return api.get("/auth/profile");
};

export const getUsers = () => {
    return api.get("/users");
};

export const getUserById = (id) => {
    return api.get(`/users/${id}`);
};

export const updateUser = (id, data) => {
    return api.put(`/users/${id}`, data);
};

export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};