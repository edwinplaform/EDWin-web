import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    createAppointment,
    getAppointmentByStatus,
    updateAppointmentStatus,
    getAppointmentById,
    getAppointmentByTutorId,
    deleteAppointmentById,
    getAppointmentByStatusAndId
} from "@/services/appointmentService";

const defaultQueryOptions = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
};

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
    return useMutation({
        mutationFn: createAppointment,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["appointments"]}),
        onError: (error) => console.error("---------Error creating appointment: ", error)
    });
};

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAppointmentStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["appointments"]);
            console.log(`Appointment ${variables.id} status updated successfully!`);
        },
        onError: (error) => {
            console.error(`Error updating appointment status: ${error.response?.data?.message || error.message}`);
        },
    });
};

export const useAppointmentByTutorId = (tutorId) => {
    return useQuery({
        queryKey: ["appointments", tutorId],
        queryFn: () => getAppointmentByTutorId(tutorId),
        enabled: !!tutorId,
        ...defaultQueryOptions,
        refetchInterval: 10000,
    });
};

export const useDeleteAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAppointmentById,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({queryKey: ['appointments']});
            console.log(`Appointment ${variables} deleted successfully!`);
        },
        onError: (error) => {
            console.error(`Error deleting appointment: ${error.message}`);
        }
    });
};

export const useAppointmentsByStatusAndId = (status, userId) => {
    return useQuery({
        queryKey: ['appointments', status, userId],
        queryFn: () => getAppointmentByStatusAndId(status, userId),
        enabled: !!status && !!userId,
        ...defaultQueryOptions,
        onError: (error) => {
            console.error('Error fetching appointments by status:', error);
        },
    });
};