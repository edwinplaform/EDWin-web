import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {createReview, getReviewsBySessionId, getTutorReview} from "@/services/reviewService";

const defaultQueryOptions = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
};

export const useTutorReview = (tutorId) => {
    return useQuery({
        queryKey: ["reviews", tutorId],
        queryFn: () => getTutorReview(tutorId),
        enabled: !!tutorId,
        ...defaultQueryOptions,
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews"]);
            queryClient.invalidateQueries(["sessions"]);
        },
        onError: (error) => console.error("Error creating review", error),
    });
};

export const useReviewsBySessionId = (sessionId) => {
    return useQuery({
        queryKey: ["reviews", sessionId],
        queryFn: () => getReviewsBySessionId(sessionId),
        enabled: !!sessionId,
        ...defaultQueryOptions,
    });
};
