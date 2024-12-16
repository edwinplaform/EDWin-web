import axiosInstance from "@/util/axiosInstance";

export const createAppointment = (data) => axiosInstance.post("/appointments", data);

export const updateAppointmentStatus = async ({id, data}) => {
    const response = await axiosInstance.patch(`/appointments/${id}/status`, data);
    return response.data;
}

export const getAppointmentByStatus = (status) => axiosInstance.get(`/appointments/status/${status}`);

export const getAppointmentById = (id) => axiosInstance.get(`/appointments/${id}`);

export const getAppointmentByTutorId = async (tutorId) => {
    const response = await axiosInstance.get(`/appointments/tutor/${tutorId}`);
    return response.data;
}

export const deleteAppointmentById = async (id) => {
    const response = await axiosInstance.delete(`/appointments/${id}`);
    return response.data;
};

export const getAppointmentByStatusAndId = async (status, userId) => {
    const response = await axiosInstance.get(`/appointments/status/${status}`, {
        params: {userId}
    });
    return response.data;
};