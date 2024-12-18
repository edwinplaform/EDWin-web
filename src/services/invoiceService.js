import axiosInstance from "@/util/axiosInstance";

export const createInvoice = (data) => axiosInstance.post('/invoices', data);

export const updateInvoicePayment = async ({invoiceId, data}) => {
    const response = await axiosInstance.patch(`/invoices/${invoiceId}/payment`, data);
    return response.data;
}

export const getStudentInvoice = async (studentId) => {
    const response = await axiosInstance.get(`/students/${studentId}/invoices`);
    return response.data;
}

export const getStudentPayments = async (tutorId) => {
    const response = await axiosInstance.get(`/tutors/${tutorId}/payments`);
    return response.data;
}

export const updateAppointmentStatus = async ({invoiceId, data}) => {
    const response = await axiosInstance.patch(`/payments/${invoiceId}/status`, data);
    return response.data;
}