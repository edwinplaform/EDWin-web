import axiosInstance from "@/util/axiosInstance";

export const createSession = (data) => axiosInstance.post('sessions', data);

export const updateSession = (sessionId, data) => axiosInstance.put(`sessions/${sessionId}`, data);

export const getTutorSession = (tutorId) => axiosInstance.get(`tutors/${tutorId}/sessions`);

