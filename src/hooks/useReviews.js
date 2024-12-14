import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {createReview, getTutorReview} from "@/services/reviewService";

export const useTutorReview = (tutorId) =>
    useQuery(["tutorReviews", tutorId], () => getTutorReview(tutorId), {
        enabled: !!tutorId,
    });

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation(createReview, {
        onSuccess: () => queryClient.invalidateQueries("tutorReviews"),
    });
};
