import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    createInvoice,
    updateInvoicePayment,
    getStudentInvoice,
} from "@/services/invoiceService";

export const useStudentInvoices = (studentId) =>
    useQuery(["invoices", studentId], () => getStudentInvoice(studentId), {
        enabled: !!studentId,
    });

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation(createInvoice, {
        onSuccess: () => queryClient.invalidateQueries("invoices"),
    });
};

export const useUpdateInvoicePayment = () => {
    const queryClient = useQueryClient();
    return useMutation(updateInvoicePayment, {
        onSuccess: () => queryClient.invalidateQueries("invoices"),
    });
};