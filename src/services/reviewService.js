import axiosInstance from "@/util/axiosInstance";

export const createReview = (data) => axiosInstance.post('/review', data);

export const getTutorReview = (tutorId) => axiosInstance.get(`/tutors/${tutorId}/reviews`);