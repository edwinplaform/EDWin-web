import axiosInstance from "@/util/axiosInstance";

export const createSession = (data) => axiosInstance.post('sessions', data);

export const updateSession = async ({sessionId, data}) => {
    const response = await axiosInstance.put(`sessions/${sessionId}`, data);
    return response.data;
}

export const getSessionsByTutorId = async (tutorId) => {
    const response = await axiosInstance.get(`/tutors/${tutorId}/sessions`);
    return response.data;
}

export const updateSessionStatus = async ({sessionId, status}) => {
    const response = await axiosInstance.patch(`/sessions/${sessionId}/status`, status);
    return response.data;
}