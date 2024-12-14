import axiosInstance from "@/util/axiosInstance";

export const createAppointment = (data) => axiosInstance.post("/appointments", data);

export const updateAppointmentStatus = (id, data) => axiosInstance.patch(`/appointments/${id}/status`, data);

export const getAppointmentByStatus = (status) => axiosInstance.get(`/appointments/status/${status}`);

export const getAppointmentById = (id) => axiosInstance.get(`/appointments/${id}`);