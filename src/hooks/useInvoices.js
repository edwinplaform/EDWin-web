import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    createInvoice,
    updateInvoicePayment,
    getStudentInvoice, getStudentPayments,
} from "@/services/invoiceService";

const defaultQueryOptions = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
};

// export const useStudentInvoices = (studentId) =>
//     useQuery(["invoices", studentId], () => getStudentInvoice(studentId), {
//         enabled: !!studentId,
//     });

export const useStudentInvoices = (studentId) => {
    return useQuery({
        queryKey: ["invoices", studentId],
        queryFn: () => getStudentInvoice(studentId),
        enabled: !!studentId,
        ...defaultQueryOptions,
        refetchInterval: 10000,
    });
};

export const useStudentPayments = (tutorId) => {
    return useQuery({
        queryKey: ["invoices", tutorId],
        queryFn: () => getStudentPayments(tutorId),
        enabled: !!tutorId,
        ...defaultQueryOptions,
    });
};

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();
    return useMutation(createInvoice, {
        onSuccess: () => queryClient.invalidateQueries("invoices"),
    });
};

export const useUpdateInvoicePayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateInvoicePayment,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["invoices"]);
            console.log(`Invoice ${variables.id} payment receipt updated successfully!`);
        },
        onError: (error) => {
            console.error(`Error updating invoice receipt: ${error.response?.data?.message || error.message}`);
        },
    });
};