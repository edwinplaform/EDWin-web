import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    createSession,
    getSessionsByTutorId,
    updateSession,
    updateSessionStatus
} from "@/services/sessionService";

const defaultQueryOptions = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
};


export const useCreateSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSession,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["sessions"]}),
        onError: (error) => console.error("---------Error creating sessions: ", error)
    });
};

export const useUpdateSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSession,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["sessions"]);
            console.log(`Session ${variables.id} updated successfully!`);
        },
        onError: (error) => {
            console.error(`Error updating session: ${error.response?.data?.message || error.message}`);
        },
    });
};

export const useUpdateSessionStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSessionStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['sessions']);
            console.log(`Session ${variables.id} status updated successfully!`);
        },
        onError: (error) => {
            console.error(`Error updating session status: ${error.response?.data?.message || error.message}`);
        },
    });
};

export const useSessionsByTutorId = (tutorId) => {
    return useQuery({
        queryKey: ["sessions", tutorId],
        queryFn: () => getSessionsByTutorId(tutorId),
        enabled: !!tutorId,
        ...defaultQueryOptions,
        refetchInterval: 10000,
    });
};

