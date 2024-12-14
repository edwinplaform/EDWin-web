import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    createAppointment,
    getAppointmentByStatus,
    updateAppointmentStatus,
    getAppointmentById
} from "@/services/appointmentService";

export const useAppointmentsByStatus = (status) =>
    useQuery(["appointments", status], () => getAppointmentByStatus(status), {
        enabled: !!status,
    });

export const useAppointmentById = (id) =>
    useQuery(["appointment", id], () => getAppointmentById(id), {
        enabled: !!id
    });

export const useCreateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation(createAppointment, {
        onSuccess: () => queryClient.invalidateQueries("appointments"),
    });
};

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation(updateAppointmentStatus, {
        onSuccess: () => queryClient.invalidateQueries("appointments"),
    });
};