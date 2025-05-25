import apiClient from "../axios"

export const getUsers = () => apiClient.get("/users")
export const getUser = (id) => apiClient.get(`/users/${id}`)
export const createUser = (user) => apiClient.post("/users", user)
export const updateUser = (id, user) => apiClient.put(`/users/${id}`, user)
export const deleteUser = (id) => apiClient.delete(`/users/${id}`)