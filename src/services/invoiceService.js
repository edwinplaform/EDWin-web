import axiosInstance from "@/util/axiosInstance";

export const createInvoice = (data) => axiosInstance.post('/invoices', data);

export const updateInvoicePayment = (invoiceId, data) => axiosInstance.patch(`/invoices/${invoiceId}/payment`, data);

export const getStudentInvoice = (studentId) => axiosInstance.get(`/students/${studentId}/invoices`);