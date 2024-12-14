import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    createSession,
    getTutorSession,
    updateSession
} from "@/services/sessionService";

export const useTutorSessions = (tutorId) =>
    useQuery(["sessions", tutorId], () => getTutorSession(tutorId), {
        enabled: !!tutorId,
    });

export const useCreateSession = () => {
    const queryClient = useQueryClient();
    return useMutation(createSession, {
        onSuccess: () => queryClient.invalidateQueries("sessions"),
    });
};

export const useUpdateSession = () => {
    const queryClient = useQueryClient();
    return useMutation(updateSession, {
        onSuccess: () => queryClient.invalidateQueries("sessions")
    });
};