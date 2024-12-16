import axiosInstance from "@/util/axiosInstance";

export const createInvoice = (data) => axiosInstance.post('/invoices', data);

export const updateInvoicePayment = (invoiceId, data) => axiosInstance.patch(`/invoices/${invoiceId}/payment`, data);

export const getStudentInvoice = async (studentId) => {
    const response = await axiosInstance.get(`/students/${studentId}/invoices`);
    return response.data;
}