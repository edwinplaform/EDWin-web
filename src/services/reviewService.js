import axiosInstance from "@/util/axiosInstance";

export const createReview = (data) => axiosInstance.post('/reviews', data);

export const getTutorReview = (tutorId) => axiosInstance.get(`/reviews/tutor/${tutorId}`);

export const getReviewsBySessionId = (sessionId) => axiosInstance.get(`/reviews/session/${sessionId}`);